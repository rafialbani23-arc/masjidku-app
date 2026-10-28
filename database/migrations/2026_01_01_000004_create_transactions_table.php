<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mosque_id')->constrained()->cascadeOnDelete();
            $table->enum('type', ['income', 'expense']);
            $table->date('transaction_date');
            $table->string('category', 120);
            $table->string('description', 255);
            $table->unsignedBigInteger('amount');
            $table->string('source_or_payee', 180)->nullable();
            $table->string('payment_method', 80)->nullable();
            $table->string('receipt_number', 100)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->index(['mosque_id', 'transaction_date']);
            $table->index(['mosque_id', 'type', 'transaction_date']);
        });
        Schema::create('transaction_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->constrained()->cascadeOnDelete();
            $table->string('name', 180);
            $table->unsignedInteger('quantity');
            $table->unsignedBigInteger('unit_price');
            $table->unsignedBigInteger('subtotal');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('transaction_items'); Schema::dropIfExists('transactions'); }
};
