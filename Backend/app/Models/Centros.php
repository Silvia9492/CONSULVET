<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Centros extends Model
{
    protected $table = 'centros';
    protected $primaryKey = 'codigo_centro';

    protected $fillable = [
        'nombre',
        'direccion',
        'telefono',
        'email',
        'categoria'
    ];

    public function servicios(){
        return $this->belongsToMany(Servicios::class, 'ofrecen', 'codigo_centro', 'codigo_servicio');
    }

}
