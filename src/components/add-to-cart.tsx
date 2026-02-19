"use client"

import { useCart } from "@/context/cart-context"
import { useState } from "react"
import { ShoppingBag } from "lucide-react"

interface AddToCartProps {
    product: {
        id: string
        name: string
        price: number
        images: string[]
    }
}

export default function AddToCart({ product }: AddToCartProps) {
    const { addItem } = useCart()
    const [isAdded, setIsAdded] = useState(false)

    const handleAdd = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0] || "",
            quantity: 1,
        })
        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
    }

    return (
        <button
            onClick={handleAdd}
            className="w-full bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition flex items-center justify-center gap-2 dark:bg-white dark:text-black"
        >
            <ShoppingBag size={20} />
            {isAdded ? "Added to Bag" : "Add to Cart"}
        </button>
    )
}
