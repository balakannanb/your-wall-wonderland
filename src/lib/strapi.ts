// Strapi CMS Configuration
// TODO: Update this URL to your Strapi instance
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || '';

export interface StrapiProduct {
  id: number;
  documentId: string;
  title: string;
  description: string;
  handle: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  inStock: boolean;
  category?: string;
  tags?: string[];
  images: StrapiImage[];
  variants: StrapiVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface StrapiVariant {
  id: number;
  title: string;
  price: number;
  sku?: string;
  inStock: boolean;
  options: { name: string; value: string }[];
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Helper to get full image URL
export function getStrapiMediaUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

// Strapi API request helper
export async function strapiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T> | null> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  try {
    const response = await fetch(`${STRAPI_URL}/api${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      console.error(`Strapi API error: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Strapi API request failed:', error);
    return null;
  }
}

// Fetch all products
export async function fetchProducts(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
}): Promise<StrapiResponse<StrapiProduct[]> | null> {
  const queryParams = new URLSearchParams();
  
  queryParams.set('populate', '*');
  
  if (params?.page) queryParams.set('pagination[page]', params.page.toString());
  if (params?.pageSize) queryParams.set('pagination[pageSize]', params.pageSize.toString());
  
  if (params?.category && params.category !== 'all') {
    queryParams.set('filters[category][$eq]', params.category);
  }
  
  if (params?.search) {
    queryParams.set('filters[title][$containsi]', params.search);
  }

  return strapiRequest<StrapiProduct[]>(`/products?${queryParams.toString()}`);
}

// Fetch single product by handle
export async function fetchProductByHandle(handle: string): Promise<StrapiProduct | null> {
  const response = await strapiRequest<StrapiProduct[]>(
    `/products?filters[handle][$eq]=${handle}&populate=*`
  );
  
  return response?.data?.[0] || null;
}

// Fetch product by ID
export async function fetchProductById(id: number): Promise<StrapiProduct | null> {
  const response = await strapiRequest<StrapiProduct>(`/products/${id}?populate=*`);
  return response?.data || null;
}

// Mock data for development when Strapi is not connected
export const mockProducts: StrapiProduct[] = [
  {
    id: 1,
    documentId: 'demon-slayer-sunset',
    title: 'Demon Slayer Sunset',
    description: 'Beautiful anime-inspired wall poster featuring the iconic Demon Slayer sunset scene. Premium quality print on 250 GSM art paper.',
    handle: 'demon-slayer-sunset',
    price: 299,
    currency: 'INR',
    inStock: true,
    category: 'anime',
    tags: ['anime', 'demon slayer', 'sunset'],
    images: [],
    variants: [
      { id: 1, title: 'A4', price: 299, inStock: true, options: [{ name: 'Size', value: 'A4' }] },
      { id: 2, title: 'A3', price: 499, inStock: true, options: [{ name: 'Size', value: 'A3' }] },
      { id: 3, title: 'A2', price: 799, inStock: true, options: [{ name: 'Size', value: 'A2' }] },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Use mock data if Strapi is not configured
export function useMockDataIfNeeded(): boolean {
  return !STRAPI_URL || STRAPI_URL === 'http://localhost:1337';
}
