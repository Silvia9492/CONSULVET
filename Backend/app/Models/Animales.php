<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Veterinarios;
use App\Models\Atienden;

class Animales extends Model{

    protected $table = 'animales';
    protected $primaryKey = 'codigo_paciente';

    protected $fillable = [
        'nombre',
        'fecha_nacimiento',
        'especie',
        'raza',
        'color_capa',
        'sexo',
        'cuidador_dni',
        'foto'
    ];


    public function veterinarios(){
        return $this->belongsToMany(Veterinarios::class, 'atienden', 'id_paciente', 'id_veterinario')
                    ->withPivot('id_centro', 'fecha', 'motivo', 'diagnóstico', 'tratamiento', 'pruebas', 'observaciones')
                    ->withTimestamps();
    }


    //Relación animal-historial para usar en el controlador Atienden
    public function historiales(){
        return $this->hasMany(Atienden::class, 'id_paciente', 'codigo_paciente');
    }
}