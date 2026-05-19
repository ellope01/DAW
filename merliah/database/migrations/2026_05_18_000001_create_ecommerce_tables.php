<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Categorías
        Schema::create('categorias', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('slug')->unique();
            $table->text('descripcion')->nullable();
            $table->string('imagen')->nullable();
            $table->string('gradient')->nullable();
            $table->timestamps();
        });

        // 2. Productos
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('slug')->unique();
            $table->text('descripcion')->nullable();
            $table->decimal('precio', 8, 2);
            $table->decimal('precio_oferta', 8, 2)->nullable();
            $table->foreignId('categoria_id')->constrained('categorias')->onDelete('cascade');
            $table->text('composicion')->nullable();
            $table->text('cuidados')->nullable();
            $table->boolean('es_nuevo')->default(true);
            $table->string('imagen')->nullable(); // Imagen de portada
            $table->integer('reviews')->default(0);
            $table->timestamps();
        });

        // 3. Colores de productos
        Schema::create('producto_colores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')->constrained('productos')->onDelete('cascade');
            $table->string('nombre');
            $table->string('hex');
            $table->timestamps();
        });

        // 4. Tallas de productos
        Schema::create('producto_tallas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')->constrained('productos')->onDelete('cascade');
            $table->string('talla');
            $table->integer('stock')->default(0);
            $table->timestamps();
        });

        // 5. Imágenes adicionales de productos
        Schema::create('producto_imagenes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')->constrained('productos')->onDelete('cascade');
            $table->string('url');
            $table->integer('orden')->default(0);
            $table->timestamps();
        });

        // 6. Favoritos
        Schema::create('favoritos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('producto_id')->constrained('productos')->onDelete('cascade');
            $table->timestamps();
            $table->unique(['user_id', 'producto_id']);
        });

        // 7. Carrito
        Schema::create('carritos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('producto_id')->constrained('productos')->onDelete('cascade');
            $table->string('talla');
            $table->string('color')->nullable();
            $table->integer('cantidad')->default(1);
            $table->timestamps();
        });

        // 8. Pedidos
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('referencia')->unique();
            $table->string('estado')->default('pendiente'); // pendiente, confirmado, preparando, enviado, entregado, cancelado
            $table->decimal('subtotal', 8, 2);
            $table->decimal('envio', 8, 2)->default(0);
            $table->decimal('total', 8, 2);
            $table->string('direccion');
            $table->string('ciudad');
            $table->string('codigo_postal');
            $table->integer('paso_actual')->default(0); // 0: Confirmado, 1: Preparando, 2: Enviado, 3: Entregado
            $table->timestamps();
        });

        // 9. Líneas de pedidos
        Schema::create('pedido_lineas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pedido_id')->constrained('pedidos')->onDelete('cascade');
            $table->foreignId('producto_id')->nullable()->constrained('productos')->onNullDelete();
            $table->string('nombre');
            $table->string('talla');
            $table->string('color')->nullable();
            $table->integer('cantidad')->default(1);
            $table->decimal('precio', 8, 2);
            $table->timestamps();
        });

        // 10. Outfits
        Schema::create('outfits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->boolean('es_publico')->default(false);
            $table->timestamps();
        });

        // 11. Productos de Outfits
        Schema::create('outfit_productos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('outfit_id')->constrained('outfits')->onDelete('cascade');
            $table->foreignId('producto_id')->constrained('productos')->onDelete('cascade');
            $table->string('tipo_prenda'); // top, bottom, shoes, accesorio, outer
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('outfit_productos');
        Schema::dropIfExists('outfits');
        Schema::dropIfExists('pedido_lineas');
        Schema::dropIfExists('pedidos');
        Schema::dropIfExists('carritos');
        Schema::dropIfExists('favoritos');
        Schema::dropIfExists('producto_imagenes');
        Schema::dropIfExists('producto_tallas');
        Schema::dropIfExists('producto_colores');
        Schema::dropIfExists('productos');
        Schema::dropIfExists('categorias');
    }
};
