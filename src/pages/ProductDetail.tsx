import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { useProduct } from "@/hooks/useProduct";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, ArrowLeft, Loader2, Check, Truck, RotateCcw, Shield } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { product, isLoading, error } = useProduct(handle || "");
  const { addItem, isLoading: cartLoading } = useCartStore();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Find selected variant
  const getSelectedVariant = () => {
    if (!product) return null;
    
    // If no options selected yet, use first variant
    if (Object.keys(selectedOptions).length === 0) {
      return product.variants.edges[0]?.node;
    }

    return product.variants.edges.find((v) => {
      return v.node.selectedOptions.every(
        (opt) => selectedOptions[opt.name] === opt.value
      );
    })?.node;
  };

  const selectedVariant = getSelectedVariant();

  const formatPrice = (amount: string, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
    }).format(parseFloat(amount));
  };

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;

    const cartItem: Omit<CartItem, 'lineId'> = {
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions,
    };

    await addItem(cartItem);
    toast.success("Added to cart", {
      description: product.title,
    });
  };

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-20 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/shop">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const images = product.images.edges;
  const currentImage = images[selectedImageIndex]?.node;

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link></li>
            <li>/</li>
            <li className="text-foreground">{product.title}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted">
              {currentImage ? (
                <img
                  src={currentImage.url}
                  alt={currentImage.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image available
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={img.node.url}
                      alt={img.node.altText || `${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">
                  {selectedVariant
                    ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)
                    : formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                </span>
                {selectedVariant && !selectedVariant.availableForSale && (
                  <Badge variant="secondary">Out of Stock</Badge>
                )}
              </div>
            </div>

            {/* Options */}
            {product.options.map((option) => (
              option.values.length > 1 && (
                <div key={option.name} className="space-y-3">
                  <label className="text-sm font-medium">{option.name}</label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const isSelected = selectedOptions[option.name] === value || 
                        (!selectedOptions[option.name] && value === product.variants.edges[0]?.node.selectedOptions.find(o => o.name === option.name)?.value);
                      
                      return (
                        <Button
                          key={value}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleOptionChange(option.name, value)}
                          className="min-w-[60px]"
                        >
                          {isSelected && <Check className="h-3 w-3 mr-1" />}
                          {value}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )
            ))}

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={cartLoading || !selectedVariant?.availableForSale}
            >
              {cartLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <Truck className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Easy Returns</p>
              </div>
              <div className="text-center">
                <Shield className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Secure Payment</p>
              </div>
            </div>

            {/* Product Details Tabs */}
            <Tabs defaultValue="description" className="pt-4">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description || "No description available."}
                </p>
              </TabsContent>
              <TabsContent value="details" className="pt-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Premium quality art paper (250 GSM)</li>
                  <li>• Fade-resistant inks for lasting vibrance</li>
                  <li>• Available in multiple sizes</li>
                  <li>• Frame options available</li>
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className="pt-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Free shipping on orders above ₹499</li>
                  <li>• Delivery within 3-5 business days</li>
                  <li>• Carefully packaged to prevent damage</li>
                  <li>• Easy 7-day return policy</li>
                </ul>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
