<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\HomeController;

Route::get('/', [HomeController::class, 'getHome']);
Route::redirect('/', '/catalog');
Route::get('/login', function () {
    return view('./auth/login');
});

Route::get('/logout', function () {
    return ('User logout');
});


Route::get('/catalog', [CatalogController::class, 'getIndex']);
Route::get('/catalog/show/{id}', [CatalogController::class, 'getShow']);
Route::get('/catalog/create', [CatalogController::class, 'getCreate']);
Route::get('/catalog/edit/{id}', [CatalogController::class, 'getEdit']);
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/catalog', [CatalogController::class, 'logeado']);
    Route::post('/catalog/create', [CatalogController::class, 'postCreate']);
    Route::put('/catalog/edit/{id}', [CatalogController::class, 'putEdit']);

});

require __DIR__ . '/auth.php';
