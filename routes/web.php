<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MosqueSetupController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\MonthlyReportController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('/setup', [MosqueSetupController::class, 'create'])
        ->name('mosque.setup');

    Route::post('/setup', [MosqueSetupController::class, 'store'])
        ->name('mosque.setup.store');

    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
    Route::get('/transactions', [TransactionController::class, 'index'])
    ->name('transactions.index');

    Route::get('/transactions/create', [TransactionController::class, 'create'])
        ->name('transactions.create');

    Route::post('/transactions', [TransactionController::class, 'store'])
        ->name('transactions.store');

    Route::get('/transactions/{transaction}/edit', [TransactionController::class, 'edit'])
        ->name('transactions.edit');

    Route::put('/transactions/{transaction}', [TransactionController::class, 'update'])
        ->name('transactions.update');

    Route::delete('/transactions/{transaction}', [TransactionController::class, 'destroy'])
        ->name('transactions.destroy');

    Route::get('/reports/monthly', [DashboardController::class, 'monthly'])
        ->name('reports.monthly');

    Route::get('/reports/monthly/download', [
        MonthlyReportController::class,
        'download'
    ])->name('reports.monthly.download');
    
    Route::get('/mosque/profile', [
        \App\Http\Controllers\MosqueProfileController::class,
        'edit',
    ])->name('mosque.profile.edit');

    Route::patch('/mosque/profile', [
        \App\Http\Controllers\MosqueProfileController::class,
        'update',
    ])->name('mosque.profile.update');
});

require __DIR__.'/settings.php';
