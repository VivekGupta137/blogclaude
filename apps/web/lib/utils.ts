import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges Tailwind CSS classes with conflict resolution
 * 
 * This utility function combines multiple class values and resolves
 * Tailwind CSS conflicts using tailwind-merge, ensuring the most
 * specific classes take precedence.
 * 
 * @param inputs - Class values to combine (strings, conditionals, etc.)
 * @returns Merged class string with conflicts resolved
 * 
 * @example
 * ```ts
 * cn('px-2 py-1', 'bg-red-500') // 'px-2 py-1 bg-red-500'
 * cn('px-2', 'px-4') // 'px-4' (conflict resolved)
 * cn('base-class', condition && 'conditional-class') // conditional classes
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}