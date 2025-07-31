# Epic 3: User Engagement & Social Features

#### Story 3.1: Upstash Redis & NextAuth Setup

**As a** developer,
**I want** the core custom backend services to be set up,
**so that** I can build the user engagement features on a solid foundation.

-   **Acceptance Criteria**
    1. The Upstash Redis database is provisioned and securely configured with the project's environment variables.
    2. The NextAuth.js library is installed and configured for social logins with Google and LinkedIn.
    3. The NextAuth.js adapter is configured to use Upstash Redis for session and user profile data persistence.
    4. A basic NextAuth.js `Session` object is configured to include the `isAdmin` flag.

---

#### Story 3.2: Likes & Visits Counters

**As a** blog reader,
**I want** to see how popular a blog post is,
**so that** I can easily gauge its impact.

-   **Acceptance Criteria**
    1. A Next.js Server Action is created to increment a post's `likes` counter in Upstash Redis.
    2. A Next.js Server Action is created to increment a post's `visits` counter in Upstash Redis.
    3. A simple UI component is implemented to display the likes and visits counts on each blog post page.
    4. The `likes` counter updates in real-time on the frontend after a user clicks the "like" button.

---

#### Story 3.3: Comment Display & Submission

**As a** blog reader,
**I want** to post comments on blog articles,
**so that** I can engage with the content and other readers.

-   **Acceptance Criteria**
    1. A UI component is implemented to display a list of comments on each blog post.
    2. A form is implemented for authenticated users to write and submit new comments.
    3. A Next.js Server Action is created to save a new comment to Upstash Redis.
    4. A user can successfully post a comment after logging in with their Google or LinkedIn account.
    5. The comment count for the blog post is correctly updated and displayed after a new comment is posted.

---

#### Story 3.4: Admin Comment Deletion

**As an** administrator,
**I want** to delete inappropriate comments,
**so that** I can maintain a professional and welcoming community.

-   **Acceptance Criteria**
    1. A "Delete" button is displayed on comments only for users with `isAdmin: true` in their session.
    2. Clicking the "Delete" button triggers a Next.js Server Action.
    3. The Server Action securely checks for admin privileges before deleting the comment from Upstash Redis.
    4. The comment is removed from the UI and the comment count is correctly updated after deletion.

---

#### Story 3.5: Comment Replies

**As a** blog reader,
**I want** to reply to other users' comments,
**so that** I can participate in conversations directly on the blog.

-   **Acceptance Criteria**
    1. A "Reply" button is displayed below each comment.
    2. Clicking "Reply" displays a new comment form, pre-populated with the `parentId` of the comment being replied to.
    3. A user can successfully post a reply.
    4. The comment reply is displayed under the parent comment in the UI.

---
