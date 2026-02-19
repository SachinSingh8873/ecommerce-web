"use client";

import { useState } from "react";
import { Metadata } from "next";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Contact Us</h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 text-pretty max-w-2xl mx-auto">
              We'd love to hear from you. Get in touch with us today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card border border-border rounded-lg p-8 text-center space-y-4 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto">
                <Mail className="text-accent" size={24} />
              </div>
              <h3 className="text-lg font-bold text-foreground">Email</h3>
              <p className="text-foreground/70">support@yesdeal.com</p>
              <a
                href="mailto:support@yesdeal.com"
                className="inline-block text-accent hover:text-accent/80 font-medium transition-colors"
              >
                Send Email
              </a>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 text-center space-y-4 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto">
                <Phone className="text-accent" size={24} />
              </div>
              <h3 className="text-lg font-bold text-foreground">Phone</h3>
              <p className="text-foreground/70">+1 (555) 123-4567</p>
              <a
                href="tel:+15551234567"
                className="inline-block text-accent hover:text-accent/80 font-medium transition-colors"
              >
                Call Us
              </a>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 text-center space-y-4 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto">
                <MapPin className="text-accent" size={24} />
              </div>
              <h3 className="text-lg font-bold text-foreground">Address</h3>
              <p className="text-foreground/70">123 Premium Street<br />Suite 100, NY 10001</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-accent hover:text-accent/80 font-medium transition-colors"
              >
                View Map
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Send Us a Message</h2>
              <p className="text-foreground/70 text-lg">
                Have a question? We're here to help. Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
              {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  Oops! Something went wrong. Please try again later.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-foreground">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent"
                  placeholder="How can we help?"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-accent-foreground font-semibold py-3 rounded-lg hover:bg-accent/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send size={20} />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6 space-y-2">
              <h3 className="text-lg font-bold text-foreground">What are your business hours?</h3>
              <p className="text-foreground/70">
                We're available Monday through Friday, 9 AM to 6 PM EST. Weekend support is available for urgent matters.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-2">
              <h3 className="text-lg font-bold text-foreground">How long does it take to get a response?</h3>
              <p className="text-foreground/70">
                We typically respond to all inquiries within 24 hours. For urgent matters, please call us directly.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-2">
              <h3 className="text-lg font-bold text-foreground">Do you offer international shipping?</h3>
              <p className="text-foreground/70">
                Yes, we ship to most countries worldwide. Shipping costs and times vary by location. Contact us for details.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-2">
              <h3 className="text-lg font-bold text-foreground">What's your return policy?</h3>
              <p className="text-foreground/70">
                We offer a 30-day return policy for most items. Please visit our Terms page for complete details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
