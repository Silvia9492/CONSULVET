<?php

namespace App\Http\Controllers;

use App\Models\Atienden;
use Illuminate\Http\Request;
use App\Models\Animales;

class AtiendenController extends Controller
{
    public function mostrarHistorial($dni, $nombreAnimal)
    {
        {
    try {
        // Buscar el animal del cuidador por nombre y DNI
        $animal = Animales::where('nombre', $nombreAnimal)
                        ->where('cuidador_dni', $dni)
                        ->first();

        if (!$animal) {
            return response()->json(['error' => 'Animal no encontrado.'], 404);
        }

        // Obtener historial usando la relación
        $historial = $animal->historiales()->orderByDesc('fecha')->get();

        return response()->json($historial, 200);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Error al obtener el historial.',
            'message' => $e->getMessage()
        ], 500);
        }
    }   
    }
}