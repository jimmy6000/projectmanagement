'use client';

import { DragDropContext } from '@hello-pangea/dnd';
import { Filter } from 'lucide-react';
import { useKanbanStore } from '@/lib/store';
import KanbanColumn from './KanbanColumn';
import { cn } from '@/lib/utils';

const columns = [
  { id: 'todo', title: 'Need to do', color: 'blue' },
  { id: 'in-progress', title: 'Doing', color: 'amber' },
  { id: 'complete', title: 'Done', color: 'green' },
];

const priorities = [
  { value: 'high', label: 'High', color: 'border-l-red-500' },
  { value: 'medium', label: 'Medium', color: 'border-l-accent-amber' },
  { value: 'low', label: 'Low', color: 'border-l-text-tertiary' },
];

export default function KanbanBoard() {
  const { cards, moveCard, reorderCard, priorityFilter, setPriorityFilter } = useKanbanStore();

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a droppable area
    if (!destination) return;

    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    // Moving to a different column
    if (sourceStatus !== destStatus) {
      moveCard(draggableId, destStatus, destination.index);
    } else {
      // Reordering within the same column
      reorderCard(draggableId, destination.index, sourceStatus);
    }
  };

  const togglePriorityFilter = (priority) => {
    if (priorityFilter.includes(priority)) {
      setPriorityFilter(priorityFilter.filter((p) => p !== priority));
    } else {
      setPriorityFilter([...priorityFilter, priority]);
    }
  };

  const getFilteredCards = (columnId) => {
    let filtered = cards.filter((card) => card.status === columnId);

    if (priorityFilter.length > 0) {
      filtered = filtered.filter((card) =>
        priorityFilter.includes(card.priority || 'medium')
      );
    }

    return filtered.sort((a, b) => a.order - b.order);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header with asymmetric design */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-accent-rust"></div>
        <div className="pl-6">
          <h1 className="text-3xl font-mono font-bold text-text-primary mb-1 tracking-tight">
            PROJECT.BOARD
          </h1>
          <div className="h-0.5 w-32 bg-accent-rust"></div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex items-center gap-4 pb-4 border-b-2 border-border">
        <div className="flex items-center gap-3 text-sm font-mono text-text-secondary uppercase tracking-wide">
          <Filter className="w-5 h-5" />
          <span className="font-semibold">Filter:</span>
        </div>
        <div className="flex gap-3">
          {priorities.map((priority, idx) => (
            <button
              key={priority.value}
              onClick={() => togglePriorityFilter(priority.value)}
              style={{ animationDelay: `${idx * 0.1}s` }}
              className={cn(
                'px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border-2 transition-all animate-slide-right',
                priorityFilter.includes(priority.value)
                  ? 'bg-accent-rust text-background border-accent-rust shadow-[3px_3px_0_0_rgba(0,0,0,0.3)]'
                  : 'bg-background-card text-text-secondary border-border hover:border-accent-rust hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_rgba(217,119,66,0.2)]'
              )}
            >
              {priority.label}
            </button>
          ))}
          {priorityFilter.length > 0 && (
            <button
              onClick={() => setPriorityFilter([])}
              className="px-4 py-2 text-xs font-mono font-bold text-text-tertiary hover:text-accent-rust transition-all hover:translate-x-[-1px]"
            >
              ✕ CLEAR
            </button>
          )}
        </div>
      </div>

      {/* Kanban Columns */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
          {columns.map((column, idx) => (
            <div
              key={column.id}
              style={{ animationDelay: `${idx * 0.15}s` }}
              className="animate-slide-up"
            >
              <KanbanColumn
                id={column.id}
                title={column.title}
                color={column.color}
                cards={getFilteredCards(column.id)}
              />
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
