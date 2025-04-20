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

Route::get('/animales/{dni}', [AnimalController::class, 'index']);
Route::post('/animales', [AnimalController::class, 'store']);
Route::get('/animal/{codigo_paciente}', [AnimalController::class, 'show']);
Route::put('/animal/{codigo_paciente}', [AnimalController::class, 'update']);
Route::delete('/animal/{codigo_paciente}', [AnimalController::class, 'destroy']);

Route::get('/cuidadores', [CuidadorController::class, 'index']);
Route::post('/cuidadores', [CuidadorController::class, 'store']);
Route::get('/cuidador/{dni}', [CuidadorController::class, 'show']);
Route::put('/cuidador/{dni}', [CuidadorController::class, 'update']);
Route::delete('/cuidador/{dni}', [CuidadorController::class, 'destroy']);

Route::post('/usuarios', [UsuarioController::class, 'store']);
Route::get('/usuario/{dni}', [UsuarioController::class, 'show']);
Route::post('/login', [UsuarioController::class, 'login']);

Route::get('/centros', [CentroController::class, 'index']);
Route::get('/centros/filtrar/{servicio}', [CentroController::class, 'filtrarCentrosPorServicio']);

Route::get('/servicios', [ServicioController::class, 'index']);

Route::get('/veterinarios/filtrar', [VeterinarioController::class, 'filtrarVeterinarios']);

Route::get('/ofrecen/{codigo_centro}', [OfrecenController::class, 'show']);

Route::get('/historial/{codigo_paciente}', [AtiendenController::class, 'consultarHistorial']);
