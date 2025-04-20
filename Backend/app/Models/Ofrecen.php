<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ofrecen extends Model
{
    protected $table = 'ofrecen';
    protected $primaryKey = ['id_centro', 'id_servicio'];
    public $incrementing = false;

    protected $fillable = [
        'id_centro',
        'id_servicio'
    ];

    public function setKeysForSaveQuery($query)
    {
        return $query->where('id_centro', $this->getAttribute('id_centro'))
                     ->where('id_servicio', $this->getAttribute('id_servicio'));
    }
}
