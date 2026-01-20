'use client';

import { useTodoStore } from '@/lib/store';
import TodoItem from './TodoItem';
import AddTodoInput from './AddTodoInput';

export default function TodoList() {
  const { todos } = useTodoStore();

  return (
    <div className="flex flex-col h-full bg-background-card border-2 border-border animate-slide-up" style={{ animationDelay: '0.3s' }}>
      {/* Thick colored top border */}
      <div className="h-1 bg-accent-rust"></div>

      {/* Header */}
      <div className="p-4 border-b-2 border-accent-rust">
        <h2 className="text-base font-mono font-bold text-text-primary uppercase tracking-wide">
          Tasks
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-brutalist p-4 space-y-2">
        {todos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm font-serif text-text-tertiary italic">
              No tasks yet.
            </p>
            <p className="text-xs font-mono text-text-tertiary mt-2 uppercase">
              Add one below
            </p>
          </div>
        ) : (
          todos
            .sort((a, b) => a.order - b.order)
            .map((todo, idx) => (
              <div
                key={todo.id}
                style={{ animationDelay: `${idx * 0.05}s` }}
                className="animate-slide-right"
              >
                <TodoItem todo={todo} />
              </div>
            ))
        )}
      </div>

      <div className="p-4 border-t-2 border-border">
        <AddTodoInput />
      </div>
    </div>
  );
}
