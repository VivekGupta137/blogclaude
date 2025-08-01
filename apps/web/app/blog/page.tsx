import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blog-utils';
import BlogPostCard from '@/components/BlogPostCard';

export const metadata: Metadata = {
  title: 'Blog | BlogClaude',
  description: 'Discover technical insights, tutorials, and deep dives into software engineering, system design, and full-stack development.',
  keywords: ['blog', 'technical articles', 'software engineering', 'system design', 'tutorials'],
  openGraph: {
    title: 'Blog | BlogClaude',
    description: 'Technical insights and tutorials on software engineering',
    type: 'website',
  },
};

export default async function BlogPage() {
  // Fetch posts with proper error handling
  let posts: Awaited<ReturnType<typeof getBlogPosts>> = [];
  let hasError = false;

  try {
    posts = await getBlogPosts();
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    hasError = true;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Technical Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Explore in-depth articles on software engineering, system design, and development best practices. 
          Each post combines theoretical concepts with practical implementation guidance.
        </p>
      </header>

      <main>
        {hasError ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Unable to load blog posts
            </h2>
            <p className="text-gray-500">
              There was an error loading the blog posts. Please try again later.
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              No blog posts available yet
            </h2>
            <p className="text-gray-500">
              Check back soon for technical insights and tutorials!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-sm text-gray-500">
              Showing {posts.length} post{posts.length !== 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}