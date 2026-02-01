import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useProducts } from "@/hooks/useProducts";

export function FeaturedProducts() {
  const { products, isLoading } = useProducts({ pageSize: 8 });

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Best Sellers
            </h2>
            <p className="text-muted-foreground">
              Our most popular posters loved by customers
            </p>
          </div>
          <Button asChild variant="outline" className="group w-fit">
            <Link to="/shop">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <ProductGrid products={products} isLoading={isLoading} />
      </div>
    </section>
  );
}
