<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Veterinarios;
use App\Models\Centros;

class veterinariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clinica1 = Centros::where('nombre', 'Clínica Veterinaria Coruña Centro')->first();
        $hospital1 = Centros::where('nombre', 'Hospital Veterinario Asturias')->first();
        $hospital2 = Centros::where('nombre', 'Hospital Veterinario Coruvet')->first();
        $clinica2 = Centros::where('nombre', 'Clínica Veterinaria Mondoñedo')->first();

        $ana = Veterinarios::updateOrCreate(
            ['codigo_veterinario' => '15221', 'centro_id' => $clinica1->codigo_centro],
            [
                'nombre_completo' => 'Ana López García',
                'nº_colegiado' => 'VET123456',
                'especialidad' => 'Medicina Preventiva',
                'email' => 'ana.lopez@clinicaveterinaria.com',
                'horario' => 'mañana'
            ]);
        $raquel = Veterinarios::updateOrCreate(
            ['codigo_veterinario' => '32334', 'centro_id' => $hospital1->codigo_centro],
            [
                'nombre_completo' => 'Raquel Santos Díaz',
                'nº_colegiado' => 'VET556789',
                'especialidad' => 'Oncología',
                'email' => 'raquel.santos@hospitalveterinario.com',
                'horario' => 'mañana'
            ]);
        $dario = Veterinarios::updateOrCreate(
            ['codigo_veterinario' => '44591', 'centro_id' => $hospital1->codigo_centro],
            [
                'nombre_completo' => 'Darío Carbajal Herrero',
                'nº_colegiado' => 'VET236751',
                'especialidad' => 'Fisioterapia y Rehabilitación',
                'email' => 'dario.carbajal@hospitalveterinario.com',
                'horario' => 'tarde'   
            ]);
        $elena = Veterinarios::updateOrCreate(
            ['codigo_veterinario' => '20201', 'centro_id' => $hospital2->codigo_centro],
            [
                'nombre_completo' => 'Elena Díaz Rey',
                'nº_colegiado' => 'VET332167',
                'especialidad' => 'Neurología',
                'email' => 'elena.diaz@hospitalveterinario.com',
                'horario' => 'tarde'
            ]);
        $adrian = Veterinarios::updateOrCreate(
            ['codigo_veterinario' => '87633', 'centro_id' => $hospital2->codigo_centro],
            [
                'nombre_completo' => 'Adrián Berdejo Bueno',
                'nº_colegiado' => 'VET096544',
                'especialidad' => 'Traumatología',
                'email' => 'adrian.berdejo@hospitalveterinario.com',
                'horario' => 'mañana'
            ]);
        $eva = Veterinarios::updateOrCreate(
            ['codigo_veterinario' => '91543', 'centro_id' => $clinica2->codigo_centro],
            [
                'nombre_completo' => 'Eva Vázquez Castaño',
                'nº_colegiado' => 'VET717445',
                'especialidad' => 'Dermatología',
                'email' => 'eva.vazquez@clinicaveterinaria.com',
                'horario' => 'tarde'
            ]);
        $beatriz = Veterinarios::updateOrCreate(
            ['codigo_veterinario' => '66189', 'centro_id' => $hospital1->codigo_centro],
            [
                'nombre_completo' => 'Beatriz Alonso Pérez',
                'nº_colegiado' => 'VET433566',
                'especialidad' => 'Medicina Interna',
                'email' => 'beatriz.alonso@hospitalveterinario.com',
                'horario' => 'mañana'
            ]);
        $covadonga = Veterinarios::updateOrCreate(
            ['codigo_veterinario' => '51976', 'centro_id' => $hospital2->codigo_centro],
            [
                'nombre_completo' => 'Covadonga Rosales Olmo',
                'nº_colegiado' => 'VET654876',
                'especialidad' => 'Etología',
                'email' => 'covadonga.rosales@hospitalveterinario.com',
                'horario' => 'tarde'
            ]);
        $sergio = Veterinarios::updateOrCreate(
            ['codigo_veterinario' => '22769', 'centro_id' => $clinica1->codigo_centro],
            [
                'nombre_completo' => 'Sergio Villa Castiello',
                'nº_colegiado' => 'VET265114',
                'especialidad' => 'Etología',
                'email' => 'sergio.villa@clinicaveterinaria.com',
                'horario' => 'mañana'
            ]);
    }
}
