<?php

namespace App\Http\Controllers;

use App\Models\Cuidadores;
use Illuminate\Http\Request;

class CuidadorController extends Controller
{

    public function show($dni){
        $cuidador = Cuidadores::find($dni);

        if (!$cuidador) {
            return response()->json(['message' => 'Cuidador no encontrado'], 404);
        }

        return response()->json($cuidador);
    }

    public function update(Request $request, $dni){
        $cuidador = Cuidadores::find($dni);

        if (!$cuidador) {
            return response()->json(['message' => 'Cuidador no encontrado'], 404);
        }

        $cuidador->update($request->all());

        return response()->json(['message' => 'Perfil actualizado correctamente', 'cuidador' => $cuidador]);
    }

    public function destroy($dni){
        $cuidador = Cuidadores::find($dni);

        if (!$cuidador) {
            return response()->json(['message' => 'Cuidador no encontrado'], 404);
        }

        $cuidador->delete();

        return response()->json(['message' => 'Cuenta eliminada correctamente']);
    }

    public function actualizarFoto(Request $request, $dni)
{
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

