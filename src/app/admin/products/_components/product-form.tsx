"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ImageUpload from "@/components/ui/image-upload"

interface ProductFormProps {
    initialData?: {
        name: string
        description: string
        price: number
        category: string
        images: string[]
    } | null
}

export default function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        description: initialData?.description || "",
        price: initialData?.price || 0,
        category: initialData?.category || "",
        images: initialData?.images || [],
    })

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simple verification - in real app use Server Actions or API
        // Here we will use a server action passed as prop or imported?
        // For simplicity, let's just use fetch to an API route we will create, or use a Server Action directly if possible.
        // To keep it simple and cleanly separated, I'll use a fetch to an API route for now, or Server Actions.
        // Let's use Server Actions but we need to define them. 
        // Actually, calling a server action from here is better.

        // I will dynamically import the server action or just use fetch for standard pattern.
        // Let's use fetch because defining Server Action in a separate file is cleaner.
        // I'll create /app/api/products/route.ts

        try {
            const url = initialData ? `/api/products/${(initialData as any).id}` : "/api/products" // simplified
            const method = initialData ? "PATCH" : "POST"

            const res = await fetch(url, {
                method,
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!res.ok) throw new Error("Something went wrong")

            router.push("/admin/products")
            router.refresh()
        } catch (error) {
            console.error(error)
            alert("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-8 max-w-3xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                    <span className="text-gray-700 dark:text-gray-300">Name</span>
                    <input
                        required
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-neutral-800 dark:border-neutral-700 p-2"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700 dark:text-gray-300">Price</span>
                    <input
                        required
                        type="number"
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-neutral-800 dark:border-neutral-700 p-2"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700 dark:text-gray-300">Category</span>
                    <input
                        required
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-neutral-800 dark:border-neutral-700 p-2"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                </label>
            </div>
            <label className="block">
                <span className="text-gray-700 dark:text-gray-300">Description</span>
                <textarea
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-neutral-800 dark:border-neutral-700 p-2"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </label>

            <div>
                <span className="block text-gray-700 dark:text-gray-300 mb-2">Images</span>
                <ImageUpload
                    value={formData.images}
                    onChange={(url) => setFormData((prev) => ({ ...prev, images: [...prev.images, url] }))}
                    onRemove={(url) => setFormData((prev) => ({ ...prev, images: prev.images.filter((current) => current !== url) }))}
                />
            </div>

            <button
                disabled={loading}
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Saving..." : initialData ? "Save Changes" : "Create Product"}
            </button>
        </form>
    )
}
