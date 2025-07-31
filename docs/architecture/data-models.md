# Data Models

-   **Purpose:** To represent metadata and dynamic interaction counts for an individual article. The full Markdown content resides in the repository and is processed by Next.js at build time.
-   **Key Attributes:**

    -   `id`: `string` - Unique identifier (e.g., UUID or `slug`).
    -   `slug`: `string` - URL-friendly identifier (e.g., `my-first-post`).
    -   `title`: `string` - Title of the blog post.
    -   `date`: `string` - Publication date (ISO format, e.g., `YYYY-MM-DD`).
    -   `author`: `string` - Author's display name (your name).
    -   `category`: `string` - Primary category (e.g., 'HLD', 'LLD', 'Fullstack').
    -   `tags`: `string[]` - Array of keywords/tags (e.g., `['Microservices', 'Redis', 'TypeScript']`).
    -   `summary`: `string` - A short description for listings and SEO.
    -   `thumbnailUrl`: `string` - URL to a thumbnail image for the post.
    -   `likes`: `number` - Counter for article likes.
    -   `commentCount`: `number` - Counter for the total number of comments on this post.
    -   `visits`: `number` - **Custom, persistent counter for total unique article visits, managed via Next.js Server Actions and Upstash Redis.** This complements external analytics (GA4/MS Clarity) by providing a directly controllable and displayable metric on the page.

-   **Relationships:**

    -   A `BlogPost` has many `Comment`s.

-   **Redis Mapping:** Stored as a Redis Hash (e.g., `blog:post:{id}`) containing all attributes except `content`. A Redis Sorted Set (`blog:posts:all`) could order posts by `date` or `visits`.

#### Comment

-   **Purpose:** To store user comments associated with blog posts.
-   **Key Attributes:**
    -   `id`: `string` - Unique identifier for the comment.
    -   `postId`: `string` - ID of the blog post the comment belongs to.
    -   `userId`: `string` - ID of the user who posted the comment (from NextAuth.js).
    -   `authorName`: `string` - **Denormalized display name of the comment author (pulled from UserProfile at comment creation).**
    -   `authorImage`: `string` - **Optional denormalized URL to author's profile picture.**
    -   `content`: `string` - The text content of the comment.
    -   `timestamp`: `string` - ISO string of when the comment was posted.
    -   `parentId`: `string` (optional)
-   **Relationships:**

    -   A `Comment` belongs to one `BlogPost`.
    -   A `Comment` belongs to one `UserProfile`.

-   **Redis Mapping:** Stored as a Redis Hash (e.g., `comment:{id}`). A Redis Sorted Set (`post:comments:{postId}`) will list all comment IDs for a given post, sorted by timestamp. The total number of comments will be derived from this set's size using `ZCARD`.

#### UserProfile

-   **Purpose:** To store core user information linked to their social login for identification (e.g., for comments, newsletter opt-in) and **user-specific interaction tracking on the site**.
-   **Key Attributes:**

    -   `id`: `string` - Unique identifier for the user (from NextAuth.js provider, e.g., `'google_12345'`, `'linkedin_abcde'`). This is the primary key for the user in Redis.
    -   `email`: `string` - User's email address (obtained from social login, required for newsletter).
    -   `name`: `string` - User's display name (from social login).
    -   `image`: `string` (optional)
    -   `newsletterOptIn`: `boolean` (local UI flag; subscription managed by an external service).
    -   `lastVisitTimestamp`: `string`
    -   `commentsPosted`: `number`
    -   `isAdmin`: `boolean`

-   **Relationships:**

    -   A `UserProfile` can post many `Comment`s.

-   **Redis Mapping:** Stored as a Redis Hash (e.g., `user:profile:{userId}`).
