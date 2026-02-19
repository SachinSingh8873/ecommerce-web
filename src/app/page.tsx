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
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
        <div className="absolute inset-0 opacity-10">
          {/* Subtle pattern overlay */}
          <div className="w-full h-full" style={{backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)", backgroundSize: "50px 50px"}} />
        </div>

        <FadeIn className="relative z-20 text-center px-4 max-w-5xl mx-auto space-y-8" delay={0.2}>
          <div className="inline-block px-4 py-2 border border-accent/30 rounded-full text-xs font-medium tracking-widest uppercase backdrop-blur-md bg-accent/10 text-white">
            Premium Collection 2024
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white text-balance">
            Premium Quality <span className="text-accent">Meets</span> Everyday Excellence
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto font-light leading-relaxed">
            Discover a thoughtfully curated collection of premium products designed for those who appreciate quality, style, and substance in every detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              href="/products"
              className="px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold text-lg hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 shadow-xl"
            >
              Explore Collection
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-transparent border-2 border-white/40 text-white rounded-full font-medium text-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Trust Signals */}
      <section className="py-16 border-y border-border bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3 group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300 mx-auto">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
              </div>
              <h3 className="font-semibold text-lg text-foreground">Worldwide Shipping</h3>
              <p className="text-sm text-muted-foreground">Fast & free shipping on orders over $250 worldwide.</p>
            </div>
            <div className="space-y-3 group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300 mx-auto">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-semibold text-lg text-foreground">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">Carefully selected materials for lasting durability.</p>
            </div>
            <div className="space-y-3 group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300 mx-auto">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="font-semibold text-lg text-foreground">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">Encrypted & secure transactions for peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <FadeIn direction="up" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Hand-Picked Selection</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Featured Collection</h2>
          </div>
          <Link href="/products" className="group flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-300">
            View all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
          {featuredProducts.map((product, i) => (
            <FadeIn
              key={product.id}
              delay={i * 0.1}
              className={`relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${
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
                      className="object-cover transition duration-700 group-hover:scale-110"
                      sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-accent">{product.category}</p>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-balance">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
                      <span className="text-accent font-medium text-sm">Shop Now</span>
                    </div>
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
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Where Quality Meets Innovation</h2>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground rounded-full font-semibold hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Explore Collection
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Latest Arrivals */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <FadeIn className="mb-12 text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Latest Arrivals</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Freshly curated pieces. Be among the first to discover our newest collections.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {latestProducts.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.05}>
              <Link href={`/products/${product.id}`} className="group block h-full">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      No Image
                    </div>
                  )}
                  {/* Overlay and Quick View Button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full bg-accent text-accent-foreground py-2.5 rounded-full font-semibold shadow-lg text-sm hover:bg-accent/90 transition-colors duration-300">
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">{product.category}</p>
                  <h3 className="text-base font-semibold line-clamp-2 group-hover:text-accent transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="font-bold text-lg text-foreground">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="px-8 py-3 bg-accent text-accent-foreground rounded-full hover:bg-accent/90 font-semibold transition-all duration-300 inline-block hover:shadow-lg hover:scale-105"
          >
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
}
