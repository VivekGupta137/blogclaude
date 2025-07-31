# Epic 2: Core Blog Content & Navigation

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
