<?php
// config.php - Configuración principal
define('BASE_URL', 'https://pokeapi.co/api/v2/');
session_start();

// Colores para cada tipo de Pokémon
function getTypeColor($type) {
    $colors = [
        'normal' => '#A8A878',
        'fire' => '#F08030',
        'water' => '#6890F0',
        'electric' => '#F8D030',
        'grass' => '#78C850',
        'ice' => '#98D8D8',
        'fighting' => '#C03028',
        'poison' => '#A040A0',
        'ground' => '#E0C068',
        'flying' => '#A890F0',
        'psychic' => '#F85888',
        'bug' => '#A8B820',
        'rock' => '#B8A038',
        'ghost' => '#705898',
        'dark' => '#705848',
        'dragon' => '#7038F8',
        'steel' => '#B8B8D0',
        'fairy' => '#EE99AC'
    ];
    return $colors[strtolower($type)] ?? '#68A090';
}

// Obtener datos de la API
function fetchAPI($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    curl_close($ch);
    
    if ($response === FALSE) {
        return ['results' => []];
    }
    
    $data = json_decode($response, true);
    return $data ?: ['results' => []];
}

// Obtener regiones
function getRegions() {
    return fetchAPI(BASE_URL . 'region');
}

// Obtener Pokémon por región (simplificado)
function getPokemonByRegion($regionName) {
    // Mapeo simplificado de regiones a IDs
    $regionMap = [
        'kanto' => '?limit=151',
        'johto' => '?offset=151&limit=100',
        'hoenn' => '?offset=251&limit=135',
        'sinnoh' => '?offset=386&limit=107',
        'unova' => '?offset=493&limit=156',
        'kalos' => '?offset=649&limit=72',
        'alola' => '?offset=721&limit=88',
        'galar' => '?offset=809&limit=89',
        'paldea' => '?offset=898&limit=120'
    ];
    
    $limit = $regionMap[strtolower($regionName)] ?? '?limit=20';
    return fetchAPI(BASE_URL . 'pokemon' . $limit);
}

// Obtener detalles del Pokémon
function getPokemonDetails($name) {
    return fetchAPI(BASE_URL . 'pokemon/' . strtolower($name));
}

// Buscar Pokémon
function searchPokemon($query, $type = 'name') {
    if (empty($query)) return [];
    
    if ($type == 'name') {
        $data = fetchAPI(BASE_URL . 'pokemon/' . strtolower($query));
        return isset($data['name']) ? [$data] : [];
    } 
    elseif ($type == 'type') {
        $data = fetchAPI(BASE_URL . 'type/' . strtolower($query));
        if (isset($data['pokemon'])) {
            $results = [];
            foreach (array_slice($data['pokemon'], 0, 30) as $p) {
                $pokemonData = fetchAPI($p['pokemon']['url']);
                if (isset($pokemonData['name'])) {
                    $results[] = $pokemonData;
                }
            }
            return $results;
        }
    }
    
    return [];
}
// Agrega esto a config.php después de las otras funciones
function searchPokemonAPI($query, $type = 'name') {
    if (empty($query)) return [];
    
    if ($type === 'name') {
        // Buscar por nombre exacto
        $data = fetchAPI(BASE_URL . 'pokemon/' . strtolower($query));
        if (isset($data['id'])) {
            return [$data];
        }
        
        // Si no encuentra, intentar búsqueda aproximada
        $allPokemon = fetchAPI(BASE_URL . 'pokemon?limit=1000');
        if (isset($allPokemon['results'])) {
            $results = [];
            foreach ($allPokemon['results'] as $pokemon) {
                if (stripos($pokemon['name'], strtolower($query)) !== false) {
                    $pokemonData = fetchAPI($pokemon['url']);
                    if (isset($pokemonData['id'])) {
                        $results[] = $pokemonData;
                    }
                }
            }
            return array_slice($results, 0, 20);
        }
        return [];
    } 
    
    if ($type === 'type') {
        // Buscar por tipo
        $data = fetchAPI(BASE_URL . 'type/' . strtolower($query));
        if (isset($data['pokemon'])) {
            $results = [];
            foreach (array_slice($data['pokemon'], 0, 20) as $pokemon) {
                $pokemonData = fetchAPI($pokemon['pokemon']['url']);
                if (isset($pokemonData['id'])) {
                    $results[] = $pokemonData;
                }
            }
            return $results;
        }
        return [];
    }
    
    return [];
}
?>