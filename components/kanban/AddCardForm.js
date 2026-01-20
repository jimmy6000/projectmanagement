'use client';

import { useState } from 'react';
import { useKanbanStore } from '@/lib/store';

export default function AddCardForm({ status, onCancel, onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const { addCard } = useKanbanStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addCard(status, title.trim(), description.trim(), priority, dueDate || null);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      onAdd();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-background-elevated p-4 border-2 border-accent-rust space-y-3 card-shadow">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 text-sm font-serif"
        placeholder="Card title"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Escape') onCancel();
        }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3 py-2 text-sm font-serif resize-none"
        placeholder="Description (optional)"
        rows={2}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onCancel();
        }}
      />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-mono font-semibold text-text-secondary mb-2 block uppercase">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 text-sm font-mono"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-mono font-semibold text-text-secondary mb-2 block uppercase">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 text-sm font-mono"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 text-xs font-mono font-bold bg-accent-rust text-background border-2 border-accent-rust hover:shadow-[3px_3px_0_0_rgba(0,0,0,0.3)] transition-all uppercase"
        >
          Add
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-xs font-mono font-bold bg-background-card text-text-secondary border-2 border-border hover:border-accent-rust transition-all uppercase"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
