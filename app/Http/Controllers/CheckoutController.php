<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index()
    {
        return Inertia::render('Checkout');
    }

    public function process(Request $request)
    {
        // Handle payment processing logic here
        return redirect()->route('checkout.process');
    }
}
