<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductoController extends Controller
{
    public function index(Request $request)
    {
        $query = Producto::with(['colores', 'categoria']);

        // Filtrar por categoría (array o string)
        if ($request->has('categoria') && !empty($request->categoria)) {
            $categorias = is_array($request->categoria) ? $request->categoria : [$request->categoria];
            $query->whereHas('categoria', function ($q) use ($categorias) {
                $q->whereIn('slug', $categorias);
            });
        }

        // Filtrar por color
        if ($request->has('color') && !empty($request->color)) {
            $query->whereHas('colores', function ($q) use ($request) {
                $q->where('nombre', 'like', '%' . $request->color . '%');
            });
        }

        // Filtrar por precio
        if ($request->has('precio') && !empty($request->precio)) {
            $rango = explode('-', $request->precio);
            if (count($rango) === 2) {
                $query->whereBetween('precio', [(float)$rango[0], (float)$rango[1]]);
            }
        }

        // Ordenación
        $orden = $request->get('orden', 'destacados');
        if ($orden === 'precio_asc') {
            $query->orderBy('precio', 'asc');
        } elseif ($orden === 'precio_desc') {
            $query->orderBy('precio', 'desc');
        } elseif ($orden === 'novedades') {
            $query->orderBy('created_at', 'desc');
        } else {
            // destacados
            $query->orderBy('reviews', 'desc');
        }

        $productos = $query->paginate(9)->withQueryString();

        // Formatear productos para el frontend Vue
        $productosFormatted = [
            'data' => collect($productos->items())->map(function ($p) {
                return [
                    'id' => $p->id,
                    'nombre' => $p->nombre,
                    'slug' => $p->slug,
                    'precio' => number_format($p->precio, 2, ',', '') . '€',
                    'es_nuevo' => $p->es_nuevo,
                    'tiene_oferta' => !is_null($p->precio_oferta),
                    'reviews' => $p->reviews,
                    'imagen' => $p->imagen ?? '/images/hero/hero-main.png',
                    'colores' => $p->colores->map(function ($c) {
                        return ['nombre' => $c->nombre, 'hex' => $c->hex];
                    }),
                ];
            })->toArray(),
            'total' => $productos->total(),
            'last_page' => $productos->lastPage(),
            'current_page' => $productos->currentPage(),
        ];

        $categorias = Categoria::all()->map(function ($c) {
            return [
                'id' => $c->id,
                'nombre' => $c->nombre,
                'slug' => $c->slug,
            ];
        });

        return Inertia::render('productos', [
            'productos' => $productosFormatted,
            'categorias' => $categorias,
            'filtros' => $request->only(['categoria', 'color', 'precio', 'orden']),
        ]);
    }

    public function show($slug = 'vestido-lino')
    {
        // Si no se provee slug, por defecto tomamos 'vestido-lino' para evitar errores
        $p = Producto::with(['colores', 'tallas', 'imagenes', 'categoria'])
            ->where('slug', $slug)
            ->first();

        if (!$p) {
            // Intentar buscar el primero si el slug es incorrecto
            $p = Producto::with(['colores', 'tallas', 'imagenes', 'categoria'])->first();
        }

        $productoFormatted = [
            'id' => $p->id,
            'nombre' => $p->nombre,
            'slug' => $p->slug,
            'categoria' => $p->categoria->nombre,
            'precio' => number_format($p->precio, 2, ',', '') . '€',
            'precio_oferta' => $p->precio_oferta ? number_format($p->precio_oferta, 2, ',', '') . '€' : null,
            'descripcion' => $p->descripcion,
            'composicion' => $p->composicion ?? '100% Materiales seleccionados con intención.',
            'cuidados' => $p->cuidados ?? 'Lavar con colores similares en agua fría.',
            'imagen' => $p->imagen,
            'colores' => $p->colores->map(function ($c) {
                return ['nombre' => $c->nombre, 'hex' => $c->hex];
            }),
            'tallas' => $p->tallas->map(function ($t) {
                return ['talla' => $t->talla, 'stock' => $t->stock];
            }),
            'imagenes' => $p->imagenes()->orderBy('orden', 'asc')->get()->map(function ($img) {
                return $img->url;
            })->toArray(),
        ];

        // Productos Recomendados (Fase 3 - Basado en la misma categoría)
        $relacionados = Producto::where('categoria_id', $p->categoria_id)
            ->where('id', '!=', $p->id)
            ->take(4)
            ->get();

        // Si hay menos de 4 de la misma categoría, traer de otras
        if ($relacionados->count() < 4) {
            $adicionales = Producto::where('id', '!=', $p->id)
                ->whereNotIn('id', $relacionados->pluck('id'))
                ->take(4 - $relacionados->count())
                ->get();
            $relacionados = $relacionados->merge($adicionales);
        }

        $relacionadosFormatted = $relacionados->map(function ($rel) {
            return [
                'id' => $rel->id,
                'nombre' => $rel->nombre,
                'slug' => $rel->slug,
                'precio' => number_format($rel->precio, 2, ',', '') . '€',
                'imagen' => $rel->imagen ?? '/images/hero/hero-main.png',
            ];
        });

        return Inertia::render('producto', [
            'producto' => $productoFormatted,
            'relacionados' => $relacionadosFormatted,
        ]);
    }
}
