# High Level Project Diagram

```mermaid
graph TD
    A[User] --> B(CDN)
    B --> C[Frontend App (Static HTML, CSS, JS)]
    C --> D[Static Hosting]
    C --> E(Third-Party Analytics: GA4/MS Clarity)
    E -- Script Embed --> C
    C --> F(Third-Party Comments: Disqus/Hyvor Talk)
    F --> G[Social Login: LinkedIn/Google]

    H[Content Author (You)] --> I[Markdown Files (Git)]
    I --> J[Static Site Generator (SSG)]
    J --> D
Architectural and Design Patterns
For your blog, we'll lean into the following key patterns:

Jamstack Architecture: Utilizing a static site generator for pre-rendered content and external APIs/client-side JavaScript for dynamic features.

Rationale: This aligns perfectly with your goals for high performance, excellent SEO, and minimal hosting costs, while still supporting interactive elements like comments. It offers a secure and scalable foundation for a content-heavy site.

Component-Based UI: Structuring the frontend using reusable UI components.

Rationale: This promotes maintainability, scalability, and reusability, essential for building an appealing and interactive resume and blog. It will allow you to build complex interfaces from smaller, self-contained units.

Markdown-Driven Content: Storing blog posts as Markdown files within the repository.

Rationale: This simplifies the content creation workflow, provides version control for articles, and integrates seamlessly with Static Site Generators for efficient content rendering. It's a developer-friendly approach to blogging.

```

---
