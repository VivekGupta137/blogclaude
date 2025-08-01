import { 
  getUniqueCategories, 
  getUniqueTags, 
  getFilteredBlogPosts,
  getBlogPosts,
  BlogPost 
} from '@/lib/blog-utils';
import fs from 'fs';
import path from 'path';

// Mock fs module
jest.mock('fs');
jest.mock('path');

const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = path as jest.Mocked<typeof path>;

// Mock blog posts data for testing
const mockBlogPostsContent = [
  {
    filename: 'post-1.md',
    content: `---
id: "post-1"
slug: "post-1"
title: "React Hooks Deep Dive"
date: "2025-01-01"
author: "John Doe"
category: "Frontend"
tags: ["react", "hooks", "javascript"]
summary: "Understanding React hooks in depth"
---
# React Hooks Content
`,
  },
  {
    filename: 'post-2.md',
    content: `---
id: "post-2"
slug: "post-2"
title: "Node.js Performance"
date: "2025-01-02"
author: "Jane Smith"
category: "Backend"
tags: ["nodejs", "performance", "optimization"]
summary: "Optimizing Node.js applications"
---
# Node.js Content
`,
  },
  {
    filename: 'post-3.md',
    content: `---
id: "post-3"
slug: "post-3"
title: "Full Stack Architecture"
date: "2025-01-03"
author: "Bob Johnson"
category: "Architecture"
tags: ["fullstack", "architecture", "design"]
summary: "Designing full stack applications"
---
# Architecture Content
`,
  },
  {
    filename: 'post-4.md',
    content: `---
id: "post-4"
slug: "post-4"
title: "Another React Post"
date: "2025-01-04"
author: "Alice Brown"
category: "Frontend"
tags: ["react", "components", "typescript"]
summary: "More React insights"
---
# More React Content
`,
  },
];

describe('Blog Utils - Filtering Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock path.join to return a mock path
    mockPath.join.mockReturnValue('/mock/blog/path');
    
    // Mock fs.existsSync to return true
    mockFs.existsSync.mockReturnValue(true);
    
    // Mock fs.readdirSync to return mock filenames
    mockFs.readdirSync.mockReturnValue(
      mockBlogPostsContent.map(post => post.filename) as any
    );
    
    // Mock fs.readFileSync to return mock content
    mockFs.readFileSync.mockImplementation((filePath: any) => {
      const filename = filePath.split('/').pop();
      const mockPost = mockBlogPostsContent.find(post => post.filename === filename);
      return mockPost?.content || '';
    });
  });

  describe('getUniqueCategories', () => {
    it('returns unique categories from all blog posts', async () => {
      const categories = await getUniqueCategories();
      
      expect(categories).toEqual(['Architecture', 'Backend', 'Frontend']);
      expect(categories).toHaveLength(3);
    });

    it('filters out falsy categories and sorts alphabetically', async () => {
      // Mock a post with empty category
      const mockPostWithEmptyCategory = {
        filename: 'empty-category.md',
        content: `---
id: "empty"
slug: "empty"
title: "No Category Post"
date: "2025-01-05"
author: "Test Author"
category: ""
tags: ["test"]
summary: "Test post with empty category"
---
# Test Content
`,
      };

      mockFs.readdirSync.mockReturnValue([
        ...mockBlogPostsContent.map(post => post.filename),
        mockPostWithEmptyCategory.filename
      ] as any);

      mockFs.readFileSync.mockImplementation((filePath: any) => {
        const filename = filePath.split('/').pop();
        const mockPost = [...mockBlogPostsContent, mockPostWithEmptyCategory]
          .find(post => post.filename === filename);
        return mockPost?.content || '';
      });

      const categories = await getUniqueCategories();
      
      // Should still return 3 categories, excluding the empty one
      expect(categories).toEqual(['Architecture', 'Backend', 'Frontend']);
      expect(categories).not.toContain('');
    });

    it('handles errors gracefully', async () => {
      mockFs.existsSync.mockReturnValue(false);
      
      const categories = await getUniqueCategories();
      
      expect(categories).toEqual([]);
    });
  });

  describe('getUniqueTags', () => {
    it('returns unique tags from all blog posts sorted alphabetically', async () => {
      const tags = await getUniqueTags();
      
      expect(tags).toEqual([
        'architecture',
        'components',
        'design', 
        'fullstack',
        'hooks',
        'javascript',
        'nodejs',
        'optimization',
        'performance',
        'react',
        'typescript'
      ]);
    });

    it('flattens tags from all posts and removes duplicates', async () => {
      const tags = await getUniqueTags();
      
      // 'react' appears in 2 posts but should only appear once
      const reactCount = tags.filter(tag => tag === 'react').length;
      expect(reactCount).toBe(1);
    });

    it('handles posts with no tags', async () => {
      const mockPostWithNoTags = {
        filename: 'no-tags.md',
        content: `---
id: "no-tags"
slug: "no-tags"
title: "No Tags Post"
date: "2025-01-05"
author: "Test Author"
category: "General"
tags: []
summary: "Test post with no tags"
---
# Test Content
`,
      };

      mockFs.readdirSync.mockReturnValue([
        mockPostWithNoTags.filename
      ] as any);

      mockFs.readFileSync.mockImplementation(() => mockPostWithNoTags.content);

      const tags = await getUniqueTags();
      
      expect(tags).toEqual([]);
    });

    it('handles errors gracefully', async () => {
      mockFs.existsSync.mockReturnValue(false);
      
      const tags = await getUniqueTags();
      
      expect(tags).toEqual([]);
    });
  });

  describe('getFilteredBlogPosts', () => {
    it('returns all posts when no filters are applied', async () => {
      const posts = await getFilteredBlogPosts();
      
      expect(posts).toHaveLength(4);
      expect(posts.map(p => p.id)).toEqual(['post-4', 'post-3', 'post-2', 'post-1']); // Sorted by date desc
    });

    it('filters posts by category', async () => {
      const posts = await getFilteredBlogPosts('Frontend');
      
      expect(posts).toHaveLength(2);
      expect(posts.every(post => post.category === 'Frontend')).toBe(true);
      expect(posts.map(p => p.id)).toEqual(['post-4', 'post-1']);
    });

    it('filters posts by single tag', async () => {
      const posts = await getFilteredBlogPosts(undefined, ['react']);
      
      expect(posts).toHaveLength(2);
      expect(posts.every(post => post.tags.includes('react'))).toBe(true);
      expect(posts.map(p => p.id)).toEqual(['post-4', 'post-1']);
    });

    it('filters posts by multiple tags (OR logic)', async () => {
      const posts = await getFilteredBlogPosts(undefined, ['react', 'nodejs']);
      
      expect(posts).toHaveLength(3);
      // Should include posts that have either 'react' OR 'nodejs'
      const postIds = posts.map(p => p.id);
      expect(postIds).toContain('post-1'); // has react
      expect(postIds).toContain('post-2'); // has nodejs
      expect(postIds).toContain('post-4'); // has react
    });

    it('filters posts by both category and tags', async () => {
      const posts = await getFilteredBlogPosts('Frontend', ['react']);
      
      expect(posts).toHaveLength(2);
      expect(posts.every(post => 
        post.category === 'Frontend' && post.tags.includes('react')
      )).toBe(true);
    });

    it('returns empty array when no posts match filters', async () => {
      const posts = await getFilteredBlogPosts('NonExistentCategory');
      
      expect(posts).toHaveLength(0);
    });

    it('handles case-insensitive tag matching', async () => {
      const posts = await getFilteredBlogPosts(undefined, ['REACT']);
      
      expect(posts).toHaveLength(2);
      expect(posts.every(post => 
        post.tags.some(tag => tag.toLowerCase() === 'react')
      )).toBe(true);
    });

    it('handles invalid category gracefully', async () => {
      const posts = await getFilteredBlogPosts('');
      
      // Empty string should not match any category
      expect(posts).toHaveLength(0);
    });

    it('handles empty tags array', async () => {
      const posts = await getFilteredBlogPosts(undefined, []);
      
      // Empty tags array should return all posts
      expect(posts).toHaveLength(4);
    });

    it('handles errors gracefully', async () => {
      mockFs.existsSync.mockReturnValue(false);
      
      const posts = await getFilteredBlogPosts('Frontend', ['react']);
      
      expect(posts).toEqual([]);
    });
  });
});