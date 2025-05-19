<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Usuarios;

class UsuariosSeeder extends Seeder{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        Usuarios::firstOrCreate([
            'nombre_usuario' => 'Silvia123',
            'contraseña' => 'Smokey21',
            'tipo' => 'cuidador',
            'fecha_alta' => '2025-04-18',
            'fecha_cambio_contraseña' => '2025-04-18',
            'cuidador' => '55643311A'
        ]);
        Usuarios::firstOrCreate([
            'nombre_usuario' => 'Victor456',
            'contraseña' => 'Niobe21',
            'tipo' => 'cuidador',
            'fecha_alta' => '2025-04-18',
            'fecha_cambio_contraseña' => '2025-04-18',
            'cuidador' => '55717994C'
        ]);
    }
}