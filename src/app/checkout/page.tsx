"use client"

import { useCart } from "@/context/cart-context"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: ""
    })

    // Prevent accessing checkout if cart is empty
    if (items.length === 0) {
        // In a useEffect in real app, but this works for basic blocking
        // return <div>Your cart is empty.</div>
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: items.map(i => ({ productId: i.id, quantity: i.quantity })),
                    totalAmount: totalPrice,
                    shippingDetails: formData
                })
            })

            if (!res.ok) throw new Error("Order failed")

            clearCart()
            router.push("/checkout/success")
        } catch (error) {
            console.error(error)
            alert("Failed to place order.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <form onSubmit={onSubmit} className="space-y-4">
                    <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
                    <input required placeholder="Full Name" className="w-full p-3 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                        value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    <input required type="email" placeholder="Email" className="w-full p-3 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                        value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    <input required placeholder="Address" className="w-full p-3 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                        value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                    <div className="grid grid-cols-2 gap-4">
                        <input required placeholder="City" className="w-full p-3 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                            value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                        <input required placeholder="ZIP Code" className="w-full p-3 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                            value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })} />
                    </div>

                    <button disabled={loading} type="submit" className="w-full bg-black text-white py-4 rounded-full font-bold mt-8 hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-black">
                        {loading ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
                    </button>
                </form>

                <div className="bg-gray-50 dark:bg-neutral-900 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    {items.map(item => (
                        <div key={item.id} className="flex justify-between py-2 border-b dark:border-neutral-800">
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t dark:border-neutral-700">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
