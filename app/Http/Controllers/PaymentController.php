<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Midtrans\Snap;
use Midtrans\Config;
use App\Mail\InvoiceMail;
use Illuminate\Support\Facades\Mail;

class PaymentController extends Controller
{

    public function sendInvoice(Request $request)
    {
        $details = [
            'name' => $request->name,
            'product_name' => $request->product_name,
            'price' => $request->price,
        ];

        Mail::to($request->email)->send(new InvoiceMail($details));

        return response()->json(['message' => 'Invoice sent successfully']);
    }


    public function __construct()
    {
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = false; // Set true jika production
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }

    public function createTransaction(Request $request)
    {
        $params = [
            'transaction_details' => [
                'order_id' => uniqid(), // ID unik untuk transaksi
                'gross_amount' => $request->amount, // Jumlah pembayaran
            ],
            'customer_details' => [
                'email' => $request->email,
                'phone' => $request->phone,
            ],
        ];

        try {
            $snapToken = Snap::getSnapToken($params);
            return response()->json(['token' => $snapToken]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
