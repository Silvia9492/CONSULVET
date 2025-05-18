<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnimalController;
use App\Http\Controllers\CentroController;
use App\Http\Controllers\CuidadorController;
use App\Http\Controllers\AtiendenController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\VeterinarioController;

//RUTAS PARA ANIMALES
Route::get('/animales/usuario/{username}', [UsuarioController::class, 'getAnimalesByUsername']);
Route::post('/animales', [AnimalController::class, 'store']);
Route::get('/animales/cuidador', [AnimalController::class, 'listarAnimales']);
Route::put('/animal/{codigo_paciente}', [AnimalController::class, 'update']);
Route::delete('/animal/{codigo_paciente}', [AnimalController::class, 'destroy']);

//RUTAS PARA CENTROS
Route::get('/centros/por-servicio/{tipo}', [CentroController::class, 'getCentrosPorTipoServicio']);

//RUTAS PARA CUIDADORES
Route::get('/cuidadores/{dni}', [CuidadorController::class, 'show']);
Route::put('/cuidadores/{dni}', [CuidadorController::class, 'update']);
Route::post('/cuidadores/{dni}/foto', [CuidadorController::class, 'actualizarFoto']);

//RUTAS PARA HISTORIAL
Route::get('/historial/{dni}/{nombreAnimal}', [AtiendenController::class, 'mostrarHistorial']);

//RUTAS PARA REGISTRO
Route::post('/register', [RegisterController::class, 'register']);

//RUTAS PARA SERVICIOS
Route::get('/servicios', [ServicioController::class, 'index']);

//RUTAS PARA USUARIOS
Route::post('/login', [UsuarioController::class, 'login']);

//RUTAS PARA VETERINARIOS
Route::get('/veterinarios/filtrar', [VeterinarioController::class, 'filtrarVeterinarios']);