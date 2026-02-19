"use client"

import { useCart } from "@/context/cart-context"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, ShoppingBag, AlertCircle } from "lucide-react"
import Link from "next/link"
import { validateShippingDetails } from "@/lib/validation"

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: ""
    })

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] bg-background flex flex-col items-center justify-center px-4">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
                <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
                <p className="text-muted-foreground mb-6">Add items to proceed to checkout</p>
                <Link href="/products" className="px-8 py-3 bg-accent text-accent-foreground rounded-full font-semibold hover:bg-accent/90 transition-all">
                    Continue Shopping
                </Link>
            </div>
        )
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setFieldErrors({})

        // Validate form data
        const validation = validateShippingDetails(formData)
        if (!validation.valid) {
            setFieldErrors(validation.errors)
            setError("Please correct the errors below before submitting.")
            return
        }

        setLoading(true)

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: items.map(i => ({ productId: i.id, quantity: i.quantity, price: i.price, name: i.name })),
                    totalAmount: totalPrice,
                    shippingDetails: formData
                })
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.error || "Order failed")
            }

            const orderData = await res.json()
            
            // Store order details for success page
            sessionStorage.setItem("lastOrderNumber", orderData.orderNumber || `ORD-${new Date().getTime().toString().slice(-8)}`)
            sessionStorage.setItem("lastOrderEmail", formData.email)

            clearCart()
            router.push("/checkout/success")
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to place order. Please try again."
            console.error(error)
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-2">Checkout</h1>
                    <p className="text-muted-foreground">Complete your purchase securely</p>
                </div>

                {error && (
                    <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-foreground mb-6">Shipping Details</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                                        <input
                                            required
                                            placeholder="John Doe"
                                            className={`w-full px-4 py-3 border ${fieldErrors.name ? "border-red-500" : "border-border"} rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition`}
                                            value={formData.name}
                                            onChange={e => {
                                                setFormData({ ...formData, name: e.target.value })
                                                if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: "" })
                                            }}
                                        />
                                        {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="you@example.com"
                                            className={`w-full px-4 py-3 border ${fieldErrors.email ? "border-red-500" : "border-border"} rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition`}
                                            value={formData.email}
                                            onChange={e => {
                                                setFormData({ ...formData, email: e.target.value })
                                                if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" })
                                            }}
                                        />
                                        {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Street Address</label>
                                        <input
                                            required
                                            placeholder="123 Main Street"
                                            className={`w-full px-4 py-3 border ${fieldErrors.address ? "border-red-500" : "border-border"} rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition`}
                                            value={formData.address}
                                            onChange={e => {
                                                setFormData({ ...formData, address: e.target.value })
                                                if (fieldErrors.address) setFieldErrors({ ...fieldErrors, address: "" })
                                            }}
                                        />
                                        {fieldErrors.address && <p className="text-red-500 text-xs mt-1">{fieldErrors.address}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">City</label>
                                            <input
                                                required
                                                placeholder="New York"
                                                className={`w-full px-4 py-3 border ${fieldErrors.city ? "border-red-500" : "border-border"} rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition`}
                                                value={formData.city}
                                                onChange={e => {
                                                    setFormData({ ...formData, city: e.target.value })
                                                    if (fieldErrors.city) setFieldErrors({ ...fieldErrors, city: "" })
                                                }}
                                            />
                                            {fieldErrors.city && <p className="text-red-500 text-xs mt-1">{fieldErrors.city}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">ZIP Code</label>
                                            <input
                                                required
                                                placeholder="10001"
                                                className={`w-full px-4 py-3 border ${fieldErrors.zip ? "border-red-500" : "border-border"} rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition`}
                                                value={formData.zip}
                                                onChange={e => {
                                                    setFormData({ ...formData, zip: e.target.value })
                                                    if (fieldErrors.zip) setFieldErrors({ ...fieldErrors, zip: "" })
                                                }}
                                            />
                                            {fieldErrors.zip && <p className="text-red-500 text-xs mt-1">{fieldErrors.zip}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-accent text-accent-foreground py-4 rounded-lg font-bold text-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                {loading ? "Processing..." : <>
                                    <Lock size={20} />
                                    Place Order - ${totalPrice.toFixed(2)}
                                </>}
                            </button>

                            <p className="text-center text-sm text-muted-foreground">
                                We accept all major payment methods. Your transaction is secure and encrypted.
                            </p>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                            <h2 className="text-lg font-bold text-foreground mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 pb-6 border-b border-border max-h-60 overflow-y-auto">
                                {items.map(item => (
                                    <div key={item.id} className="flex justify-between">
                                        <div>
                                            <p className="text-foreground font-medium line-clamp-1">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-foreground font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Shipping</span>
                                    <span className="text-accent font-semibold">Free</span>
                                </div>
                                <div className="border-t border-border pt-3 flex justify-between">
                                    <span className="font-bold text-foreground">Total</span>
                                    <span className="text-2xl font-bold text-accent">${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
