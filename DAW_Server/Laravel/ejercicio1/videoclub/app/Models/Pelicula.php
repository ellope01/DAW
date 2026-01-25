<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

//Creacion del modelo
class Pelicula extends Model
{
    //
    protected $table='Peliculas'; //conecta con la bbdd
    protected $fillable=['title', 'year', 'director','poster', 'rented', 'synopsis']; //indica que se pueden modificar los campos / rellenar formularios (create/update)
}
