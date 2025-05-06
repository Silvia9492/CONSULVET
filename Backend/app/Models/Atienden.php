<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Animales;

class Atienden extends Model
{
    protected $table = 'atienden';
    protected $primaryKey = ['id_paciente', 'id_centro', 'id_veterinario', 'fecha', 'motivo'];
    public $incrementing = false;

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

    public function setKeysForSaveQuery($query)
    {
        return $query->where('id_paciente', $this->getAttribute('id_paciente'))
                     ->where('id_centro', $this->getAttribute('id_centro'))
                     ->where('id_veterinario', $this->getAttribute('id_veterinario'))
                     ->where('fecha', $this->getAttribute('fecha'))
                     ->where('motivo', $this->getAttribute('motivo'));
    }

    public function animal()
{
    return $this->belongsTo(Animales::class, 'id_paciente');
}
}
