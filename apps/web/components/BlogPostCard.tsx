'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog-utils';

interface BlogPostCardProps {
  post: BlogPost;
}

// Icon components for better performance and reusability
const EyeIcon = () => (
  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Memoize stats display to avoid unnecessary renders
  const hasStats = post.visits > 0 || post.likes > 0 || post.commentCount > 0;

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <Link 
        href={`/blog/${post.slug}`}
        className="block"
        aria-label={`Read more about ${post.title}`}
      >
        {/* Thumbnail */}
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <Image
            src={post.thumbnailUrl}
            alt={`Thumbnail for ${post.title}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = '/images/default-blog-thumb.jpg';
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category and Date */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md font-medium">
              {post.category}
            </span>
            <time dateTime={post.date} className="font-medium">
              {formattedDate}
            </time>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h2>

          {/* Summary */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.summary}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
            <span className="font-medium">{post.author}</span>
            {hasStats && (
              <div className="flex items-center space-x-4">
                {post.visits > 0 && (
                  <span className="flex items-center">
                    <EyeIcon />
                    {post.visits}
                  </span>
                )}
                {post.likes > 0 && (
                  <span className="flex items-center">
                    <HeartIcon />
                    {post.likes}
                  </span>
                )}
                {post.commentCount > 0 && (
                  <span className="flex items-center">
                    <ChatIcon />
                    {post.commentCount}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}