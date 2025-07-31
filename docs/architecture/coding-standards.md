# Coding Standards

-   **Structured Errors:** We will use a structured `ApiError` object for all backend-to-frontend communication, as defined in the API contract. This ensures consistent error responses that are easy for the frontend to parse and handle.
-   **Centralized Handling:** Errors will be caught and handled at key boundaries in the application, such as at the top level of Server Actions and within API service wrappers in the frontend. This prevents unhandled exceptions from crashing the application.
-   **Graceful Degradation:** The frontend will be designed to handle errors gracefully, displaying user-friendly messages instead of raw error codes or broken interfaces.

#### Logging Standards

-   **Library:** We will use a lightweight, production-ready logging library for the backend, such as `pino`, or leverage Next.js's native logging capabilities in Server Actions.
-   **Format:** Logs will be in a structured format (e.g., JSON) to make them easily searchable and parsable by log management tools.
-   **Levels:** We will use standard logging levels: `info`, `warn`, `error`, and `fatal`.
-   **Required Context:** Each log entry must include key information for debugging, such as:
    -   `timestamp`: A clear timestamp.
    -   `level`: The log level (e.g., `info`, `error`).
    -   `message`: A human-readable message.
    -   `requestId`: A unique ID to trace a single request's journey through the system.
    -   **CRITICAL SECURITY NOTE:** **Never log sensitive user data, personally identifiable information (PII), or secrets (API keys, etc.).**

#### Error Handling Patterns

-   **External API Errors (e.g., social login with NextAuth.js):**

    -   **Retry Policy:** For transient network errors, a simple retry with exponential backoff will be implemented (if supported by the library).
    -   **Circuit Breaker:** For repeated failures from an external service, a circuit breaker pattern may be used to prevent excessive requests and to fail fast.
    -   **Error Translation:** Errors from external services will be caught and translated into our internal `ApiError` format before being returned to the frontend.

-   **Business Logic Errors (e.g., `deleteComment` without admin role):**

    -   **Custom Exceptions:** We will use the custom `ApiError` interface to define specific error conditions.
    -   **User-Facing Errors:** The error message should be concise and helpful to the user (e.g., "Permission Denied" rather than a technical stack trace).
    -   **Error Codes:** We will use the predefined error codes (`PERMISSION_DENIED`, `NOT_FOUND`, `VALIDATION_ERROR`) for predictable client-side error handling.

-   **Data Consistency (e.g., Upstash Redis):**
    -   **Transaction Strategy:** We will use Redis's transaction features where multiple operations need to be atomic to ensure data consistency. For example, incrementing a `commentCount` might be part of a single transaction that also writes a new `Comment` hash.
    -   **Idempotency:** Where possible, operations that can be retried (e.g., submitting a form) will be made idempotent to prevent duplicate data from being created if a request is sent multiple times.
