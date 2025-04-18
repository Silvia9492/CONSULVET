<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Veterinarios extends Model
{
    protected $primaryKey = null;
    public $incrementing = false;
    protected $table = 'veterinarios';

    protected $fillable = [
        'codigo_veterinario',
        'nombre_completo',
        'nº_colegiado',
        'especialidad',
        'email',
        'horario',
        'centro_id'
    ];

    public function setKeysForSaveQuery($query){
        return $query->where('codigo_veterinario', $this->getAttribute('codigo_veterinario'))
                    ->where('centro_id', $this->getAttribute('centro_id'));
    }
}
