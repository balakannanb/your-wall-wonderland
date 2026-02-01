import { useState, useEffect } from 'react';
import { fetchProductByHandle, StrapiProduct, useMockDataIfNeeded, mockProducts } from '@/lib/strapi';

export function useProduct(handle: string) {
  const [product, setProduct] = useState<StrapiProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      if (!handle) return;

      setIsLoading(true);
      setError(null);

      // Use mock data if Strapi is not configured
      if (useMockDataIfNeeded()) {
        const mockProduct = mockProducts.find(p => p.handle === handle);
        if (mockProduct) {
          setProduct(mockProduct);
        } else {
          setError('Product not found');
        }
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchProductByHandle(handle);
        if (data) {
          setProduct(data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [handle]);

  return { product, isLoading, error };
}
