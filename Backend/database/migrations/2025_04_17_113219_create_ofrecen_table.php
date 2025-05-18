<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
    /**
     * Run the migrations.
     */
    public function up(): void{
        Schema::create('ofrecen', function (Blueprint $table) {
            $table->unsignedBigInteger('id_centro');
            $table->unsignedBigInteger('id_servicio');
            $table->timestamps();

            $table->primary(['id_centro', 'id_servicio']);
            $table->foreign('id_centro')->references('codigo_centro')->on('centros')->onDelete('no action')->onUpdate('no action');
            $table->foreign('id_servicio')->references('codigo_servicio')->on('servicios')->onDelete('cascade')->onUpdate('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void{
        Schema::dropIfExists('ofrecen');
    }
};