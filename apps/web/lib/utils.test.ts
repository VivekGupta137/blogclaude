import { cn } from './utils'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    expect(cn('px-2 py-1', 'bg-red-500')).toBe('px-2 py-1 bg-red-500')
  })

  it('handles conflicting Tailwind classes', () => {
    // tailwind-merge should resolve conflicts
    expect(cn('px-2 px-4')).toBe('px-4')
  })

  it('handles conditional classes', () => {
    expect(cn('base-class', true && 'conditional-class')).toBe('base-class conditional-class')
    expect(cn('base-class', false && 'conditional-class')).toBe('base-class')
  })

  it('handles undefined and null values', () => {
    expect(cn('base-class', undefined, null)).toBe('base-class')
  })
})