/**
 * Shared types and utilities for the BlogClaude monorepo
 * 
 * This module provides core data models and utility types used across
 * the application for type safety and consistency.
 */

/**
 * Represents a blog post with metadata and interaction counters
 */
export interface BlogPost {
  /** Unique identifier for the blog post */
  id: string;
  /** URL-friendly slug for routing */
  slug: string;
  /** Display title of the blog post */
  title: string;
  /** Publication date in YYYY-MM-DD format */
  date: string;
  /** Author's display name */
  author: string;
  /** Primary category (e.g., 'HLD', 'LLD', 'Fullstack') */
  category: string;
  /** Array of tags for categorization */
  tags: string[];
  /** Brief description for listings and SEO */
  summary: string;
  /** URL to the post's thumbnail image */
  thumbnailUrl: string;
  /** Number of likes received */
  likes: number;
  /** Total number of comments */
  commentCount: number;
  /** Total number of visits/views */
  visits: number;
}

/**
 * Represents a user comment on a blog post
 */
export interface Comment {
  /** Unique identifier for the comment */
  id: string;
  /** ID of the blog post this comment belongs to */
  postId: string;
  /** ID of the user who posted the comment */
  userId: string;
  /** Display name of the comment author */
  authorName: string;
  /** Optional URL to author's profile picture */
  authorImage?: string;
  /** The comment text content */
  content: string;
  /** ISO timestamp when comment was posted */
  timestamp: string;
  /** Optional ID of parent comment for nested replies */
  parentId?: string;
}

/**
 * Represents a user profile for authentication and personalization
 */
export interface UserProfile {
  /** Unique identifier for the user */
  id: string;
  /** User's email address */
  email: string;
  /** User's display name */
  name: string;
  /** Optional URL to user's profile picture */
  image?: string;
  /** Whether user opted into newsletter */
  newsletterOptIn: boolean;
  /** ISO timestamp of user's last visit */
  lastVisitTimestamp: string;
  /** Total number of comments posted by user */
  commentsPosted: number;
  /** Whether user has administrative privileges */
  isAdmin: boolean;
}

/**
 * Standard error object for API responses
 */
export interface ApiError {
  /** Error code for programmatic handling */
  code: 'VALIDATION_ERROR' | 'NOT_FOUND' | 'PERMISSION_DENIED' | 'INTERNAL_ERROR';
  /** Human-readable error message */
  message: string;
  /** Optional additional error details */
  details?: Record<string, unknown>;
}

/**
 * Discriminated union type for API responses
 * Ensures type safety for success/error handling
 */
export type ApiResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: ApiError;
};

/**
 * Blog post categories enum for type safety
 */
export const BlogCategory = {
  HLD: 'HLD',
  LLD: 'LLD', 
  FULLSTACK: 'Fullstack',
  GENERAL: 'General'
} as const;

export type BlogCategoryType = typeof BlogCategory[keyof typeof BlogCategory];

/**
 * Represents personal information section of a resume
 */
export interface PersonalInfo {
  /** Full name */
  name: string;
  /** Professional title/role */
  title: string;
  /** Professional email address */
  email: string;
  /** Phone number */
  phone: string;
  /** Physical location */
  location: string;
  /** LinkedIn profile URL */
  linkedin?: string;
  /** GitHub profile URL */
  github?: string;
  /** Personal website URL */
  website?: string;
  /** Professional summary/bio */
  summary: string;
}

/**
 * Represents a work experience entry
 */
export interface WorkExperience {
  /** Unique identifier for the experience */
  id: string;
  /** Company name */
  company: string;
  /** Job title/position */
  position: string;
  /** Employment start date in YYYY-MM format */
  startDate: string;
  /** Employment end date in YYYY-MM format, or null if current */
  endDate: string | null;
  /** Whether this is current employment */
  current: boolean;
  /** Brief company description */
  companyDescription: string;
  /** List of key achievements and responsibilities */
  achievements: string[];
  /** Technologies used in this role */
  technologies: string[];
  /** Optional company logo URL */
  companyLogo?: string;
}

/**
 * Represents a technical skill with proficiency level
 */
export interface Skill {
  /** Skill name */
  name: string;
  /** Skill category (e.g., 'Frontend', 'Backend', 'Database') */
  category: string;
  /** Proficiency level from 1-5 */
  level: 1 | 2 | 3 | 4 | 5;
  /** Years of experience with this skill */
  yearsOfExperience: number;
}

/**
 * Represents an education entry
 */
export interface Education {
  /** Unique identifier for the education entry */
  id: string;
  /** Institution name */
  institution: string;
  /** Degree title */
  degree: string;
  /** Field of study */
  fieldOfStudy: string;
  /** Graduation date in YYYY-MM format */
  graduationDate: string;
  /** GPA if applicable */
  gpa?: string;
  /** Notable achievements or honors */
  achievements?: string[];
}

/**
 * Represents a project entry
 */
export interface Project {
  /** Unique identifier for the project */
  id: string;
  /** Project name */
  name: string;
  /** Brief project description */
  description: string;
  /** Technologies used */
  technologies: string[];
  /** Project URL if available */
  url?: string;
  /** GitHub repository URL if available */
  githubUrl?: string;
  /** Project completion date in YYYY-MM format */
  completionDate: string;
  /** Key features or achievements */
  highlights: string[];
}

/**
 * Complete resume data structure
 */
export interface Resume {
  /** Personal information */
  personalInfo: PersonalInfo;
  /** Work experience entries */
  workExperience: WorkExperience[];
  /** Technical skills */
  skills: Skill[];
  /** Education entries */
  education: Education[];
  /** Project entries */
  projects: Project[];
  /** Last updated timestamp */
  lastUpdated: string;
}