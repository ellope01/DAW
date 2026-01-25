<?php

namespace App\Http\Controllers;
use App\Models\Pelicula;

use Illuminate\Http\Request;

class CatalogController extends Controller
{

    public function getIndex()
    {
        $peliculas = Pelicula::all();
        return view('./catalog/index', array('arrayPeliculas' => $peliculas));
    }
    public function getShow($id)
    {/*Poner la vista*/
        $pelicula = Pelicula::findOrFail($id+1); //busca por id si lo encuentra lo devuelve, sino error 404
        return view('./catalog/show', data: array('pelicula' => $pelicula));
    }
    public function getCreate()
    {
        return view('./catalog/create');
    }
    public function getEdit($id)
    {
        $pelicula = Pelicula::findOrFail($id+1);
        return view('./catalog/edit', array('peliculaEdit' => $pelicula));
    }

}