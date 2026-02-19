import prisma from "@/lib/prismadb"
import ProductForm from "../../_components/product-form"
import { Product } from "@/types"

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let product: Product | null = null;

    try {
        product = await prisma.product.findUnique({
            where: {
                id: id
            }
        })
    } catch (e) {
        console.warn("DB failed, using mock");
        product = {
            id, name: 'Mock Product', description: 'Mock Description', price: 100, category: 'Mock', images: [], createdAt: new Date(), updatedAt: new Date()
        };
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <h1 className="text-3xl font-bold">Edit Product</h1>
                <ProductForm initialData={product} />
            </div>
        </div>
    )
}
