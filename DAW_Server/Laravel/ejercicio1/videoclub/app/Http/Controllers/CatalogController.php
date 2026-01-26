<?php

namespace App\Http\Controllers;
use App\Models\Pelicula;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class CatalogController extends Controller
{

    public function getIndex()
    {
        $peliculas = Pelicula::all();
        return view('./catalog/index', array('arrayPeliculas' => $peliculas));
    }
    public function getShow($id)
    {/*Poner la vista*/
        $pelicula = Pelicula::findOrFail($id + 1); //busca por id si lo encuentra lo devuelve, sino error 404
        return view('./catalog/show', data: array('pelicula' => $pelicula));
    }
    public function getCreate()
    {
        return view('./catalog/create');
    }
    public function getEdit($id)
    {
        $pelicula = Pelicula::findOrFail($id);
        return view('./catalog/edit', array('peliculaEdit' => $pelicula));
    }
    public function logeado()
    {
        if (Auth::check()) {
            return $this->getIndex();
        } else {
            return view('/login');
        }
    }

    public function postCreate(Request $request)
    {
        $peliculaEdit = new Pelicula();

        $peliculaEdit->title = $request->input('title');
        $peliculaEdit->year = $request->input('anyo');
        $peliculaEdit->director = $request->input('dir');
        $peliculaEdit->synopsis = $request->input('synopsis');
        $peliculaEdit->poster = $request->input('poster');
        $peliculaEdit->rented = false;

        $peliculaEdit->save();

        return redirect('/catalog');
    }

    public function putEdit(Request $request, $id)
    {
        $movie = Pelicula::findOrFail($id);

        $movie->title = $request->input('title');
        $movie->year = $request->input('anyo');
        $movie->director = $request->input('dir');
        $movie->synopsis = $request->input('synopsis');
        $movie->poster = $request->input('poster');

        $movie->save();

        return redirect('/catalog/show/' . $movie->id);
    }

}