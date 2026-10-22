import React from 'react';
import { useApp } from '../../context/AppContext';
import { EventCard } from './EventCard';
import { Bookmark, Search } from 'lucide-react';

export const SavedEventsView: React.FC = () => {
  const { events, savedEventIds, setVolunteerTab } = useApp();

  const savedEvents = events.filter((e) => savedEventIds.includes(e.id));

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Saved Events</h1>
        <p className="text-xs text-slate-500">
          Opportunities you have bookmarked for quick review and future participation.
        </p>
      </div>

      {savedEvents.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">No saved events yet</h3>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            Click the bookmark icon on any volunteering card in the Discover feed to save it here for later.
          </p>
          <button
            onClick={() => setVolunteerTab('discover')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs"
          >
            <Search className="w-4 h-4" />
            <span>Browse Events</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      )}
    </div>
  );
};
