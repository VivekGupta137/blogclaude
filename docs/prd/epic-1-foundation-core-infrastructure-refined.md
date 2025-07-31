# Epic 1: Foundation & Core Infrastructure (Refined)

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
