'use client';

import { useHydration } from '@/hooks/useHydration';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import TodoList from '@/components/todo/TodoList';
import NotesEditor from '@/components/notes/NotesEditor';

export default function Home() {
  const hydrated = useHydration();

  if (!hydrated) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-text-secondary">Loading...</div>
      </div>
    );
  }

  return (
    <main className="h-screen p-8 bg-background">
      <div className="h-full grid grid-cols-1 md:grid-cols-[1fr_420px] gap-8">
        {/* Kanban Board - 70% on desktop */}
        <div className="h-full min-h-0">
          <KanbanBoard />
        </div>

        {/* Sidebar - 30% on desktop */}
        <div className="h-full flex flex-col gap-8 min-h-0">
          {/* Todo List - 60% of sidebar */}
          <div className="flex-[3] min-h-0">
            <TodoList />
          </div>

          {/* Notes - 40% of sidebar */}
          <div className="flex-[2] min-h-0">
            <NotesEditor />
          </div>
        </div>
      </div>
    </main>
  );
}
