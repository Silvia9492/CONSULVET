<?php

namespace App\Http\Controllers;

use App\Models\Animales;
use Illuminate\Http\Request;

class AnimalController extends Controller
{
    public function index($dni)
    {
        $animales = Animal::where('dni_cuidador', $dni)->get();
        return response()->json($animales);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'especie' => 'required',
            'raza' => 'required',
            'fecha_nacimiento' => 'required|date',
            'dni_cuidador' => 'required|exists:cuidadores,dni'
        ]);

        $animal = Animal::create($request->all());
        return response()->json($animal, 201);
    }

    public function show($codigo_paciente)
    {
        $animal = Animal::where('codigo_paciente', $codigo_paciente)->firstOrFail();
        return response()->json($animal);
    }

    public function update(Request $request, $codigo_paciente)
    {
        $animal = Animal::where('codigo_paciente', $codigo_paciente)->firstOrFail();
        $animal->update($request->all());
        return response()->json($animal);
    }

    public function destroy($codigo_paciente)
    {
        $animal = Animal::where('codigo_paciente', $codigo_paciente)->firstOrFail();
        $animal->delete();
        return response()->json(['mensaje' => 'El animal se ha eliminado correctamente']);
    }
}
