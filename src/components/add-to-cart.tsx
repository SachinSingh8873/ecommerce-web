"use client"

import { useCart } from "@/context/cart-context"
import { useState } from "react"
import { ShoppingBag, CheckCircle } from "lucide-react"
import Toast from "@/components/Toast"

interface AddToCartProps {
    product: {
        id: string
        name: string
        price: number
        images: string[]
    }
    className?: string
}

export default function AddToCart({ product, className }: AddToCartProps) {
    const { addItem } = useCart()
    const [showToast, setShowToast] = useState(false)
    const [isAdding, setIsAdding] = useState(false)

    const handleAdd = () => {
        setIsAdding(true)
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0] || "",
            quantity: 1,
        })
        setShowToast(true)
        setTimeout(() => setIsAdding(false), 300)
    }

    return (
        <>
            <button
                onClick={handleAdd}
                disabled={isAdding}
                className={className || "w-full bg-accent text-accent-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent/90 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"}
            >
                <ShoppingBag size={20} />
                {isAdding ? "Adding..." : "Add to Cart"}
            </button>
            {showToast && (
                <Toast
                    message={`${product.name} added to cart`}
                    type="success"
                    duration={3000}
                    onClose={() => setShowToast(false)}
                    action={{
                        label: "View Cart",
                        onClick: () => window.location.href = "/cart"
                    }}
                />
            )}
        </>
    )
}
