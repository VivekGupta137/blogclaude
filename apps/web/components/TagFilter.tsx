'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearTags: () => void;
  className?: string;
}

export function TagFilter({
  tags,
  selectedTags,
  onTagToggle,
  onClearTags,
  className
}: TagFilterProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {selectedTags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Selected tags">
          <span className="text-sm font-medium text-muted-foreground">
            Selected tags:
          </span>
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="default"
              className="gap-1 cursor-pointer hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={() => onTagToggle(tag)}
              role="button"
              tabIndex={0}
              aria-label={`Remove ${tag} tag filter`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onTagToggle(tag);
                }
              }}
            >
              {tag}
              <X className="h-3 w-3" aria-hidden="true" />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearTags}
            className="h-6 px-2 text-xs"
            aria-label="Clear all selected tags"
          >
            Clear all
          </Button>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2" role="group" aria-label="Available tags">
        {tags
          .filter(tag => !selectedTags.includes(tag))
          .map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={() => onTagToggle(tag)}
              role="button"
              tabIndex={0}
              aria-label={`Add ${tag} tag filter`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onTagToggle(tag);
                }
              }}
            >
              {tag}
            </Badge>
          ))}
      </div>
    </div>
  );
}