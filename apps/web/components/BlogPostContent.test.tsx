import { render, screen } from '@testing-library/react';
import BlogPostContent from './BlogPostContent';
import { BlogPost } from '@/lib/blog-utils';

// Mock react-markdown to avoid complex markdown parsing in tests
jest.mock('react-markdown', () => {
  return function MockReactMarkdown({ children }: { children: string }) {
    // Only render if children has content
    if (!children || children.trim() === '') {
      return null;
    }
    return <div data-testid="markdown-content">{children}</div>;
  };
});

// Mock the rehype and remark plugins
jest.mock('remark-gfm', () => ({}));
jest.mock('rehype-highlight', () => ({}));

const mockBlogPost: BlogPost = {
  id: 'test-post',
  slug: 'test-post',
  title: 'Test Blog Post',
  date: '2025-01-31',
  author: 'Test Author',
  category: 'Testing',
  tags: ['test', 'jest', 'react'],
  summary: 'This is a test blog post for unit testing',
  thumbnailUrl: '/images/test-thumb.jpg',
  likes: 42,
  commentCount: 5,
  visits: 123,
  content: `# Test Content

## Theory

This is the theory section with some concepts:

- Concept 1
- Concept 2

## Implementation

This is the implementation section with code:

\`\`\`typescript
function testFunction() {
  return 'Hello, World!';
}
\`\`\`

### Steps

1. Step one
2. Step two
3. Step three`
};

const mockBlogPostNoSections: BlogPost = {
  ...mockBlogPost,
  id: 'no-sections',
  slug: 'no-sections',
  title: 'Post Without Sections',
  content: `# Simple Content

This is a simple blog post without Theory and Implementation sections.

- Point 1
- Point 2

\`\`\`javascript
console.log('Hello');
\`\`\`
`
};

describe('BlogPostContent', () => {
  it('should render blog post with all metadata', () => {
    render(<BlogPostContent post={mockBlogPost} />);

    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('January 31, 2025')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
    expect(screen.getByText('This is a test blog post for unit testing')).toBeInTheDocument();
  });

  it('should render engagement stats', () => {
    render(<BlogPostContent post={mockBlogPost} />);

    expect(screen.getByText('123')).toBeInTheDocument(); // visits
    expect(screen.getByText('42')).toBeInTheDocument(); // likes
    expect(screen.getByText('5')).toBeInTheDocument(); // comments
  });

  it('should render tags when present', () => {
    render(<BlogPostContent post={mockBlogPost} />);

    expect(screen.getByText('#test')).toBeInTheDocument();
    expect(screen.getByText('#jest')).toBeInTheDocument();
    expect(screen.getByText('#react')).toBeInTheDocument();
  });

  it('should not render tags section when no tags', () => {
    const postWithoutTags = { ...mockBlogPost, tags: [] };
    render(<BlogPostContent post={postWithoutTags} />);

    expect(screen.queryByText('#test')).not.toBeInTheDocument();
  });

  it('should render Theory and Implementation sections separately when present', () => {
    render(<BlogPostContent post={mockBlogPost} />);

    expect(screen.getByText('Theory')).toBeInTheDocument();
    expect(screen.getByText('Implementation')).toBeInTheDocument();
    
    const markdownContents = screen.getAllByTestId('markdown-content');
    expect(markdownContents).toHaveLength(2); // One for Theory, one for Implementation
  });

  it('should render single content block when no Theory/Implementation sections', () => {
    render(<BlogPostContent post={mockBlogPostNoSections} />);

    // Should not have Theory/Implementation section headers
    expect(screen.queryByText('Theory')).not.toBeInTheDocument();
    expect(screen.queryByText('Implementation')).not.toBeInTheDocument();
    
    // Should have single content block
    const markdownContents = screen.getAllByTestId('markdown-content');
    expect(markdownContents).toHaveLength(1);
  });

  it('should handle posts with empty content', () => {
    const emptyPost = { ...mockBlogPost, content: '' };
    render(<BlogPostContent post={emptyPost} />);

    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    
    // Should not render markdown content for empty content
    const markdownContents = screen.queryAllByTestId('markdown-content');
    expect(markdownContents).toHaveLength(0);
  });

  it('should handle posts with undefined content', () => {
    const noContentPost = { ...mockBlogPost, content: undefined };
    render(<BlogPostContent post={noContentPost} />);

    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    
    // Should not render markdown content for undefined content
    const markdownContents = screen.queryAllByTestId('markdown-content');
    expect(markdownContents).toHaveLength(0);
  });

  it('should format dates correctly', () => {
    const testCases = [
      { date: '2024-12-25', expected: 'December 25, 2024' },
      { date: '2025-01-01', expected: 'January 1, 2025' },
      { date: '2025-06-15', expected: 'June 15, 2025' },
    ];

    testCases.forEach(({ date, expected }) => {
      const postWithDate = { ...mockBlogPost, date };
      const { rerender } = render(<BlogPostContent post={postWithDate} />);
      
      expect(screen.getByText(expected)).toBeInTheDocument();
      
      // Clean up for next iteration
      rerender(<div />);
    });
  });

  it('should handle zero engagement stats', () => {
    const postWithZeroStats = {
      ...mockBlogPost,
      likes: 0,
      commentCount: 0,
      visits: 0,
    };
    render(<BlogPostContent post={postWithZeroStats} />);

    // Should show zeros
    const zeroElements = screen.getAllByText('0');
    expect(zeroElements).toHaveLength(3); // visits, likes, comments
  });

  it('should handle very long titles', () => {
    const longTitlePost = {
      ...mockBlogPost,
      title: 'This is a very long blog post title that might wrap to multiple lines and should still be displayed correctly'
    };
    render(<BlogPostContent post={longTitlePost} />);

    expect(screen.getByText(longTitlePost.title)).toBeInTheDocument();
  });

  it('should handle special characters in content', () => {
    const specialCharPost = {
      ...mockBlogPost,
      title: 'Post with Special Characters: & < > " \' /',
      summary: 'Summary with special chars: & < > " \' /',
      author: 'Author & Co.',
    };
    render(<BlogPostContent post={specialCharPost} />);

    expect(screen.getByText(specialCharPost.title)).toBeInTheDocument();
    expect(screen.getByText(specialCharPost.summary)).toBeInTheDocument();
    expect(screen.getByText(specialCharPost.author)).toBeInTheDocument();
  });

  it('should handle only Theory section', () => {
    const theoryOnlyPost = {
      ...mockBlogPost,
      content: `# Test Content

## Theory

This post only has a theory section.

- Theory point 1
- Theory point 2`
    };
    render(<BlogPostContent post={theoryOnlyPost} />);

    expect(screen.getByText('Theory')).toBeInTheDocument();
    expect(screen.queryByText('Implementation')).not.toBeInTheDocument();
    
    const markdownContents = screen.getAllByTestId('markdown-content');
    expect(markdownContents).toHaveLength(1);
  });

  it('should handle only Implementation section', () => {
    const implementationOnlyPost = {
      ...mockBlogPost,
      content: `# Test Content

## Implementation

This post only has an implementation section.

\`\`\`javascript
console.log('Implementation only');
\`\`\``
    };
    render(<BlogPostContent post={implementationOnlyPost} />);

    expect(screen.queryByText('Theory')).not.toBeInTheDocument();
    expect(screen.getByText('Implementation')).toBeInTheDocument();
    
    const markdownContents = screen.getAllByTestId('markdown-content');
    expect(markdownContents).toHaveLength(1);
  });

  it('should handle mixed case section headers', () => {
    const mixedCasePost = {
      ...mockBlogPost,
      content: `# Test Content

## Theory

Theory section content.

## Implementation

Implementation section content.`
    };
    render(<BlogPostContent post={mixedCasePost} />);

    expect(screen.getByText('Theory')).toBeInTheDocument();
    expect(screen.getByText('Implementation')).toBeInTheDocument();
    
    const markdownContents = screen.getAllByTestId('markdown-content');
    expect(markdownContents).toHaveLength(2);
  });
});