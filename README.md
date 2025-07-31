# BlogClaude

A modern tech blog and resume showcase built with Next.js, featuring high-level and low-level design content for software professionals.

## 🏗️ Architecture

BlogClaude follows a **Jamstack architectural style** with static site generation (SSG) for optimal performance and SEO. The application uses a **monorepo structure** to organize code and shared utilities efficiently.

### Key Features

- 📱 **Responsive Design**: Clean, modern interface built with Tailwind CSS and Shadcn UI
- 📝 **Two-Part Blog Structure**: Each post includes Theory and Implementation sections
- 🔍 **SEO Optimized**: Pre-rendered content with comprehensive metadata
- 🎨 **Modern UI Components**: Shadcn UI and MagicUI for enhanced user experience
- 📊 **Interactive Resume**: Dynamic resume presentation with interactive elements
- 💬 **Comment System**: Social login and comment functionality (planned)
- 📈 **Analytics Integration**: Custom metrics and third-party analytics (planned)

## 🚀 Tech Stack

- **Framework**: Next.js 15.4.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Shadcn UI components
- **Content**: Markdown files with frontmatter
- **Deployment**: Static site generation (SSG)

## 📁 Project Structure

This project uses a **monorepo structure** with npm workspaces:

```
blogclaude/
├── apps/
│   └── web/                 # Next.js application
│       ├── app/            # Next.js App Router pages
│       ├── components/     # React components
│       ├── lib/           # Utility functions
│       └── public/        # Static assets
├── packages/
│   └── shared/            # Shared TypeScript types and utilities
├── content/
│   └── blog/              # Markdown blog content
├── docs/                  # Project documentation
└── package.json           # Root workspace configuration
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blogclaude
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

### Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint across all workspaces
- `npm run type-check` - Run TypeScript type checking

## 🔧 Monorepo Workflow

### Working with Workspaces

This project uses npm workspaces to manage multiple packages:

- **Root workspace** (`/`): Contains shared configuration and scripts
- **Web app** (`apps/web/`): Main Next.js application
- **Shared package** (`packages/shared/`): Common types and utilities

### Adding Dependencies

- **To web app**: `npm install <package> --workspace=web`
- **To shared package**: `npm install <package> --workspace=shared`
- **To root (dev dependencies)**: `npm install <package> -D`

### Running Workspace Commands

- **Specific workspace**: `npm run <script> --workspace=<workspace-name>`
- **All workspaces**: `npm run <script> --workspaces --if-present`

## 📝 Content Management

Blog content is managed as Markdown files in the `content/blog/` directory.

### Blog Post Structure

Each blog post should include frontmatter with the following fields:

```yaml
---
id: "unique-post-id"
slug: "url-friendly-slug"
title: "Post Title"
date: "YYYY-MM-DD"
author: "Author Name"
category: "Category"
tags: ["tag1", "tag2"]
summary: "Brief description for listings and SEO"
thumbnailUrl: "/images/thumbnail.jpg"
likes: 0
commentCount: 0
visits: 0
---
```

### Content Structure

Each blog post should follow the two-part structure:

1. **Theory Section**: Concepts, background, and high-level design
2. **Implementation Section**: Code examples, step-by-step guides, and practical details

## 🧪 Testing

Testing framework setup is configured with standard Next.js testing practices:

- Unit tests for components and utilities
- Integration tests for key user flows
- Type checking with TypeScript

Run tests:
```bash
npm run test          # Run all tests
npm run type-check    # TypeScript type checking
```

## 🚢 Deployment

The application is designed for static site generation (SSG) deployment:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy static files**
   The `apps/web/out/` directory contains the static files ready for deployment to any static hosting service (Vercel, Netlify, etc.).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

Built with ❤️ using Next.js and TypeScript