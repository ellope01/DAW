<?php
require_once 'config.php';
$results = [];
$searchType = $_GET['type'] ?? 'name';
$query = trim($_GET['query'] ?? '');
if (!empty($query)) {
    $results = searchPokemonAPI($query, $searchType);
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Búsqueda Pokémon</title>
    <link rel="stylesheet" type="text/css" href="examen.css">
    <style>
        /* OVERRIDE TOTAL del examen.css */
        #iniciales {
            background-image: none !important;
            height: auto !important;
            width: 100% !important;
            float: none !important;
            padding: 20px !important;
            min-height: 500px;
            display: block !important;
            clear: both !important;
        }
        
        body {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%) !important;
        }
        
        .search-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .search-title {
            text-align: center;
            color: #2a5298;
            font-size: 2em;
            margin: 20px 0;
        }
        
        .search-form {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin: 30px 0;
        }
        
        .search-input {
            padding: 10px;
            border: 2px solid #2a5298;
            border-radius: 10px;
            width: 300px;
        }
        
        .search-button {
            padding: 10px 20px;
            background: orange;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
        }
        
        .results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        
        .pokemon-card {
            background: white;
            border-radius: 10px;
            padding: 15px;
            text-align: center;
            box-shadow: 0 5px 10px rgba(0,0,0,0.1);
            border: 3px solid;
        }
        
        .pokemon-card img {
            width: 100px;
            height: 100px;
        }
    </style>
</head>
<body>

<header>
    <div style="display: flex; align-items: center; justify-content: center; gap: 20px;">
        <img src="img/International_Pokémon_logo.svg.png" style="height: 50px;">
        <span>BÚSQUEDA POKÉMON</span>
        <img src="img/International_Pokémon_logo.svg.png" style="height: 50px;">
    </div>
</header>

<div></div>

<nav>
    <strong>
        <a href="index.php" style="color:orange; text-decoration:none;">🏠 INICIO</a> &nbsp;&nbsp;
        <a href="search.php" style="color:orange; text-decoration:none;">🔍 BÚSQUEDA</a>
    </strong>
</nav>

<div id="iniciales" style="background: none !important; height: auto !important;">
    <div class="search-container">
        <h1 class="search-title">🔍 BUSCAR POKÉMON</h1>
        
        <form method="GET" class="search-form">
            <select name="type">
                <option value="name" <?= $searchType == 'name' ? 'selected' : '' ?>>Por Nombre</option>
                <option value="type" <?= $searchType == 'type' ? 'selected' : '' ?>>Por Tipo</option>
            </select>
            
            <input type="text" name="query" value="<?= htmlspecialchars($query) ?>" 
                   class="search-input" placeholder="Escribe aquí..." required>
            
            <button type="submit" class="search-button">BUSCAR</button>
        </form>
        
        <?php if (!empty($query)): ?>
            <h2>Resultados para "<?= htmlspecialchars($query) ?>"</h2>
            
            <?php if (!empty($results)): ?>
                <div class="results-grid">
                    <?php foreach ($results as $pokemon): 
                        $mainType = $pokemon['types'][0]['type']['name'] ?? 'normal';
                        $color = getTypeColor($mainType);
                    ?>
                        <div class="pokemon-card" 
                             onclick="window.location='pokemon.php?name=<?= $pokemon['name'] ?>'"
                             style="border-color: <?= $color ?>;">
                            <img src="<?= $pokemon['sprites']['front_default'] ?? 'https://via.placeholder.com/100' ?>" 
                                 alt="<?= $pokemon['name'] ?>">
                            <h3><?= ucfirst($pokemon['name']) ?></h3>
                            <p>#<?= str_pad($pokemon['id'], 3, '0', STR_PAD_LEFT) ?></p>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php else: ?>
                <p>No se encontraron resultados.</p>
            <?php endif; ?>
        <?php endif; ?>
    </div>
</div>

<footer>
    Trabajo <strong>Desarrollo Web en Entorno Servidor</strong> 2023/2024
</footer>

</body>
</html>