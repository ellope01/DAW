<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'apellidos',
        'email',
        'password',
        'telefono',
        'fecha_nacimiento',
        'estilo_preferido',
        'direccion',
        'ciudad',
        'codigo_postal',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'fecha_nacimiento' => 'date',
        ];
    }

    public function favoritos()
    {
        return $this->hasMany(Favorito::class, 'user_id');
    }

    public function carritos()
    {
        return $this->hasMany(Carrito::class, 'user_id');
    }

    public function pedidos()
    {
        return $this->hasMany(Pedido::class, 'user_id');
    }

    public function outfits()
    {
        return $this->hasMany(Outfit::class, 'user_id');
    }
}
