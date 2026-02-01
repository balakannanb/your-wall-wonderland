// Razorpay Configuration
// The key will be set via environment variable once you add it
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

export interface RazorpayPaymentResult {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface OrderItem {
  productId: number;
  variantId: number;
  title: string;
  variantTitle: string;
  price: number;
  quantity: number;
}

// Load Razorpay script dynamically
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// Open Razorpay checkout
export async function openRazorpayCheckout(options: {
  orderId: string;
  amount: number;
  currency?: string;
  name?: string;
  description?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerName?: string;
  onSuccess: (result: RazorpayPaymentResult) => void;
  onFailure: (error: any) => void;
}): Promise<void> {
  const loaded = await loadRazorpayScript();
  
  if (!loaded) {
    options.onFailure(new Error('Failed to load Razorpay SDK'));
    return;
  }

  if (!RAZORPAY_KEY_ID) {
    options.onFailure(new Error('Razorpay Key ID not configured'));
    return;
  }

  const razorpayOptions = {
    key: RAZORPAY_KEY_ID,
    amount: options.amount,
    currency: options.currency || 'INR',
    name: options.name || 'PosterCraft',
    description: options.description || 'Poster Purchase',
    order_id: options.orderId,
    prefill: {
      name: options.customerName || '',
      email: options.customerEmail || '',
      contact: options.customerPhone || '',
    },
    theme: {
      color: '#000000',
    },
    handler: (response: RazorpayPaymentResult) => {
      options.onSuccess(response);
    },
    modal: {
      ondismiss: () => {
        options.onFailure(new Error('Payment cancelled'));
      },
    },
  };

  const razorpay = new (window as any).Razorpay(razorpayOptions);
  razorpay.open();
}

// Check if Razorpay is configured
export function isRazorpayConfigured(): boolean {
  return !!RAZORPAY_KEY_ID;
}
