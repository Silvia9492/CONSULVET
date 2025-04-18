<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('servicios', function (Blueprint $table) {
            $table->id('codigo_servicio');
            $table->enum('tipo', ['Vacunación', 'Desparasitación', 'Asesoramiento Nutricional', 'Diagnóstico por Imagen', 'TAC', 'Resonancia Magnética', 'Hospitalización', 'Fisioterapia', 'Cirugía general']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('servicios');
    }
};
