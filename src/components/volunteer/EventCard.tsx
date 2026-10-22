import React from 'react';
import { EventCategory, EventItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Bookmark, 
  CheckCircle, 
  Clock, 
  Sparkles,
  TreePine,
  GraduationCap,
  HeartPulse,
  HeartHandshake,
  Dog,
  ShieldAlert,
  Soup,
  Palette
} from 'lucide-react';

interface EventCardProps {
  event: EventItem;
}

export const getCategoryTheme = (category: EventCategory) => {
  switch (category) {
    case 'Environment':
      return {
        bg: 'from-emerald-600 to-teal-800',
        text: 'text-emerald-700',
        lightBg: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        icon: TreePine
      };
    case 'Education':
      return {
        bg: 'from-blue-600 to-indigo-800',
        text: 'text-blue-700',
        lightBg: 'bg-blue-50',
        borderColor: 'border-blue-200',
        icon: GraduationCap
      };
    case 'Animal Welfare':
      return {
        bg: 'from-amber-600 to-orange-800',
        text: 'text-amber-700',
        lightBg: 'bg-amber-50',
        borderColor: 'border-amber-200',
        icon: Dog
      };
    case 'Healthcare':
      return {
        bg: 'from-rose-600 to-pink-800',
        text: 'text-rose-700',
        lightBg: 'bg-rose-50',
        borderColor: 'border-rose-200',
        icon: HeartPulse
      };
    case 'Community':
      return {
        bg: 'from-cyan-600 to-blue-800',
        text: 'text-cyan-700',
        lightBg: 'bg-cyan-50',
        borderColor: 'border-cyan-200',
        icon: HeartHandshake
      };
    case 'Disaster Relief':
      return {
        bg: 'from-red-600 to-stone-800',
        text: 'text-red-700',
        lightBg: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: ShieldAlert
      };
    case 'Hunger & Food Rescue':
      return {
        bg: 'from-orange-600 to-amber-800',
        text: 'text-orange-700',
        lightBg: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: Soup
      };
    default:
      return {
        bg: 'from-slate-700 to-slate-900',
        text: 'text-slate-700',
        lightBg: 'bg-slate-50',
        borderColor: 'border-slate-200',
        icon: Palette
      };
  }
};

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { 
    setSelectedEventForDetails, 
    setRegisterModalEvent, 
    savedEventIds, 
    toggleSaveEvent,
    registrations,
    activeVolunteer
  } = useApp();

  const isSaved = savedEventIds.includes(event.id);
  const theme = getCategoryTheme(event.category);
  const IconComponent = theme.icon;

  // Check if current volunteer already registered
  const userRegistration = registrations.find(
    (r) => r.eventId === event.id && r.volunteerId === activeVolunteer.id
  );

  const spotsRemaining = Math.max(0, event.requiredVolunteers - event.registeredCount);
  const percentFilled = Math.min(100, Math.round((event.registeredCount / event.requiredVolunteers) * 100));

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs hover:shadow-md flex flex-col overflow-hidden">
      {/* Visual Header / Banner */}
      <div className={`relative h-44 bg-gradient-to-br ${theme.bg} p-5 flex flex-col justify-between text-white overflow-hidden`}>
        {/* Subtle decorative motif */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute right-4 top-4 text-white/15 pointer-events-none">
          <IconComponent className="w-24 h-24 stroke-[1]" />
        </div>

        {/* Top actions */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-white/90">
            <span className="uppercase tracking-wider font-semibold">{event.category}</span>
            {event.urgency === 'urgent' && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-300 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Urgent Need
                </span>
              </>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveEvent(event.id);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isSaved
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'bg-black/20 hover:bg-black/30 text-white backdrop-blur-xs'
            }`}
            aria-label={isSaved ? 'Remove from saved' : 'Save event'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-700' : ''}`} />
          </button>
        </div>

        {/* Bottom banner info */}
        <div className="relative z-10">
          <p className="text-xs text-white/80 font-medium truncate mb-1">
            {event.orgName}
          </p>
          <h3 className="text-lg font-bold text-white tracking-tight line-clamp-2 leading-snug">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        {/* Unboxed Metadata Line with typographic separators per design constitution */}
        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{event.date}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{event.time.split('-')[0].trim()}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{event.city}</span>
          </span>
        </div>

        {/* Description snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {/* Required skills */}
        {event.skillsRequired.length > 0 && (
          <div className="text-xs text-slate-500 flex items-center gap-1 truncate">
            <span className="font-medium text-slate-700 shrink-0">Skills:</span>
            <span className="truncate">{event.skillsRequired.join(', ')}</span>
          </div>
        )}

        {/* Capacity Progress Bar */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{event.registeredCount} / {event.requiredVolunteers} Registered</span>
            </span>
            <span className="text-slate-500 tabular-nums">
              {spotsRemaining > 0 ? `${spotsRemaining} spots left` : 'Fully Booked'}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                percentFilled >= 100
                  ? 'bg-rose-500'
                  : percentFilled >= 75
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${percentFilled}%` }}
            />
          </div>
        </div>

        {/* Card Actions */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => setSelectedEventForDetails(event)}
            className="flex-1 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap"
          >
            View Details
          </button>

          {userRegistration ? (
            <div className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 whitespace-nowrap ${
              userRegistration.status === 'approved'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : userRegistration.status === 'pending'
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : userRegistration.status === 'completed'
                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                : 'bg-slate-100 text-slate-600'
            }`}>
              <CheckCircle className="w-3.5 h-3.5" />
              <span className="capitalize">{userRegistration.status}</span>
            </div>
          ) : event.status === 'completed' ? (
            <span className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-500 whitespace-nowrap">
              Completed
            </span>
          ) : spotsRemaining <= 0 ? (
            <span className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-500 whitespace-nowrap">
              Full
            </span>
          ) : (
            <button
              onClick={() => setRegisterModalEvent(event)}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors whitespace-nowrap shadow-xs"
            >
              Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
