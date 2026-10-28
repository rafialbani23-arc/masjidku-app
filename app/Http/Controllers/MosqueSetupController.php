<?php

namespace App\Http\Controllers;

use App\Models\Mosque;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class MosqueSetupController extends Controller
{
    public function create(): Response|RedirectResponse
    {
        if (auth()->user()->mosques()->exists()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('mosque/setup');
    }

    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->mosques()->exists()) {
            return redirect()->route('dashboard');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:180'],
            'province' => ['required', 'string', 'max:100'],
            'city' => ['required', 'string', 'max:100'],
            'district' => ['required', 'string', 'max:100'],
            'opening_balance' => ['required', 'integer', 'min:0'],
        ]);

        DB::transaction(function () use ($request, $validated) {
            $mosque = Mosque::create($validated);
            $request->user()->mosques()->attach($mosque->id);
        });

        return redirect()
            ->route('dashboard')
            ->with('success', 'Profil masjid berhasil dibuat.');
    }
}
