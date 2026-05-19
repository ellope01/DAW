<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Outfit extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nombre',
        'descripcion',
        'es_publico',
    ];

    protected $casts = [
        'es_publico' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function outfitProductos()
    {
        return $this->hasMany(OutfitProducto::class, 'outfit_id');
    }

    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'outfit_productos', 'outfit_id', 'producto_id')
                    ->withPivot('tipo_prenda')
                    ->withTimestamps();
    }
}
