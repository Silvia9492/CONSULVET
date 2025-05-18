<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Centros;

class centrosSeeder extends Seeder{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        $clinica1 = Centros::firstOrCreate([
            'nombre' => 'Clínica Veterinaria Coruña Centro',
            'direccion' => 'Calle Coruña Centro, nº 5, bajo, Coruña',
            'telefono' => 984112233,
            'email' => 'corunacentro@clinicaveterinaria.com',
            'categoria' => 'Clínica'
        ]);
        $hospital1 = Centros::firstOrCreate([
            'nombre' => 'Hospital Veterinario Asturias',
            'direccion' => 'Calle Asturias, nº 22, Gijón',
            'telefono' => 984656577,
            'email' => 'asturias@hospitalveterinario.com',
            'categoria' => 'Hospital' 
        ]);
        $hospital2 = Centros::firstOrCreate([
            'nombre' => 'Hospital Veterinario Coruvet',
            'direccion' => 'Calle Foz, nº 12, Coruña',
            'telefono' => 984929496,
            'email' => 'coruvet@hospitalveterinario.com',
            'categoria' => 'Hospital' 
        ]);
        $clinica2 = Centros::firstOrCreate([
            'nombre' => 'Clínica Veterinaria Mondoñedo',
            'direccion' => 'Calle de la Higuera, nº 53, Mondoñedo',
            'telefono' => 984505040,
            'email' => 'mondonedo@clinicaveterinaria.com',
            'categoria' => 'Clínica' 
        ]);
    }
}