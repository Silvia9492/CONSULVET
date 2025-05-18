<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ofrecen;
use App\Models\Centros;
use App\Models\Servicios;

class ofrecenSeeder extends Seeder{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        //CENTROS
        $clinica1 = Centros::where('nombre', 'Clínica Veterinaria Coruña Centro')->first();
        $hospital1 = Centros::where('nombre', 'Hospital Veterinario Asturias')->first();
        $hospital2 = Centros::where('nombre', 'Hospital Veterinario Coruvet')->first();
        $clinica2 = Centros::where('nombre', 'Clínica Veterinaria Mondoñedo')->first();

        //SERVICIOS
        $vacunacion = Servicios::where('tipo', 'Vacunación')->first();
        $desparasitacion = Servicios::where('tipo', 'Desparasitación')->first();
        $nutricion = Servicios::where('tipo', 'Asesoramiento Nutricional')->first();
        $diagnostico = Servicios::where('tipo', 'Diagnóstico por Imagen')->first();
        $tac = Servicios::where('tipo', 'TAC')->first();
        $resonancia = Servicios::where('tipo', 'Resonancia Magnética')->first();
        $hospitalizacion = Servicios::where('tipo', 'Hospitalización')->first();
        $fisioterapia = Servicios::where('tipo', 'Fisioterapia')->first();
        $cirugia = Servicios::where('tipo', 'Cirugía General')->first();

        //SERVICIOS QUE OFRECE CLINICA 1
        Ofrecen::updateOrCreate([
            'id_centro' => $clinica1->codigo_centro,
            'id_servicio' => $vacunacion->codigo_servicio
        ]);
        Ofrecen::updateOrCreate([
            'id_centro' => $clinica1->codigo_centro,
            'id_servicio' => $desparasitacion->codigo_servicio
        ]);
        Ofrecen::updateOrCreate([
            'id_centro' => $clinica1->codigo_centro,
            'id_servicio' => $nutricion->codigo_servicio
        ]);
        Ofrecen::updateOrCreate([
            'id_centro' => $clinica1->codigo_centro,
            'id_servicio' => $diagnostico->codigo_servicio
        ]);


        //SERVICIOS QUE OFRECE CLINICA 2
        Ofrecen::updateOrCreate([
            'id_centro' => $clinica2->codigo_centro,
            'id_servicio' => $vacunacion->codigo_servicio
        ]);
        Ofrecen::updateOrCreate([
            'id_centro' => $clinica2->codigo_centro,
            'id_servicio' => $desparasitacion->codigo_servicio
        ]);
        Ofrecen::updateOrCreate([
            'id_centro' => $clinica2->codigo_centro,
            'id_servicio' => $diagnostico->codigo_servicio
        ]);


        //SERVICIOS QUE OFRECE HOSPITAL 1
        Ofrecen::updateOrCreate([
            'id_centro' => $hospital1->codigo_centro,
            'id_servicio' => $nutricion->codigo_servicio
        ]);
        Ofrecen::updateOrCreate([
            'id_centro' => $hospital1->codigo_centro,
            'id_servicio' => $diagnostico->codigo_servicio
        ]);
        Ofrecen::updateOrCreate([
            'id_centro' => $hospital1->codigo_centro,
            'id_servicio' => $tac->codigo_servicio
        ]);
        Ofrecen::updateOrCreate([
            'id_centro' => $hospital1->codigo_centro,
            'id_servicio' => $hospitalizacion->codigo_servicio
        ]);
        Ofrecen::updateOrCreate([
            'id_centro' => $hospital1->codigo_centro,
            'id_servicio' => $fisioterapia->codigo_servicio
        ]);
        Ofrecen::updateOrCreate([
            'id_centro' => $hospital1->codigo_centro,
            'id_servicio' => $cirugia->codigo_servicio
        ]);


        //SERVICIOS QUE OFRECE HOSPITAL 2
        Ofrecen::updateOrCreate([
            'id_centro' => $hospital2->codigo_centro,
            'id_servicio' => $nutricion->codigo_servicio
        ]);
        Ofrecen::updateOrCreate([
            'id_centro' => $hospital2->codigo_centro,
            'id_servicio' => $diagnostico->codigo_servicio
        ]);
        Ofrecen::updateOrCreate([
            'id_centro' => $hospital2->codigo_centro,
            'id_servicio' => $tac->codigo_servicio
        ]);
        Ofrecen::updateOrCreate([
            'id_centro' => $hospital2->codigo_centro,
            'id_servicio' => $resonancia->codigo_servicio
        ]);
        Ofrecen::updateOrCreate([
            'id_centro' => $hospital2->codigo_centro,
            'id_servicio' => $hospitalizacion->codigo_servicio
        ]);
        Ofrecen::updateOrCreate([
            'id_centro' => $hospital2->codigo_centro,
            'id_servicio' => $cirugia->codigo_servicio
        ]);
    }
}