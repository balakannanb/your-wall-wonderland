import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, CreditCard, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { getStrapiMediaUrl } from "@/lib/strapi";
import { openRazorpayCheckout, isRazorpayConfigured } from "@/lib/razorpay";
import { toast } from "sonner";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, updateQuantity, removeItem, clearCart, getTotalItems, getTotalPrice, getCurrency } = useCartStore();
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const currency = getCurrency();

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const handleCheckout = async () => {
    if (!isRazorpayConfigured()) {
      toast.error("Payment not configured", {
        description: "Razorpay integration is not set up yet. Please configure the API keys.",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // In production, you would call your backend to create a Razorpay order
      // For now, we'll show a message about the integration
      toast.info("Razorpay Integration", {
        description: "Connect your Razorpay account to enable payments. Add VITE_RAZORPAY_KEY_ID to your environment.",
      });
      
      // Example of how the checkout would work:
      // const order = await createRazorpayOrder(items, totalPrice);
      // await openRazorpayCheckout({
      //   orderId: order.id,
      //   amount: order.amount,
      //   currency: currency,
      //   onSuccess: (result) => {
      //     // Verify payment and update order status
      //     clearCart();
      //     setIsOpen(false);
      //     toast.success("Payment successful!", { description: "Your order has been placed." });
      //   },
      //   onFailure: (error) => {
      //     toast.error("Payment failed", { description: error.message });
      //   },
      // });
    } catch (error) {
      toast.error("Checkout failed", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-2">Add some posters to get started!</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => {
                    const imageUrl = item.product.images?.[0] 
                      ? getStrapiMediaUrl(item.product.images[0].url) 
                      : null;
                    
                    return (
                      <div key={item.variant.id} className="flex gap-4 p-3 rounded-lg border bg-card">
                        <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                          {imageUrl ? (
                            <img 
                              src={imageUrl} 
                              alt={item.product.title} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">
                              🖼️
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{item.product.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.variant.title}
                          </p>
                          <p className="font-semibold mt-1">{formatPrice(item.variant.price)}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 text-muted-foreground hover:text-destructive" 
                            onClick={() => removeItem(item.variant.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="flex items-center gap-1">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-7 w-7" 
                              onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-7 w-7" 
                              onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-4 pt-6 border-t bg-background">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <Button 
                  onClick={handleCheckout} 
                  className="w-full" 
                  size="lg" 
                  disabled={items.length === 0 || isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay with Razorpay
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
