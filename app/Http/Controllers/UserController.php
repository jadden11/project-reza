<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    // Logic Add cart
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = Cart::updateOrCreate(
            ['user_id' => auth()->id(), 'product_id' => $request->product_id],
            ['quantity' => DB::raw('quantity + 1')]
        );

        return response()->json(['message' => 'Product added to cart!']);
    }

    // Logic Check Out
    public function checkout()
    {
        $userCart = Cart::where('user_id', auth()->id())->with('product')->get();

        if ($userCart->isEmpty()) {
            return redirect()->back()->with('error', 'Your cart is empty!');
        }

        DB::transaction(function () use ($userCart) {
            $order = Order::create(['user_id' => auth()->id(), 'status' => 'pending']);

            foreach ($userCart as $cartItem) {
                $order->items()->create([
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->product->price,
                ]);
            }

            // Kosongkan keranjang
            Cart::where('user_id', auth()->id())->delete();
        });

        return redirect()->route('orders.index')->with('message', 'Order placed successfully!');
    }

    public function products()
    {
        $products = Product::with('category')->get();
        return $products;
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $products = Product::where('name', 'like', "%{$query}%")->get();
        return response()->json($products);
    }

    public function detailProduct($id)
    {
        $products = Product::find($id);
        return $products;
    }
}
