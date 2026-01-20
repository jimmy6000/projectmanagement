import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateId } from './utils';

// Kanban Store
export const useKanbanStore = create(
  persist(
    (set) => ({
      cards: [],
      priorityFilter: [],

      addCard: (status, title, description = '', priority = 'medium', dueDate = null) => {
        set((state) => ({
          cards: [
            ...state.cards,
            {
              id: generateId(),
              title,
              description,
              status,
              priority,
              dueDate,
              createdAt: Date.now(),
              order: state.cards.filter((c) => c.status === status).length,
            },
          ],
        }));
      },

      setPriorityFilter: (priorities) => {
        set({ priorityFilter: priorities });
      },

      updateCard: (id, updates) => {
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id ? { ...card, ...updates } : card
          ),
        }));
      },

      deleteCard: (id) => {
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== id),
        }));
      },

      moveCard: (cardId, newStatus, newOrder) => {
        set((state) => {
          const card = state.cards.find((c) => c.id === cardId);
          if (!card) return state;

          const oldStatus = card.status;

          // Remove card from old position
          let updatedCards = state.cards.filter((c) => c.id !== cardId);

          // Update order for cards in old column
          if (oldStatus !== newStatus) {
            updatedCards = updatedCards.map((c) =>
              c.status === oldStatus && c.order > card.order
                ? { ...c, order: c.order - 1 }
                : c
            );
          }

          // Update order for cards in new column
          updatedCards = updatedCards.map((c) =>
            c.status === newStatus && c.order >= newOrder
              ? { ...c, order: c.order + 1 }
              : c
          );

          // Insert card at new position
          updatedCards.push({
            ...card,
            status: newStatus,
            order: newOrder,
          });

          return { cards: updatedCards };
        });
      },

      reorderCard: (cardId, newOrder, status) => {
        set((state) => {
          const card = state.cards.find((c) => c.id === cardId);
          if (!card) return state;

          const oldOrder = card.order;

          let updatedCards = state.cards.map((c) => {
            if (c.id === cardId) {
              return { ...c, order: newOrder };
            }

            if (c.status === status) {
              if (oldOrder < newOrder) {
                // Moving down: shift cards between old and new position up
                if (c.order > oldOrder && c.order <= newOrder) {
                  return { ...c, order: c.order - 1 };
                }
              } else {
                // Moving up: shift cards between new and old position down
                if (c.order >= newOrder && c.order < oldOrder) {
                  return { ...c, order: c.order + 1 };
                }
              }
            }

            return c;
          });

          return { cards: updatedCards };
        });
      },
    }),
    {
      name: 'pm-kanban',
    }
  )
);

// Todo Store
export const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],

      addTodo: (text) => {
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: generateId(),
              text,
              completed: false,
              createdAt: Date.now(),
              order: state.todos.length,
            },
          ],
        }));
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },

      updateTodo: (id, text) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text } : todo
          ),
        }));
      },
    }),
    {
      name: 'pm-todos',
    }
  )
);

// Notes Store
export const useNotesStore = create(
  persist(
    (set) => ({
      content: '',
      updatedAt: null,

      updateNotes: (content) => {
        set({ content, updatedAt: Date.now() });
      },
    }),
    {
      name: 'pm-notes',
    }
  )
);
