<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
    /**
     * Run the migrations.
     */
    public function up(): void{
        Schema::table('veterinarios', function (Blueprint $table) {
            $table->enum('servicio', ['Vacunación', 'Desparasitación', 'Asesoramiento Nutricional', 'Diagnóstico por Imagen', 'TAC',
                        'Resonancia Magnética', 'Hospitalización', 'Fisioterapia', 'Cirugía general'])->after('especialidad');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void{
        Schema::table('veterinarios', function (Blueprint $table) {
            $table->dropColumn('servicio');
        });
    }
};