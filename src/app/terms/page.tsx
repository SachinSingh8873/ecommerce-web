import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | YesDeal",
  description: "Read YesDeal's terms of service, including our policies and conditions for using our platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Terms of Service</h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 text-pretty max-w-2xl mx-auto">
              Please read these terms carefully before using YesDeal
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none space-y-8">
            {/* Last Updated */}
            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Last Updated:</span> January 2025
              </p>
            </div>

            {/* Introduction */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">1. Agreement to Terms</h2>
              <p className="text-foreground/70 leading-relaxed">
                By accessing and using the YesDeal website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            {/* Use License */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">2. Use License</h2>
              <p className="text-foreground/70 leading-relaxed">
                Permission is granted to temporarily download one copy of the materials (information or software) on YesDeal's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/70">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">3. Disclaimer</h2>
              <p className="text-foreground/70 leading-relaxed">
                The materials on YesDeal's website are provided on an 'as is' basis. YesDeal makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            {/* Limitations */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">4. Limitations</h2>
              <p className="text-foreground/70 leading-relaxed">
                In no event shall YesDeal or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on YesDeal's website, even if YesDeal or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </div>

            {/* Accuracy of Materials */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">5. Accuracy of Materials</h2>
              <p className="text-foreground/70 leading-relaxed">
                The materials appearing on YesDeal's website could include technical, typographical, or photographic errors. YesDeal does not warrant that any of the materials on its website are accurate, complete, or current. YesDeal may make changes to the materials contained on its website at any time without notice.
              </p>
            </div>

            {/* Return and Refund Policy */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">6. Return and Refund Policy</h2>
              <p className="text-foreground/70 leading-relaxed">
                We offer a 30-day return policy from the date of purchase. Items must be in original condition with all tags attached. Once we receive and inspect your returned item, we will process your refund within 5-7 business days. Shipping costs are non-refundable unless the return is due to our error.
              </p>
            </div>

            {/* Product Information */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">7. Product Information</h2>
              <p className="text-foreground/70 leading-relaxed">
                We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free. If a product offered by YesDeal is not as described, your sole remedy is to return it in unused condition.
              </p>
            </div>

            {/* User Accounts */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">8. User Accounts</h2>
              <p className="text-foreground/70 leading-relaxed">
                When you create an account with YesDeal, you are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
              </p>
            </div>

            {/* Prohibited Conduct */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">9. Prohibited Conduct</h2>
              <p className="text-foreground/70 leading-relaxed">
                You agree not to engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website. Prohibited behavior includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/70">
                <li>Harassing or causing distress or inconvenience to any person</li>
                <li>Offending the decency or accepted standards of internet practices</li>
                <li>Disrupting the normal flow of dialogue within our website</li>
                <li>Attempting unauthorized access to our systems</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">10. Intellectual Property Rights</h2>
              <p className="text-foreground/70 leading-relaxed">
                All content on the YesDeal website, including but not limited to text, graphics, logos, images, and software, is the property of YesDeal or its content suppliers and is protected by international copyright laws. Unauthorized use of any materials is prohibited.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">11. Limitation of Liability</h2>
              <p className="text-foreground/70 leading-relaxed">
                YesDeal shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website or materials, even if we have been advised of the possibility of such damages.
              </p>
            </div>

            {/* Modifications */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">12. Modifications to Terms</h2>
              <p className="text-foreground/70 leading-relaxed">
                YesDeal may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service. Your continued use of the site following the posting of revised terms means that you accept and agree to the changes.
              </p>
            </div>

            {/* Governing Law */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">13. Governing Law</h2>
              <p className="text-foreground/70 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-muted/50 border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Need Help?</h2>
              <p className="text-foreground/70 leading-relaxed">
                If you have any questions about these terms of service, please contact us at:
              </p>
              <div className="space-y-2 text-foreground/70">
                <p><span className="font-semibold">Email:</span> support@yesdeal.com</p>
                <p><span className="font-semibold">Phone:</span> +1 (555) 123-4567</p>
                <p><span className="font-semibold">Address:</span> 123 Premium Street, Suite 100, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
