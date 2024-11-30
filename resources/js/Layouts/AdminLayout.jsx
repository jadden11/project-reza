import { Link, usePage } from "@inertiajs/react";

const AdminLayout = ({ children }) => {
    const { component } = usePage();
    const { auth } = usePage().props;
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
                            }
                            `}
                            href="/dashboard"
                        >
                            Dashboard
                        </Link>

                        <Link
                            className={`${
                                component === "Toko"
                                    ? "font-semibold text-indigo-500"
                                    : ""
                            }
                            `}
                            href="/toko"
                        >
                            Toko
                        </Link>
                    </ul>
                    <div>{auth.user.name}</div>
                </div>
            </header>
            <main>
                <div className="container mx-auto">{children}</div>
            </main>
        </>
    );
};

export default AdminLayout;
