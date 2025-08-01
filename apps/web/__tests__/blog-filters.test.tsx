import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { BlogListWithFilters } from '@/components/BlogListWithFilters';
import { CategoryFilter } from '@/components/CategoryFilter';
import { TagFilter } from '@/components/TagFilter';
import { BlogPost } from '@/lib/blog-utils';

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

// Mock blog posts data
const mockBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'post-1',
    title: 'React Hooks Deep Dive',
    date: '2025-01-01',
    author: 'John Doe',
    category: 'Frontend',
    tags: ['react', 'hooks', 'javascript'],
    summary: 'Understanding React hooks in depth',
    thumbnailUrl: '/images/post-1.jpg',
    likes: 10,
    commentCount: 5,
    visits: 100,
  },
  {
    id: 'post-2',
    slug: 'post-2',
    title: 'Node.js Performance Optimization',
    date: '2025-01-02',
    author: 'Jane Smith',
    category: 'Backend',
    tags: ['nodejs', 'performance', 'optimization'],
    summary: 'Optimizing Node.js applications',
    thumbnailUrl: '/images/post-2.jpg',
    likes: 15,
    commentCount: 8,
    visits: 150,
  },
  {
    id: 'post-3',
    slug: 'post-3',
    title: 'Full Stack Architecture',
    date: '2025-01-03',
    author: 'Bob Johnson',
    category: 'Architecture',
    tags: ['fullstack', 'architecture', 'design'],
    summary: 'Designing full stack applications',
    thumbnailUrl: '/images/post-3.jpg',
    likes: 20,
    commentCount: 12,
    visits: 200,
  },
];

const mockCategories = ['Frontend', 'Backend', 'Architecture'];
const mockTags = ['react', 'hooks', 'javascript', 'nodejs', 'performance', 'optimization', 'fullstack', 'architecture', 'design'];

describe('CategoryFilter Component', () => {
  const mockOnCategorySelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all categories with "All Categories" option', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory={undefined}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    expect(screen.getByText('All Categories')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Architecture')).toBeInTheDocument();
  });

  it('highlights selected category', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="Frontend"
        onCategorySelect={mockOnCategorySelect}
      />
    );

    const frontendButton = screen.getByText('Frontend');
    expect(frontendButton).toHaveClass('bg-primary', 'text-primary-foreground');
  });

  it('calls onCategorySelect when category is clicked', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory={undefined}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    fireEvent.click(screen.getByText('Frontend'));
    expect(mockOnCategorySelect).toHaveBeenCalledWith('Frontend');
  });

  it('calls onCategorySelect with undefined when "All Categories" is clicked', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="Frontend"
        onCategorySelect={mockOnCategorySelect}
      />
    );

    fireEvent.click(screen.getByText('All Categories'));
    expect(mockOnCategorySelect).toHaveBeenCalledWith(undefined);
  });
});

describe('TagFilter Component', () => {
  const mockOnTagToggle = jest.fn();
  const mockOnClearTags = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders available tags', () => {
    render(
      <TagFilter
        tags={mockTags}
        selectedTags={[]}
        onTagToggle={mockOnTagToggle}
        onClearTags={mockOnClearTags}
      />
    );

    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('nodejs')).toBeInTheDocument();
    expect(screen.getByText('architecture')).toBeInTheDocument();
  });

  it('shows selected tags section when tags are selected', () => {
    render(
      <TagFilter
        tags={mockTags}
        selectedTags={['react', 'nodejs']}
        onTagToggle={mockOnTagToggle}
        onClearTags={mockOnClearTags}
      />
    );

    expect(screen.getByText('Selected tags:')).toBeInTheDocument();
    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });

  it('calls onTagToggle when tag is clicked', () => {
    render(
      <TagFilter
        tags={mockTags}
        selectedTags={[]}
        onTagToggle={mockOnTagToggle}
        onClearTags={mockOnClearTags}
      />
    );

    fireEvent.click(screen.getByText('react'));
    expect(mockOnTagToggle).toHaveBeenCalledWith('react');
  });

  it('calls onClearTags when "Clear all" is clicked', () => {
    render(
      <TagFilter
        tags={mockTags}
        selectedTags={['react', 'nodejs']}
        onTagToggle={mockOnTagToggle}
        onClearTags={mockOnClearTags}
      />
    );

    fireEvent.click(screen.getByText('Clear all'));
    expect(mockOnClearTags).toHaveBeenCalled();
  });

  it('removes selected tags from available tags list', () => {
    render(
      <TagFilter
        tags={mockTags}
        selectedTags={['react']}
        onTagToggle={mockOnTagToggle}
        onClearTags={mockOnClearTags}
      />
    );

    // Should not show 'react' in the available tags section
    const availableTags = screen.queryAllByText('react');
    // Only one instance should exist (in selected tags section)
    expect(availableTags).toHaveLength(1);
  });
});

describe('BlogListWithFilters Integration', () => {
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

    // Default to no search params
    const mockSearchParams = new URLSearchParams();
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);
  });

  it('renders all posts initially', async () => {
    render(
      <BlogListWithFilters
        initialPosts={mockBlogPosts}
        categories={mockCategories}
        tags={mockTags}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('React Hooks Deep Dive')).toBeInTheDocument();
      expect(screen.getByText('Node.js Performance Optimization')).toBeInTheDocument();
      expect(screen.getByText('Full Stack Architecture')).toBeInTheDocument();
      expect(screen.getByText('Showing 3 of 3 posts')).toBeInTheDocument();
    });
  });

  it('filters posts by category', async () => {
    // Mock search params with category filter
    const mockSearchParams = new URLSearchParams('category=Frontend');
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);

    render(
      <BlogListWithFilters
        initialPosts={mockBlogPosts}
        categories={mockCategories}
        tags={mockTags}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('React Hooks Deep Dive')).toBeInTheDocument();
      expect(screen.queryByText('Node.js Performance Optimization')).not.toBeInTheDocument();
      expect(screen.queryByText('Full Stack Architecture')).not.toBeInTheDocument();
      expect(screen.getByText('Showing 1 of 3 posts')).toBeInTheDocument();
    });
  });

  it('filters posts by tags', async () => {
    // Mock search params with tag filter
    const mockSearchParams = new URLSearchParams('tags=nodejs');
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);

    render(
      <BlogListWithFilters
        initialPosts={mockBlogPosts}
        categories={mockCategories}
        tags={mockTags}
      />
    );

    await waitFor(() => {
      expect(screen.queryByText('React Hooks Deep Dive')).not.toBeInTheDocument();
      expect(screen.getByText('Node.js Performance Optimization')).toBeInTheDocument();
      expect(screen.queryByText('Full Stack Architecture')).not.toBeInTheDocument();
      expect(screen.getByText('Showing 1 of 3 posts')).toBeInTheDocument();
    });
  });

  it('shows empty state when no posts match filters', async () => {
    // Mock search params with filter that matches no posts
    const mockSearchParams = new URLSearchParams('category=NonExistent');
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);

    render(
      <BlogListWithFilters
        initialPosts={mockBlogPosts}
        categories={mockCategories}
        tags={mockTags}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('No posts match your filters')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your filters to see more posts.')).toBeInTheDocument();
    });
  });

  it('shows clear all filters button when filters are active', async () => {
    // Mock search params with active filters
    const mockSearchParams = new URLSearchParams('category=Frontend&tags=react');
    mockUseSearchParams.mockReturnValue(mockSearchParams as any);

    render(
      <BlogListWithFilters
        initialPosts={mockBlogPosts}
        categories={mockCategories}
        tags={mockTags}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Clear all filters')).toBeInTheDocument();
      expect(screen.getByText('(filtered)')).toBeInTheDocument();
    });
  });
});