<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AnimalController;
use App\Http\Controllers\CuidadorController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\CentroController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\VeterinarioController;
use App\Http\Controllers\OfrecenController;
use App\Http\Controllers\AtiendenController;
use App\Http\Controllers\RegisterController;

//Route::get('/animales/cuidador/{dni}', [AnimalController::class, 'index']);
Route::get('/animales/usuario/{username}', [UsuarioController::class, 'getAnimalesByUsername']);
Route::post('/animales', [AnimalController::class, 'store']);
//Route::get('/animal/{codigo_paciente}', [AnimalController::class, 'show']);
Route::get('/animales/cuidador', [AnimalController::class, 'listarAnimales']);
Route::put('/animal/{codigo_paciente}', [AnimalController::class, 'update']);
Route::post('/animal/{codigo_paciente}/foto', [AnimalController::class, 'actualizarFotoAnimal']);
Route::delete('/animal/{codigo_paciente}', [AnimalController::class, 'destroy']);

Route::get('/cuidadores', [CuidadorController::class, 'index']);
Route::post('/cuidadores', [CuidadorController::class, 'store']);
Route::get('/cuidadores/{dni}', [CuidadorController::class, 'show']);
Route::put('/cuidadores/{dni}', [CuidadorController::class, 'update']);
Route::delete('/cuidadores/{dni}', [CuidadorController::class, 'destroy']);
Route::post('/cuidadores/{dni}/foto', [CuidadorController::class, 'actualizarFoto']);

Route::post('/usuarios', [UsuarioController::class, 'store']);
Route::get('/usuario/{dni}', [UsuarioController::class, 'show']);
Route::post('/login', [UsuarioController::class, 'login']);

Route::get('/centros', [CentroController::class, 'index']);
//Route::get('/centros/filtrar/{servicio}', [CentroController::class, 'filtrarCentrosPorServicio']);
Route::get('/centros/por-servicio/{tipo}', [CentroController::class, 'getCentrosPorTipoServicio']);

Route::get('/servicios', [ServicioController::class, 'index']);

Route::get('/veterinarios/filtrar', [VeterinarioController::class, 'filtrarVeterinarios']);

Route::get('/ofrecen/{codigo_centro}', [OfrecenController::class, 'show']);

Route::get('/historial/{dni}/{nombreAnimal}', [AtiendenController::class, 'mostrarHistorial']);
//Route::get('/historial/{codigo_paciente}', [AtiendenController::class, 'consultarHistorial']);
//Route::get('/historial', [AtiendenController::class, 'buscarPorNombre']);

Route::post('/register', [RegisterController::class, 'register']);
