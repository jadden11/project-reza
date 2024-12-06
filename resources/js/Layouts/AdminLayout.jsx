import { Link, usePage } from "@inertiajs/react";
import axios from "axios";

const AdminLayout = ({ children }) => {
    const { component } = usePage();
    const { auth } = usePage().props;

    const handleLogout = (e) => {
        e.preventDefault();
        axios
            .post("/logout")
            .then((response) => {
                // Redirect atau lakukan sesuatu setelah logout
                window.location.href = response.data.redirect; // Pastikan backend mengembalikan URL redirect
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    };

    return (
        <>
            <header className="bg-white shadow py-10">
                <div className="container mx-auto flex justify-between items-center">
                    <h2>MZAR</h2>
                    <ul className="flex gap-3">
                        <Link
                            className={`${
                                component === "Dashboard"
                                    ? "font-semibold text-indigo-500"
                                    : ""
                            }`}
                            href="/dashboard"
                        >
                            Dashboard
                        </Link>

                        <Link
                            className={`${
                                component === "Toko"
                                    ? "font-semibold text-indigo-500"
                                    : ""
                            }`}
                            href="/toko"
                        >
                            Toko
                        </Link>
                    </ul>
                    <div>
                        {auth.user.name}
                        <button
                            onClick={handleLogout}
                            className="ml-4 bg-red-600 text-white px-4 py-2 rounded-md"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>
            <main>
                <div className="container mx-auto">{children}</div>
            </main>
        </>
    );
};

export default AdminLayout;
