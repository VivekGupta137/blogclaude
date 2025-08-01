import { BlogPost } from './blog-utils';

/**
 * Filter function that can be reused across different contexts
 * Implements consistent filtering logic for categories and tags
 */
export function filterBlogPosts(
  posts: BlogPost[],
  category?: string,
  tags?: string[]
): BlogPost[] {
  return posts.filter(post => {
    // Filter by category if specified
    if (category && post.category !== category) {
      return false;
    }
    
    // Filter by tags if specified (OR logic - post must have at least one matching tag)
    if (tags && tags.length > 0) {
      const hasMatchingTag = tags.some(tag => 
        post.tags.some(postTag => 
          postTag.toLowerCase() === tag.toLowerCase()
        )
      );
      if (!hasMatchingTag) {
        return false;
      }
    }
    
    return true;
  });
}