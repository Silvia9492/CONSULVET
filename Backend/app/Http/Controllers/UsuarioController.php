<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;
use Illuminate\Support\Facades\Cookie;

class UsuarioController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'nombre_usuario' => 'required|string',
            'contraseña' => 'required|string',
        ]);


        $usuario = Usuarios::where('nombre_usuario', $credentials['nombre_usuario'])->first();

        if ($usuario && $usuario->contraseña === $credentials['contraseña']) {
            
            $minutes = 60;
            Cookie::queue('user_session', $usuario->nombre_usuario, $minutes);

            return response()->json([
                'message' => 'Inicio de sesión correcto',
                'nombre_usuario' => $usuario->nombre_usuario
            ]);
        } else {
            return response()->json([
                'message' => 'Nombre de usuario o contraseña incorrectos',
            ], 401);
        }
    }

    public function checkSession(Request $request)
    {
        $nombre_usuario = $request->cookie('user_session');

        if ($nombre_usuario) {
            $usuario = Usuarios::where('nombre_usuario', $nombre_usuario)->first();
            
            if ($usuario) {
                return response()->json([
                    'message' => 'Sesión encontrada',
                    'usuario' => $usuario
                ]);
            }
        }

        return response()->json([
            'message' => 'No hay sesión activa'
        ], 401);
    }

    public function logout(Request $request)
    {
        Cookie::forget('user_session');

        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ]);
    }

    public function getAnimalesByUsername($username){
        $usuario = Usuarios::where('nombre_usuario', $username)->first();

        // Verificar si el usuario existe
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
    
        // Acceder al modelo relacionado 'cuidador' usando la relación definida en el modelo 'Usuario'
        $cuidador = $usuario->cuidadorRelacion;
    
        // Verificar si el cuidador existe
        if (!$cuidador) {
            return response()->json(['error' => 'Cuidador no encontrado'], 404);
        }
    
        // Obtener los animales del cuidador
        $animales = $cuidador->animales;
    
        // Devolver los animales en formato JSON
        return response()->json($animales);
    }
}



