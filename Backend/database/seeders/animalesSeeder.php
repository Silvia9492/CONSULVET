<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Animales;

class AnimalesSeeder extends Seeder{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        $smokey = Animales::firstOrCreate([
            'nombre' => 'Smokey',
            'fecha_nacimiento' => '2021-03-12',
            'especie' => 'Felina',
            'raza' => 'Europeo de pelo corto',
            'color_capa' => 'Atigrado gris',
            'sexo' => 'M',
            'cuidador_dni' => '55643311A',
        ]);
        $niobe = Animales::firstOrCreate([
            'nombre' => 'Níobe',
            'fecha_nacimiento' => '2021-09-15',
            'especie' => 'Felina',
            'raza' => 'Mestiza de Blue British',
            'color_capa' => 'Negra',
            'sexo' => 'F',
            'cuidador_dni' => '55717994C',
        ]);
        $iris = Animales::firstOrCreate([
            'nombre' => 'Iris',
            'fecha_nacimiento' => '2015-05-15',
            'especie' => 'Felina',
            'raza' => 'Europea de pelo corto',
            'color_capa' => 'Atigrada gris',
            'sexo' => 'F',
            'cuidador_dni' => '55643311A',
        ]);
        $sally = Animales::firstOrCreate([
            'nombre' => 'Sally',
            'fecha_nacimiento' => '2015-05-09',
            'especie' => 'Canina',
            'raza' => 'Beagle',
            'color_capa' => 'Propia',
            'sexo' => 'F',
            'cuidador_dni' => '55717994C',
        ]);
    }
}