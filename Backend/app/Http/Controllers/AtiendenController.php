<?php

namespace App\Http\Controllers;

use App\Models\Atienden;
use Illuminate\Http\Request;

class AtiendenController extends Controller
{
    public function consultarHistorial($codigo_paciente)
    {
        $historial = Atienden::where('id_paciente', $codigo_paciente)->get();
        return response()->json($historial);
    }
}

