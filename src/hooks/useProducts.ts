import { useState, useEffect } from 'react';
import { fetchProducts, StrapiProduct, useMockDataIfNeeded, mockProducts } from '@/lib/strapi';

interface UseProductsParams {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
}

export function useProducts(params: UseProductsParams = {}) {
  const [products, setProducts] = useState<StrapiProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    pageCount: 1,
    total: 0,
  });

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      setError(null);

      // Use mock data if Strapi is not configured
      if (useMockDataIfNeeded()) {
        let filteredProducts = [...mockProducts];
        
        if (params.category && params.category !== 'all') {
          filteredProducts = filteredProducts.filter(p => p.category === params.category);
        }
        
        if (params.search) {
          const searchLower = params.search.toLowerCase();
          filteredProducts = filteredProducts.filter(p => 
            p.title.toLowerCase().includes(searchLower)
          );
        }

        setProducts(filteredProducts);
        setPagination({
          page: 1,
          pageSize: filteredProducts.length,
          pageCount: 1,
          total: filteredProducts.length,
        });
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetchProducts({
          page: params.page,
          pageSize: params.pageSize || 20,
          category: params.category,
          search: params.search,
        });

        if (response) {
          setProducts(response.data || []);
          if (response.meta?.pagination) {
            setPagination(response.meta.pagination);
          }
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [params.page, params.pageSize, params.category, params.search]);

  return { products, isLoading, error, pagination };
}
