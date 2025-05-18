<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
    /**
     * Run the migrations.
     */
    public function up(): void{
        Schema::create('veterinarios', function (Blueprint $table) {
            $table->unsignedBigInteger('codigo_veterinario')->autoincrement();
            $table->string('nombre_completo', 100);
            $table->string('nº_colegiado', 10);
            $table->enum('especialidad', ['Medicina Preventiva', 'Etología', 'Oncología', 'Fisioterapia y Rehabilitación',
                        'Medicina Interna', 'Neurología', 'Etología', 'Traumatología', 'Dermatología']);
            $table->string('email')->unique();
            $table->unsignedBigInteger('centro_id');
            $table->timestamps();

            $table->primary(['centro_id', 'codigo_veterinario']);
            $table->foreign('centro_id')->references('codigo_centro')->on('centros')->onDelete('no action')->onUpdate('no action');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void{
        Schema::dropIfExists('veterinarios');
    }
};