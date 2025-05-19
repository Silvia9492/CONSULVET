<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\AnimalesSeeder;
use Database\Seeders\AtiendenSeeder;
use Database\Seeders\CentrosSeeder;
use Database\Seeders\CuidadoresSeeder;
use Database\Seeders\OfrecenSeeder;
use Database\Seeders\ServiciosSeeder;
use Database\Seeders\UsuariosSeeder;
use Database\Seeders\VeterinariosSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

         $this->call([
            CuidadoresSeeder::class,
            AnimalesSeeder::class,
            CentrosSeeder::class,
            VeterinariosSeeder::class,
            ServiciosSeeder::class,
            UsuariosSeeder::class,
            OfrecenSeeder::class,
            AtiendenSeeder::class,
        ]);
    }
}