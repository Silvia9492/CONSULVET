<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cuidadores extends Model
{
    protected $table = 'cuidadores';
    protected $primaryKey = 'dni';

    protected $fillable = [
        'dni',
        'nombre_completo',
        'fecha_nacimiento',
        'direccion',
        'telefono',
        'email'
    ];
}
