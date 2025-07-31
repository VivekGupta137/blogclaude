# System Components

-   **Responsibility:** Renders the entire user interface, including the resume, blog post listings, individual articles, and the comment section. It's responsible for all client-side rendering and user interaction. **Dynamic content (like comments, likes, and visits) is fetched at runtime from the Data Access Layer.**
-   **Key Interfaces:**
    -   **User Interface:** Displays all pages and components to the end-user.
    -   **Data Fetching:** Interacts exclusively with the Data Access Layer for all dynamic data.
    -   **State Management:** Manages UI state for user interactions and authenticated sessions.
-   **Dependencies:** Data Access Layer, Styling Solution (Tailwind, Shadcn, MagicUI).
-   **Technology Stack:** Next.js (SSG), React 19.x.x, Tailwind CSS, Shadcn UI, MagicUI.

#### 2. Data Access Layer

-   **Responsibility:** Serves as the single point of contact between the Frontend UI and the backend services (Next.js Server Actions). It abstracts away the data fetching logic and provides a consistent interface for the UI components. This is a crucial abstraction for a clean, testable architecture.
-   **Key Interfaces:**
    -   `getPosts():` Retrieves a list of blog post metadata.
    -   `getCommentsForPost(postId):` Retrieves all comments for a post.
    -   `createComment(postId, commentData):` Submits a new comment.
    -   `incrementLikes(postId):` Increments the like counter for a post.
    -   `incrementVisits(postId):` Increments the visit counter for a post.
-   **Dependencies:** Next.js Server Actions.
-   **Technology Stack:** React Query / SWR, TypeScript.

#### 3. Blog Content Service

-   **Responsibility:** Manages the retrieval and processing of blog post content. Its primary function is to read Markdown files from the repository at **build time** and process their metadata and content for static generation.
-   **Key Interfaces:**
    -   **Static Content Generation:** Processes Markdown files and generates static HTML pages and metadata via Next.js's SSG.
    -   **Metadata Retrieval:** At build time, reads the frontmatter from each Markdown file to create a list of all `BlogPost` metadata.
-   **Dependencies:** File system API.
-   **Technology Stack:** Next.js (built-in SSG).

#### 4. Comment Management Service

-   **Responsibility:** Handles all logic related to user comments, including storing new comments, retrieving existing comments for a post, and updating comment counts within the Upstash Redis database.
-   **Key Interfaces:**
    -   `createComment(postId, userId, content):` **Returns the newly created `Comment` object.**
    -   `getCommentsForPost(postId):` **Returns an array of `Comment[]` objects.**
    -   `getCommentCount(postId):` **Returns a `number` representing the total comment count.**
    -   `deleteComment(commentId):` **Returns a `boolean` indicating success.**
-   **Dependencies:** User Authentication & Profile Service, Upstash (Serverless Redis) database.
-   **Technology Stack:** NextAuth.js (Auth.js), Upstash (Serverless Redis).

#### 5. User Authentication & Profile Service

-   **Responsibility:** Manages user authentication via social logins, maintains user sessions in Upstash Redis, and stores basic user profile information.
-   **Key Interfaces:**
    -   `signIn(provider)`: Initiates a social login flow (e.g., Google, LinkedIn).
    -   `getSession()`: Retrieves the current user's session and profile information.
    -   `updateProfile(userId, data)`: Updates user profile data (e.g., newsletter opt-in).
-   **Dependencies:** NextAuth.js, Upstash (Serverless Redis) database.
-   **Technology Stack:** NextAuth.js (Auth.js), Upstash (Serverless Redis).

#### 6. Analytics/Metrics Service

-   **Responsibility:** Manages the custom tracking of dynamic data like article likes and visits, which are stored in Upstash Redis and separate from a third-party analytics provider.
-   **Key Interfaces:**
    -   `incrementLikes(postId):` **Returns the new total like count.**
    -   `incrementVisits(postId):` **Returns the new total visit count.**
-   **Dependencies:** Upstash (Serverless Redis) database.
-   **Technology Stack:** Next.js Server Actions, Upstash (Serverless Redis).

---
