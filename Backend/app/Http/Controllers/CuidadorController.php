<?php

namespace App\Http\Controllers;

use App\Models\Cuidadores;
use Illuminate\Http\Request;

class CuidadorController extends Controller
{

    public function show($dni){
        $cuidador = Cuidador::find($dni);

        if (!$cuidador) {
            return response()->json(['message' => 'Cuidador no encontrado'], 404);
        }

        return response()->json($cuidador);
    }

    public function update(Request $request, $dni){
        $cuidador = Cuidador::find($dni);

        if (!$cuidador) {
            return response()->json(['message' => 'Cuidador no encontrado'], 404);
        }

        $cuidador->update($request->all());

        return response()->json(['message' => 'Perfil actualizado correctamente', 'cuidador' => $cuidador]);
    }

    public function destroy($dni){
        $cuidador = Cuidador::find($dni);

        if (!$cuidador) {
            return response()->json(['message' => 'Cuidador no encontrado'], 404);
        }

        $cuidador->delete();

        return response()->json(['message' => 'Cuenta eliminada correctamente']);
    }
}

