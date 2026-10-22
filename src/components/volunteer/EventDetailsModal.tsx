import React from 'react';
import { useApp } from '../../context/AppContext';
import { getCategoryTheme } from './EventCard';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Gift, 
  CheckCircle, 
  Bookmark, 
  Share2, 
  Sparkles,
  Building2,
  Check
} from 'lucide-react';

export const EventDetailsModal: React.FC = () => {
  const { 
    selectedEventForDetails, 
    setSelectedEventForDetails, 
    setRegisterModalEvent,
    savedEventIds,
    toggleSaveEvent,
    registrations,
    activeVolunteer,
    showToast
  } = useApp();

  if (!selectedEventForDetails) return null;

  const event = selectedEventForDetails;
  const theme = getCategoryTheme(event.category);
  const IconComponent = theme.icon;
  const isSaved = savedEventIds.includes(event.id);

  const userRegistration = registrations.find(
    (r) => r.eventId === event.id && r.volunteerId === activeVolunteer.id
  );

  const spotsRemaining = Math.max(0, event.requiredVolunteers - event.registeredCount);
  const percentFilled = Math.min(100, Math.round((event.registeredCount / event.requiredVolunteers) * 100));

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Event link copied to clipboard!');
    } else {
      showToast('Share link ready!');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={() => setSelectedEventForDetails(null)}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with Category Theme */}
        <div className={`relative p-6 sm:p-8 bg-gradient-to-br ${theme.bg} text-white`}>
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <button
              onClick={() => toggleSaveEvent(event.id)}
              className="p-2 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-xs text-white transition-colors"
              title={isSaved ? 'Remove from saved' : 'Save event'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-xs text-white transition-colors"
              title="Share event"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedEventForDetails(null)}
              className="p-2 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-xs text-white transition-colors"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-w-md">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1">
                <IconComponent className="w-3.5 h-3.5" />
                <span>{event.category}</span>
              </span>
              {event.urgency === 'urgent' && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-300 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Urgent
                  </span>
                </>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-3">
              {event.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-white/80">
              <Building2 className="w-4 h-4" />
              <span className="font-medium">{event.orgName}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 inline" />
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Key Logistics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Date</p>
                <p className="text-xs font-semibold text-slate-800">{event.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Timing</p>
                <p className="text-xs font-semibold text-slate-800">{event.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Location</p>
                <p className="text-xs font-semibold text-slate-800 truncate">{event.city}</p>
              </div>
            </div>
          </div>

          {/* Full Address */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Venue / Meeting Point
            </h4>
            <p className="text-xs text-slate-600 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{event.locationAddress}</span>
            </p>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              About the Initiative
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Skills & Expectations */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Required Skills & Traits
            </h4>
            <div className="flex flex-wrap gap-2">
              {event.skillsRequired.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Perks & Benefits */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-emerald-600" />
              <span>Volunteer Perks & Recognition</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              {event.perks.map((perk, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer Capacity */}
          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
            <div className="flex items-center justify-between text-xs text-emerald-900 font-medium mb-1.5">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-700" />
                <span>Capacity: {event.registeredCount} of {event.requiredVolunteers} positions filled</span>
              </span>
              <span className="tabular-nums font-semibold">
                {spotsRemaining > 0 ? `${spotsRemaining} spots available` : 'Capacity Reached'}
              </span>
            </div>
            <div className="w-full h-2 bg-emerald-200/60 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                style={{ width: `${percentFilled}%` }}
              />
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <button
            onClick={() => setSelectedEventForDetails(null)}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Close
          </button>

          {userRegistration ? (
            <div className="flex items-center gap-2">
              <div className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                userRegistration.status === 'approved'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : userRegistration.status === 'pending'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-slate-200 text-slate-700'
              }`}>
                <CheckCircle className="w-4 h-4" />
                <span>Application {userRegistration.status.toUpperCase()}</span>
              </div>
            </div>
          ) : spotsRemaining <= 0 ? (
            <span className="px-4 py-2.5 text-xs font-semibold text-slate-500 bg-slate-200 rounded-xl cursor-not-allowed">
              Registration Full
            </span>
          ) : (
            <button
              onClick={() => {
                setSelectedEventForDetails(null);
                setRegisterModalEvent(event);
              }}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs"
            >
              Proceed to Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
