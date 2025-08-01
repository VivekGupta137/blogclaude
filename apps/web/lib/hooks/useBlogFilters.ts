'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export interface BlogFilters {
  category?: string;
  tags: string[];
}

export function useBlogFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse current filters from URL
  const filters: BlogFilters = useMemo(() => {
    const category = searchParams.get('category') || undefined;
    const tagsParam = searchParams.get('tags');
    const tags = tagsParam ? tagsParam.split(',').filter(Boolean) : [];
    
    return { category, tags };
  }, [searchParams]);

  // Update URL with new filters
  const updateFilters = useCallback((newFilters: Partial<BlogFilters>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update category
    if (newFilters.category !== undefined) {
      if (newFilters.category) {
        params.set('category', newFilters.category);
      } else {
        params.delete('category');
      }
    }
    
    // Update tags
    if (newFilters.tags !== undefined) {
      if (newFilters.tags.length > 0) {
        params.set('tags', newFilters.tags.join(','));
      } else {
        params.delete('tags');
      }
    }
    
    // Update URL
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(newUrl);
  }, [searchParams, router, pathname]);

  // Set category filter
  const setCategory = useCallback((category?: string) => {
    updateFilters({ category });
  }, [updateFilters]);

  // Toggle tag filter
  const toggleTag = useCallback((tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    updateFilters({ tags: newTags });
  }, [filters.tags, updateFilters]);

  // Clear all tag filters
  const clearTags = useCallback(() => {
    updateFilters({ tags: [] });
  }, [updateFilters]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    updateFilters({ category: undefined, tags: [] });
  }, [updateFilters]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Boolean(filters.category) || filters.tags.length > 0;
  }, [filters]);

  return {
    filters,
    setCategory,
    toggleTag,
    clearTags,
    clearAllFilters,
    hasActiveFilters,
  };
}