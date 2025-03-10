<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/products', [UserController::class, 'products']);
Route::get('/products/search', [UserController::class, 'search']);
Route::get('/products/{id}', [UserController::class, 'detailProduct']);
Route::post('/payments/create', [PaymentController::class, 'createTransaction']);


Route::get('/categories/{id}/products', [CategoryController::class, 'getProductsByCategory']);
