@extends('layouts.master')
@section('content')
    <div class="row" style="margin-top:40px">
        <div class="offset-md-3 col-md-6">
            <div class="card">
                <div class="card-header text-center">
                    Modificar película
                </div>
                <div class="card-body" style="padding:30px">
                    <form method="POST">
                        @method('PUT')
                        @csrf
                        <div class="form-group">
                            <label for="title">Título</label>
                            <input type="text" name="title" id="title" class="form-control" value="{{ $peliculaEdit->title }}">
                        </div>

                        <div class="form-group">
                            <label for="anyo">Año</label>
                            <input type="text" name="anyo" id="anyo" class="form-control" value="{{ $peliculaEdit->year }}">
                        </div>

                        <div class="form-group">
                            <label for="dir">Director</label>
                            <input type="text" name="dir" id="dir" class="form-control" value="{{ $peliculaEdit->director }}">
                        </div>

                        <div class="form-group">
                            <label for="poster">Poster</label>
                            <input type="text" name="poster" id="poster" class="form-control"
                                value="{{ $peliculaEdit->poster }}">
                        </div>

                        <div class="form-group">
                            <label for="synopsis">Resumen</label>
                            <textarea name="synopsis" id="synopsis" class="form-control"
                                rows="3">{{ $peliculaEdit->synopsis }}</textarea>
                        </div>

                        <div class="form-group text-center">
                            <button type="submit" class="btn btn-primary" style="padding:8px 100px;margin-top:25px;">
                                Modificar película
                            </button>
                        </div>
                    </form>
                    {{-- TODO: Cerrar formulario --}}

                </div>
            </div>
        </div>
    </div>

@endsection