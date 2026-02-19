import Link from "next/link"
import prisma from "@/lib/prismadb"
import { Plus, Edit, Trash } from "lucide-react"
import { revalidatePath } from "next/cache"
import { Product } from "@/types"

export default async function ProductsPage() {
    let products: Product[] = [];
    try {
        products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" }
        });
    } catch (e) {
        console.warn("DB failed, using mock");
        const mockProduct = (id: string, name: string, price: number, cat: string) => ({
            id, name, description: 'Mock description', price, category: cat, images: [], createdAt: new Date(), updatedAt: new Date()
        });
        products = [
            mockProduct('1', 'Premium Leather Jacket', 299.99, 'Clothing'),
            mockProduct('2', 'Minimalist Watch', 199.99, 'Accessories'),
        ];
    }

    async function deleteProduct(formData: FormData) {
        "use server"
        const id = formData.get("id") as string
        await prisma.product.delete({ where: { id } })
        revalidatePath("/admin/products")
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                <Link href="/admin/products/new" className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-80 transition">
                    <Plus size={20} /> Add Product
                </Link>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden text-black dark:text-white">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-neutral-700">
                        <tr>
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Category</th>
                            <th className="p-4 font-medium">Price</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="p-4">{product.name}</td>
                                <td className="p-4">{product.category}</td>
                                <td className="p-4">${product.price.toFixed(2)}</td>
                                <td className="p-4 flex justify-end gap-2">
                                    <Link href={`/admin/products/${product.id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                        <Edit size={18} />
                                    </Link>
                                    <form action={deleteProduct}>
                                        <input type="hidden" name="id" value={product.id} />
                                        <button type="submit" className="p-2 text-red-600 hover:bg-red-50 rounded">
                                            <Trash size={18} />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">No products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
