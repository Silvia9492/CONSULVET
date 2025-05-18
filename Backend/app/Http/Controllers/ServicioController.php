<?php

namespace App\Http\Controllers;

use App\Models\Servicios;

class ServicioController extends Controller{

    public function index(){
        $servicios = Servicios::all();
        return response()->json($servicios);
    }
}