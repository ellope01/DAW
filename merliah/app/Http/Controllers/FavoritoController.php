<?php

namespace App\Http\Controllers;

use App\Models\Favorito;
use App\Models\Producto;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FavoritoController extends Controller
{
    private function getUser()
    {
        return Auth::user() ?? User::first();
    }

    public function index()
    {
        $user = $this->getUser();
        if (!$user) {
            return redirect()->route('login');
        }

        $favoritos = Favorito::with(['producto.colores', 'producto.categoria'])
            ->where('user_id', $user->id)
            ->get()
            ->map(function ($fav) {
                $p = $fav->producto;
                return [
                    'id' => $p->id,
                    'nombre' => $p->nombre,
                    'precio' => number_format($p->precio, 2, ',', '') . '€',
                    'imagen' => $p->imagen ?? '/images/hero/hero-main.png',
                    'colores' => $p->colores->map(function ($c) {
                        return ['nombre' => $c->nombre, 'hex' => $c->hex];
                    }),
                ];
            });

        return Inertia::render('usuarioFavoritos', [
            'favoritos' => $favoritos,
        ]);
    }

    public function toggle(Request $request)
    {
        $request->validate([
            'producto_id' => 'required|exists:productos,id',
        ]);

        $user = $this->getUser();
        if (!$user) {
            return response()->json(['error' => 'No autorizado'], 401);
        }

        $fav = Favorito::where('user_id', $user->id)
            ->where('producto_id', $request->producto_id)
            ->first();

        if ($fav) {
            $fav->delete();
            $status = 'removed';
        } else {
            Favorito::create([
                'user_id' => $user->id,
                'producto_id' => $request->producto_id,
            ]);
            $status = 'added';
        }

        return redirect()->back()->with('status', $status);
    }
}
