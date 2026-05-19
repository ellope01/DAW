<?php

namespace App\Http\Controllers;

use App\Models\Outfit;
use App\Models\Producto;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OutfitController extends Controller
{
    private function getUser()
    {
        return Auth::user() ?? User::first();
    }

    public function index()
    {
        $user = $this->getUser();

        // Obtener outfits públicos o los del propio usuario
        $outfits = Outfit::with(['outfitProductos.producto'])
            ->where('es_publico', true)
            ->orWhere('user_id', $user ? $user->id : 0)
            ->get()
            ->map(function ($o) {
                $total = 0;
                $prendas = $o->outfitProductos->map(function ($op) use (&$total) {
                    $p = $op->producto;
                    $total += (float)$p->precio;
                    return [
                        'tipo' => $op->tipo_prenda,
                        'nombre' => $p->nombre,
                        'precio' => number_format($p->precio, 2, ',', '') . '€',
                        'imagen' => $p->imagen ?? '/images/hero/hero-main.png',
                    ];
                });

                return [
                    'id' => $o->id,
                    'nombre' => $o->nombre,
                    'descripcion' => $o->descripcion,
                    'total' => number_format($total, 2, ',', '') . '€',
                    'prendas' => $prendas,
                ];
            });

        return Inertia::render('outfits', [
            'outfitsList' => $outfits,
        ]);
    }

    public function generar(Request $request)
    {
        // Algoritmo de Outfit Inteligente (Fase 3)
        // Seleccionará un Top, un Bottom, y un accesorio/outer de manera que combinen en estilo y colores.
        
        // 1. Obtener Tops
        $tops = Producto::whereHas('categoria', function ($q) {
            $q->where('slug', 'tops');
        })->get();

        // 2. Obtener Bottoms (Pantalones, Faldas, Vestidos)
        $bottoms = Producto::whereHas('categoria', function ($q) {
            $q->whereIn('slug', ['pantalones', 'vestidos']);
        })->get();

        // 3. Obtener Accesorios
        $accesorios = Producto::whereHas('categoria', function ($q) {
            $q->where('slug', 'accesorios');
        })->get();

        if ($tops->isEmpty() || $bottoms->isEmpty()) {
            return response()->json(['error' => 'No hay suficientes productos en la base de datos para generar un outfit'], 400);
        }

        $top = $tops->random();
        $bottom = $bottoms->random();
        $accesorio = $accesorios->isNotEmpty() ? $accesorios->random() : null;

        $totalNum = (float)$top->precio + (float)$bottom->precio + ($accesorio ? (float)$accesorio->precio : 0);

        $prendas = [
            [
                'id' => $top->id,
                'tipo' => 'Superior',
                'nombre' => $top->nombre,
                'precio' => number_format($top->precio, 2, ',', '') . '€',
                'imagen' => $top->imagen ?? '/images/hero/hero-outfit.png',
            ],
            [
                'id' => $bottom->id,
                'tipo' => 'Inferior',
                'nombre' => $bottom->nombre,
                'precio' => number_format($bottom->precio, 2, ',', '') . '€',
                'imagen' => $bottom->imagen ?? '/images/hero/hero-collection.png',
            ]
        ];

        if ($accesorio) {
            $prendas[] = [
                'id' => $accesorio->id,
                'tipo' => 'Accesorio',
                'nombre' => $accesorio->nombre,
                'precio' => number_format($accesorio->precio, 2, ',', '') . '€',
                'imagen' => $accesorio->imagen ?? '/images/hero/hero-main.png',
            ];
        }

        // Nombres sofisticados de outfits
        $nombres = [
            'Silueta Minimalista',
            'Tarde de Verano',
            'Monocromo Estructurado',
            'Atardecer en Merliah',
            'Esencia Lino',
            'Clásico Contemporáneo'
        ];

        $outfitGenerado = [
            'nombre' => $nombres[array_rand($nombres)],
            'total' => number_format($totalNum, 2, ',', '') . '€',
            'prendas' => $prendas,
        ];

        return response()->json($outfitGenerado);
    }
}
