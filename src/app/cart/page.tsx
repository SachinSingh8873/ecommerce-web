"use client"

import { useCart } from "@/context/cart-context"
import Link from "next/link"
import Image from "next/image"
import { Trash, Minus, Plus, ArrowRight } from "lucide-react"

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalPrice } = useCart()

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold mb-6">Your shopping bag is empty</h1>
                <Link href="/products" className="inline-block bg-black text-white px-8 py-3 rounded-full hover:opacity-80 transition dark:bg-white dark:text-black">
                    Continue Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-12">Shopping Bag</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-6 border-b border-gray-100 dark:border-neutral-800 pb-8 last:border-0">
                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 dark:bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                                {item.image ? (
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <h3 className="font-medium text-lg">{item.name}</h3>
                                        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    {/* Add more details here if needed */}
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-neutral-800 rounded-full px-4 py-1">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="disabled:opacity-30">
                                            <Minus size={16} />
                                        </button>
                                        <span className="font-medium">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 p-2">
                                        <Trash size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-8 sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                <span className="font-medium">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                                <span className="font-medium">Free</span>
                            </div>
                            <div className="border-t border-gray-200 dark:border-neutral-700 pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <Link href="/checkout" className="w-full bg-black text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition dark:bg-white dark:text-black">
                            Checkout <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
