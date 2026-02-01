import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { StrapiProduct, getStrapiMediaUrl } from "@/lib/strapi";
import { toast } from "sonner";
import { useState } from "react";

interface ProductCardProps {
  product: StrapiProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  
  const image = product.images?.[0];
  const firstVariant = product.variants?.[0];
  const price = firstVariant?.price || product.price;

  const formatPrice = (amount: number, currency: string = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;

    setIsAdding(true);
    
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 200));
    
    addItem(product, firstVariant);
    
    toast.success("Added to cart", {
      description: product.title,
    });
    
    setIsAdding(false);
  };

  const imageUrl = image ? getStrapiMediaUrl(image.url) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={`/product/${product.handle}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={image?.alternativeText || product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gradient-to-br from-primary/10 to-primary/5">
              <span className="text-4xl">🖼️</span>
            </div>
          )}
          
          {/* Quick Add Button */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={handleAddToCart}
              disabled={isAdding || !product.inStock}
              className="w-full"
              variant="secondary"
            >
              {isAdding ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>

          {/* Out of Stock Badge */}
          {!product.inStock && (
            <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
        </div>
        
        <div className="mt-3 space-y-1">
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.title}
          </h3>
          <p className="text-lg font-semibold">
            {formatPrice(price, product.currency)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
