import { Layout } from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-20 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">
            Last updated: January 2024
          </p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Agreement to Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using this website, you accept and agree to be bound by 
              these Terms and Conditions. If you do not agree to these terms, please do 
              not use our website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Products and Pricing</h2>
            <p className="text-muted-foreground">
              All prices are listed in Indian Rupees (INR) and include applicable taxes. 
              We reserve the right to modify prices at any time without prior notice. 
              Prices at the time of order placement will apply to your purchase.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Orders and Payment</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>All orders are subject to availability</li>
              <li>We reserve the right to refuse or cancel any order</li>
              <li>Payment must be completed at the time of order</li>
              <li>We accept major credit/debit cards, UPI, and net banking</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Shipping and Delivery</h2>
            <p className="text-muted-foreground">
              We aim to ship all orders within 2-3 business days. Delivery times vary 
              based on your location. We are not responsible for delays caused by 
              shipping carriers or customs.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content on this website, including images, text, graphics, and logos, 
              is the property of PosterCraft and is protected by copyright laws. You may 
              not reproduce, distribute, or use any content without our written permission.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Custom Poster Uploads</h2>
            <p className="text-muted-foreground">
              By uploading images for custom posters, you confirm that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>You own the rights to the image or have permission to use it</li>
              <li>The image does not violate any laws or third-party rights</li>
              <li>The image is not offensive, illegal, or inappropriate</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              PosterCraft shall not be liable for any indirect, incidental, or 
              consequential damages arising from your use of our products or services. 
              Our maximum liability is limited to the amount paid for the specific 
              product in question.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="text-muted-foreground">
              For questions about these Terms & Conditions, please contact us at{" "}
              <a href="mailto:legal@postercraft.in" className="text-primary hover:underline">
                legal@postercraft.in
              </a>
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
