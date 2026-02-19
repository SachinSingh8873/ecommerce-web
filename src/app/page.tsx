import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prismadb";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";
import FadeIn from "@/components/ui/fade-in";

export const revalidate = 0; // Ensure fresh data on every request

export default async function Home() {
  let featuredProducts: Product[] = [];
  let latestProducts: Product[] = [];

  try {
    featuredProducts = await prisma.product.findMany({
      take: 3,
      orderBy: { price: 'desc' }
    });
    latestProducts = await prisma.product.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {
    console.warn("Database connection failed, using mock data for Homepage");
    const mockProduct = (id: string, name: string, price: number, cat: string) => ({
      id, name, description: 'Mock description', price, category: cat,
      images: [`https://placehold.co/600x600/1a1a1a/white?text=${name.split(' ')[0]}`],
      createdAt: new Date(), updatedAt: new Date()
    });
    featuredProducts = [
      mockProduct('1', 'Premium Leather Jacket', 299.99, 'Clothing'),
      mockProduct('2', 'Minimalist Watch', 199.99, 'Accessories'),
      mockProduct('3', 'Suede Loafers', 149.99, 'Shoes'),
    ];
    latestProducts = [
      mockProduct('4', 'Silk Scarf', 89.99, 'Accessories'),
      mockProduct('5', 'Cashmere Sweater', 249.99, 'Clothing'),
      mockProduct('6', 'Leather Belt', 59.99, 'Accessories'),
      mockProduct('7', 'Designer Sunglasses', 349.99, 'Accessories'),
    ];
  }

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30 z-10" />
          {/* Background Image */}
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center scale-105" />
        </div>

        <FadeIn className="relative z-20 text-center px-4 max-w-5xl mx-auto space-y-8" delay={0.2}>
          <div className="inline-block px-4 py-2 border border-white/20 rounded-full text-xs font-medium tracking-widest uppercase backdrop-blur-md bg-white/5">
            New Season Arrivals
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Elegance <span className="text-primary-foreground/80 italic font-serif">Redefined.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Discover a curated collection of premium essentials designed for the modern connoisseur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              href="/products"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95 shadow-xl"
            >
              Shop Collection
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-transparent border border-white/40 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              Our Story
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Trust Signals */}
      <section className="py-12 border-y border-border bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Worldwide Shipping</h3>
              <p className="text-sm text-muted-foreground">Free shipping on all global orders over $250.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">Hand-picked materials for lasting durability.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">Encrypted transactions for your peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <FadeIn direction="up" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Curated</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Featured Collection</h2>
          </div>
          <Link href="/products" className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
            View all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
          {featuredProducts.map((product, i) => (
            <FadeIn
              key={product.id}
              delay={i * 0.1}
              className={`relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <Link href={`/products/${product.id}`} className="block h-full w-full">
                <div className="relative h-full min-h-[400px]">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

                  <div className="absolute bottom-0 left-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-80">{product.category}</p>
                    <h3 className="text-xl md:text-2xl font-bold mb-1">{product.name}</h3>
                    <p className="font-medium text-lg">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Full-width Banner */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden my-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Designed for the Bold.</h2>
          <Link
            href="/products"
            className="inline-block border-b-2 border-white pb-1 text-xl hover:text-gray-200 hover:border-gray-200 transition-colors"
          >
            Explore the Lookbook
          </Link>
        </div>
      </section>

      {/* Latest Arrivals */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Arrivals</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fresh from our studio. Be the first to own our newest releases.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {latestProducts.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.05}>
              <Link href={`/products/${product.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted mb-4 shadow-md group-hover:shadow-xl transition-shadow">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      No Image
                    </div>
                  )}
                  {/* Quick View Button */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <button className="w-full bg-white text-black py-3 rounded-full font-semibold shadow-lg text-sm hover:bg-gray-100">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold truncate group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-muted-foreground capitalize">{product.category}</p>
                    <p className="font-bold text-foreground">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="px-8 py-3 border border-border rounded-full hover:bg-muted font-medium transition-colors inline-block"
          >
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
}