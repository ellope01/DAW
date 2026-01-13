<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Route;

use App\Models\User;

class CatalogController extends Controller
{
    public function getIndex()
    {
        return view('home');
    }
    public function getShow()
    {
        return view('home');
    }
    public function getCreate()
    {
        return view('home');
    }
    public function getEdit()
    {
        return view('home');
    }
}

?>