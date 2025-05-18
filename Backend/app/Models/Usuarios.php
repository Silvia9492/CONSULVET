<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Cuidadores;

class Usuarios extends Model{

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


    //Relación cuidador-usuario para usar en el controlador Usuario
    public function cuidadorRelacion(){
        return $this->hasOne(Cuidadores::class, 'dni', 'cuidador');
    }
}