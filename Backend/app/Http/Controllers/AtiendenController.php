<?php

namespace App\Http\Controllers;

use App\Models\Animales;

class AtiendenController extends Controller{

    public function mostrarHistorial($dni, $nombreAnimal){
        try {
            //Buscamos al animal por su nombre y utilizando el dni que está almacenado en local storage y se recoge de ahí
            $animal = Animales::where('nombre', $nombreAnimal)
                            ->where('cuidador_dni', $dni)
                            ->first();

            if (!$animal) {
                return response()->json(['error' => 'No se ha encontrado ningún animal'], 404);
            }

            //Relación animal-historial definida en el modelo Animales
            $historial = $animal->historiales()->orderByDesc('fecha')->get();

            return response()->json($historial, 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Se ha producido un error tratando de obtener el historial',
                'message' => $e->getMessage()
            ], 500);
        } 
    }
}