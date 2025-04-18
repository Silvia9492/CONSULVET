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
        Schema::create('atienden', function (Blueprint $table) {
            $table->date('fecha');
            $table->string('motivo', 300);
            $table->text('diagnóstico');
            $table->text('tratamiento');
            $table->text('pruebas');
            $table->text('observaciones');
            $table->unsignedBigInteger('id_paciente');
            $table->unsignedBigInteger('id_veterinario');
            $table->unsignedBigInteger('id_centro');
            $table->timestamps();

            $table->primary(['id_paciente', 'id_centro', 'id_veterinario', 'fecha', 'motivo']);
            $table->foreign('id_paciente')->references('codigo_paciente')->on('animales')->onDelete('cascade')->onUpdate('no action');
            $table->foreign(['id_centro', 'id_veterinario'])->references(['centro_id', 'codigo_veterinario'])->on('veterinarios')->onDelete('cascade')->onUpdate('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('atienden');
    }
};
