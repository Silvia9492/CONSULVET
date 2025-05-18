<?php

namespace App\Http\Controllers;

use App\Models\Animales;
use App\Models\Cuidadores;
use Illuminate\Http\Request;

class AnimalController extends Controller{

    public function store(Request $request){
        //Validación de campos
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

        //Verificamos si el dni existe en la base de datos
        $cuidador = Cuidadores::where('dni', $dniCuidador)->first();
            if (!$cuidador) {
                return response()->json(['message' => 'El dni no existe en la base de datos'], 400);
            }

        $data = $request->all();

        //Procesamos la foto del animal, si el cuidador adjunta una al registrarlo
        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/animales'), $filename);
            $data['foto'] = $filename;
        }

        $animal = Animales::create($data);

        return response()->json($animal, 201);
    }


    public function listarAnimales(Request $request){
        //Recuperamos el dni del cuidador desde la query para poder listar sus animales
        $dniCuidador = $request->query('cuidador_dni');

        //Validamos que vaya el dni en la query (en el front se va a recoger desde local storage)
        if (!$dniCuidador) {
            return response()->json(['message' => 'No se ha recibido el dni del cuidador'], 400);
        }

        //Buscamos los animales de ese cuidador
        $animales = Animales::where('cuidador_dni', $dniCuidador)->get();

        /*Si no tiene ninguno en ese momento, se muestra una lista vacía
            - útil, por ejemplo, si el usuario añade un único animal desde su perfil y decide eliminarlo; se vuelve a mostrar vacío su perfil y ya está*/
        if ($animales->isEmpty()) {
            return response()->json($animales, 200);
        }

        return response()->json($animales);
    }


    public function update(Request $request, $codigo_paciente){
        //Buscamos al animal por su código de paciente
        $animal = Animales::where('codigo_paciente', $codigo_paciente)->firstOrFail();

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

        //Verificamos si se ha adjuntado una nueva foto; en caso afirmativo, subimos la nueva foto y cambiamos la anterior por ésta
        if ($request->hasFile('foto')) {
            if ($animal->foto && file_exists(public_path('uploads/animales/' . $animal->foto))) {
                unlink(public_path('uploads/animales/' . $animal->foto));
            }

            $file = $request->file('foto');
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/animales'), $filename);
            $animal->foto = $filename;
        }

        $animal->save();

        //Devolvemos el animal actualizado
        return response()->json($animal);
    }
    

    public function destroy($codigo_paciente){
        $animal = Animales::where('codigo_paciente', $codigo_paciente)->firstOrFail();
        $animal->delete();
        return response()->json(['mensaje' => 'El animal se ha eliminado correctamente']);
    }
}