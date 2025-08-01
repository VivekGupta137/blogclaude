# Source Tree

This section defines the unified project structure, optimized for our monorepo approach and the Next.js framework. This structure provides a clear map for developers, ensuring consistent organization across the project.

```plaintext
project-root/
├── .github/                   # GitHub Actions CI/CD workflows
├── apps/
│   └── web/                   # The Next.js frontend application
│       ├── app/               # App Router directory with co-located components
│       │   ├── api/           # Next.js API Routes (if needed)
│       │   ├── (auth)/        # Route group for auth pages (login, register)
│       │   ├── (blog)/        # Route group for blog pages (list, post)
│       │   │   ├── [slug]/
│       │   │   │   ├── page.tsx
│       │   │   │   └── comments.tsx  # Dynamic comment component
│       │   │   └── page.tsx
│       │   ├── (main)/        # Route group for main pages (homepage, about)
│       │   └── layout.tsx     # Root layout for the application
│       ├── components/        # Reusable UI components
│       │   ├── ui/            # Shadcn UI components (generated via CLI)
│       │   └── custom/        # Project-specific reusable components
│       │       └── Button/
│       │           ├── Button.tsx
│       │           └── Button.test.tsx  # Co-located unit/integration tests
│       ├── content/           # **NEW: Markdown files for blog posts**
│       │   └── blog/
│       │       ├── my-first-post.md
│       │       └── my-second-post.md
│       ├── lib/               # Shared utilities, hooks, and data access logic
│       │   └── actions/       # Next.js Server Actions for custom backend logic
│       ├── public/            # Static assets (images, fonts, etc.)
│       └── tests/             # End-to-end (E2E) tests
├── packages/
│   └── shared/                # Shared code package for the monorepo
│       ├── src/               # Source for shared types and utilities
│       │   └── types/         # TypeScript interfaces (UserProfile, Comment, etc.)
│       └── package.json       # Manages shared package dependencies
├── docs/                      # Project-level documentation
│   ├── architecture.md        # The architecture document you're reading now
│   ├── project-brief.md       # The project brief
│   ├── prd/                   # Sharded PRD files
│   └── stories/               # Directory for user stories
├── .gitignore
├── .eslintrc.json             # Linter configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Monorepo root package.json
└── README.md                  # Project overview and setup instructions
```