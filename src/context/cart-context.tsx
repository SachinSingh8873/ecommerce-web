"use client"

import { createContext, useContext, useState, useEffect } from "react"

export type CartItem = {
    id: string
    name: string
    price: number
    image: string
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem("cart")
        if (saved) {
            try {
                setItems(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to parse cart", e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save to local storage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("cart", JSON.stringify(items))
        }
    }, [items, isLoaded])

    const addItem = (newItem: CartItem) => {
        setItems((current) => {
            const existing = current.find((item) => item.id === newItem.id)
            if (existing) {
                return current.map((item) =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                )
            }
            return [...current, newItem]
        })
    }

    const removeItem = (id: string) => {
        setItems((current) => current.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return removeItem(id)
        setItems((current) =>
            current.map((item) => (item.id === id ? { ...item, quantity } : item))
        )
    }

    const clearCart = () => setItems([])

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error("useCart must be used within a CartProvider")
    return context
}
