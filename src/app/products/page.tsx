import prisma from "@/lib/prismadb";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shop | YesDeal",
    description: "Explore our curated collection of premium products designed for the modern lifestyle.",
};

interface ProductsPageProps {
    searchParams: Promise<{
        category?: string;
        search?: string;
    }>;
}

import { Product } from "@/types";
import FadeIn from "@/components/ui/fade-in";

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const { category, search } = await searchParams;

    let products: Product[] = [];
    let categories: { category: string }[] = [];

    try {
        const where: any = {};
        if (category) {
            where.category = { equals: category, mode: "insensitive" };
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } }
            ];
        }

        products = await prisma.product.findMany({
            where,
            orderBy: { createdAt: "desc" },
        });

        categories = await prisma.product.findMany({
            select: { category: true },
            distinct: ["category"],
        });
    } catch (e) {
        console.warn("DB failed, using mocks");
        const mockProduct = (id: string, name: string, price: number, cat: string) => ({
            id, name, description: 'Mock description', price, category: cat, images: [`https://placehold.co/600x600/1a1a1a/white?text=${name.split(' ')[0]}`], createdAt: new Date(), updatedAt: new Date()
        });
        products = [
            mockProduct('1', 'Premium Leather Jacket', 299.99, 'Clothing'),
            mockProduct('2', 'Minimalist Watch', 199.99, 'Accessories'),
        ];
        categories = [{ category: 'Clothing' }, { category: 'Accessories' }];
    }


    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header / Filter Bar */}
            <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{category || "All Products"}</h1>
                    <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        <Link
                            href="/products"
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap duration-300 ${!category
                                    ? "bg-accent text-accent-foreground shadow-md"
                                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                                }`}
                        >
                            All
                        </Link>
                        {categories.map((c) => (
                            <Link
                                key={c.category}
                                href={`/products?category=${c.category}`}
                                className={`px-5 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap duration-300 ${category === c.category
                                        ? "bg-accent text-accent-foreground shadow-md"
                                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                                    }`}
                            >
                                {c.category}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product, i) => (
                        <FadeIn key={product.id} delay={i * 0.05}>
                            <Link href={`/products/${product.id}`} className="group block h-full">
                                <div className="rounded-2xl bg-card overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 h-full flex flex-col">
                                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                                        {product.images[0] ? (
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                fill
                                                className="object-cover object-center group-hover:scale-110 transition duration-700 ease-in-out"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-muted-foreground bg-muted">
                                                <span className="text-sm">No Image</span>
                                            </div>
                                        )}
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        <div className="mb-3">
                                            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">{product.category}</p>
                                            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-2">{product.name}</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">{product.description}</p>
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                                            <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
                                            <span className="text-sm font-semibold text-accent group-hover:text-accent/80 transition-colors duration-300">Shop</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                    {products.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                            <h3 className="text-lg font-medium text-foreground">No products found</h3>
                            <p className="text-muted-foreground mt-2">Try adjusting your filters or check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
