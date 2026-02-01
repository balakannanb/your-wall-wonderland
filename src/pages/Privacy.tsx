import { Layout } from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-20 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">
            Last updated: January 2024
          </p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create 
              an account, make a purchase, or contact us for support. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Name, email address, phone number, and shipping address</li>
              <li>Payment information (processed securely through our payment providers)</li>
              <li>Order history and preferences</li>
              <li>Communications you send to us</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
            <p className="text-muted-foreground">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Process and fulfill your orders</li>
              <li>Send you order confirmations and shipping updates</li>
              <li>Respond to your questions and provide customer support</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Improve our products and services</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Information Sharing</h2>
            <p className="text-muted-foreground">
              We do not sell, trade, or otherwise transfer your personal information to 
              outside parties except to trusted third parties who assist us in operating 
              our website, conducting our business, or serving you, as long as those 
              parties agree to keep this information confidential.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. All payment 
              transactions are processed through secure, encrypted channels.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@postercraft.in" className="text-primary hover:underline">
                privacy@postercraft.in
              </a>
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
