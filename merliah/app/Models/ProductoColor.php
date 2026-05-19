<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductoColor extends Model
{
    use HasFactory;

    protected $table = 'producto_colores';

    protected $fillable = [
        'producto_id',
        'nombre',
        'hex',
    ];

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}
