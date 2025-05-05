<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cuidadores;
use App\Models\Usuarios;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class RegisterController extends Controller
{
    public function register(Request $request)  {
    $validated = $request->validate([
        'dni' => 'required|string|max:9|unique:cuidadores,dni',
        'nombre_completo' => 'required|string|max:255',
        'fecha_nacimiento' => 'required|date',
        'direccion' => 'required|string',
        'telefono' => 'required|string',
        'email' => 'required|email|unique:cuidadores,email',
        'username' => 'required|string|unique:usuarios,nombre_usuario',
        'password' => 'required|min:8',
    ]);

    DB::beginTransaction();

    try {
        // 1. Crear cuidador
        Cuidadores::create([
            'dni' => $validated['dni'],
            'nombre_completo' => $validated['nombre_completo'],
            'fecha_nacimiento' => $validated['fecha_nacimiento'],
            'direccion' => $validated['direccion'],
            'telefono' => $validated['telefono'],
            'email' => $validated['email'],
        ]);

        // 2. Crear usuario
        Usuarios::create([
            'nombre_usuario' => $validated['username'],
            'contraseña' => $validated['password'],
            'tipo' => 'cuidador',
            'fecha_alta' => now(),
            'fecha_cambio_contraseña' => now(),
            'cuidador' => $validated['dni'], // FK
        ]);

        DB::commit();

        return response()->json(['message' => 'Registro exitoso'], 201);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['error' => 'Error al registrar: ' . $e->getMessage()], 500);
    }
}
}
