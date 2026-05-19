<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidoLinea extends Model
{
    use HasFactory;

    protected $table = 'pedido_lineas';

    protected $fillable = [
        'pedido_id',
        'producto_id',
        'nombre',
        'talla',
        'color',
        'cantidad',
        'precio',
    ];

    protected $casts = [
        'precio' => 'decimal:2',
        'cantidad' => 'integer',
    ];

    public function pedido()
    {
        return $this->belongsTo(Pedido::class, 'pedido_id');
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}
