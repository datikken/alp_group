<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RegionsController extends Controller
{
    public function regions_get()
    {
       return Storage::get('regions.json');
    }
}
