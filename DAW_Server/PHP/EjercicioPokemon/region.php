<?php
require_once 'config.php';
$regionName = $_GET['name'] ?? 'kanto';
$pokemons = getPokemonByRegion($regionName);
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pokémon - <?php echo ucfirst($regionName); ?></title>
    <link rel="stylesheet" type="text/css" href="examen.css">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .pokemon-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 20px;
            padding: 30px;
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .pokemon-card {
            background: white;
            border-radius: 15px;
            padding: 15px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
            position: relative;
            overflow: hidden;
            border: 3px solid transparent;
        }
        
        .pokemon-card:hover {
            transform: translateY(-5px) scale(1.03);
            box-shadow: 0 12px 24px rgba(0,0,0,0.3);
            border-color: gold;
        }
        
        .pokemon-image {
            width: 120px;
            height: 120px;
            margin: 0 auto 10px;
            background: radial-gradient(circle at 30% 30%, #fff 0%, #f0f0f0 100%);
            border-radius: 50%;
            padding: 10px;
            border: 4px solid #eee;
        }
        
        .pokemon-image img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        
        .pokemon-name {
            font-weight: bold;
            color: #333;
            font-size: 1.2em;
            margin: 5px 0;
            text-transform: capitalize;
        }
        
        .pokemon-id {
            color: #666;
            font-size: 0.9em;
            background: #f0f0f0;
            padding: 3px 10px;
            border-radius: 10px;
            display: inline-block;
            margin-bottom: 5px;
        }
        
        .pokemon-types {
            display: flex;
            justify-content: center;
            gap: 5px;
            margin-top: 8px;
        }
        
        .type-badge {
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 0.8em;
            font-weight: bold;
            color: white;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        }
        
        .back-btn {
            display: inline-block;
            margin: 20px 30px;
            padding: 12px 25px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.1em;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transition: all 0.3s;
        }
        
        .back-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.3);
        }
        
        .region-title {
            text-align: center;
            color: white;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
            font-size: 2em;
            margin: 10px 0 20px;
            padding: 10px;
            background: rgba(0,0,0,0.2);
            border-radius: 20px;
            max-width: 500px;
            margin: 20px auto;
        }
        
        .controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 30px;
            max-width: 1400px;
            margin: 0 auto;
        }
    </style>
</head>
<body>

<header>
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px;">
        <span>REGION: <?php echo strtoupper($regionName); ?></span>
        <img src="img/International_Pokémon_logo.svg.png" style="height: 50px;">
    </div>
</header>

<div></div>

<nav>
    <strong>
        <a href="index.php" style="color:orange; text-decoration:none; padding: 0 15px;">🏠 INICIO</a>
        <a href="search.php" style="color:orange; text-decoration:none; padding: 0 15px;">🔍 BÚSQUEDA</a>
    </strong>
</nav>

<div id="iniciales">
    <div class="controls">
        <a href="index.php" class="back-btn">← VOLVER A REGIONES</a>
        <h2 class="region-title"><?php echo strtoupper($regionName); ?> POKÉDEX</h2>
        <div style="width: 120px;"></div> <!-- Spacer -->
    </div>
    
    <div class="pokemon-container">
        <?php if (isset($pokemons['results'])): ?>
            <?php 
            $count = 0;
            foreach ($pokemons['results'] as $pokemon): 
                $pokemonId = basename($pokemon['url']);
                $types = ['normal']; // Por defecto
                
                // Intentar obtener tipos desde detalles
                if ($pokemonId) {
                    $details = fetchAPI(BASE_URL . 'pokemon/' . $pokemonId);
                    if (isset($details['types'])) {
                        $types = array_map(function($t) {
                            return $t['type']['name'];
                        }, $details['types']);
                    }
                }
                
                $mainType = $types[0];
                $typeColor = getTypeColor($mainType);
                $count++;
            ?>
                <div class="pokemon-card" 
                     onclick="window.location='pokemon.php?name=<?php echo $pokemon['name']; ?>'"
                     style="background: linear-gradient(135deg, <?php echo $typeColor; ?>40 0%, white 100%); border-color: <?php echo $typeColor; ?>;">
                    
                    <div class="pokemon-id">#<?php echo str_pad($pokemonId, 3, '0', STR_PAD_LEFT); ?></div>
                    
                    <div class="pokemon-image">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/<?php echo $pokemonId; ?>.png" 
                             onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/<?php echo $pokemonId; ?>.png'"
                             alt="<?php echo ucfirst($pokemon['name']); ?>">
                    </div>
                    
                    <div class="pokemon-name"><?php echo ucfirst($pokemon['name']); ?></div>
                    
                    <div class="pokemon-types">
                        <?php foreach ($types as $type): ?>
                            <span class="type-badge" style="background: <?php echo getTypeColor($type); ?>;">
                                <?php echo strtoupper(substr($type, 0, 3)); ?>
                            </span>
                        <?php endforeach; ?>
                    </div>
                </div>
                
                <?php if ($count >= 50) break; // Limitar a 50 pokémons ?>
            <?php endforeach; ?>
        <?php else: ?>
            <div style="grid-column: 1/-1; text-align:center; color:white; padding:40px;">
                <h3>No se encontraron Pokémons en esta región</h3>
            </div>
        <?php endif; ?>
    </div>
</div>

<footer> 
    Trabajo &nbsp;<strong> Desarrollo Web en Entorno Servidor </strong>&nbsp; 
    2023/2024 IES Serra Perenxisa.
</footer>

</body>
</html>