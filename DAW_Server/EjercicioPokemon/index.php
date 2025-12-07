<?php
require_once 'config.php';
$regions = getRegions();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pokédex - Regiones</title>
    <link rel="stylesheet" type="text/css" href="examen.css">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .region-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            padding: 30px;
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .region-card {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border-radius: 20px;
            padding: 25px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            position: relative;
            overflow: hidden;
            color: white;
            min-height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .region-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }
        
        .region-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
            transform: translateX(-100%);
            transition: transform 0.6s;
        }
        
        .region-card:hover::before {
            transform: translateX(100%);
        }
        
        .region-card h3 {
            margin: 0;
            font-size: 1.8em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            z-index: 1;
            text-transform: uppercase;
        }
        
        .region-card p {
            margin: 10px 0 0;
            font-size: 0.9em;
            opacity: 0.9;
            z-index: 1;
        }
        
        .page-title {
            text-align: center;
            color: white;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
            font-size: 2.5em;
            margin: 20px 0;
            padding: 10px;
        }
        
        .logo-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
        }
    </style>
</head>
<body>

<header>
    <div class="logo-header">
        <img src="img/International_Pokémon_logo.svg.png" style="height: 50px;">
        <span>MI POKÉDEX INTERACTIVA</span>
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
    <h1 class="page-title">⚡ SELECCIONA UNA REGIÓN ⚡</h1>
    
    <div class="region-container">
        <?php if (isset($regions['results'])): ?>
            <?php foreach ($regions['results'] as $region): ?>
                <div class="region-card" onclick="window.location='region.php?name=<?php echo $region['name']; ?>'">
                    <h3><?php echo strtoupper($region['name']); ?></h3>
                    <p>Explorar Pokémons →</p>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <div style="grid-column: 1/-1; text-align:center; color:white; padding:40px;">
                <h3>Error cargando regiones</h3>
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