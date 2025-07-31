import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-16">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Welcome to BlogClaude
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A modern tech blog and resume showcase built with Next.js, featuring high-level and low-level design content for software professionals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Explore Blog Posts
          </Link>
          <Link 
            href="/resume" 
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            View Resume
          </Link>
        </div>
      </div>
    </div>
  );
}