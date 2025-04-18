<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ofrecen extends Model
{
    protected $table = 'ofrecen';

    protected $fillable = [
        'id_centro',
        'id_servicio'
    ];
}
