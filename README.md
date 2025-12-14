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

## Architecture

The application follows a layered, component-based architecture:

-   **Presentation layer (UI)**
    -   `src/pages/` — route-level pages (`ProductList`, `ProductForm`, `Login`, `NotFound`)
    -   `src/components/` — reusable UI pieces (Layout, header, navigation, table row actions)
-   **State & logic layer**
    -   `src/context/` — `AuthProvider` (authentication, roles, session)
    -   `src/hooks/` — custom hooks for data fetching and UI behavior (`useProducts`, `useInfiniteProducts`, `useAuth`, `useDebounce`)
-   **Data access layer**
    -   `src/api/` — Firestore CRUD for products (`getProducts`, `getProduct`, `createProduct`, `updateProduct`, `deleteProduct`)
-   **Infrastructure**
    -   `src/firebase.ts` — Firebase app & Firestore initialization
    -   `src/router/` — `AppRouter` + route guards (private and role-based)
    -   `src/types/` — TypeScript models (`User`, `Product`, `ProductParams`)

Key architectural decisions:

-   **Server state vs UI state**
    -   Everything coming from backend (products, product details) — via TanStack Query
    -   Local UI state (search input, filters, theme) — via React state + URL search params
-   **URL as state**
    -   Filters (`q`, `category`, `status`, sort) stored in URL, which allows:
        -   sharing links with applied filters
        -   correct browser back/forward behavior
-   **Infinite loading**
    -   Product list uses `useInfiniteQuery` + **Load More** button instead of classic pagination
-   **Optimistic updates**
    -   Toggling _Bought / To Buy_ status executes optimistically: UI updates instantly, Firestore request happens in background

---

## Technologies

### Core

-   **Vite + React 18 + TypeScript**

    -   Vite — fast dev server and build tool
    -   React + TS — type-safe component interfaces

-   **React Router v6**

    -   Client-side SPA routing
    -   Private routes + role-based routes for `admin`-only sections

-   **TanStack Query (React Query)**

    -   Server state management:
        -   caching Firestore requests
        -   `useQuery` for standard queries
        -   `useInfiniteQuery` for infinite "Load More"
        -   mutations with `onMutate` / `onError` / `onSettled` for optimistic UI

-   **Firebase Firestore**
    -   NoSQL database for storing products
    -   Server-side filtering by `category` and `bought`
    -   Client-side search (`q`) and sorting (`sort`, `order`)

### UI & Forms

-   **TailwindCSS with custom design system**

    -   CSS variables for theme tokens (colors, radius, shadows)
    -   Consistent component styling (cards, inputs, buttons, badges)
    -   Light/Dark theme support

-   **react-hook-form + zod**

    -   Schema-based form validation
    -   Type-safe forms for creating/editing products

-   **lucide-react**
    -   Icons for actions (edit, delete, status, search, theme toggle)

---

## Tooling

-   **ESLint / TypeScript**

    -   Type checking and basic linting

-   **Vercel**

    -   Frontend hosting (SPA)
    -   `vercel.json` with rewrites:
        -   all routes (`/products`, `/products/new`, `/login`, etc.) redirect to `index.html`, where React Router handles them
