<?php

namespace App\Http\Controllers;

use App\Models\Animales;
use App\Models\Cuidadores;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class AnimalController extends Controller
{
    public function index($dni)
    {
        $animales = Animales::where('cuidador_dni', $dni)->get();
        return response()->json($animales);
    }

    public function store(Request $request)
{
    $request->validate([
        'nombre' => 'required',
        'fecha_nacimiento' => 'required|date',
        'especie' => 'required',
        'raza' => 'required',
        'color_capa' => 'required',
        'sexo' => 'required',
        'cuidador_dni' => 'required|exists:cuidadores,dni',
        'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:40960'
    ]);

    $dniCuidador = $request->input('cuidador_dni');

    // Aquí validamos si el dni_cuidador existe en la base de datos
    $cuidador = Cuidadores::where('dni', $dniCuidador)->first();
    if (!$cuidador) {
        return response()->json(['message' => 'DNI de cuidador no válido'], 400);
    }

    $data = $request->all();

    // Procesar imagen si viene
    if ($request->hasFile('foto')) {
        $file = $request->file('foto');
        $filename = uniqid() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('uploads/animales'), $filename);
        $data['foto'] = $filename;
    }

        $animal = Animales::create($data);

        return response()->json($animal, 201);
}

public function listarAnimales(Request $request)
{
    // Recuperamos el dni del cuidador desde la query string
    $dniCuidador = $request->query('cuidador_dni');  // Cambiado de input() a query()

    // Validar que el dni_cuidador está presente
    if (!$dniCuidador) {
        return response()->json(['message' => 'DNI del cuidador no proporcionado'], 400);
    }

    // Buscar los animales cuyo dni_cuidador coincida con el dni dado
    $animales = Animales::where('cuidador_dni', $dniCuidador)->get();

    if ($animales->isEmpty()) {
        return response()->json(['message' => 'No se encontraron animales para este cuidador'], 404);
    }

    return response()->json($animales);
}



    public function update(Request $request, $codigo_paciente)
{
    // Buscar el animal con el código paciente proporcionado
    $animal = Animales::where('codigo_paciente', $codigo_paciente)->firstOrFail();

      \Log::info('Datos recibidos en la actualización:', $request->all());

      if ($request->has('nombre')) {
            $animal->nombre = $request->input('nombre');
        }
        
        if ($request->has('fecha_nacimiento')) {
            $animal->fecha_nacimiento = $request->input('fecha_nacimiento');
        }
        
        if ($request->has('especie')) {
            $animal->especie = $request->input('especie');
        }
        
        if ($request->has('raza')) {
            $animal->raza = $request->input('raza');
        }
        
        if ($request->has('color_capa')) {
            $animal->color_capa = $request->input('color_capa');
        }
        
        if ($request->has('sexo')) {
            $animal->sexo = $request->input('sexo');
        }

    // Verificar si la foto fue subida
    if ($request->hasFile('foto')) {
        // Eliminar la foto anterior si existe
        Log::info('Foto recibida:', ['filename' => $request->file('foto')->getClientOriginalName()]);
        if ($animal->foto && file_exists(public_path('uploads/animales/' . $animal->foto))) {
            unlink(public_path('uploads/animales/' . $animal->foto));
        }

        // Subir la nueva foto
        $file = $request->file('foto');
        $filename = uniqid() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('uploads/animales'), $filename);

        // Actualizar el nombre de la foto en la base de datos
        $animal->foto = $filename;
    }

        // Guardar los cambios
        $animal->save();

    // Retornar la respuesta con el animal actualizado
    return response()->json($animal);
}


    public function destroy($codigo_paciente)
    {
        $animal = Animales::where('codigo_paciente', $codigo_paciente)->firstOrFail();
        $animal->delete();
        return response()->json(['mensaje' => 'El animal se ha eliminado correctamente']);
    }
}
