import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | YesDeal",
  description: "Learn about YesDeal's mission, values, and commitment to premium lifestyle products.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">About YesDeal</h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 text-pretty max-w-2xl mx-auto">
              Elevating everyday lifestyle with premium products designed for excellence
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-foreground/70 leading-relaxed">
                At YesDeal, we believe that everyone deserves access to premium quality products that enhance their lifestyle. Our mission is to curate and deliver the finest selection of clothing, accessories, and shoes that combine style, comfort, and durability.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                We're committed to making luxury accessible, providing exceptional customer service, and building a community of individuals who appreciate the finer things in life.
              </p>
            </div>
            <div className="bg-muted rounded-lg h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="text-lg font-medium">Premium Quality Image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-foreground">Quality First</h3>
              <p className="text-foreground/70">
                We meticulously select every product to ensure it meets our high standards of quality, craftsmanship, and durability.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-foreground">Customer Focused</h3>
              <p className="text-foreground/70">
                Your satisfaction is our priority. We provide exceptional customer service and support at every step of your journey.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-foreground">Sustainability</h3>
              <p className="text-foreground/70">
                We're committed to sustainable practices and responsible sourcing to protect our planet for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose YesDeal?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-bold text-xl">✓</div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Curated Selection</h3>
                <p className="text-foreground/70">
                  Every product is hand-picked to meet our exacting standards for quality and style.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-bold text-xl">✓</div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Fast Shipping</h3>
                <p className="text-foreground/70">
                  Get your items quickly with our efficient shipping and logistics partners worldwide.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-bold text-xl">✓</div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Easy Returns</h3>
                <p className="text-foreground/70">
                  Not satisfied? Our hassle-free return policy ensures your complete satisfaction.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-bold text-xl">✓</div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Expert Support</h3>
                <p className="text-foreground/70">
                  Our knowledgeable team is here to help with any questions or concerns you may have.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Join Our Community</h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Discover premium products and become part of a lifestyle community that values quality and excellence.
          </p>
          <a
            href="/products"
            className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors duration-300"
          >
            Start Shopping
          </a>
        </div>
      </section>
    </main>
  );
}
