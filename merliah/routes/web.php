<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\FavoritoController;
use App\Http\Controllers\InicioController;
use App\Http\Controllers\OutfitController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Rutas públicas de Autenticación
|--------------------------------------------------------------------------
*/

Route::get('/', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/registro', [AuthController::class, 'showRegistro'])->name('registro');
Route::post('/registro', [AuthController::class, 'registro']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/carga', function () {
    return Inertia::render('carga');
})->name('carga');

/*
|--------------------------------------------------------------------------
| Rutas principales de la Tienda
|--------------------------------------------------------------------------
*/

Route::get('/inicio', [InicioController::class, 'index'])->name('inicio');
Route::get('/productos', [ProductoController::class, 'index'])->name('productos');
Route::get('/producto/{slug?}', [ProductoController::class, 'show'])->name('producto');

/*
|--------------------------------------------------------------------------
| Funcionalidad estrella: Outfits
|--------------------------------------------------------------------------
*/

Route::get('/outfits', [OutfitController::class, 'index'])->name('outfits');
Route::post('/outfits/generar', [OutfitController::class, 'generar'])->name('outfits.generar');

/*
|--------------------------------------------------------------------------
| Rutas del área personal del Usuario
|--------------------------------------------------------------------------
*/

Route::get('/usuario', [UsuarioController::class, 'dashboard'])->name('usuario');

Route::get('/usuarioCarrito', [CarritoController::class, 'index'])->name('usuarioCarrito');
Route::post('/carrito', [CarritoController::class, 'store'])->name('carrito.store');
Route::put('/carrito/{id}', [CarritoController::class, 'update'])->name('carrito.update');
Route::delete('/carrito/{id}', [CarritoController::class, 'destroy'])->name('carrito.destroy');

Route::get('/favorito', [FavoritoController::class, 'index'])->name('favorito');
Route::post('/favorito/toggle', [FavoritoController::class, 'toggle'])->name('favorito.toggle');

Route::get('/usuarioInfo', [UsuarioController::class, 'info'])->name('usuarioInfo');
Route::post('/usuarioInfo', [UsuarioController::class, 'updateInfo'])->name('usuarioInfo.update');
Route::post('/usuarioPassword', [UsuarioController::class, 'updatePassword'])->name('usuarioPassword.update');

Route::get('/pedido', [UsuarioController::class, 'pedidos'])->name('pedido');
Route::post('/pedido', [UsuarioController::class, 'crearPedido'])->name('pedido.crear');
