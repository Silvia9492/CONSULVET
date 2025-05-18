<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Servicios;

class serviciosSeeder extends Seeder{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        $vacunacion = Servicios::firstOrCreate([
            'tipo' => 'Vacunación'
        ]);
        $desparasitacion = Servicios::firstOrCreate([
            'tipo' => 'Desparasitación'
        ]);
        $nutricion = Servicios::firstOrCreate([
            'tipo' => 'Asesoramiento Nutricional'
        ]);
        $diagnostico = Servicios::firstOrCreate([
            'tipo' => 'Diagnóstico por Imagen'
        ]);
        $tac = Servicios::firstOrCreate([
            'tipo' => 'TAC'
        ]);
        $resonancia = Servicios::firstOrCreate([
            'tipo' => 'Resonancia Magnética'
        ]);
        $hospitalizacion = Servicios::firstOrCreate([
            'tipo' => 'Hospitalización'
        ]);
        $fisioterapia = Servicios::firstOrCreate([
            'tipo' => 'Fisioterapia'
        ]);
        $cirugia = Servicios::firstOrCreate([
            'tipo' => 'Cirugía General'
        ]); 
    }
}