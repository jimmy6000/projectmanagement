# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Overview

A minimal project management web application with a warm brutalist aesthetic built for personal task organization. Features a Kanban board, todo list, and notes editor with client-side persistence.

**Tech Stack:**
- Next.js 14.2+ (App Router, React 18.3)
- Zustand 4.5 (state management with localStorage persistence)
- Tailwind CSS 3.4 (custom brutalist theme)
- @hello-pangea/dnd 16.6 (drag-and-drop)
- lucide-react 0.344 (icons)

**Key Features:**
- Three-column Kanban board with drag-and-drop, priority filtering, due dates
- Simple todo list with completion tracking
- Auto-saving notes editor with debounced persistence
- All data stored in browser localStorage (no backend)
- Fully responsive design with warm earthy color palette

## Architecture & Patterns

**Component Architecture:**
- Client-side rendered React components (`'use client'` directive)
- Functional components with React hooks
- Container/Presentational pattern (e.g., TodoList/TodoItem)
- Feature-based directory organization (`/components/{feature}`)

**State Management:**
- Zustand stores with localStorage persistence middleware
- Three separate stores: `useKanbanStore`, `useTodoStore`, `useNotesStore`
- SSR-safe hydration via `useHydration` hook

**Data Flow:**
1. User interaction → Component handler
2. Handler calls Zustand store action
3. Store updates state and auto-persists to localStorage
4. Component re-renders with new state

**Key Patterns:**
- Absolute imports using `@/` alias
- Inline editing for cards/todos
- Controlled form components with local state
- Debounced auto-save (notes: 500ms)
- Optimistic UI updates

## Stack Best Practices

**Next.js:**
- Use `'use client'` directive for all interactive components
- Keep server components minimal (layout.js only)
- Use App Router file conventions (page.js, layout.js)
- Absolute imports via `@/` alias from jsconfig.json

**React:**
- Functional components with hooks only
- useState for local UI state (edit modes, input values)
- useEffect for side effects (debounced saves, cleanup)
- Keep components focused and single-responsibility

**Zustand:**
- Create stores in `/lib/store.js` with persist middleware
- Use storage keys with `pm-` prefix
- Actions return void (state updates are implicit)
- Selector pattern: `const { cards, addCard } = useKanbanStore()`

**Tailwind CSS:**
- Use custom theme colors from tailwind.config.js (no arbitrary values)
- Leverage utility classes: `@apply` only in globals.css
- Responsive: mobile-first with `md:` breakpoints
- Custom utilities in `@layer utilities` for animations/scrollbars

**Drag & Drop:**
- Wrap draggable area in `<DragDropContext onDragEnd={handler}>`
- Use `<Droppable droppableId={id}>` for drop zones
- Use `<Draggable draggableId={id} index={index}>` for items
- Handle both reorder (same column) and move (different columns)

**Forms:**
- Controlled inputs with local state
- Submit handlers with e.preventDefault()
- Trim whitespace before saving
- Support Enter to submit, Escape to cancel

## Anti-Patterns

**Avoid:**
- ❌ Mixing server and client components incorrectly
- ❌ Direct localStorage access (use Zustand stores only)
- ❌ Inline styles (use Tailwind utilities)
- ❌ Prop drilling (use Zustand for shared state)
- ❌ Uncontrolled forms
- ❌ Missing `'use client'` directive on interactive components
- ❌ Hydration mismatches (always use useHydration hook)
- ❌ Modifying DOM directly (use React state)
- ❌ CSS-in-JS (stick to Tailwind)
- ❌ Component imports without `@/` alias

**Performance:**
- ❌ Don't setState on every keystroke without debouncing
- ❌ Don't create inline functions in map() for large lists
- ❌ Don't spread {...props} unnecessarily

**UX:**
- ❌ No delete actions without confirmation
- ❌ No form submissions without validation
- ❌ No missing empty states

## Data Models

**Kanban Card:**
```javascript
{
  id: string,              // "timestamp-random"
  title: string,           // Required
  description: string,     // Optional
  status: "todo" | "in-progress" | "complete",
  priority: "low" | "medium" | "high", // Default: "medium"
  dueDate: string | null,  // ISO date "YYYY-MM-DD"
  createdAt: number,       // Unix timestamp
  order: number            // Position in column
}
```

**Todo:**
```javascript
{
  id: string,         // "timestamp-random"
  text: string,       // Task description
  completed: boolean, // Completion status
  createdAt: number,  // Unix timestamp
  order: number       // Display order
}
```

**Notes:**
```javascript
{
  content: string,      // Full notes text
  updatedAt: number | null // Last update timestamp
}
```

**Store Actions:**
- Kanban: `addCard`, `updateCard`, `deleteCard`, `moveCard`, `reorderCard`, `setPriorityFilter`
- Todo: `addTodo`, `toggleTodo`, `deleteTodo`, `updateTodo`
- Notes: `updateNotes`

## Configuration, Security, and Authentication

**Build Configuration:**
- `jsconfig.json` - Path alias: `@/*` → root directory
- `next.config.js` - Empty (uses Next.js defaults)
- `tailwind.config.js` - Custom theme with brutalist colors, fonts, spacing
- `postcss.config.js` - Tailwind + Autoprefixer

**Environment:**
- No environment variables required
- No API keys or secrets
- Runs entirely client-side

**Security:**
- Client-side only (no backend, no API calls)
- localStorage isolation (per-origin security)
- Input sanitization through Zustand actions
- No sensitive data stored
- No authentication required

**Development:**
```bash
npm run dev   # http://localhost:3000
npm run build # Production build
npm start     # Serve production build
npm run lint  # ESLint check
```

**Data Persistence:**
- Storage keys: `pm-kanban`, `pm-todos`, `pm-notes`
- Clear data: `localStorage.removeItem('pm-{key}')` + reload
- No backend sync, all data local

**Browser Support:**
- Modern browsers with localStorage support
- ES6+ features required
- No polyfills included
