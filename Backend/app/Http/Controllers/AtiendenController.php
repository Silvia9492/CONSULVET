<?php

namespace App\Http\Controllers;

use App\Models\Atienden;
use Illuminate\Http\Request;
use App\Models\Animales;


class AtiendenController extends Controller
{
    public function buscarPorNombre(Request $request)
    {
        $nombre = $request->query('nombre');
        $cuidadorDni = $request->query('cuidador_dni');  // Filtro por dni del cuidador

        // Validación: si no se pasa el nombre del animal
        if (!$nombre) {
            return response()->json(['error' => 'Debe proporcionar el nombre del animal'], 400);
        }

        // Busca los animales que coincidan con el nombre proporcionado y el dni del cuidador
        $animales = Animales::where('nombre', 'like', '%' . $nombre . '%')
                          ->where('cuidador_dni', $cuidadorDni) // Filtra por dni del cuidador
                          ->get();

        // Si no se encuentra el animal, se retorna un mensaje de error
        if ($animales->isEmpty()) {
            return response()->json(['error' => 'No se encontró ningún animal con ese nombre o cuidador'], 404);
        }

        // Obtén los historiales de los animales filtrados
        $historiales = Atienden::whereIn('id_paciente', $animales->pluck('id'))
                               ->orderBy('fecha', 'desc')
                               ->get();

        // Retorna los historiales encontrados
        return response()->json($historiales);
    }
}

