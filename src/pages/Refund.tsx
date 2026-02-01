import { Layout } from "@/components/layout/Layout";

const Refund = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-20 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">
            Last updated: January 2024
          </p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Guarantee</h2>
            <p className="text-muted-foreground">
              We want you to be completely satisfied with your purchase. If you're not 
              happy with your order, we're here to help.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Returns</h2>
            <p className="text-muted-foreground">
              You have 7 days from the date of delivery to return your items. To be 
              eligible for a return:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Item must be unused and in the original packaging</li>
              <li>Item must not be damaged by the customer</li>
              <li>Custom printed posters cannot be returned unless there's a printing defect</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Damaged or Defective Items</h2>
            <p className="text-muted-foreground">
              If your item arrives damaged or has a printing defect, please contact us 
              within 48 hours of delivery with photos of the damage. We will arrange for 
              a replacement or full refund at no additional cost to you.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Refund Process</h2>
            <p className="text-muted-foreground">
              Once we receive and inspect your return, we will notify you of the approval 
              or rejection of your refund. If approved:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Refunds will be processed within 5-7 business days</li>
              <li>Amount will be credited to your original payment method</li>
              <li>Shipping costs are non-refundable unless the return is due to our error</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">How to Initiate a Return</h2>
            <p className="text-muted-foreground">
              To initiate a return, please email us at{" "}
              <a href="mailto:returns@postercraft.in" className="text-primary hover:underline">
                returns@postercraft.in
              </a>{" "}
              with your order number and reason for return. Our team will guide you through 
              the process.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Refund;
