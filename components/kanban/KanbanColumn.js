'use client';

import { Droppable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import KanbanCard from './KanbanCard';
import AddCardForm from './AddCardForm';
import { cn } from '@/lib/utils';

export default function KanbanColumn({ id, title, color, cards }) {
  const [showAddForm, setShowAddForm] = useState(false);

  const colorClasses = {
    blue: 'border-accent-rust',
    amber: 'border-accent-terra',
    green: 'border-accent-olive',
  };

  const bgClasses = {
    blue: 'bg-accent-rust',
    amber: 'bg-accent-terra',
    green: 'bg-accent-olive',
  };

  const priorityOrder = { high: 0, medium: 1, low: 2 };

  const sortedCards = [...cards].sort((a, b) => {
    const aPriority = priorityOrder[a.priority || 'medium'];
    const bPriority = priorityOrder[b.priority || 'medium'];

    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    return a.order - b.order;
  });

  return (
    <div className={cn(
      'flex flex-col h-full bg-background-card border-2 border-border transition-all',
      'hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]'
    )}>
      {/* Thick colored top border */}
      <div className={cn('h-1', bgClasses[color])}></div>

      {/* Header */}
      <div className={cn('p-4 border-b-2', colorClasses[color])}>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-bold text-text-primary uppercase tracking-wide">
            {title}
          </h2>
          <span className={cn(
            'px-2 py-1 text-xs font-mono font-bold border-2',
            colorClasses[color],
            bgClasses[color],
            'text-background'
          )}>
            {cards.length}
          </span>
        </div>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              'flex-1 p-4 space-y-3 overflow-y-auto scrollbar-brutalist transition-colors',
              snapshot.isDraggingOver && 'bg-background-elevated border-2 border-dashed',
              snapshot.isDraggingOver && colorClasses[color]
            )}
          >
            {sortedCards.map((card, index) => (
              <KanbanCard key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}

            {showAddForm ? (
              <AddCardForm
                status={id}
                onCancel={() => setShowAddForm(false)}
                onAdd={() => setShowAddForm(false)}
              />
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full p-3 text-sm font-mono font-semibold text-text-secondary border-2 border-dashed border-border hover:border-accent-rust hover:text-text-primary hover:bg-background-elevated transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                ADD CARD
              </button>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}
