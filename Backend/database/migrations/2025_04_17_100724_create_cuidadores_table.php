<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
    /**
     * Run the migrations.
     */
    public function up(): void{
        Schema::create('cuidadores', function (Blueprint $table) {
            $table->char('dni', 9)->primary();
            $table->string('nombre_completo', 100);
            $table->date('fecha_nacimiento');
            $table->string('direccion', 150);
            $table->string('telefono', 9);
            $table->string('email', 50)->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void{
        Schema::dropIfExists('cuidadores');
    }
};