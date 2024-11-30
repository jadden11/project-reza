import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(angka);
}

export default function Toko({ products, categories, filters }) {
    // Ambil nilai awal dari server
    const { data, setData, get } = useForm({
        search: filters.search || "",
        category: filters.category || "",
    });

    const handleFilter = (e) => {
        e.preventDefault();
        get(route("toko")); // Kirim permintaan ke route 'toko'
    };

    return (
        <>
            <AdminLayout>
                <div>
                    <Head title="Products" />
                    <div className="flex justify-between py-6 border-b-4">
                        <form
                            onSubmit={handleFilter}
                            className="flex space-x-4 mb-6"
                        >
                            {/* Input Pencarian */}
                            <input
                                type="text"
                                name="search"
                                value={data.search}
                                onChange={(e) =>
                                    setData("search", e.target.value)
                                }
                                placeholder="Cari produk"
                                className="border-2 rounded-md p-2 w-full"
                            />

                            {/* Dropdown Filter Kategori */}
                            <select
                                name="category"
                                value={data.category}
                                onChange={(e) =>
                                    setData("category", e.target.value)
                                }
                                className="block w-full p-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm "
                            >
                                <option value="">Category</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                            >
                                Filter
                            </button>
                        </form>
                    </div>

                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <div className="flex font-sans">
                                    <div className="flex-none w-48 relative">
                                        <img
                                            src={`/storage/${product.image}`}
                                            alt={product.name}
                                        />
                                    </div>
                                    <form className="flex-auto p-6">
                                        <div className="flex flex-wrap">
                                            <h1 className="flex-auto text-lg font-semibold text-slate-900">
                                                {product.name}
                                            </h1>
                                            <div className="text-lg font-semibold">
                                                {formatRupiah(product.price)}
                                            </div>
                                            <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                                                {product.category && (
                                                    <p>
                                                        Category:{" "}
                                                        {product.category.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex space-x-4 mb-6 pt-5 text-sm font-medium">
                                            <div className="flex-auto flex space-x-4">
                                                <button
                                                    className="h-10 px-6 font-semibold rounded-md bg-indigo-600 text-white hover:bg-slate-600"
                                                    type="submit"
                                                >
                                                    Buy now
                                                </button>
                                                <button
                                                    className="h-10 px-6 font-semibold rounded-md bg-yellow-200 text-black hover:bg-gray-200"
                                                    type="submit"
                                                >
                                                    Add to bag
                                                </button>
                                            </div>
                                            <button
                                                className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
                                                type="button"
                                                aria-label="Like"
                                            >
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <p className="text-sm text-slate-700">
                                            {product.description}
                                        </p>
                                    </form>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </AdminLayout>
        </>
    );
}
