<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Animales extends Model
{
    protected $table = 'animales';

    protected $fillable = [
        'nombre',
        'fecha_nacimiento',
        'especie',
        'raza',
        'color_capa',
        'sexo',
        'cuidador_dni'
    ];
}
