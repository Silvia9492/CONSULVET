<?php

namespace App\Http\Controllers;

use App\Models\Veterinarios;
use App\Models\Servicios;
use Illuminate\Http\Request;

class VeterinarioController extends Controller
{
    public function filtrarVeterinarios(Request $request){
    $request->validate([
        'centroId' => 'required|exists:centros,codigo_centro',
        'horario' => 'required|in:mañana,tarde',
        'servicio' => 'required|string'
    ]);

    // Obtener veterinarios que trabajan en ese centro y tienen ese horario
    $veterinarios = Veterinarios::where('centro_id', $request->centroId)
        ->where('horario', $request->horario)
        ->where('servicio', $request->servicio) // este campo debe coincidir con el tipo
        ->get();

    return response()->json($veterinarios);
    }
}
