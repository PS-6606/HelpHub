import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface EventSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  resultCount?: number;
  totalCount?: number;
  className?: string;
  autoFocus?: boolean;
}

export const EventSearchInput: React.FC<EventSearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search by title, organization, or location (e.g. Tree Plantation, Green Future, Bengaluru)...',
  resultCount,
  totalCount,
  className = '',
  autoFocus = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    if (onClear) onClear();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  // Keyboard shortcut: pressing '/' focuses search when not typing in an input
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 flex items-center justify-center">
        <Search className="w-5 h-5 text-emerald-600" />
      </div>

      {/* Real-time Search Input */}
      <input
        ref={inputRef}
        type="text"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Filter events by title, organization, or location"
        className="w-full pl-12 pr-24 py-3.5 text-sm sm:text-base rounded-2xl border border-slate-200 bg-white placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-xs"
      />

      {/* Right controls: Result counter / Clear button / Shortcut badge */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {value.trim() && resultCount !== undefined && (
          <span className="text-xs font-mono font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
            {resultCount} {resultCount === 1 ? 'event' : 'events'}
          </span>
        )}

        {!value && (
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 rounded border border-slate-200 pointer-events-none">
            /
          </kbd>
        )}

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Clear search (Esc)"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
