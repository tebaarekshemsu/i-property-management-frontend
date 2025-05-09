import { API_BASE_URL } from '@/config/api';
import { revalidatePath, revalidateTag } from 'next/cache';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
  cacheConfig?: {
    key: string;
    ttl?: number; // Time to live in milliseconds
    refresh?: boolean; // Force refresh the cache
  };
  revalidate?: {
    path?: string;
    tag?: string;
  };
}

interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Cache storage
const cache = new Map<string, { data: any; timestamp: number }>();

// Clear expired cache entries
const clearExpiredCache = () => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (value.timestamp < now) {
      cache.delete(key);
    }
  }
};

// Get cache key from request
const getCacheKey = (endpoint: string, options: RequestOptions): string => {
  const { params, cacheConfig } = options;
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
  return `${endpoint}${queryString}`;
};

// Check if cache is valid
const isCacheValid = (key: string, ttl?: number): boolean => {
  const cached = cache.get(key);
  if (!cached) return false;
  
  if (ttl) {
    return Date.now() - cached.timestamp < ttl;
  }
  return true;
};

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const { params, cacheConfig, revalidate, ...fetchOptions } = options;
    
    // Handle caching
    if (cacheConfig) {
      const cacheKey = getCacheKey(endpoint, options);
      
      // Clear expired cache entries
      clearExpiredCache();

      // Check if we should use cached data
      if (!cacheConfig.refresh && isCacheValid(cacheKey, cacheConfig.ttl)) {
        const cached = cache.get(cacheKey);
        if (cached) {
          return { data: cached.data };
        }
      }
    }

    // Add query parameters if they exist
    const url = params
      ? `${endpoint}?${new URLSearchParams(params).toString()}`
      : endpoint;

    // Add default headers
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Store in cache if caching is enabled
    if (cacheConfig) {
      const cacheKey = getCacheKey(endpoint, options);
      cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });
    }

    // Handle revalidation after successful request
    if (revalidate) {
      if (revalidate.path) {
        revalidatePath(revalidate.path);
      }
      if (revalidate.tag) {
        revalidateTag(revalidate.tag);
      }
    }

    return { data };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      data: null as T,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

// Helper functions for common HTTP methods
export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, data: unknown, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data: unknown, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),

  // Clear cache for a specific endpoint or all cache
  clearCache: (endpoint?: string) => {
    if (endpoint) {
      // Clear cache for specific endpoint
      for (const key of cache.keys()) {
        if (key.startsWith(endpoint)) {
          cache.delete(key);
        }
      }
    } else {
      // Clear all cache
      cache.clear();
    }
  },
}; 