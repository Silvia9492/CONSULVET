<?php

namespace App\Http\Controllers;

use App\Models\Centro;
use App\Models\Servicios;
use App\Models\Ofrecen;
use Illuminate\Http\Request;

class OfrecenController extends Controller
{

    public function show($codigo_centro)
    {
        $centro = Centros::where('codigo_centro', $codigo_centro)->firstOrFail();

        $servicios = $centro->servicios;

        return response()->json($servicios);
    }

    public function filtrarCentrosPorServicio(Request $request)
    {
        $request->validate([
            'servicio' => 'required|exists:servicios,codigo_servicio',
        ]);

        $centros = Ofrecen::where('codigo_servicio', $request->servicio)->get();

        $centrosFiltrados = $centros->pluck('codigo_centro')->unique();

        return response()->json(Centros::whereIn('codigo_centro', $centrosFiltrados)->get());
    }
}
