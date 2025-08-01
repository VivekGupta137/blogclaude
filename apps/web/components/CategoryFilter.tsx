'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory?: string;
  onCategorySelect: (category: string | undefined) => void;
  className?: string;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
  className
}: CategoryFilterProps) {
  return (
    <div 
      className={cn('flex flex-wrap gap-2', className)}
      role="group"
      aria-label="Filter by category"
    >
      <Button
        variant={selectedCategory === undefined ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategorySelect(undefined)}
        className="shrink-0"
        aria-pressed={selectedCategory === undefined}
        aria-describedby="category-filter-description"
      >
        All Categories
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategorySelect(category)}
          className="shrink-0"
          aria-pressed={selectedCategory === category}
          aria-describedby="category-filter-description"
        >
          {category}
        </Button>
      ))}
      <span id="category-filter-description" className="sr-only">
        Select a category to filter blog posts. Press Enter or Space to select.
      </span>
    </div>
  );
}