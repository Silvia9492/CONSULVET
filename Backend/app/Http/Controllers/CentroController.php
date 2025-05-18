<?php

namespace App\Http\Controllers;

use App\Models\Centros;

class CentroController extends Controller{

    public function getCentrosPorTipoServicio($tipo){
        $centros = Centros::whereHas('servicios', function ($query) use ($tipo) {
            $query->where('tipo', $tipo);
        })->get();

        return response()->json($centros);
    }
}