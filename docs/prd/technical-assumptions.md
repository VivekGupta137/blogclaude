# Technical Assumptions

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
