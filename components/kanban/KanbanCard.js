'use client';

import { Draggable } from '@hello-pangea/dnd';
import { Pencil, Trash2, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useKanbanStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const priorityColors = {
  low: 'border-l-[6px] border-l-accent-olive',
  medium: 'border-l-[6px] border-l-accent-terra',
  high: 'border-l-[6px] border-l-red-500',
};

const priorityLabels = {
  low: 'LOW',
  medium: 'MED',
  high: 'HIGH',
};

const priorityBg = {
  low: 'bg-accent-olive',
  medium: 'bg-accent-terra',
  high: 'bg-red-500',
};

export default function KanbanCard({ card, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [priority, setPriority] = useState(card.priority || 'medium');
  const [dueDate, setDueDate] = useState(card.dueDate || '');
  const { updateCard, deleteCard } = useKanbanStore();

  const handleSave = () => {
    if (title.trim()) {
      updateCard(card.id, {
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate: dueDate || null
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTitle(card.title);
    setDescription(card.description || '');
    setPriority(card.priority || 'medium');
    setDueDate(card.dueDate || '');
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date(new Date().setHours(0, 0, 0, 0));
  };

  const handleDelete = () => {
    if (confirm('Delete this card?')) {
      deleteCard(card.id);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-background-elevated p-4 border-2 border-accent-rust space-y-3 card-shadow">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 text-sm font-serif"
          placeholder="Card title"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 text-sm font-serif resize-none"
          placeholder="Description (optional)"
          rows={2}
          onKeyDown={(e) => {
            if (e.key === 'Escape') handleCancel();
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
            onClick={handleSave}
            className="px-4 py-2 text-xs font-mono font-bold bg-accent-rust text-background border-2 border-accent-rust hover:shadow-[3px_3px_0_0_rgba(0,0,0,0.3)] transition-all uppercase"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-xs font-mono font-bold bg-background-card text-text-secondary border-2 border-border hover:border-accent-rust transition-all uppercase"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            'group bg-background-elevated p-4 border-2 border-border cursor-grab active:cursor-grabbing transition-all',
            priorityColors[card.priority || 'medium'],
            snapshot.isDragging ? 'card-shadow-hover rotate-2' : 'card-shadow hover:translate-x-[-2px] hover:translate-y-[-2px]'
          )}
        >
          {/* Priority badge */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className={cn(
              'px-2 py-1 text-[10px] font-mono font-bold border-2 border-black/20',
              priorityBg[card.priority || 'medium'],
              'text-background'
            )}>
              {priorityLabels[card.priority || 'medium']}
            </span>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="p-1.5 text-text-tertiary hover:text-accent-rust hover:bg-background-card border-2 border-transparent hover:border-accent-rust transition-all"
                title="Edit"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="p-1.5 text-text-tertiary hover:text-red-500 hover:bg-background-card border-2 border-transparent hover:border-red-500 transition-all"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-serif font-semibold text-text-primary break-words leading-snug">
              {card.title}
            </h3>
            {card.description && (
              <p className="text-sm font-serif text-text-secondary break-words leading-relaxed">
                {card.description}
              </p>
            )}
            {card.dueDate && (
              <div className={cn(
                'flex items-center gap-2 mt-3 pt-3 border-t-2 text-xs font-mono font-semibold',
                isOverdue(card.dueDate)
                  ? 'text-red-500 border-red-500/30'
                  : 'text-text-tertiary border-border'
              )}>
                <Calendar className="w-4 h-4" />
                <span className="uppercase tracking-wide">{formatDate(card.dueDate)}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
