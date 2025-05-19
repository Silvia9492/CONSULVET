<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cuidadores;

class CuidadoresSeeder extends Seeder{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        Cuidadores::firstOrCreate([
            'dni' => '55643311A',
            'nombre_completo' => 'Silvia González Fernández',
            'fecha_nacimiento' => '1992-04-09',
            'direccion' => 'Calle Coruña Centro, nº 2, 3ºD, Coruña',
            'telefono' => 665441122,
            'email' => 'silvia@gmail.com'
        ]);
        Cuidadores::firstOrCreate([
            'dni' => '55717994C',
            'nombre_completo' => 'Víctor Mondéjar Guerra',
            'fecha_nacimiento' => '1989-07-22',
            'direccion' => 'Calle de la Aviación, nº 10, 1º, Coruña',
            'telefono' => 616788543,
            'email' => 'victor@gmail.com'
        ]);
    }
}