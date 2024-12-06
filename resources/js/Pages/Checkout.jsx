import React from "react";
import { useForm } from "@inertiajs/react";

export default function Checkout() {
    const { data, setData, post, processing } = useForm({
        paymentMethod: "",
        // Add other necessary fields
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/checkout", data);
    };

    return (
        <div>
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Payment Method:
                    <input
                        type="text"
                        value={data.paymentMethod}
                        onChange={(e) =>
                            setData("paymentMethod", e.target.value)
                        }
                    />
                </label>
                {/* Add more fields as necessary */}
                <button type="submit" disabled={processing}>
                    {processing ? "Processing..." : "Pay Now"}
                </button>
            </form>
        </div>
    );
}
