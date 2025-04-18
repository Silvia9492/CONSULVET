<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Usuarios extends Model
{
    protected $table = 'usuarios';

    protected $fillable = [
        'nombre_usuario',
        'contraseña',
        'tipo',
        'fecha_alta',
        'fecha_cambio_contraseña',
        'cuidador'
    ];
}
