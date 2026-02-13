<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('login');
});


Route::get('/carga', function () {
    return Inertia::render('carga');
});

Route::get('/registro', function () {
    return Inertia::render('registro');
});

Route::get('/usuario', function () {
    return Inertia::render('usuario');
});

Route::get('/usuarioCarrito', function () {
    return Inertia::render('usuarioCarrito');
});

Route::get('/favorito', function () {
    return Inertia::render('usuarioFavoritos');
});

Route::get('/usuarioInfo', function () {
    return Inertia::render('usuarioInfo');
});

Route::get('/inicio', function () {
    return Inertia::render('inicio');
});

Route::get('/outfits', function () {
    return Inertia::render('outfits');
});
Route::get('/pedido', function () {
    return Inertia::render('pedido');
});

Route::get('/producto', function () {
    return Inertia::render('producto');
});
Route::get('/productos', function () {
    return Inertia::render('productos');
});
