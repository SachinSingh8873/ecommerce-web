"use client"

import { useCart } from "@/context/cart-context"
import Link from "next/link"
import Image from "next/image"
import { Trash, Minus, Plus, ArrowRight } from "lucide-react"

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalPrice } = useCart()

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] bg-background flex flex-col items-center justify-center px-4">
                <h1 className="text-3xl font-bold text-foreground mb-6">Your shopping bag is empty</h1>
                <p className="text-muted-foreground mb-8">Add some premium items to get started</p>
                <Link href="/products" className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-full hover:bg-accent/90 transition-all duration-300 font-semibold">
                    Continue Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-12">Shopping Bag</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-6 bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                {item.image ? (
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No Image</div>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
                                        <p className="font-bold text-accent text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3 bg-muted rounded-full px-4 py-2">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="disabled:opacity-30 hover:text-accent transition-colors">
                                            <Minus size={18} />
                                        </button>
                                        <span className="font-medium text-foreground min-w-[2ch] text-center">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-accent transition-colors">
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                    <button onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive/80 p-2 transition-colors">
                                        <Trash size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-card border border-border rounded-2xl p-8 sticky top-24">
                        <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-8 pb-8 border-b border-border">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                                <span className="font-medium text-foreground">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="font-medium text-accent">Free</span>
                            </div>
                            <div className="pt-4 flex justify-between font-bold text-lg">
                                <span className="text-foreground">Total</span>
                                <span className="text-accent text-2xl">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <Link href="/checkout" className="w-full bg-accent text-accent-foreground py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-accent/90 transition-all duration-300 hover:shadow-lg">
                            Proceed to Checkout <ArrowRight size={20} />
                        </Link>
                        <Link href="/products" className="w-full mt-3 border-2 border-border text-foreground py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-muted transition-all duration-300">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
