<?php

namespace App\Http\Controllers;

use App\Models\Cuidadores;
use Illuminate\Http\Request;

class CuidadorController extends Controller{

    public function show($dni){
        $cuidador = Cuidadores::find($dni);

        if (!$cuidador) {
            return response()->json(['message' => 'No se ha podido encontrar el cuidador'], 404);
        }

        return response()->json($cuidador);
    }


    public function update(Request $request, $dni){
        $cuidador = Cuidadores::find($dni);

        if (!$cuidador) {
            return response()->json(['message' => 'No se ha podido encontrar al cuidador'], 404);
        }

        //Validación de campos editables; el dni no se puede editar
        $request->validate([
            'nombre_completo' => 'nullable|string|max:255',
            'fecha_nacimiento' => 'nullable|date',
            'direccion' => 'nullable|string|max:255',
            'telefono' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255'
        ]);

        //Actualizamos los datos del cuidador
        $cuidador->update($request->only([
            'nombre_completo',
            'fecha_nacimiento',
            'direccion',
            'telefono',
            'email'
        ]));

        return response()->json([
            'message' => 'Tus datos se han actualizado correctamente',
            'cuidador' => $cuidador
        ]);
    }
    

    public function actualizarFoto(Request $request, $dni){
        $request->validate([
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $cuidador = Cuidadores::findOrFail($dni);

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/perfiles'), $filename);

            $cuidador->foto_perfil = $filename;
            $cuidador->save();

            return response()->json(['success' => true, 'foto' => $filename]);
        }

        return response()->json(['success' => false], 400);
    }
}