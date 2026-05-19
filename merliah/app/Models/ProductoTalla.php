<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductoTalla extends Model
{
    use HasFactory;

    protected $table = 'producto_tallas';

    protected $fillable = [
        'producto_id',
        'talla',
        'stock',
    ];

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}
