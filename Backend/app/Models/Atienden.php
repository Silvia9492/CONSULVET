<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Atienden extends Model
{
    protected $table = 'atienden';

    protected $fillable = [
        'fecha',
        'motivo',
        'diagnóstico',
        'tratamiento',
        'pruebas',
        'observaciones',
        'id_paciente',
        'id_veterinario',
        'id_centro'
    ];
}
