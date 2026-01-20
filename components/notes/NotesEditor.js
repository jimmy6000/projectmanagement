'use client';

import { useEffect, useState, useRef } from 'react';
import { useNotesStore } from '@/lib/store';
import { Check } from 'lucide-react';

export default function NotesEditor() {
  const { content, updateNotes } = useNotesStore();
  const [localContent, setLocalContent] = useState(content);
  const [showSaved, setShowSaved] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setLocalContent(newContent);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(() => {
      updateNotes(newContent);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-background-card border-2 border-border animate-slide-up" style={{ animationDelay: '0.4s' }}>
      {/* Thick colored top border */}
      <div className="h-1 bg-accent-terra"></div>

      {/* Header */}
      <div className="p-4 border-b-2 border-accent-terra flex items-center justify-between">
        <h2 className="text-base font-mono font-bold text-text-primary uppercase tracking-wide">
          Notes
        </h2>
        {showSaved && (
          <div className="flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold bg-accent-olive text-background border-2 border-black/20 animate-slide-right">
            <Check className="w-4 h-4" />
            SAVED
          </div>
        )}
      </div>

      <div className="flex-1 p-4">
        <textarea
          value={localContent}
          onChange={handleChange}
          className="w-full h-full resize-none text-sm font-serif bg-transparent border-none focus:ring-0 focus:outline-none leading-relaxed"
          placeholder="Take notes..."
          style={{
            caretColor: '#d97742'
          }}
        />
      </div>
    </div>
  );
}
