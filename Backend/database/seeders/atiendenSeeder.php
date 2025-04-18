<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Atienden;
use App\Models\Animales;
use App\Models\Centros;
use App\Models\Veterinarios;

class atiendenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //ANIMALES
        $smokey = Animales::where('nombre', 'Smokey')->first();
        $niobe = Animales::where('nombre', 'Níobe')->first();
        $iris = Animales::where('nombre', 'Iris')->first();
        $sally = Animales::where('nombre', 'Sally')->first();

        //CENTROS
        $clinica1 = Centros::where('nombre', 'Clínica Veterinaria Coruña Centro')->first();
        $hospital1 = Centros::where('nombre', 'Hospital Veterinario Asturias')->first();
        $hospital2 = Centros::where('nombre', 'Hospital Veterinario Coruvet')->first();
        $clinica2 = Centros::where('nombre', 'Clínica Veterinaria Mondoñedo')->first();

        //VETERINARIOS
        $ana = Veterinarios::where('codigo_veterinario', '15221')->first();
        $raquel = Veterinarios::where('codigo_veterinario', '32334')->first();
        $dario = Veterinarios::where('codigo_veterinario', '44591')->first();
        $elena = Veterinarios::where('codigo_veterinario', '20201')->first();
        $adrian = Veterinarios::where('codigo_veterinario', '87633')->first();
        $eva = Veterinarios::where('codigo_veterinario', '91543')->first();
        $beatriz = Veterinarios::where('codigo_veterinario', '66189')->first();
        $covadonga = Veterinarios::where('codigo_veterinario', '51976')->first();
        $sergio = Veterinarios::where('codigo_veterinario', '22769')->first();

        Atienden::updateOrCreate([
            'id_paciente' => $smokey->codigo_paciente,
            'id_centro' => $hospital1->codigo_centro,
            'id_veterinario' => $beatriz->codigo_veterinario,
            'fecha' => '2024-02-05',
            'motivo' => 'Cistitis',
            'diagnóstico' => 'Insuficiencia renal crónica congénita',
            'tratamiento' => 'Buprex 0.2ml oral 3 veces al día durante 4 días. Suplemento de potasio hasta la revisión, 1ml cada 12 horas; suplemento de potasio hasta la revisión, una chuche al día divisible en 2 tomas si le cuesta comerla; cambio a dieta renal',
            'pruebas' => 'Análisis completos de sangre y orina, ecografía abdominal completa',
            'observaciones' => 'Revisión en una semana para control renal'
        ]);
        Atienden::updateOrCreate([
            'id_paciente' => $niobe->codigo_paciente,
            'id_centro' => $clinica1->codigo_centro,
            'id_veterinario' => $ana->codigo_veterinario,
            'fecha' => '2025-03-25',
            'motivo' => 'Vacunación',
            'diagnóstico' => 'Vacunación general anual',
            'tratamiento' => 'No procede',
            'pruebas' => 'No procede',
            'observaciones' => 'Exploración física general muy buena. Revacunar en un año'
        ]);
        Atienden::updateOrCreate([
            'id_paciente' => $niobe->codigo_paciente,
            'id_centro' => $hospital2->codigo_centro,
            'id_veterinario' => $adrian->codigo_veterinario,
            'fecha' => '2025-04-12',
            'motivo' => 'Cojera de extremidad posterior derecha',
            'diagnóstico' => 'Rotura de ligamento cruzado',
            'tratamiento' => 'Cirugía',
            'pruebas' => 'Radiografías óseas para confirmar la lesión. Aprovechamos para analítica prequirúrgica',
            'observaciones' => 'Cirugía en una semana'
        ]);
        Atienden::updateOrCreate([
            'id_paciente' => $sally->codigo_paciente,
            'id_centro' => $hospital2->codigo_centro,
            'id_veterinario' => $covadonga->codigo_veterinario,
            'fecha' => '2020-06-13',
            'motivo' => 'Comportamiento ansioso y destructivo, no pueden dejarla sola en casa',
            'diagnóstico' => 'Ansiedad por separación',
            'tratamiento' => 'Terapia de desinsibilización. Trazodona, 20mg una vez al día oral',
            'pruebas' => 'Analítica sanguínea general para descartar otras posibles afecciones. Todo normal',
            'observaciones' => 'Consulta en una semana para reajustar medicación y hacer seguimiento de la evolución'
        ]);
        Atienden::updateOrCreate([
            'id_paciente' => $iris->codigo_paciente,
            'id_centro' => $hospital1->codigo_centro,
            'id_veterinario' => $dario->codigo_veterinario,
            'fecha' => '2017-08-20',
            'motivo' => 'Golpeada en la zona caudal del cuerpo por un coche cuando cruzaba el camino de su casa',
            'diagnóstico' => 'Pinzamiento del nervio de la cola',
            'tratamiento' => 'Terapia de rehabilitación y fisioterapia para tratar de recuperar el movimiento de la cola',
            'pruebas' => 'Examen de la propiocepción y el equilibrio. Exploración física general buena. Pruebas de imagen para descartar otras posibles consecuencias por el impacto',
            'observaciones' => 'Visita en una semana para una nueva sesión. Continuar ejercicios diarios en casa'
        ]);
    }
}
