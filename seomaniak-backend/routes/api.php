<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController;

Route::get('/test', function() {
    return response()->json([
        'success' => true,
        'message' => 'API Laravel fonctionne',
        'timestamp' => now()
    ]);
});

// Une seule ligne pour toutes les routes CRUD !
Route::apiResource('contacts', ContactController::class);