import { useEffect } from 'react';

// Simple cart sync hook - cart is persisted via zustand middleware
export function useCartSync() {
  useEffect(() => {
    // Cart is already persisted via zustand persist middleware
    // This hook is kept for compatibility but can be extended
    // to sync with a backend cart API if needed
  }, []);
}
