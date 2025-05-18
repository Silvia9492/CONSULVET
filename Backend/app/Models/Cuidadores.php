<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Animales;

class Cuidadores extends Model{
    
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


    //Relación animal-cuidador para usar en el controlador Usuario
    public function animales(){
        return $this->hasMany(Animales::class, 'cuidador_dni', 'dni');
    }
}