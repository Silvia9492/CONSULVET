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
        Schema::create('centros', function (Blueprint $table) {
            $table->id('codigo_centro');
            $table->string('nombre', 100);
            $table->string('direccion', 150);
            $table->string('telefono', 9);
            $table->string('email')->unique();
            $table->enum('categoria', ['Hospital', 'Clínica']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('centros');
    }
};
