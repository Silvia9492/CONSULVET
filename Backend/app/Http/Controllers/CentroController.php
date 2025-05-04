<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Centros;

class CentroController extends Controller
{
    public function index()
    {
        $centros = DB::table('centros')->get();
        return response()->json($centros);
    }

    /*public function filtrarCentrosPorServicio($motivo){
        $centros = DB::table('centros')
            ->join('ofrecen', 'centros.codigo_centro', '=', 'ofrecen.id_centro')
            ->join('servicios', 'ofrecen.id_servicio', '=', 'servicios.codigo_servicio')
            ->where('servicios.tipo', $motivo)
            ->select('centros.*')
            ->distinct()
            ->get();

        return response()->json($centros);
    }*/

    public function getCentrosPorTipoServicio($tipo){
    $centros = Centros::whereHas('servicios', function ($query) use ($tipo) {
        $query->where('tipo', $tipo);
    })->get();

    return response()->json($centros);
    }
}
