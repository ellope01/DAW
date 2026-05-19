<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'slug',
        'descripcion',
        'precio',
        'precio_oferta',
        'categoria_id',
        'composicion',
        'cuidados',
        'es_nuevo',
        'imagen',
        'reviews',
    ];

    protected $casts = [
        'precio' => 'decimal:2',
        'precio_oferta' => 'decimal:2',
        'es_nuevo' => 'boolean',
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'categoria_id');
    }

    public function colores()
    {
        return $this->hasMany(ProductoColor::class, 'producto_id');
    }

    public function tallas()
    {
        return $this->hasMany(ProductoTalla::class, 'producto_id');
    }

    public function imagenes()
    {
        return $this->hasMany(ProductoImagen::class, 'producto_id');
    }
}
