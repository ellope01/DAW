<?php

namespace App\Http\Controllers;

use App\Models\Carrito;
use App\Models\Producto;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CarritoController extends Controller
{
    private function getUser()
    {
        // Si hay usuario autenticado lo devuelve, si no, toma el primero para facilitar el testing
        return Auth::user() ?? User::first();
    }

    public function index()
    {
        $user = $this->getUser();
        if (!$user) {
            return redirect()->route('login');
        }

        $items = Carrito::with('producto')
            ->where('user_id', $user->id)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'producto_id' => $item->producto_id,
                    'nombre' => $item->producto->nombre,
                    'precio' => number_format($item->producto->precio, 2, ',', '') . '€',
                    'precio_num' => (float)$item->producto->precio,
                    'talla' => $item->talla,
                    'color' => $item->color ?? 'Único',
                    'cantidad' => $item->cantidad,
                    'imagen' => $item->producto->imagen ?? '/images/hero/hero-main.png',
                ];
            });

        return Inertia::render('usuarioCarrito', [
            'carritoItems' => $items,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'producto_id' => 'required|exists:productos,id',
            'talla' => 'required|string',
            'color' => 'nullable|string',
            'cantidad' => 'nullable|integer|min:1',
        ]);

        $user = $this->getUser();
        if (!$user) {
            return response()->json(['error' => 'No autorizado'], 401);
        }

        // Buscar si ya existe el mismo artículo con la misma talla y color en el carrito
        $existente = Carrito::where('user_id', $user->id)
            ->where('producto_id', $request->producto_id)
            ->where('talla', $request->talla)
            ->where('color', $request->color)
            ->first();

        if ($existente) {
            $existente->cantidad += $request->get('cantidad', 1);
            $existente->save();
        } else {
            Carrito::create([
                'user_id' => $user->id,
                'producto_id' => $request->producto_id,
                'talla' => $request->talla,
                'color' => $request->color,
                'cantidad' => $request->get('cantidad', 1),
            ]);
        }

        return redirect()->route('usuarioCarrito');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'cantidad' => 'required|integer|min:1',
        ]);

        $item = Carrito::findOrFail($id);
        $item->cantidad = $request->cantidad;
        $item->save();

        return redirect()->route('usuarioCarrito');
    }

    public function destroy($id)
    {
        $item = Carrito::findOrFail($id);
        $item->delete();

        return redirect()->route('usuarioCarrito');
    }
}
