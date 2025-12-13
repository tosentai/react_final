# Shop List 🛒

**Shopping List** — a web application for managing shopping lists with role-based access, filtering, and item status tracking.

---

## Description

The application allows you to:

-   Add items to your shopping list
-   Mark status: **Bought** (purchased) or **To Buy** (needs to be purchased)
-   Filter by categories and status
-   Search items in real-time (debounced)
-   Load data in chunks via **Load More** button (infinite pagination)

Supports role-based authentication:

-   **Admin** — can create, edit, delete, and toggle item status
-   **User** — can only view the list

---

## Tech Stack

-   **Vite + React 18 + TypeScript**
-   **React Router v6** — client-side routing
-   **TanStack Query** — server state management
-   **TailwindCSS** — styling
-   **Firebase Firestore** — database
-   **react-hook-form + zod** — form validation
-   **lucide-react** — icons

---

## Key Patterns

### 1. **Component-Based Architecture**

Components are organized by responsibility:

-   **Pages** — `ProductList`, `ProductForm`, `Login`
-   **Layout** — header, navigation, theme toggle
-   **Context** — `AuthProvider` for global auth state
-   **Hooks** — `useProducts`, `useDebounce`

### 2. **Custom Hooks Pattern**

Business logic extracted into custom hooks:

-   `useProducts`, `useInfiniteProducts` — TanStack Query requests
-   `useAuth` — authentication logic
-   `useDebounce` — input delay for search

### 3. **Optimistic UI Updates**

When changing item status:

-   UI updates **instantly** (`onMutate`)
-   Server request happens in the background
-   Automatic rollback on error (`onError`)

### 4. **Route Guards (HOC Pattern)**

Route protection via wrappers:

-   `PrivateRoute` — checks authentication
-   `RoleRoute` — checks role (`admin` / `user`)

### 5. **Separation of Concerns**

Clear layer separation:

-   **API layer** (`src/api/`) — Firestore requests
-   **Hooks layer** (`src/hooks/`) — TanStack Query logic
-   **UI layer** (`src/pages/`, `src/components/`) — rendering

### 6. **Infinite Query Pattern**

Instead of classic pagination:

-   `useInfiniteQuery` for loading in chunks
-   **Load More** button fetches the next page
-   All data stored in a single array

### 7. **URL as Single Source of Truth**

Filters (`category`, `status`, `q`) stored in URL via `URLSearchParams`:

-   Browser back/forward works correctly
-   Shareable links with applied filters
