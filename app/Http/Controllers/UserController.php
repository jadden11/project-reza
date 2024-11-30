<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{

    public function index(Request $request)
    {
        // Ambil parameter pencarian dan kategori dari query string
        $search = $request->input('search');
        $category = $request->input('category');

        // Query produk beserta relasi kategori
        $products = Product::with('category')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->when($category, function ($query, $category) {
                $query->where('category_id', $category);
            })
            ->get();

        // Ambil semua kategori untuk ditampilkan di filter
        $categories = Category::all();

        // Kirim data ke frontend
        return Inertia::render('Toko', [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
        ]);
    }
}
