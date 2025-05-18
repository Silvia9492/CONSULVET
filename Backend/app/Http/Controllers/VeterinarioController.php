<?php

namespace App\Http\Controllers;

use App\Models\Veterinarios;
use Illuminate\Http\Request;

class VeterinarioController extends Controller{

    public function filtrarVeterinarios(Request $request){
        $request->validate([
            'centroId' => 'required|exists:centros,codigo_centro',
            'horario' => 'required|in:mañana,tarde',
            'servicio' => 'required|string'
        ]);

    /*Obtenemos los veterinarios que trabajan en un centro concreto, que ofrecen un servicio concreto y que tienen un horario concreto
        - se va filtrando en el front en base a las selecciones del cuidador durante el proceso de solicitud de consulta*/
        $veterinarios = Veterinarios::where('centro_id', $request->centroId)
            ->where('horario', $request->horario)
            ->where('servicio', $request->servicio)
            ->get();

        return response()->json($veterinarios);
    }
}