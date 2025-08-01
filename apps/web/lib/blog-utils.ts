import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  summary: string;
  thumbnailUrl: string;
  likes: number;
  commentCount: number;
  visits: number;
  content?: string;
}

const BLOG_CONTENT_PATH = path.join(process.cwd(), '..', '..', 'content', 'blog');

/**
 * Parse frontmatter and create BlogPost object with defaults
 * Reduces code duplication between getBlogPosts and getBlogPostBySlug
 */
function parseFrontmatterToBlogPost(
  frontmatter: Record<string, any>,
  filename: string,
  content?: string
): BlogPost {
  // Validate required frontmatter fields
  const requiredFields = ['id', 'slug', 'title', 'date', 'author', 'summary'];
  const missingFields = requiredFields.filter(field => !frontmatter[field]);
  
  if (missingFields.length > 0) {
    console.warn(`Missing required fields in ${filename}:`, missingFields);
  }

  const baseSlug = filename.replace('.md', '');
  
  return {
    id: frontmatter.id || baseSlug,
    slug: frontmatter.slug || baseSlug,
    title: frontmatter.title || 'Untitled',
    date: frontmatter.date || new Date().toISOString().split('T')[0],
    author: frontmatter.author || 'Anonymous',
    category: frontmatter.category || 'General',
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    summary: frontmatter.summary || '',
    thumbnailUrl: frontmatter.thumbnailUrl || '/images/default-blog-thumb.jpg',
    likes: frontmatter.likes || 0,
    commentCount: frontmatter.commentCount || 0,
    visits: frontmatter.visits || 0,
    ...(content !== undefined && { content }),
  };
}

/**
 * Get all blog posts with metadata for listing page
 * Processes Markdown files at build time for SSG
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Check if blog content directory exists
    if (!fs.existsSync(BLOG_CONTENT_PATH)) {
      console.warn('Blog content directory not found:', BLOG_CONTENT_PATH);
      return [];
    }

    const files = fs.readdirSync(BLOG_CONTENT_PATH);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    if (markdownFiles.length === 0) {
      return [];
    }

    const posts = markdownFiles.map((filename) => {
      const filePath = path.join(BLOG_CONTENT_PATH, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContent);

      return parseFrontmatterToBlogPost(frontmatter, filename);
    });

    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

/**
 * Get a single blog post by slug with full content
 * Used for individual blog post pages
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOG_CONTENT_PATH, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);

    return parseFrontmatterToBlogPost(frontmatter, `${slug}.md`, content);
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all available blog post slugs for static generation
 * Used by generateStaticParams in dynamic routes
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    if (!fs.existsSync(BLOG_CONTENT_PATH)) {
      return [];
    }

    const files = fs.readdirSync(BLOG_CONTENT_PATH);
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
  } catch (error) {
    console.error('Error getting blog slugs:', error);
    return [];
  }
}

/**
 * Get all unique categories from blog posts
 * Used for building category filter UI
 */
export async function getUniqueCategories(): Promise<string[]> {
  try {
    const posts = await getBlogPosts();
    const categories = posts.map(post => post.category);
    return [...new Set(categories)].filter(Boolean).sort();
  } catch (error) {
    console.error('Error getting unique categories:', error);
    return [];
  }
}

/**
 * Get all unique tags from blog posts
 * Used for building tag filter UI
 */
export async function getUniqueTags(): Promise<string[]> {
  try {
    const posts = await getBlogPosts();
    const allTags = posts.flatMap(post => post.tags);
    return [...new Set(allTags)].filter(Boolean).sort();
  } catch (error) {
    console.error('Error getting unique tags:', error);
    return [];
  }
}


/**
 * Filter blog posts by category and/or tags
 * Used for implementing filtering functionality
 */
export async function getFilteredBlogPosts(
  category?: string,
  tags?: string[]
): Promise<BlogPost[]> {
  try {
    const posts = await getBlogPosts();
    const { filterBlogPosts } = await import('./blog-client-utils');
    return filterBlogPosts(posts, category, tags);
  } catch (error) {
    console.error('Error filtering blog posts:', error);
    return [];
  }
}