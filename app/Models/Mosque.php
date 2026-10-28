<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mosque extends Model
{
    protected $fillable = ['name', 'province', 'city', 'district', 'opening_balance', 'latitude', 'longitude'];

    protected function casts(): array
    {
        return ['opening_balance' => 'integer', 'latitude' => 'float', 'longitude' => 'float'];
    }

    public function users(): BelongsToMany { return $this->belongsToMany(User::class)->withTimestamps(); }
    public function transactions(): HasMany { return $this->hasMany(Transaction::class); }
}
