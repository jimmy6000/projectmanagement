# Project Management App

A clean, minimal dark mode project management application for Vibe Coders.

## Features

- **Kanban Board**: Drag-and-drop cards between three columns (Need to do, Doing, Done)
- **Todo List**: Simple checkbox-based task list in the sidebar
- **Notes**: Auto-saving notes area with debounced persistence
- **Local Storage**: All data persists across sessions using localStorage
- **Dark Theme**: Custom minimal dark theme without AI-generated aesthetics

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS with custom dark theme
- **State Management**: Zustand with localStorage persistence
- **Drag & Drop**: @hello-pangea/dnd
- **Icons**: lucide-react

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
projectmanagement/
├── app/
│   ├── layout.js              # Root layout with metadata
│   ├── page.js                # Main dashboard
│   └── globals.css            # Tailwind + custom dark theme
├── components/
│   ├── kanban/
│   │   ├── KanbanBoard.js     # DnD context & columns
│   │   ├── KanbanColumn.js    # Droppable column
│   │   ├── KanbanCard.js      # Draggable card
│   │   └── AddCardForm.js     # Form for new cards
│   ├── todo/
│   │   ├── TodoList.js        # Todo container
│   │   ├── TodoItem.js        # Individual todo
│   │   └── AddTodoInput.js    # Input for new todos
│   └── notes/
│       └── NotesEditor.js     # Auto-saving textarea
├── lib/
│   ├── store.js               # Zustand stores
│   └── utils.js               # Utility functions
└── hooks/
    └── useHydration.js        # SSR hydration hook
```

## Features Overview

### Kanban Board

- Create cards with title and optional description
- Drag cards between columns
- Reorder cards within columns
- Edit cards inline
- Delete cards with confirmation
- Persists to localStorage under `pm-kanban`

### Todo List

- Add todos with simple input
- Toggle completion state
- Delete todos
- Persists to localStorage under `pm-todos`

### Notes

- Auto-saves after 500ms of inactivity
- Shows "Saved" indicator
- Full markdown support (plain text)
- Persists to localStorage under `pm-notes`

## Design Principles

This app follows a minimal, non-AI-generated aesthetic:

- Flat backgrounds with subtle variations
- Muted accent colors (no neon)
- Minimal shadows (0 1px 2px)
- Slight border radius (4-6px)
- Generous whitespace
- Simple hover states

### Color Palette

- Background: `#0a0a0b` (almost black)
- Cards: `#1a1a1f` (subtle elevation)
- Borders: `#2a2a32` (minimal)
- Text Primary: `#e8e8ea`
- Text Secondary: `#a0a0a8`
- Accent Blue: `#5b8ef4`
- Accent Green: `#5eb879`
- Accent Amber: `#d9a85c`

## Local Storage

Data is stored in three separate localStorage keys:

- `pm-kanban`: Kanban cards
- `pm-todos`: Todo items
- `pm-notes`: Notes content

To clear all data, open DevTools and run:

```javascript
localStorage.removeItem('pm-kanban');
localStorage.removeItem('pm-todos');
localStorage.removeItem('pm-notes');
location.reload();
```

## License

MIT
