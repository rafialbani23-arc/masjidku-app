<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MosqueProfileController extends Controller
{
    public function edit(Request $request): Response|RedirectResponse
    {
        $mosque = $request->user()->mosques()->first();

        if (! $mosque) {
            return redirect()->route('mosque.setup');
        }

        return Inertia::render('mosque/profile', [
            'mosque' => $mosque,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $mosque = $request->user()->mosques()->first();

        if (! $mosque) {
            return redirect()->route('mosque.setup');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:180'],
            'province' => ['required', 'string', 'max:100'],
            'city' => ['required', 'string', 'max:100'],
            'district' => ['required', 'string', 'max:100'],
            'opening_balance' => ['required', 'integer', 'min:0'],
        ]);

        $mosque->update($validated);

        return redirect()
            ->route('mosque.profile.edit')
            ->with('success', 'Profil masjid berhasil diperbarui.');
    }
}
