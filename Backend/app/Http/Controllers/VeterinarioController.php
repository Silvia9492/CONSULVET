<?php

namespace App\Http\Controllers;

use App\Models\Veterinarios;
use App\Models\Servicios;
use Illuminate\Http\Request;

class VeterinarioController extends Controller
{
    public function filtrarVeterinarios(Request $request)
    {
        $request->validate([
            'centro_id' => 'required|exists:centros,codigo_centro',
            'horario' => 'required|in:mañana,tarde',
            'servicio' => 'required|exists:servicios,codigo_servicio'
        ]);

        $veterinarios = Veterinarios::where('centro_id', $request->centro_id)
            ->where('horario', $request->horario)
            ->get();

        $veterinariosFiltrados = $veterinarios->filter(function ($veterinario) use ($request) {
            $servicio = Servicios::where('codigo_servicio', $request->servicio)
                ->where('centro_id', $veterinario->centro_id)
                ->exists();

            return $servicio;
        });

        return response()->json($veterinariosFiltrados);
    }
}
