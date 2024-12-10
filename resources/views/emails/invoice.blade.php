<p>Halo {{ $details['name'] }},</p>
<p>Terima kasih atas pembelian Anda. Berikut adalah rincian pesanan Anda:</p>
<ul>
  <li>Produk: {{ $details['product_name'] }}</li>
  <li>Harga: Rp {{ number_format($details['price'], 0, ',', '.') }}</li>
</ul>
<p>Pesanan Anda sedang diproses.</p>
