<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Login');
});


Route::get('/carga', function () {
    return Inertia::render('carga');

});