<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'referencia',
        'estado',
        'subtotal',
        'envio',
        'total',
        'direccion',
        'ciudad',
        'codigo_postal',
        'paso_actual',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'envio' => 'decimal:2',
        'total' => 'decimal:2',
        'paso_actual' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function lineas()
    {
        return $this->hasMany(PedidoLinea::class, 'pedido_id');
    }
}
