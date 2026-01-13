<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Route;

use App\Models\User;

class HomeController extends Controller
{
    public function home()
    {
        return view('home');
    }
}

?>