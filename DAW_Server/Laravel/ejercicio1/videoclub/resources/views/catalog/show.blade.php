@extends('layouts.master')
@section('content')
    <div class="row" style="border:4px solid yellow;width:80%;margin:0 auto">
        <div class="col-sm-4">
            {{-- TODO: Imagen de la película --}}
            <img src="{{ $pelicula->poster }}" style="margin-top:3%;max-height:400px" />
        </div>
        <div class="col-sm-8" style="margin-top:5%;padding-left:5%">
            {{-- TODO: Datos de la película --}}
            <h1>{{ $pelicula->title }}</h1>
            <p style="font-size:1.3rem;margin-top:-1%">Año: {{ $pelicula->year }}</p>
            <p style="font-size:1.3rem; margin-top:-2%">Director: {{ $pelicula->director }}</p>
            <p><strong>Resumen:</strong>{{ $pelicula->synopsis }}</p>
            @if($pelicula->rented)
                <p style="margin-top:6%;margin-bottom:6%"><strong>Estado:</strong> Pelicula actualmente alquilada</p>
                <button type="button" class="btn btn-danger" style="border: 1px solid red">Devolver pelicula</button>
                <a href="{{ url('/catalog/edit/' . $pelicula->id) }} ">
                    <button type="button" class="btn btn-warning" style="border: 1px solid yellow; color:white">Editar
                        pelicula</button>
                </a>
                <button type="button" class="btn" style="background-color:white;border:1px solid black"> <strong>
                        << /strong> Volver al inicio</button>
            @else
                <div style="margin-bottom:5%">
                    <p style="margin-top:6%;margin-bottom:6%"><strong>Estado</strong> Alquila la pelicula</p>
                    <button type="button" class="btn btn-primary" style="border: 1px solid blue">Alquilar la pelicula</button>
                    <a href="{{ url('/catalog/edit/' . $pelicula->id) }} ">
                        <button type="button" class="btn btn-warning" style="border: 1px solid yellow; color:white">Editar
                            pelicula</button>
                    </a>
                    <button type="button" class="btn" style="background-color:white;border:1px solid black"><strong>
                            </strong> Volver al inicio</button>
                </div>
            @endif
        </div>
    </div>
@endsection