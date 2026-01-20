'use client';

import { Trash2 } from 'lucide-react';
import { useTodoStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function TodoItem({ todo }) {
  const { toggleTodo, deleteTodo } = useTodoStore();

  return (
    <div className={cn(
      'group flex items-start gap-3 p-3 border-l-4 bg-background-elevated hover:bg-background-card transition-all',
      todo.completed
        ? 'border-l-accent-olive'
        : 'border-l-accent-rust hover:translate-x-1'
    )}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="mt-1 w-5 h-5 border-2 border-border bg-background-card cursor-pointer accent-accent-rust transition-all hover:border-accent-rust"
        style={{
          accentColor: '#d97742'
        }}
      />
      <span
        className={cn(
          'flex-1 text-sm font-serif break-words cursor-pointer leading-relaxed',
          todo.completed
            ? 'text-text-tertiary line-through opacity-60'
            : 'text-text-primary'
        )}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="p-1.5 text-text-tertiary hover:text-red-500 border-2 border-transparent hover:border-red-500 hover:bg-background-card opacity-0 group-hover:opacity-100 transition-all"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
