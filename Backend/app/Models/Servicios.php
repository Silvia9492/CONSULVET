<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Centros;


class Servicios extends Model
{
    protected $table = 'servicios';
    protected $primaryKey = 'codigo_servicio';
    public $incrementing = true;

    protected $fillable = [
        'codigo_servicio',
        'tipo',
    ];

    public function centros(){
        return $this->belongsToMany(Centros::class, 'ofrecen', 'id_servicio', 'id_centro');
    }

}
