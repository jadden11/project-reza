<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getProductsByCategory($id)
    {
        $category = Category::find($id);
        $products = $category->products;
        return $products;
    }
}
