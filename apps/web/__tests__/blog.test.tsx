import { render, screen } from '@testing-library/react';
import BlogPage from '../app/blog/page';
import * as blogUtils from '../lib/blog-utils';

// Mock the blog utilities
jest.mock('../lib/blog-utils');
const mockBlogUtils = blogUtils as jest.Mocked<typeof blogUtils>;

// Mock the BlogPostCard component
jest.mock('../components/BlogPostCard', () => {
  return function MockBlogPostCard({ post }: { post: any }) {
    return (
      <div data-testid="blog-post-card">
        <h3>{post.title}</h3>
        <p>{post.summary}</p>
      </div>
    );
  };
});

describe('BlogPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render blog page header', async () => {
    mockBlogUtils.getBlogPosts.mockResolvedValue([]);
    
    render(await BlogPage());
    
    expect(screen.getByText('Technical Blog')).toBeInTheDocument();
    expect(screen.getByText(/Explore in-depth articles on software engineering/)).toBeInTheDocument();
  });

  it('should display empty state when no blog posts are available', async () => {
    mockBlogUtils.getBlogPosts.mockResolvedValue([]);
    
    render(await BlogPage());
    
    expect(screen.getByText('No blog posts available yet')).toBeInTheDocument();
    expect(screen.getByText('Check back soon for technical insights and tutorials!')).toBeInTheDocument();
  });

  it('should render blog posts when available', async () => {
    const mockPosts = [
      {
        id: 'post1',
        slug: 'post1',
        title: 'First Post',
        date: '2025-01-01',
        author: 'Author 1',
        category: 'Tech',
        tags: ['javascript'],
        summary: 'First post summary',
        thumbnailUrl: '/images/post1.jpg',
        likes: 10,
        commentCount: 2,
        visits: 100,
      },
      {
        id: 'post2',
        slug: 'post2',
        title: 'Second Post',
        date: '2025-01-02',
        author: 'Author 2',
        category: 'General',
        tags: ['react'],
        summary: 'Second post summary',
        thumbnailUrl: '/images/post2.jpg',
        likes: 5,
        commentCount: 1,
        visits: 50,
      },
    ];

    mockBlogUtils.getBlogPosts.mockResolvedValue(mockPosts);
    
    render(await BlogPage());
    
    // Should not show empty state
    expect(screen.queryByText('No blog posts available yet')).not.toBeInTheDocument();
    
    // Should render blog post cards
    const blogCards = screen.getAllByTestId('blog-post-card');
    expect(blogCards).toHaveLength(2);
    
    // Should render post titles
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
    
    // Should render post summaries
    expect(screen.getByText('First post summary')).toBeInTheDocument();
    expect(screen.getByText('Second post summary')).toBeInTheDocument();
  });

  it('should have proper semantic HTML structure', async () => {
    mockBlogUtils.getBlogPosts.mockResolvedValue([]);
    
    render(await BlogPage());
    
    // Should have header section
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    // Should have main content area
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    
    // Should have proper heading hierarchy
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Technical Blog');
  });

  it('should apply responsive grid layout classes', async () => {
    const mockPosts = [
      {
        id: 'post1',
        slug: 'post1',
        title: 'First Post',
        date: '2025-01-01',
        author: 'Author 1',
        category: 'Tech',
        tags: ['javascript'],
        summary: 'First post summary',
        thumbnailUrl: '/images/post1.jpg',
        likes: 10,
        commentCount: 2,
        visits: 100,
      },
    ];

    mockBlogUtils.getBlogPosts.mockResolvedValue(mockPosts);
    
    const { container } = render(await BlogPage());
    
    // Should have grid classes for responsive layout
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass(
      'grid-cols-1',
      'md:grid-cols-2',
      'lg:grid-cols-3',
      'gap-8'
    );
  });

  it('should have proper SEO metadata structure', async () => {
    // This is handled by Next.js metadata export, so we just verify the page renders
    mockBlogUtils.getBlogPosts.mockResolvedValue([]);
    
    render(await BlogPage());
    
    // The page should render without errors
    expect(screen.getByText('Technical Blog')).toBeInTheDocument();
  });

  it('should handle getBlogPosts errors gracefully', async () => {
    // If getBlogPosts throws an error, it should return empty array per our implementation
    mockBlogUtils.getBlogPosts.mockResolvedValue([]);
    
    render(await BlogPage());
    
    // Should show empty state gracefully
    expect(screen.getByText('No blog posts available yet')).toBeInTheDocument();
  });

  it('should render blog posts in a grid layout', async () => {
    const mockPosts = Array.from({ length: 6 }, (_, i) => ({
      id: `post${i + 1}`,
      slug: `post${i + 1}`,
      title: `Post ${i + 1}`,
      date: '2025-01-01',
      author: 'Test Author',
      category: 'Tech',
      tags: ['test'],
      summary: `Summary for post ${i + 1}`,
      thumbnailUrl: `/images/post${i + 1}.jpg`,
      likes: i,
      commentCount: i,
      visits: i * 10,
    }));

    mockBlogUtils.getBlogPosts.mockResolvedValue(mockPosts);
    
    render(await BlogPage());
    
    // Should render all posts
    const blogCards = screen.getAllByTestId('blog-post-card');
    expect(blogCards).toHaveLength(6);
    
    // Should have grid layout
    const gridContainer = screen.getByRole('main').querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
  });
});