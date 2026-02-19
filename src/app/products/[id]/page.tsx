import prisma from "@/lib/prismadb";
import Image from "next/image";
import AddToCart from "@/components/add-to-cart";
import { notFound } from "next/navigation";
import { Metadata, Viewport } from "next";

export const dynamic = 'force-dynamic';

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

import { Product } from "@/types";
import FadeIn from "@/components/ui/fade-in";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: "#1e3a5f",
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { id } = await params;
    try {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) return { title: "Product Not Found" };
        return {
            title: `${product.name} | YesDeal`,
            description: product.description,
        }
    } catch (e) {
        return { title: "Mock Product | YesDeal" }
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    let product: Product | null = null;

    try {
        product = await prisma.product.findUnique({
            where: { id },
        });
    } catch (e) {
        console.warn("DB failed, using mock");
        product = {
            id, name: 'Mock Product Details', description: 'This is a mock product because the database is not connected.', price: 199.99, category: 'Mock', images: ['https://placehold.co/600x600/1a1a1a/white?text=Mock'], createdAt: new Date(), updatedAt: new Date()
        };
    }

    if (!product) notFound();


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                {/* Image Gallery */}
                <FadeIn direction="right" className="space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted border border-border">
                        {product.images[0] ? (
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">No Image</div>
                        )}
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.slice(1).map((img, i) => (
                            <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-muted border border-border cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                                <Image src={img} alt={`${product.name} ${i}`} fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                </FadeIn>

                {/* Product Info */}
                <FadeIn direction="left" className="flex flex-col justify-center">
                    <div className="mb-6">
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">{product.category}</p>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">{product.name}</h1>
                        <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
                    </div>

                    <div className="prose prose-lg dark:prose-invert text-muted-foreground mb-8">
                        <p>{product.description}</p>
                    </div>

                    <div className="mt-auto pt-6 border-t border-border">
                        <AddToCart product={product} />
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
