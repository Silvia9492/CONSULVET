<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;
use App\Models\Cuidadores;
use Illuminate\Support\Facades\Cookie;

class UsuarioController extends Controller{

    public function login(Request $request){
        //Validación de credenciales del usuario
        $credentials = $request->validate([
            'nombre_usuario' => 'required|string',
            'contraseña' => 'required|string',
        ]);
    
        $usuario = Usuarios::where('nombre_usuario', $credentials['nombre_usuario'])->first();
    
        if ($usuario && $usuario->contraseña === $credentials['contraseña']) {
    
            //Establecemos una cookie que dura 60 minutos
            $minutes = 60;
            Cookie::queue('user_session', $usuario->nombre_usuario, $minutes);

            //Relación cuidador-usuario definida en el modelo Usuarios
            $cuidador = $usuario->cuidadorRelacion;
    
            return response()->json([
                'message' => 'Se ha iniciado sesión correctamente',
                'nombre_usuario' => $usuario->nombre_usuario,
                'dni' => $usuario->cuidador,
                'foto' => $cuidador?->foto_perfil
            ]);
        } else {
            return response()->json([
                'message' => 'Nombre de usuario o contraseña incorrectos',
            ], 401);
        }
    }    

    /*public function checkSession(Request $request){
        $nombre_usuario = $request->cookie('user_session');

        if ($nombre_usuario) {
            $usuario = Usuarios::where('nombre_usuario', $nombre_usuario)->first();
            
            if ($usuario) {
                return response()->json([
                    'message' => 'Sesión encontrada para este usuario',
                    'usuario' => $usuario
                ]);
            }
        }
        return response()->json([
            'message' => 'En este momento no hay ninguna sesión activa'
        ], 401);
    }

    public function logout(Request $request){
        Cookie::forget('user_session');

        return response()->json([
            'message' => 'Su sesión se ha cerrado correctamente'
        ]);
    }*/


    public function getAnimalesByUsername($username){
        $usuario = Usuarios::where('nombre_usuario', $username)->first();

        //Primero verificamos si ese usuario existe
        if (!$usuario) {
            return response()->json(['error' => 'No se ha encontrado el usuario'], 404);
        }
    
        //Relación cuidador-usuario definida en el modelo Usuarios
        $cuidador = $usuario->cuidadorRelacion;
    
        //Después verificamos si existe el cuidador
        if (!$cuidador) {
            return response()->json(['error' => 'No se ha encontrado el cuidador'], 404);
        }
    
        //Si existe, obtenemos sus animales (relación animal-cuidador definida en el modelo Cuidadores) y los devolvemos
        $animales = $cuidador->animales;

        return response()->json($animales);
    }
}