<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class WaterBasesController extends Controller
{
    public function waterbases_get()
    {
        return Storage::get('waterbases.json');
    }
}
