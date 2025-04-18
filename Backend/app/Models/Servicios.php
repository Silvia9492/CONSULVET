<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Servicios extends Model
{
    protected $table = 'servicios';

    protected $fillable = [
        'codigo_servicio',
        'tipo',
    ];
}
