<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Producto;
use Inertia\Inertia;

class InicioController extends Controller
{
    public function index()
    {
        // Traer productos destacados o más vendidos
        $bestSellers = Producto::with(['colores', 'categoria'])
            ->orderBy('reviews', 'desc')
            ->take(6)
            ->get()
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'nombre' => $p->nombre,
                    'subtitulo' => $p->categoria->nombre,
                    'precio' => number_format($p->precio, 2, ',', '') . '€',
                    'badge' => $p->es_nuevo ? 'new' : '',
                    'reviews' => $p->reviews,
                    'imagen' => $p->imagen ?? '/images/hero/hero-main.png',
                ];
            });

        // Traer categorias
        $categorias = Categoria::take(4)->get()->map(function ($c) {
            return [
                'nombre' => $c->nombre,
                'slug' => $c->slug,
                'gradient' => $c->gradient ?? 'linear-gradient(135deg, #C4B9A8, #A89D8E)',
            ];
        });

        return Inertia::render('inicio', [
            'bestSellers' => $bestSellers,
            'categorias' => $categorias,
        ]);
    }
}
