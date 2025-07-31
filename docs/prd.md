# My Tech & Resume Blog Product Requirements Document (PRD)

## Goals and Background Context

-   **Goals:**
    -   Become a recognized voice in HLD/LLD for young tech professionals.
    -   Establish a high-quality portfolio of technical content.
    -   Attract recruiters and collaborators by showcasing expertise.
-   **Background Context:**
    -   The project aims to address the fragmentation and lack of visually engaging resources for HLD/LLD.
    -   It combines a professional portfolio with a technical blog to establish a stronger industry presence as a full-stack developer.

#### Change Log

| Date       | Version | Description       | Author   |
| ---------- | ------- | ----------------- | -------- |
| 2025-07-31 | 1.0     | Initial PRD draft | John, PM |

---

## Requirements

#### Functional

1. (FR1) The application shall display an interactive resume highlighting key achievements and skills.
2. (FR2) The application shall display a list of blog articles with metadata (e.g., title, summary, date).
3. (FR3) Each blog article shall be presented in a two-part structure: a "Theory" section and an "Implementation" section.
4. (FR4) The "Implementation" section of a blog article shall include syntax-highlighted code snippets.
5. (FR5) Users shall be able to "like" a blog post.
6. (FR6) The application shall display a count of likes for each blog post.
7. (FR7) The application shall display a comment section for each blog post.
8. (FR8) Users shall be able to log in to the comment section using their LinkedIn or Google account.
9. (FR9) Authenticated users shall be able to post comments.
10. (FR10) The application shall allow an administrator to delete any comment.

#### Non Functional

1. (NFR1) The application shall have a modern, clean, and professional design that is fully responsive.
2. (NFR2) The application shall have fast page load times and be optimized for SEO.
3. (NFR3) The blog content will be sourced from Markdown files, not a database.
4. (NFR4) User visits to each blog post must be tracked and displayed.

---

## User Interface Design Goals

#### Overall UX Vision

The primary UX goal is to create a seamless, professional, and content-first experience. The design will be clean and intuitive, ensuring that users can easily find and engage with technical articles and your resume without distraction. The interface will prioritize readability, clarity, and performance.

#### Key Interaction Paradigms

The site will feature fluid, responsive interactions that feel modern and polished. Navigation should be straightforward, with a clear information hierarchy that guides users from a high-level overview (homepage) to specific content (blog post). Micro-interactions and subtle animations from MagicUI and Shadcn will enhance the user experience without being distracting.

#### Core Screens and Views

-   Homepage: Introduces your professional brand and showcases the most recent or popular blog posts.
-   About Me Page: Provides a detailed, personal narrative to complement your resume.
-   Interactive Resume Page: A dynamic, scannable page presenting your skills and work history.
-   Blog Post List Page: An organized and searchable list of all blog posts with key metadata (title, summary, tags).
-   Individual Blog Post Page: The primary content view with the "Theory" and "Implementation" sections, as well as the comment section and social interaction features.

#### Accessibility: None

_This is an assumption._ We have not discussed a specific accessibility compliance level. For the MVP, we will aim for general accessibility best practices but will not target a formal standard like WCAG AA unless specified.

#### Branding

The branding will be defined by a clean, modern, and professional aesthetic. It will leverage the design patterns of Shadcn UI and MagicUI. No external brand guidelines or style guides are to be followed at this time.

#### Target Device and Platforms: Web Responsive

_This is an assumption._ The application will be designed as a single, responsive web application that adapts to various screen sizes (desktop, tablet, and mobile).

---

## Technical Assumptions

#### Repository Structure: Monorepo

-   The project will use a **monorepo structure** to house both the primary Next.js frontend application and a shared package for TypeScript types and utilities.

#### Service Architecture: Jamstack / Next.js Server Actions

-   The application will be built on a **Jamstack architecture**, with static content served from a CDN.
-   Dynamic functionality (e.g., comments, likes) will be handled by **Next.js Server Actions**, eliminating the need for a separate backend server.

#### Testing Requirements: Unit + Integration + E2E

-   The project will use a **full testing pyramid**, including unit tests for individual components, integration tests for key flows (e.g., API interactions), and end-to-end (E2E) tests for critical user journeys.

#### Additional Technical Assumptions and Requests

-   The blog content will be managed as Markdown files within the repository.
-   The custom comment system will use a serverless key-value store (Upstash Redis) for data persistence.
-   Social login functionality (Google, LinkedIn) will be managed via the NextAuth.js library.

---

## Epic List

1. **Epic 1: Foundation & Core Infrastructure**

    - **Goal:** Establish the project's technical foundation. This epic will set up the core Next.js application, implement the monorepo structure, define the deployment pipeline, and create the static Resume and About Me pages. This work is essential before any other features can be built.

2. **Epic 2: Core Blog Content & Navigation**

    - **Goal:** Implement the primary blogging functionality. This epic will focus on building the blog list page, the individual blog post page, and the logic to read content from your Markdown files. It also includes the front-end components for displaying posts, categories, and tags.

3. **Epic 3: User Engagement & Social Features**
    - **Goal:** Integrate the dynamic features of the site. This epic will implement the custom comments system, including social login, and the likes and visits counters. It also includes the critical administrative functionality to delete comments, as we discussed.

---

## Epic 1: Foundation & Core Infrastructure (Refined)

#### Story 1.1: Project Initialization & Basic Structure

**As a** developer,
**I want** a new Next.js project initialized with the specified monorepo structure,
**so that** I have a clean and organized codebase to begin building upon.

-   **Acceptance Criteria**
    1. The project is initialized using Next.js with the App Router.
    2. The monorepo structure is set up with an `apps/web` for the Next.js app and `packages/shared` for shared types.
    3. A basic root `layout.tsx` is created in `apps/web/app/` with a default HTML structure.
    4. All core dependencies (e.g., Tailwind CSS, TypeScript) are configured.
    5. A `content/blog/` directory is created, and a sample Markdown file is added for future content.
    6. A `README.md` file is created at the project root with basic setup instructions.

---

#### Story 1.2: Interactive Resume Page

**As a** job seeker,
**I want** an engaging and interactive resume page,
**so that** I can showcase my experience and skills in a dynamic format.

-   **Acceptance Criteria**
    1. A new page is created at the `/resume` route.
    2. The resume page data is sourced from a static file (e.g., Markdown or JSON).
    3. The page displays a professional and well-structured resume.
    4. At least one interactive element (e.g., a dynamic skill chart or a filterable work history) is implemented.
    5. The page is styled with a clean and modern design using Tailwind CSS and is fully responsive.

---

#### Story 1.3: About Me Page

**As a** blog visitor,
**I want** to learn more about the creator,
**so that** I can get a better sense of their professional journey and passions.

-   **Acceptance Criteria**
    1. A new page is created at the `/about` route.
    2. The content for the about page is sourced from a Markdown file in the `content/` directory.
    3. The page displays a bio and a professional photo.
    4. The page adheres to the project's design standards.

---

#### Story 1.4: Deployment Pipeline

**As a** project owner,
**I want** an automated deployment pipeline,
**so that** my code is automatically built and deployed to Vercel on every commit.

-   **Acceptance Criteria**
    1. A GitHub Actions workflow is configured to run linting, unit tests, and integration tests on every push.
    2. The project is linked to Vercel via Git integration.
    3. Pushing code to a feature branch creates a Preview deployment on Vercel.
    4. Merging a pull request to `main` triggers a production deployment.

---

## Epic 2: Core Blog Content & Navigation

#### Story 2.1: Blog Post List Page

**As a** blog reader,
**I want** to see a list of all blog posts,
**so that** I can easily discover and choose what to read.

-   **Acceptance Criteria**
    1. A new page is created at the `/blog` route.
    2. The page displays a list of all blog posts, with each post showing its title, summary, date, and thumbnail.
    3. The post metadata is fetched from the static files generated at build time.
    4. Clicking on a post's title or thumbnail navigates the user to the individual blog post page.

---

#### Story 2.2: Individual Blog Post Page

**As a** blog reader,
**I want** to read a specific blog post,
**so that** I can learn about a particular topic.

-   **Acceptance Criteria**
    1. A new dynamic page is created at the `/blog/[slug]` route.
    2. The page fetches and renders the full content of the requested Markdown file.
    3. The blog post's content is displayed in the defined two-part structure (Theory and Implementation).
    4. The Implementation section correctly displays syntax-highlighted code snippets.
    5. The page displays the post's metadata, including its title, date, and author.

---

#### Story 2.3: Categories & Tags

**As a** blog reader,
**I want** to filter blog posts by category and tags,
**so that** I can find content that is relevant to my interests.

-   **Acceptance Criteria**
    1. The blog list page includes a filter or navigation component for categories and tags.
    2. Clicking a category or tag filters the list of blog posts to show only relevant articles.
    3. The URLs are updated to reflect the current filters (e.g., `/blog?tag=react`).
    4. The filters work correctly, and the list of posts updates dynamically.

---

## Epic 3: User Engagement & Social Features

#### Story 3.1: Upstash Redis & NextAuth Setup

**As a** developer,
**I want** the core custom backend services to be set up,
**so that** I can build the user engagement features on a solid foundation.

-   **Acceptance Criteria**
    1. The Upstash Redis database is provisioned and securely configured with the project's environment variables.
    2. The NextAuth.js library is installed and configured for social logins with Google and LinkedIn.
    3. The NextAuth.js adapter is configured to use Upstash Redis for session and user profile data persistence.
    4. A basic NextAuth.js `Session` object is configured to include the `isAdmin` flag.

---

#### Story 3.2: Likes & Visits Counters

**As a** blog reader,
**I want** to see how popular a blog post is,
**so that** I can easily gauge its impact.

-   **Acceptance Criteria**
    1. A Next.js Server Action is created to increment a post's `likes` counter in Upstash Redis.
    2. A Next.js Server Action is created to increment a post's `visits` counter in Upstash Redis.
    3. A simple UI component is implemented to display the likes and visits counts on each blog post page.
    4. The `likes` counter updates in real-time on the frontend after a user clicks the "like" button.

---

#### Story 3.3: Comment Display & Submission

**As a** blog reader,
**I want** to post comments on blog articles,
**so that** I can engage with the content and other readers.

-   **Acceptance Criteria**
    1. A UI component is implemented to display a list of comments on each blog post.
    2. A form is implemented for authenticated users to write and submit new comments.
    3. A Next.js Server Action is created to save a new comment to Upstash Redis.
    4. A user can successfully post a comment after logging in with their Google or LinkedIn account.
    5. The comment count for the blog post is correctly updated and displayed after a new comment is posted.

---

#### Story 3.4: Admin Comment Deletion

**As an** administrator,
**I want** to delete inappropriate comments,
**so that** I can maintain a professional and welcoming community.

-   **Acceptance Criteria**
    1. A "Delete" button is displayed on comments only for users with `isAdmin: true` in their session.
    2. Clicking the "Delete" button triggers a Next.js Server Action.
    3. The Server Action securely checks for admin privileges before deleting the comment from Upstash Redis.
    4. The comment is removed from the UI and the comment count is correctly updated after deletion.

---

#### Story 3.5: Comment Replies

**As a** blog reader,
**I want** to reply to other users' comments,
**so that** I can participate in conversations directly on the blog.

-   **Acceptance Criteria**
    1. A "Reply" button is displayed below each comment.
    2. Clicking "Reply" displays a new comment form, pre-populated with the `parentId` of the comment being replied to.
    3. A user can successfully post a reply.
    4. The comment reply is displayed under the parent comment in the UI.

---
