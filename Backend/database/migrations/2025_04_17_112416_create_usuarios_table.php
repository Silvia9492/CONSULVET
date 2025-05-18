<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
    /**
     * Run the migrations.
     */
    public function up(): void{
        Schema::create('usuarios', function (Blueprint $table) {
            $table->string('nombre_usuario', 30)->primary();
            $table->string('contraseña', 60);
            $table->enum('tipo', ['cuidador', 'veterinario', 'centro']);
            $table->date('fecha_alta');
            $table->date('fecha_cambio_contraseña');
            $table->char('cuidador', 9);
            $table->timestamps();

            $table->foreign('cuidador')->references('dni')->on('cuidadores')->onDelete('cascade')->onUpdate('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void{
        Schema::dropIfExists('usuarios');
    }
};