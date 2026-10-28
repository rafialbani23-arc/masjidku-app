<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransactionItem extends Model
{
    protected $fillable = ['transaction_id', 'name', 'quantity', 'unit_price', 'subtotal'];
    protected function casts(): array
    {
        return ['quantity' => 'integer', 'unit_price' => 'integer', 'subtotal' => 'integer'];
    }
    public function transaction(): BelongsTo { return $this->belongsTo(Transaction::class); }
}
