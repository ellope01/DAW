<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Crear Usuario de prueba (Estilo Merliah Summers / Surf / Sirena)
        $user = User::create([
            'name' => 'Merliah',
            'apellidos' => 'Summers',
            'email' => 'merliah@email.com',
            'password' => bcrypt('password'),
            'telefono' => '+34 600 777 888',
            'fecha_nacimiento' => '2000-08-25',
            'estilo_preferido' => 'Bohemio',
            'direccion' => 'Avenida de la Costa 1',
            'ciudad' => 'Malibú',
            'codigo_postal' => '90265',
        ]);

        // 2. Crear Categorías inspiradas en el atardecer playero
        $cats = [
            [
                'nombre' => 'Bañadores',
                'slug' => 'banadores',
                'descripcion' => 'Trajes de baño de lujo y bikinis premium con texturas inspiradas en las conchas marinas de Oceana.',
                'imagen' => '/images/hero/hero-main.png',
                'gradient' => 'linear-gradient(135deg, #FF5A76, #FF7B39)'
            ],
            [
                'nombre' => 'Kaftanes & Pareos',
                'slug' => 'vestidos',
                'descripcion' => 'Kaftanes fluidos de lino y pareos de gasa translúcida con los colores del atardecer.',
                'imagen' => '/images/hero/hero-collection.png',
                'gradient' => 'linear-gradient(135deg, #FF7B39, #FFAE8F)'
            ],
            [
                'nombre' => 'Tops de Playa',
                'slug' => 'tops',
                'descripcion' => 'Tops tejidos en crochet artesanal y camisas fluidas de lino de tacto premium.',
                'imagen' => '/images/hero/hero-outfit.png',
                'gradient' => 'linear-gradient(135deg, #FFF7F3, #FF9270)'
            ],
            [
                'nombre' => 'Accesorios costeros',
                'slug' => 'accesorios',
                'descripcion' => 'Bolsos de rafia natural, collares de conchas y detalles dorados para un look de playa elegante.',
                'imagen' => '/images/hero/hero-main.png',
                'gradient' => 'linear-gradient(135deg, #E23D5B, #56212F)'
            ]
        ];

        $categorias = [];
        foreach ($cats as $cat) {
            $categorias[$cat['slug']] = \App\Models\Categoria::create($cat);
        }

        // 3. Crear Productos de baño e inspirados en Barbie Sirena
        $prods = [
            [
                'nombre' => 'Bikini Oceana',
                'slug' => 'bikini-oceana',
                'descripcion' => 'Bikini premium con copas en forma de concha texturizada rosa chicle y lazos naranja atardecer ajustables, inspirado en el océano mágico de Oceana.',
                'precio' => 79.99,
                'categoria_id' => $categorias['banadores']->id,
                'composicion' => '82% Nailon reciclado, 18% Elastano. Forro ultrasuave de secado rápido.',
                'cuidados' => 'Lavar a mano con agua fría y jabón neutro. Secar a la sombra.',
                'es_nuevo' => true,
                'imagen' => '/images/hero/hero-main.png',
                'reviews' => 98,
                'colores' => [
                    ['nombre' => 'Rosa Chicle', 'hex' => '#FF5A76'],
                    ['nombre' => 'Naranja Atardecer', 'hex' => '#FF7B39'],
                    ['nombre' => 'Coral Dorado', 'hex' => '#FFAE8F']
                ],
                'tallas' => [
                    ['talla' => 'XS', 'stock' => 8],
                    ['talla' => 'S', 'stock' => 15],
                    ['talla' => 'M', 'stock' => 20],
                    ['talla' => 'L', 'stock' => 12],
                    ['talla' => 'XL', 'stock' => 6]
                ]
            ],
            [
                'nombre' => 'Bañador Asimétrico Sirena',
                'slug' => 'banador-sirena',
                'descripcion' => 'Traje de baño de una pieza con corte asimétrico y escote drapeado en tono rosa fucsia vibrante con destellos dorados.',
                'precio' => 95.00,
                'categoria_id' => $categorias['banadores']->id,
                'composicion' => '78% Poliéster reciclado regenerado a partir de plásticos del océano, 22% Lycra.',
                'cuidados' => 'Enjuagar después de usar. Lavar a mano. No usar secadora.',
                'es_nuevo' => true,
                'imagen' => '/images/hero/hero-outfit.png',
                'reviews' => 74,
                'colores' => [
                    ['nombre' => 'Fucsia Barbie', 'hex' => '#E23D5B'],
                    ['nombre' => 'Melocotón Pastel', 'hex' => '#FFEBE3']
                ],
                'tallas' => [
                    ['talla' => 'XS', 'stock' => 5],
                    ['talla' => 'S', 'stock' => 10],
                    ['talla' => 'M', 'stock' => 14],
                    ['talla' => 'L', 'stock' => 8]
                ]
            ],
            [
                'nombre' => 'Vestido Summers Degradado',
                'slug' => 'vestido-summers',
                'descripcion' => 'Vestido playero de lino fluido con tirantes trenzados y un espectacular tinte artesanal degradado de rosa a naranja, ideal para presenciar el atardecer en la playa.',
                'precio' => 110.00,
                'categoria_id' => $categorias['vestidos']->id,
                'composicion' => '100% Lino orgánico premium.',
                'cuidados' => 'Lavar a máquina en ciclo delicado. Planchar ligeramente húmedo.',
                'es_nuevo' => true,
                'imagen' => '/images/hero/hero-collection.png',
                'reviews' => 120,
                'colores' => [
                    ['nombre' => 'Atardecer Gradiente', 'hex' => '#FF9270'],
                    ['nombre' => 'Arena Cálida', 'hex' => '#FFF7F3']
                ],
                'tallas' => [
                    ['talla' => 'S', 'stock' => 12],
                    ['talla' => 'M', 'stock' => 18],
                    ['talla' => 'L', 'stock' => 10]
                ]
            ],
            [
                'nombre' => 'Pareo Traslúcido Sunset',
                'slug' => 'pareo-sunset',
                'descripcion' => 'Pareo de gasa de seda ligera con un estampado tie-dye de atardecer costero, diseñado para anudar de múltiples formas.',
                'precio' => 45.00,
                'categoria_id' => $categorias['vestidos']->id,
                'composicion' => '100% Gasa de seda ligera.',
                'cuidados' => 'Lavar a mano únicamente. Secar en plano.',
                'es_nuevo' => false,
                'imagen' => '/images/hero/hero-main.png',
                'reviews' => 48,
                'colores' => [
                    ['nombre' => 'Multicolor Atardecer', 'hex' => '#FF7B39'],
                    ['nombre' => 'Rosa Suave', 'hex' => '#FFF7F3']
                ],
                'tallas' => [
                    ['talla' => 'Única', 'stock' => 30]
                ]
            ],
            [
                'nombre' => 'Top Crochet Coral',
                'slug' => 'top-crochet',
                'descripcion' => 'Top tejido artesanalmente a mano con hilo de algodón orgánico rosa coral, perfecto para combinar sobre tu traje de baño preferido.',
                'precio' => 59.99,
                'categoria_id' => $categorias['tops']->id,
                'composicion' => '100% Algodón orgánico mercerizado.',
                'cuidados' => 'Lavar a mano. No retorcer. Secar en plano sobre una toalla.',
                'es_nuevo' => true,
                'imagen' => '/images/hero/hero-outfit.png',
                'reviews' => 62,
                'colores' => [
                    ['nombre' => 'Rosa Coral', 'hex' => '#FF5A76'],
                    ['nombre' => 'Naranja Mandarina', 'hex' => '#FF7B39']
                ],
                'tallas' => [
                    ['talla' => 'XS', 'stock' => 4],
                    ['talla' => 'S', 'stock' => 8],
                    ['talla' => 'M', 'stock' => 12],
                    ['talla' => 'L', 'stock' => 6]
                ]
            ],
            [
                'nombre' => 'Bolso Rafia Atardecer',
                'slug' => 'bolso-rafia-sunset',
                'descripcion' => 'Bolso de rafia natural tejida a mano con flecos tintados artesanalmente en colores rosa y naranja atardecer y asas de cuero flexible.',
                'precio' => 65.00,
                'categoria_id' => $categorias['accesorios']->id,
                'composicion' => '85% Rafia de Madagascar, 15% Cuero natural teñido de rosa.',
                'cuidados' => 'Evitar contacto directo con agua. Limpiar con un paño seco.',
                'es_nuevo' => true,
                'imagen' => '/images/hero/hero-collection.png',
                'reviews' => 50,
                'colores' => [
                    ['nombre' => 'Natural Sunset', 'hex' => '#FCD9C8']
                ],
                'tallas' => [
                    ['talla' => 'Única', 'stock' => 25]
                ]
            ]
        ];

        foreach ($prods as $p) {
            $colores = $p['colores'];
            $tallas = $p['tallas'];
            unset($p['colores']);
            unset($p['tallas']);

            $product = \App\Models\Producto::create($p);

            // Colores
            foreach ($colores as $col) {
                $product->colores()->create($col);
            }

            // Tallas
            foreach ($tallas as $tall) {
                $product->tallas()->create($tall);
            }

            // Imágenes adicionales (para la galería)
            $product->imagenes()->create(['url' => $product->imagen, 'orden' => 0]);
            $product->imagenes()->create(['url' => '/images/hero/hero-outfit.png', 'orden' => 1]);
            $product->imagenes()->create(['url' => '/images/hero/hero-collection.png', 'orden' => 2]);
        }

        // 4. Crear Favoritos para Merliah
        $bikini = \App\Models\Producto::where('slug', 'bikini-oceana')->first();
        $banador = \App\Models\Producto::where('slug', 'banador-sirena')->first();
        $vestido = \App\Models\Producto::where('slug', 'vestido-summers')->first();

        \App\Models\Favorito::create([
            'user_id' => $user->id,
            'producto_id' => $bikini->id
        ]);
        \App\Models\Favorito::create([
            'user_id' => $user->id,
            'producto_id' => $banador->id
        ]);
        \App\Models\Favorito::create([
            'user_id' => $user->id,
            'producto_id' => $vestido->id
        ]);

        // 5. Crear Outfits predefinidos de atardecer sirena
        $outfit1 = \App\Models\Outfit::create([
            'user_id' => $user->id,
            'nombre' => 'Atardecer en Malibú',
            'descripcion' => 'La combinación perfecta de tu Bikini Oceana y el Pareo Sunset para disfrutar de la puesta de sol en la costa.',
            'es_publico' => true
        ]);
        $outfit1->outfitProductos()->create([
            'producto_id' => $bikini->id,
            'tipo_prenda' => 'top'
        ]);
        $outfit1->outfitProductos()->create([
            'producto_id' => $vestido->id,
            'tipo_prenda' => 'bottom'
        ]);

        $outfit2 = \App\Models\Outfit::create([
            'user_id' => $user->id,
            'nombre' => 'Look Playa de Sirena',
            'descripcion' => 'Un look súper fresco que combina el Bañador Asimétrico Sirena con el Bolso Rafia Atardecer.',
            'es_publico' => true
        ]);
        $topCrochet = \App\Models\Producto::where('slug', 'top-crochet')->first();
        $bolso = \App\Models\Producto::where('slug', 'bolso-rafia-sunset')->first();

        $outfit2->outfitProductos()->create([
            'producto_id' => $topCrochet->id,
            'tipo_prenda' => 'top'
        ]);
        $outfit2->outfitProductos()->create([
            'producto_id' => $banador->id,
            'tipo_prenda' => 'bottom'
        ]);
        $outfit2->outfitProductos()->create([
            'producto_id' => $bolso->id,
            'tipo_prenda' => 'accesorio'
        ]);
    }
}
