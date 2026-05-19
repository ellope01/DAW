<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OutfitProducto extends Model
{
    use HasFactory;

    protected $table = 'outfit_productos';

    protected $fillable = [
        'outfit_id',
        'producto_id',
        'tipo_prenda',
    ];

    public function outfit()
    {
        return $this->belongsTo(Outfit::class, 'outfit_id');
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}
