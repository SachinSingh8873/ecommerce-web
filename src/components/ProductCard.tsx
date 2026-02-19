"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured';
  delay?: number;
}

export default function ProductCard({ product, variant = 'default', delay = 0 }: ProductCardProps) {
  const isSmall = variant === 'default';

  if (variant === 'featured') {
    return (
      <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
        <Link href={`/products/${product.id}`} className="block h-full w-full">
          <div className="relative h-full min-h-[400px]">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
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
      </div>
    );
  }

  return (
    <div
      style={{
        animation: `fadeInUp 0.6s ease-out ${delay}s backwards`,
      }}
      className="block h-full"
    >
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
            <button className="w-full bg-accent text-accent-foreground py-2.5 rounded-full font-semibold shadow-lg text-sm hover:bg-accent/90 transition-colors duration-300 flex items-center justify-center gap-2">
              <ShoppingBag size={16} />
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
    </div>
  );
}
