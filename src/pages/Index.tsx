import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { CollectionsSection } from "@/components/home/CollectionsSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CollectionsSection />
      <FeaturedProducts />
      <TestimonialsSection />
      <NewsletterSection />
    </Layout>
  );
};

export default Index;
