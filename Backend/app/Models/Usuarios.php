<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Usuarios extends Model
{
    protected $table = 'usuarios';
    protected $primaryKey = 'nombre_usuario';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'nombre_usuario',
        'contraseña',
        'tipo',
        'fecha_alta',
        'fecha_cambio_contraseña',
        'cuidador'
    ];
}
