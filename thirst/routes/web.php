<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegionsController;
use App\Http\Controllers\WaterBasesController;

Route::get('/', function () {
    return view('welcome');
});

//Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::middleware(['OnlyAjax'])->group(function() {
    Route::get('regions_get', [RegionsController::class, 'regions_get'])->name('regions_get');
    Route::get('waterbases_get', [WaterBasesController::class, 'waterbases_get'])->name('waterbases_get');
});
