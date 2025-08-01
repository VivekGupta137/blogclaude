"use client";

import { BlogPost } from "@/lib/blog-utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {
    CalendarDays,
    User,
    Tag,
    Eye,
    Heart,
    MessageCircle,
} from "lucide-react";

interface BlogPostContentProps {
    post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Split content into Theory and Implementation sections - optimized parsing
    const parseContent = (content: string) => {
        // Early return for empty content
        if (!content) {
            return { theory: "", implementation: "", fullContent: "" };
        }

        // Use more efficient regex matching with named groups
        const theoryMatch = content.match(
            /^## Theory\s*$\n([\s\S]*?)(?=^## Implementation\s*$|$)/m
        );
        const implementationMatch = content.match(
            /^## Implementation\s*$\n([\s\S]*?)$/m
        );

        const theory = theoryMatch ? theoryMatch[1].trim() : "";
        const implementation = implementationMatch
            ? implementationMatch[1].trim()
            : "";

        // If no explicit sections found, show full content
        if (!theory && !implementation) {
            return { theory: "", implementation: "", fullContent: content };
        }

        return { theory, implementation, fullContent: "" };
    };

    const { theory, implementation, fullContent } = parseContent(
        post.content || ""
    );

    return (
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header with metadata */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-8 border-b">
                <div className="max-w-none">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" />
                            <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                {post.category}
                            </span>
                        </div>
                    </div>

                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <p className="text-lg text-gray-700 leading-relaxed">
                        {post.summary}
                    </p>

                    {/* Engagement stats */}
                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-1 text-gray-500">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">{post.visits}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">{post.commentCount}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content sections */}
            <div className="px-6 py-8">
                {fullContent ? (
                    // Single content block if no sections
                    <div className="prose prose-lg max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                                h1: ({ children }) => (
                                    <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
                                        {children}
                                    </h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 first:mt-0">
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                                        {children}
                                    </h3>
                                ),
                                p: ({ children }) => (
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        {children}
                                    </p>
                                ),
                                ul: ({ children }) => (
                                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                                        {children}
                                    </ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">
                                        {children}
                                    </ol>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
                                        {children}
                                    </blockquote>
                                ),
                                code: ({ children, ...props }) => {
                                    const inline = (props as any).inline;
                                    if (inline) {
                                        return (
                                            <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
                                                {children}
                                            </code>
                                        );
                                    }
                                    return <code>{children}</code>;
                                },
                                pre: ({ children }) => (
                                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                                        {children}
                                    </pre>
                                ),
                            }}
                        >
                            {fullContent}
                        </ReactMarkdown>
                    </div>
                ) : (
                    // Two-part structure: Theory and Implementation
                    <div className="space-y-12">
                        {theory && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                                        Theory
                                    </div>
                                    <div className="h-px bg-gray-200 flex-1"></div>
                                </div>
                                <div className="prose prose-lg max-w-none">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeHighlight]}
                                        components={{
                                            h1: ({ children }) => (
                                                <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-4 first:mt-0">
                                                    {children}
                                                </h1>
                                            ),
                                            h2: ({ children }) => (
                                                <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3 first:mt-0">
                                                    {children}
                                                </h2>
                                            ),
                                            h3: ({ children }) => (
                                                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-3">
                                                    {children}
                                                </h3>
                                            ),
                                            p: ({ children }) => (
                                                <p className="text-gray-700 leading-relaxed mb-4">
                                                    {children}
                                                </p>
                                            ),
                                            ul: ({ children }) => (
                                                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                                                    {children}
                                                </ul>
                                            ),
                                            ol: ({ children }) => (
                                                <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">
                                                    {children}
                                                </ol>
                                            ),
                                            blockquote: ({ children }) => (
                                                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
                                                    {children}
                                                </blockquote>
                                            ),
                                            code: ({ children, ...props }) => {
                                                const inline = (props as any)
                                                    .inline;
                                                if (inline) {
                                                    return (
                                                        <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
                                                            {children}
                                                        </code>
                                                    );
                                                }
                                                return <code>{children}</code>;
                                            },
                                        }}
                                    >
                                        {theory}
                                    </ReactMarkdown>
                                </div>
                            </section>
                        )}

                        {implementation && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                        Implementation
                                    </div>
                                    <div className="h-px bg-gray-200 flex-1"></div>
                                </div>
                                <div className="prose prose-lg max-w-none">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeHighlight]}
                                        components={{
                                            h1: ({ children }) => (
                                                <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-4 first:mt-0">
                                                    {children}
                                                </h1>
                                            ),
                                            h2: ({ children }) => (
                                                <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3 first:mt-0">
                                                    {children}
                                                </h2>
                                            ),
                                            h3: ({ children }) => (
                                                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-3">
                                                    {children}
                                                </h3>
                                            ),
                                            p: ({ children }) => (
                                                <p className="text-gray-700 leading-relaxed mb-4">
                                                    {children}
                                                </p>
                                            ),
                                            ul: ({ children }) => (
                                                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                                                    {children}
                                                </ul>
                                            ),
                                            ol: ({ children }) => (
                                                <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">
                                                    {children}
                                                </ol>
                                            ),
                                            blockquote: ({ children }) => (
                                                <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-600 my-4">
                                                    {children}
                                                </blockquote>
                                            ),
                                            code: ({ children, ...props }) => {
                                                const inline = (props as any)
                                                    .inline;
                                                if (inline) {
                                                    return (
                                                        <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
                                                            {children}
                                                        </code>
                                                    );
                                                }
                                                return <code>{children}</code>;
                                            },
                                            pre: ({ children }) => (
                                                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm">
                                                    {children}
                                                </pre>
                                            ),
                                        }}
                                    >
                                        {implementation}
                                    </ReactMarkdown>
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
}
