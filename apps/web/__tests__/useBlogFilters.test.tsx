import { renderHook, act } from '@testing-library/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useBlogFilters } from '@/lib/hooks/useBlogFilters';

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('useBlogFilters Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    } as any);

    mockUsePathname.mockReturnValue('/blog');
  });

  it('initializes with empty filters when no search params', () => {
    const mockSearchParams = new URLSearchParams();
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);

    const { result } = renderHook(() => useBlogFilters());

    expect(result.current.filters).toEqual({
      category: undefined,
      tags: [],
    });
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it('initializes with filters from search params', () => {
    const mockSearchParams = new URLSearchParams('category=Frontend&tags=react,typescript');
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);

    const { result } = renderHook(() => useBlogFilters());

    expect(result.current.filters).toEqual({
      category: 'Frontend',
      tags: ['react', 'typescript'],
    });
    expect(result.current.hasActiveFilters).toBe(true);
  });

  it('handles empty tags parameter', () => {
    const mockSearchParams = new URLSearchParams('category=Frontend&tags=');
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);

    const { result } = renderHook(() => useBlogFilters());

    expect(result.current.filters).toEqual({
      category: 'Frontend',
      tags: [],
    });
  });

  it('updates category filter and URL', () => {
    const mockSearchParams = new URLSearchParams();
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);

    const { result } = renderHook(() => useBlogFilters());

    act(() => {
      result.current.setCategory('Frontend');
    });

    expect(mockPush).toHaveBeenCalledWith('/blog?category=Frontend');
  });

  it('clears category filter when set to undefined', () => {
    const mockSearchParams = new URLSearchParams('category=Frontend');
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);

    const { result } = renderHook(() => useBlogFilters());

    act(() => {
      result.current.setCategory(undefined);
    });

    expect(mockPush).toHaveBeenCalledWith('/blog');
  });

  it('toggles tags on and off', () => {
    const mockSearchParams = new URLSearchParams();
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);

    const { result } = renderHook(() => useBlogFilters());

    // Add tag
    act(() => {
      result.current.toggleTag('react');
    });

    expect(mockPush).toHaveBeenCalledWith('/blog?tags=react');

    // Simulate adding the tag to search params
    mockUseSearchParams.mockReturnValue(new URLSearchParams('tags=react') as any);

    // Re-render with new search params
    const { result: result2 } = renderHook(() => useBlogFilters());

    // Remove tag
    act(() => {
      result2.current.toggleTag('react');
    });

    expect(mockPush).toHaveBeenLastCalledWith('/blog');
  });

  it('adds multiple tags', () => {
    const mockSearchParams = new URLSearchParams('tags=react');
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);

    const { result } = renderHook(() => useBlogFilters());

    act(() => {
      result.current.toggleTag('typescript');
    });

    expect(mockPush).toHaveBeenCalledWith('/blog?tags=react,typescript');
  });

  it('clears all tags', () => {
    const mockSearchParams = new URLSearchParams('tags=react,typescript');
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);

    const { result } = renderHook(() => useBlogFilters());

    act(() => {
      result.current.clearTags();
    });

    expect(mockPush).toHaveBeenCalledWith('/blog');
  });

  it('clears all filters', () => {
    const mockSearchParams = new URLSearchParams('category=Frontend&tags=react,typescript');
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);

    const { result } = renderHook(() => useBlogFilters());

    act(() => {
      result.current.clearAllFilters();
    });

    expect(mockPush).toHaveBeenCalledWith('/blog');
  });

  it('preserves existing search params when updating filters', () => {
    const mockSearchParams = new URLSearchParams('category=Frontend&other=value');
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);

    const { result } = renderHook(() => useBlogFilters());

    act(() => {
      result.current.toggleTag('react');
    });

    expect(mockPush).toHaveBeenCalledWith('/blog?category=Frontend&other=value&tags=react');
  });

  it('updates hasActiveFilters correctly', () => {
    // Start with no filters
    let mockSearchParams = new URLSearchParams();
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);

    const { result, rerender } = renderHook(() => useBlogFilters());

    expect(result.current.hasActiveFilters).toBe(false);

    // Add category filter
    mockSearchParams = new URLSearchParams('category=Frontend');
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);
    rerender();

    expect(result.current.hasActiveFilters).toBe(true);

    // Add tags
    mockSearchParams = new URLSearchParams('category=Frontend&tags=react');
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);
    rerender();

    expect(result.current.hasActiveFilters).toBe(true);

    // Remove category, keep tags
    mockSearchParams = new URLSearchParams('tags=react');
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);
    rerender();

    expect(result.current.hasActiveFilters).toBe(true);

    // Remove all filters
    mockSearchParams = new URLSearchParams();
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);
    rerender();

    expect(result.current.hasActiveFilters).toBe(false);
  });

  it('handles complex URL updates with both category and tags', () => {
    const mockSearchParams = new URLSearchParams();
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);

    const { result } = renderHook(() => useBlogFilters());

    // Set category
    act(() => {
      result.current.setCategory('Frontend');
    });

    // Update mock to simulate the URL change
    mockUseSearchParams.mockReturnValue(new URLSearchParams('category=Frontend') as any);

    const { result: result2 } = renderHook(() => useBlogFilters());

    // Add tag
    act(() => {
      result2.current.toggleTag('react');
    });

    expect(mockPush).toHaveBeenLastCalledWith('/blog?category=Frontend&tags=react');
  });
});