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
            $table->unique(['codigo_veterinario', 'centro_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void{
        Schema::table('veterinarios', function (Blueprint $table) {
            $table->dropUnique(['codigo_veterinario', 'centro_id']);
        });
    }
};