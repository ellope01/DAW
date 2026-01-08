<?php
require_once 'config.php';

/* ✅ FUNCIÓN CORRECTAMENTE COLOCADA */
function darkenColor($color, $percent) {
    $color = str_replace('#', '', $color);
    if (strlen($color) === 3) {
        $color = $color[0].$color[0].$color[1].$color[1].$color[2].$color[2];
    }

    $r = hexdec(substr($color, 0, 2));
    $g = hexdec(substr($color, 2, 2));
    $b = hexdec(substr($color, 4, 2));

    $r = max(0, min(255, $r - ($r * $percent / 100)));
    $g = max(0, min(255, $g - ($g * $percent / 100)));
    $b = max(0, min(255, $b - ($b * $percent / 100)));

    return sprintf('#%02x%02x%02x', $r, $g, $b);
}

$pokemonName = $_GET['name'] ?? 'pikachu';
$pokemon = getPokemonDetails($pokemonName);

if (!isset($pokemon['name'])) {
    $pokemon = getPokemonDetails('pikachu');
}

$speciesData = fetchAPI(BASE_URL . 'pokemon-species/' . $pokemon['id']);
$evolutionData = fetchAPI($speciesData['evolution_chain']['url'] ?? '');

$typesInfo = [];
foreach ($pokemon['types'] as $type) {
    $typeName = $type['type']['name'];
    $typesInfo[] = [
        'name' => $typeName,
        'color' => getTypeColor($typeName)
    ];
}

$mainColor = $typesInfo[0]['color'] ?? '#A8A878';
$secondaryColor = darkenColor($mainColor, 20);

// Descripción
$description = '';
foreach ($speciesData['flavor_text_entries'] ?? [] as $entry) {
    if ($entry['language']['name'] === 'es') {
        $description = str_replace(["\n", "\f"], ' ', $entry['flavor_text']);
        break;
    }
}

// Stats
$stats = [];
foreach ($pokemon['stats'] as $stat) {
    $stats[] = [
        'name' => str_replace('-', ' ', $stat['stat']['name']),
        'value' => $stat['base_stat'],
        'percent' => min(100, ($stat['base_stat'] / 150) * 100)
    ];
}

// Habilidades
$abilities = [];
foreach ($pokemon['abilities'] as $ability) {
    $abilities[] = [
        'name' => str_replace('-', ' ', $ability['ability']['name']),
        'hidden' => $ability['is_hidden']
    ];
}

$moves = array_slice($pokemon['moves'], 0, 12);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title><?= ucfirst($pokemon['name']) ?> - Pokédex</title>
    <link rel="stylesheet" href="examen.css">

    <style>
        :root {
            --main-color: <?= $mainColor ?>;
            --secondary-color: <?= $secondaryColor ?>;
        }

        body {
            background: linear-gradient(135deg, var(--main-color), var(--secondary-color));
            margin: 0;
        }

        .pokemon-container {
            max-width: 1200px;
            margin: 40px auto;
            background: white;
            padding: 30px;
            border-radius: 20px;
        }

        .pokemon-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .pokemon-grid {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 30px;
        }

        .pokemon-img img {
            width: 100%;
        }

        .detail-card {
            background: #f8f8f8;
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 20px;
        }

        .stat-bar {
            height: 18px;
            background: #ddd;
            border-radius: 10px;
            overflow: hidden;
        }

        .stat-fill {
            height: 100%;
            background: var(--main-color);
            width: 0;
            transition: 1s;
        }

        .navigation {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
        }

        .nav-btn {
            background: var(--main-color);
            color: white;
            padding: 12px 25px;
            border-radius: 25px;
            text-decoration: none;
        }
    </style>
</head>

<body>

<header style="background: var(--main-color);">
    <h1>POKÉDEX - <?= strtoupper($pokemon['name']) ?></h1>
</header>

<nav style="background: var(--secondary-color); padding: 10px; text-align: center;">
    <a href="index.php">Inicio</a> |
    <a href="search.php">Buscar</a> |
    <a href="javascript:history.back()">Volver</a>
</nav>

<div class="pokemon-container">

    <div class="pokemon-header">
        <h2><?= ucfirst($pokemon['name']) ?> #<?= str_pad($pokemon['id'], 3, '0', STR_PAD_LEFT) ?></h2>
    </div>

    <div class="pokemon-grid">

        <div>
            <div class="pokemon-img">
                <img src="<?= $pokemon['sprites']['other']['official-artwork']['front_default'] ?>">
            </div>

            <p><b>Altura:</b> <?= $pokemon['height']/10 ?> m</p>
            <p><b>Peso:</b> <?= $pokemon['weight']/10 ?> kg</p>
            <p><?= $description ?></p>
        </div>

        <div>
            <div class="detail-card">
                <h3>Estadísticas</h3>
                <?php foreach ($stats as $stat): ?>
                    <p><?= $stat['name'] ?>: <?= $stat['value'] ?></p>
                    <div class="stat-bar">
                        <div class="stat-fill" data-width="<?= $stat['percent'] ?>%"></div>
                    </div>
                <?php endforeach; ?>
            </div>

            <div class="detail-card">
                <h3>Habilidades</h3>
                <?php foreach ($abilities as $ability): ?>
                    <span><?= ucfirst($ability['name']) ?> <?= $ability['hidden'] ? '✨' : '' ?></span>
                <?php endforeach; ?>
            </div>

            <div class="detail-card">
                <h3>Movimientos</h3>
                <?php foreach ($moves as $move): ?>
                    <span><?= ucfirst(str_replace('-', ' ', $move['move']['name'])) ?></span>
                <?php endforeach; ?>
            </div>
        </div>

    </div>

    <div class="navigation">
        <a class="nav-btn" href="pokemon.php?name=<?= $pokemon['id'] - 1 ?>">Anterior</a>
        <a class="nav-btn" href="region.php?name=kanto">Todos</a>
        <a class="nav-btn" href="pokemon.php?name=<?= $pokemon['id'] + 1 ?>">Siguiente</a>
    </div>

</div>

<footer style="background: var(--main-color); text-align:center; padding:20px; color:white;">
    Desarrollo Web en Entorno Servidor - IES Serra Perenxisa
</footer>

<script>
document.querySelectorAll('.stat-fill').forEach(bar => {
    bar.style.width = bar.dataset.width;
});
</script>

</body>
</html>
