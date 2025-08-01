import { render, screen } from '@testing-library/react';
import BlogPostCard from './BlogPostCard';
import { BlogPost } from '@/lib/blog-utils';

// Mock Next.js components
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return <a href={href} {...props}>{children}</a>;
  };
});

jest.mock('next/image', () => {
  return function MockImage({ src, alt, onError, fill, ...props }: any) {
    const handleError = (e: any) => {
      if (onError) {
        onError(e);
      }
    };
    
    return (
      <img 
        src={src} 
        alt={alt} 
        onError={handleError}
        data-fill={fill ? 'true' : 'false'}
        {...props}
      />
    );
  };
});

describe('BlogPostCard', () => {
  const mockPost: BlogPost = {
    id: 'test-post',
    slug: 'test-post',
    title: 'Test Blog Post',
    date: '2025-01-01',
    author: 'Test Author',
    category: 'Tech',
    tags: ['javascript', 'testing', 'react'],
    summary: 'This is a test blog post summary for testing purposes.',
    thumbnailUrl: '/images/test-thumb.jpg',
    likes: 42,
    commentCount: 5,
    visits: 123,
  };

  it('should render blog post card with all information', () => {
    render(<BlogPostCard post={mockPost} />);

    // Check title
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    
    // Check author
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    
    // Check category
    expect(screen.getByText('Tech')).toBeInTheDocument();
    
    // Check summary
    expect(screen.getByText('This is a test blog post summary for testing purposes.')).toBeInTheDocument();
    
    // Check formatted date
    expect(screen.getByText('January 1, 2025')).toBeInTheDocument();
    
    // Check tags
    expect(screen.getByText('javascript')).toBeInTheDocument();
    expect(screen.getByText('testing')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
    
    // Check stats
    expect(screen.getByText('42')).toBeInTheDocument(); // likes
    expect(screen.getByText('5')).toBeInTheDocument(); // comments
    expect(screen.getByText('123')).toBeInTheDocument(); // visits
  });

  it('should render proper link to blog post', () => {
    render(<BlogPostCard post={mockPost} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/blog/test-post');
    expect(link).toHaveAttribute('aria-label', 'Read more about Test Blog Post');
  });

  it('should render thumbnail image with proper attributes', () => {
    render(<BlogPostCard post={mockPost} />);
    
    const image = screen.getByAltText('Thumbnail for Test Blog Post');
    expect(image).toHaveAttribute('src', '/images/test-thumb.jpg');
  });

  it('should handle posts with no tags', () => {
    const postWithoutTags = { ...mockPost, tags: [] };
    render(<BlogPostCard post={postWithoutTags} />);
    
    // Should still render other content
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    
    // Tags section should not show any tags
    expect(screen.queryByText('javascript')).not.toBeInTheDocument();
  });

  it('should limit tags display to 3 and show more indicator', () => {
    const postWithManyTags = { 
      ...mockPost, 
      tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'] 
    };
    render(<BlogPostCard post={postWithManyTags} />);
    
    // Should show first 3 tags
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
    expect(screen.getByText('tag3')).toBeInTheDocument();
    
    // Should show "more" indicator
    expect(screen.getByText('+2 more')).toBeInTheDocument();
    
    // Should not show tags beyond the limit
    expect(screen.queryByText('tag4')).not.toBeInTheDocument();
    expect(screen.queryByText('tag5')).not.toBeInTheDocument();
  });

  it('should handle posts with zero stats gracefully', () => {
    const postWithZeroStats = { 
      ...mockPost, 
      likes: 0, 
      commentCount: 0, 
      visits: 0 
    };
    render(<BlogPostCard post={postWithZeroStats} />);
    
    // Should still render the post
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    
    // Stats with zero values should not be displayed
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('should handle image error gracefully', () => {
    render(<BlogPostCard post={mockPost} />);
    
    const image = screen.getByAltText('Thumbnail for Test Blog Post');
    
    // Simulate image error
    const mockEvent = {
      target: { 
        src: '/images/test-thumb.jpg',
        setAttribute: jest.fn()
      }
    };
    
    // Trigger error event
    if (image.onError) {
      image.onError(mockEvent as any);
    }
    
    // The component should have error handling (we'll test the component renders without crashing)
    expect(image).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<BlogPostCard post={mockPost} />);
    
    // Check article structure
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    
    // Check link accessibility
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Read more about Test Blog Post');
    
    // Check time element
    const timeElement = screen.getByText('January 1, 2025');
    expect(timeElement.closest('time')).toHaveAttribute('dateTime', '2025-01-01');
  });

  it('should apply hover styles and transitions', () => {
    render(<BlogPostCard post={mockPost} />);
    
    const article = screen.getByRole('article');
    
    // Check for transition classes
    expect(article).toHaveClass('hover:shadow-lg', 'transition-shadow', 'duration-300');
    
    // Check for group class for coordinated hover effects
    expect(article).toHaveClass('group');
  });
});