<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Centros extends Model
{
    protected $table = 'centros';

    protected $fillable = [
        'nombre',
        'direccion',
        'telefono',
        'email',
        'categoria'
    ];
}
