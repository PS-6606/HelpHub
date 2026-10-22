import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_CATEGORIES, POPULAR_CITIES } from '../../data/mockData';
import { EventCard } from './EventCard';
import { EventSearchInput } from './EventSearchInput';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Filter, 
  Clock, 
  Award, 
  CheckCircle2, 
  CalendarCheck,
  RotateCcw
} from 'lucide-react';

export const VolunteerHome: React.FC = () => {
  const { events, activeVolunteer, registrations, setVolunteerTab } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [onlyUrgent, setOnlyUrgent] = useState(false);

  // Active registrations count for current user
  const myActiveRegistrations = registrations.filter(
    (r) => r.volunteerId === activeVolunteer.id && (r.status === 'pending' || r.status === 'approved')
  );

  // Filtered events matching title, organization name, or location in real-time
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      // Real-time search query filter: title, organization name, or location
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = evt.title.toLowerCase().includes(q);
        const matchesOrg = evt.orgName.toLowerCase().includes(q);
        const matchesLocation =
          evt.city.toLowerCase().includes(q) ||
          evt.locationAddress.toLowerCase().includes(q);
        const matchesDesc = evt.description.toLowerCase().includes(q);
        const matchesSkill = evt.skillsRequired.some((s) =>
          s.toLowerCase().includes(q)
        );

        if (!matchesTitle && !matchesOrg && !matchesLocation && !matchesDesc && !matchesSkill) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All' && evt.category !== selectedCategory) {
        return false;
      }

      // City
      if (selectedCity !== 'All Cities' && evt.city !== selectedCity) {
        return false;
      }

      // Urgent
      if (onlyUrgent && evt.urgency !== 'urgent') {
        return false;
      }

      return true;
    });
  }, [events, searchQuery, selectedCategory, selectedCity, onlyUrgent]);

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedCity !== 'All Cities' || onlyUrgent;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCity('All Cities');
    setOnlyUrgent(false);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Real-Time Search Bar at the Top of VolunteerHome */}
      <section className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Explore Volunteering Opportunities
              </h2>
              {searchQuery.trim() && (
                <span className="text-xs font-mono font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  {filteredEvents.length} {filteredEvents.length === 1 ? 'match' : 'matches'}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live filter across drives by title, organizing NGO, or location as you type.
            </p>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Real-time Search Input Component */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-8">
            <EventSearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Search by event title, organization, or location (e.g. Tree, Green Future, Bengaluru)..."
              resultCount={filteredEvents.length}
              totalCount={events.length}
            />
          </div>

          {/* City selector */}
          <div className="md:col-span-2 relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full pl-10 pr-8 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors appearance-none cursor-pointer shadow-xs"
            >
              {POPULAR_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
              ▼
            </div>
          </div>

          {/* Urgent filter toggle */}
          <div className="md:col-span-2">
            <button
              onClick={() => setOnlyUrgent(!onlyUrgent)}
              className={`w-full flex items-center justify-center gap-1.5 py-3 text-xs font-semibold rounded-2xl border transition-colors shadow-xs ${
                onlyUrgent
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${onlyUrgent ? 'text-amber-600' : 'text-slate-400'}`} />
              <span>Urgent Drives</span>
            </button>
          </div>
        </div>

        {/* Quick Search Chips */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs text-slate-500 pt-1">
          <span className="text-[11px] font-medium text-slate-400">Quick searches:</span>
          {[
            { label: 'Bengaluru', type: 'Location' },
            { label: 'Mumbai', type: 'Location' },
            { label: 'Green Future Foundation', type: 'Organization' },
            { label: 'Tree Plantation', type: 'Title' },
            { label: 'Pratham Shiksha', type: 'Organization' },
            { label: 'Versova Beach', type: 'Location' },
            { label: 'STEM Mentorship', type: 'Title' }
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setSearchQuery(item.label)}
              className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors border ${
                searchQuery.toLowerCase() === item.label.toLowerCase()
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Category Segmented Filter Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 border-t border-slate-100 no-scrollbar text-xs">
          <span className="text-slate-400 font-medium shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Category:</span>
          </span>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Hero & Impact Overview Strip */}
      <section className="bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <span>Welcome back, {activeVolunteer.name.split(' ')[0]}</span>
            <span aria-hidden="true">·</span>
            <span>Bengaluru Chapter</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 text-balance">
            Find meaningful volunteering causes near you.
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
            Connect directly with verified NGOs, lend your skills, track your community service hours, and download verified digital certificates.
          </p>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
            <div className="bg-white/5 backdrop-blur-xs rounded-xl p-3 border border-white/10">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hours Logged</span>
              </div>
              <p className="text-xl font-bold text-white tabular-nums">{activeVolunteer.hoursLogged} hrs</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xs rounded-xl p-3 border border-white/10">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Drives Done</span>
              </div>
              <p className="text-xl font-bold text-white tabular-nums">{activeVolunteer.eventsCompleted}</p>
            </div>

            <div 
              onClick={() => setVolunteerTab('my-events')}
              className="bg-white/5 backdrop-blur-xs rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Active Regs</span>
              </div>
              <p className="text-xl font-bold text-white tabular-nums">{myActiveRegistrations.length}</p>
            </div>

            <div 
              onClick={() => setVolunteerTab('profile')}
              className="bg-white/5 backdrop-blur-xs rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Award className="w-3.5 h-3.5 text-purple-400" />
                <span>Badges</span>
              </div>
              <p className="text-xl font-bold text-white tabular-nums">{activeVolunteer.badges.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Results Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              {selectedCategory === 'All' ? 'Available Volunteering Events' : `${selectedCategory} Drives`}
            </h2>
            <p className="text-xs text-slate-500">
              Showing {filteredEvents.length} opportunities {selectedCity !== 'All Cities' && `in ${selectedCity}`}
            </p>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-1">No volunteering events found</h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              We couldn't find any events matching your selected criteria. Try adjusting your search query, city, or category filter.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
