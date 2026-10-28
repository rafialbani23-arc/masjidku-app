<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('mosques', function (Blueprint $table) {
            $table->id();
            $table->string('name', 180);
            $table->string('province', 100);
            $table->string('city', 100);
            $table->string('district', 100);
            $table->unsignedBigInteger('opening_balance')->default(0);
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->timestamps();
        });
        Schema::create('mosque_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mosque_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['mosque_id', 'user_id']);
        });
    }
    public function down(): void { Schema::dropIfExists('mosque_user'); Schema::dropIfExists('mosques'); }
};
