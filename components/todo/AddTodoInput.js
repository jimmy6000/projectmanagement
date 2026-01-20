'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTodoStore } from '@/lib/store';

export default function AddTodoInput() {
  const [text, setText] = useState('');
  const { addTodo } = useTodoStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-3 py-2 text-sm font-serif"
        placeholder="Add a task..."
      />
      <button
        type="submit"
        className="px-4 py-2 bg-accent-rust text-background border-2 border-accent-rust hover:shadow-[3px_3px_0_0_rgba(0,0,0,0.3)] transition-all text-xs font-mono font-bold flex items-center gap-2 uppercase"
      >
        <Plus className="w-4 h-4" />
        Add
      </button>
    </form>
  );
}
