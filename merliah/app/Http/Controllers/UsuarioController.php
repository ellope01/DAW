<?php

namespace App\Http\Controllers;

use App\Models\Carrito;
use App\Models\Pedido;
use App\Models\Producto;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UsuarioController extends Controller
{
    private function getUser()
    {
        return Auth::user() ?? User::first();
    }

    public function dashboard()
    {
        $user = $this->getUser();
        if (!$user) {
            return redirect()->route('login');
        }

        $pedidosCount = Pedido::where('user_id', $user->id)->count();
        $favoritosCount = $user->favoritos()->count();
        $outfitsCount = $user->outfits()->count();

        $stats = [
            ['label' => 'Pedidos', 'value' => (string)$pedidosCount],
            ['label' => 'Favoritos', 'value' => (string)$favoritosCount],
            ['label' => 'Outfits', 'value' => (string)$outfitsCount],
            ['label' => 'Estilo', 'value' => $user->estilo_preferido ?? 'Minimal'],
        ];

        // Recomendaciones personalizadas basadas en el estilo preferido del usuario (Fase 3)
        $recomendados = Producto::where('es_nuevo', true)
            ->take(4)
            ->get()
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'nombre' => $p->nombre,
                    'precio' => number_format($p->precio, 2, ',', '') . '€',
                    'imagen' => $p->imagen ?? '/images/hero/hero-main.png',
                ];
            });

        return Inertia::render('usuario', [
            'stats' => $stats,
            'recomendados' => $recomendados,
        ]);
    }

    public function info()
    {
        $user = $this->getUser();
        if (!$user) {
            return redirect()->route('login');
        }

        $usuarioFormatted = [
            'nombre' => $user->name,
            'apellidos' => $user->apellidos ?? '',
            'email' => $user->email,
            'telefono' => $user->telefono ?? '',
            'fecha_nacimiento' => $user->fecha_nacimiento ? $user->fecha_nacimiento->format('Y-m-d') : '',
            'estilo_preferido' => $user->estilo_preferido ?? '',
            'direccion' => $user->direccion ?? '',
            'ciudad' => $user->ciudad ?? '',
            'codigo_postal' => $user->codigo_postal ?? '',
        ];

        return Inertia::render('usuarioInfo', [
            'usuario' => $usuarioFormatted,
        ]);
    }

    public function updateInfo(Request $request)
    {
        $user = $this->getUser();
        if (!$user) {
            return redirect()->route('login');
        }

        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'nullable|string|max:255',
            'telefono' => 'nullable|string|max:50',
            'fecha_nacimiento' => 'nullable|date',
            'estilo_preferido' => 'nullable|string|max:100',
            'direccion' => 'nullable|string|max:255',
            'ciudad' => 'nullable|string|max:255',
            'codigo_postal' => 'nullable|string|max:20',
        ]);

        $user->update([
            'name' => $request->nombre,
            'apellidos' => $request->apellidos,
            'telefono' => $request->telefono,
            'fecha_nacimiento' => $request->fecha_nacimiento,
            'estilo_preferido' => $request->estilo_preferido,
            'direccion' => $request->direccion,
            'ciudad' => $request->ciudad,
            'codigo_postal' => $request->codigo_postal,
        ]);

        return redirect()->back()->with('success', 'Información actualizada correctamente');
    }

    public function updatePassword(Request $request)
    {
        $user = $this->getUser();
        if (!$user) {
            return redirect()->route('login');
        }

        $request->validate([
            'password_actual' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if (!Hash::check($request->password_actual, $user->password)) {
            return redirect()->back()->withErrors(['password_actual' => 'La contraseña actual es incorrecta.']);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return redirect()->back()->with('success', 'Contraseña actualizada correctamente');
    }

    public function pedidos()
    {
        $user = $this->getUser();
        if (!$user) {
            return redirect()->route('login');
        }

        $pedidos = Pedido::with('lineas.producto')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($ped) {
                return [
                    'id' => $ped->id,
                    'referencia' => $ped->referencia,
                    'created_at' => $ped->created_at->format('d M Y'),
                    'estado' => $ped->estado,
                    'total' => number_format($ped->total, 2, ',', '') . '€',
                    'paso_actual' => $ped->paso_actual,
                    'lineas' => $ped->lineas->map(function ($linea) {
                        return [
                            'nombre' => $linea->nombre,
                            'talla' => $linea->talla,
                            'cantidad' => $linea->cantidad,
                            'imagen' => $linea->producto->imagen ?? '/images/hero/hero-main.png',
                        ];
                    }),
                ];
            });

        return Inertia::render('pedido', [
            'pedidos' => $pedidos,
        ]);
    }

    public function crearPedido(Request $request)
    {
        $user = $this->getUser();
        if (!$user) {
            return redirect()->route('login');
        }

        // Obtener el carrito
        $cartItems = Carrito::with('producto')->where('user_id', $user->id)->get();
        if ($cartItems->isEmpty()) {
            return redirect()->route('usuarioCarrito')->withErrors(['error' => 'El carrito está vacío.']);
        }

        $subtotal = 0;
        foreach ($cartItems as $item) {
            $subtotal += (float)$item->producto->precio * $item->cantidad;
        }

        // Envío gratis a partir de 80 euros
        $envio = $subtotal >= 80 ? 0 : 4.99;
        $total = $subtotal + $envio;

        // Generar referencia única
        $referencia = 'VLR-' . date('Y') . '-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);

        // Crear Pedido
        $pedido = Pedido::create([
            'user_id' => $user->id,
            'referencia' => $referencia,
            'estado' => 'confirmado',
            'subtotal' => $subtotal,
            'envio' => $envio,
            'total' => $total,
            'direccion' => $user->direccion ?? 'Calle Mayor 10',
            'ciudad' => $user->ciudad ?? 'Valencia',
            'codigo_postal' => $user->codigo_postal ?? '46001',
            'paso_actual' => 0, // Confirmado
        ]);

        // Crear Líneas de Pedido
        foreach ($cartItems as $item) {
            $pedido->lineas()->create([
                'producto_id' => $item->producto_id,
                'nombre' => $item->producto->nombre,
                'talla' => $item->talla,
                'color' => $item->color,
                'cantidad' => $item->cantidad,
                'precio' => $item->producto->precio,
            ]);

            // Descontar stock
            $tallaStock = $item->producto->tallas()->where('talla', $item->talla)->first();
            if ($tallaStock) {
                $tallaStock->stock = max(0, $tallaStock->stock - $item->cantidad);
                $tallaStock->save();
            }
        }

        // Limpiar Carrito
        Carrito::where('user_id', $user->id)->delete();

        return redirect()->route('pedido')->with('success', '¡Pedido realizado correctamente!');
    }
}
