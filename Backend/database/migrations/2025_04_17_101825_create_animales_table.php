<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
    /**
     * Run the migrations.
     */
    public function up(): void{
        Schema::create('animales', function (Blueprint $table) {
            $table->id('codigo_paciente');
            $table->string('nombre', 50);
            $table->date('fecha_nacimiento');
            $table->string('especie', 50);
            $table->string('raza', 50);
            $table->string('color_capa', 50);
            $table->enum('sexo', ['M', 'F']);
            $table->char('cuidador_dni', 9);
            $table->foreign('cuidador_dni')->references('dni')->on('cuidadores')->onDelete('cascade')->onUpdate('no action');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void{
        Schema::dropIfExists('animales');
    }
};