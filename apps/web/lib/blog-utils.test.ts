import { getBlogPosts, getBlogPostBySlug, getAllBlogSlugs } from './blog-utils';
import fs from 'fs';
import path from 'path';

// Mock gray-matter module
jest.mock('gray-matter', () => {
  return jest.fn().mockImplementation((content: string) => {
    // Simple parser for test frontmatter
    const lines = content.split('\n');
    const frontmatterEnd = lines.indexOf('---', 1);
    if (frontmatterEnd === -1) {
      return { data: {}, content };
    }
    
    const frontmatterLines = lines.slice(1, frontmatterEnd);
    const data: any = {};
    
    frontmatterLines.forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > -1) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();
        
        // Remove quotes
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        
        // Handle arrays
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(s => s.trim().replace(/"/g, ''));
        }
        
        // Handle numbers
        if (!isNaN(Number(value)) && value !== '') {
          value = Number(value);
        }
        
        data[key] = value;
      }
    });
    
    const content2 = lines.slice(frontmatterEnd + 1).join('\n');
    return { data, content: content2 };
  });
});

// Mock fs module
jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

describe('blog-utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBlogPosts', () => {
    it('should return empty array when blog directory does not exist', async () => {
      mockFs.existsSync.mockReturnValue(false);
      console.warn = jest.fn(); // Mock console.warn

      const result = await getBlogPosts();

      expect(result).toEqual([]);
      expect(console.warn).toHaveBeenCalledWith(
        'Blog content directory not found:',
        expect.stringContaining('content')
      );
    });

    it('should return empty array when no markdown files exist', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['not-markdown.txt', 'README.md'] as any);

      const result = await getBlogPosts();

      expect(result).toEqual([]);
    });

    it('should parse and return blog posts sorted by date', async () => {
      const mockFile1Content = `---
id: "post1"
slug: "post1"
title: "First Post"
date: "2025-01-01"
author: "Author 1"
category: "Tech"
tags: ["tag1", "tag2"]
summary: "First post summary"
thumbnailUrl: "/images/post1.jpg"
likes: 5
commentCount: 2
visits: 100
---
# First Post Content`;

      const mockFile2Content = `---
id: "post2"
slug: "post2"
title: "Second Post"
date: "2025-01-02"
author: "Author 2"
category: "General"
tags: ["tag3"]
summary: "Second post summary"
thumbnailUrl: "/images/post2.jpg"
likes: 10
commentCount: 5
visits: 200
---
# Second Post Content`;

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['post1.md', 'post2.md'] as any);
      mockFs.readFileSync
        .mockReturnValueOnce(mockFile1Content)
        .mockReturnValueOnce(mockFile2Content);

      const result = await getBlogPosts();

      expect(result).toHaveLength(2);
      // Should be sorted by date (newest first)
      expect(result[0].id).toBe('post2');
      expect(result[1].id).toBe('post1');
      expect(result[0]).toEqual({
        id: 'post2',
        slug: 'post2',
        title: 'Second Post',
        date: '2025-01-02',
        author: 'Author 2',
        category: 'General',
        tags: ['tag3'],
        summary: 'Second post summary',
        thumbnailUrl: '/images/post2.jpg',
        likes: 10,
        commentCount: 5,
        visits: 200,
      });
    });

    it('should handle missing frontmatter fields with defaults', async () => {
      const mockFileContent = `---
title: "Minimal Post"
---
# Minimal Post Content`;

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['minimal.md'] as any);
      mockFs.readFileSync.mockReturnValue(mockFileContent);
      console.warn = jest.fn(); // Mock console.warn

      const result = await getBlogPosts();

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: 'minimal',
        slug: 'minimal',
        title: 'Minimal Post',
        date: expect.any(String), // Will be current date
        author: 'Anonymous',
        category: 'General',
        tags: [],
        summary: '',
        thumbnailUrl: '/images/default-blog-thumb.jpg',
        likes: 0,
        commentCount: 0,
        visits: 0,
      });
      expect(console.warn).toHaveBeenCalled();
    });

    it('should handle file system errors gracefully', async () => {
      mockFs.existsSync.mockImplementation(() => {
        throw new Error('File system error');
      });
      console.error = jest.fn(); // Mock console.error

      const result = await getBlogPosts();

      expect(result).toEqual([]);
      expect(console.error).toHaveBeenCalledWith(
        'Error reading blog posts:',
        expect.any(Error)
      );
    });
  });

  describe('getBlogPostBySlug', () => {
    it('should return null when file does not exist', async () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = await getBlogPostBySlug('nonexistent');

      expect(result).toBeNull();
    });

    it('should return blog post with content when file exists', async () => {
      const mockFileContent = `---
id: "test-post"
slug: "test-post"
title: "Test Post"
date: "2025-01-01"
author: "Test Author"
category: "Test"
tags: ["test"]
summary: "Test summary"
thumbnailUrl: "/images/test.jpg"
likes: 1
commentCount: 1
visits: 10
---
# Test Post Content

This is the post content.`;

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(mockFileContent);

      const result = await getBlogPostBySlug('test-post');

      expect(result).toEqual({
        id: 'test-post',
        slug: 'test-post',
        title: 'Test Post',
        date: '2025-01-01',
        author: 'Test Author',
        category: 'Test',
        tags: ['test'],
        summary: 'Test summary',
        thumbnailUrl: '/images/test.jpg',
        likes: 1,
        commentCount: 1,
        visits: 10,
        content: '# Test Post Content\n\nThis is the post content.',
      });
    });

    it('should handle file system errors gracefully', async () => {
      mockFs.existsSync.mockImplementation(() => {
        throw new Error('File system error');
      });
      console.error = jest.fn(); // Mock console.error

      const result = await getBlogPostBySlug('test-post');

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Error reading blog post test-post:',
        expect.any(Error)
      );
    });
  });

  describe('getAllBlogSlugs', () => {
    it('should return empty array when directory does not exist', async () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = await getAllBlogSlugs();

      expect(result).toEqual([]);
    });

    it('should return slugs for all markdown files', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['post1.md', 'post2.md', 'not-md.txt'] as any);

      const result = await getAllBlogSlugs();

      expect(result).toEqual(['post1', 'post2']);
    });

    it('should handle file system errors gracefully', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockImplementation(() => {
        throw new Error('File system error');
      });
      console.error = jest.fn(); // Mock console.error

      const result = await getAllBlogSlugs();

      expect(result).toEqual([]);
      expect(console.error).toHaveBeenCalledWith(
        'Error getting blog slugs:',
        expect.any(Error)
      );
    });
  });
});