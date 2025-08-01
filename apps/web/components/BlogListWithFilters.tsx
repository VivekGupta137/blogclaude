'use client';

import { Suspense, useMemo } from 'react';
import { BlogPost } from '@/lib/blog-utils';
import { filterBlogPosts } from '@/lib/blog-client-utils';
import { useBlogFilters } from '@/lib/hooks/useBlogFilters';
import { CategoryFilter } from '@/components/CategoryFilter';
import { TagFilter } from '@/components/TagFilter';
import { Button } from '@/components/ui/button';
import BlogPostCard from '@/components/BlogPostCard';
import { X } from 'lucide-react';

interface BlogListWithFiltersProps {
  initialPosts: BlogPost[];
  categories: string[];
  tags: string[];
}

function BlogListContent({ initialPosts, categories, tags }: BlogListWithFiltersProps) {
  const { filters, setCategory, toggleTag, clearTags, clearAllFilters, hasActiveFilters } = useBlogFilters();

  // Filter posts based on current filters using shared filtering logic
  const filteredPosts = useMemo(() => {
    return filterBlogPosts(initialPosts, filters.category, filters.tags);
  }, [initialPosts, filters.category, filters.tags]);

  return (
    <div className="space-y-8">
      {/* Filter Section */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Filter Posts
          </h2>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4 mr-1" />
              Clear all filters
            </Button>
          )}
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Categories</h3>
          <CategoryFilter
            categories={categories}
            selectedCategory={filters.category}
            onCategorySelect={setCategory}
          />
        </div>

        {/* Tag Filter */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Tags</h3>
          <TagFilter
            tags={tags}
            selectedTags={filters.tags}
            onTagToggle={toggleTag}
            onClearTags={clearTags}
          />
        </div>
      </div>

      {/* Results Section */}
      <div>
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              No posts match your filters
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your filters to see more posts.
            </p>
            {hasActiveFilters && (
              <Button onClick={clearAllFilters}>
                Clear all filters
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Showing {filteredPosts.length} of {initialPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
                {hasActiveFilters && (
                  <span className="ml-2 text-blue-600">
                    (filtered)
                  </span>
                )}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function BlogListWithFilters(props: BlogListWithFiltersProps) {
  return (
    <Suspense fallback={
      <div className="space-y-8">
        <div className="bg-gray-50 rounded-lg p-6 h-48 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-100 rounded-lg h-64 animate-pulse" />
          ))}
        </div>
      </div>
    }>
      <BlogListContent {...props} />
    </Suspense>
  );
}