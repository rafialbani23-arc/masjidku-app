<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaction extends Model
{
    protected $fillable = [
        'mosque_id', 'type', 'transaction_date', 'category', 'description',
        'amount', 'source_or_payee', 'payment_method', 'receipt_number', 'notes',
    ];

    protected function casts(): array
    {
        return ['transaction_date' => 'date', 'amount' => 'integer'];
    }

    public function mosque(): BelongsTo { return $this->belongsTo(Mosque::class); }
    public function items(): HasMany { return $this->hasMany(TransactionItem::class); }
}
