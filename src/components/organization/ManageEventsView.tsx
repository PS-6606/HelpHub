import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventItem, EventStatus } from '../../types';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Plus, 
  Clock, 
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const ManageEventsView: React.FC = () => {
  const { 
    events, 
    activeOrg, 
    deleteEvent, 
    markEventCompleted, 
    setEditingEvent, 
    setShowCreateEventModal,
    setOrgTab,
    registrations
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<'all' | EventStatus>('all');

  const orgEvents = events.filter((e) => e.orgId === activeOrg.id);

  const filteredEvents = orgEvents.filter((e) => {
    if (statusFilter === 'all') return true;
    return e.status === statusFilter;
  });

  const getEventRegistrations = (eventId: string) => {
    return registrations.filter((r) => r.eventId === eventId);
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Volunteering Events</h1>
          <p className="text-xs text-slate-500">
            Publish new drives, update event itineraries, review applicants, and issue completion certificates.
          </p>
        </div>

        <button
          onClick={() => setShowCreateEventModal(true)}
          className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-medium self-start w-fit">
        {(['all', 'upcoming', 'ongoing', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className={`px-3 py-1.5 rounded-lg capitalize transition-colors whitespace-nowrap ${
              statusFilter === tab
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-xs">
          <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900 mb-1">No events found</h3>
          <p className="text-xs text-slate-500 mb-5">
            {statusFilter === 'all'
              ? 'Your organization has not posted any events yet.'
              : `No events currently match status "${statusFilter}".`}
          </p>
          <button
            onClick={() => setShowCreateEventModal(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
          >
            Post Your First Event
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((evt) => {
            const eventRegs = getEventRegistrations(evt.id);
            const approvedCount = eventRegs.filter((r) => r.status === 'approved' || r.status === 'completed').length;
            const pendingCount = eventRegs.filter((r) => r.status === 'pending').length;
            const fillRate = Math.min(100, Math.round((evt.registeredCount / evt.requiredVolunteers) * 100));

            return (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Event Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-xs flex-wrap">
                    <span className="font-bold text-emerald-700 uppercase tracking-wide">
                      {evt.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold capitalize ${
                      evt.status === 'completed'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : evt.status === 'ongoing'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {evt.status}
                    </span>
                    {evt.urgency === 'urgent' && (
                      <span className="text-amber-600 font-bold flex items-center gap-1 text-[11px]">
                        <Sparkles className="w-3 h-3" /> Urgent
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {evt.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{evt.date}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{evt.time}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{evt.city} ({evt.locationAddress})</span>
                    </span>
                  </div>

                  {/* Volunteer registration stats */}
                  <div className="pt-2 flex items-center gap-4 text-xs text-slate-600 flex-wrap">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{evt.registeredCount} / {evt.requiredVolunteers} registered ({fillRate}%)</span>
                    </span>
                    {pendingCount > 0 && (
                      <span className="text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        {pendingCount} pending review
                      </span>
                    )}
                    <span className="text-slate-500">
                      {approvedCount} confirmed volunteers
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center flex-wrap gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <button
                    onClick={() => setOrgTab('registrations')}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <span>View Applicants ({eventRegs.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setEditingEvent(evt)}
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
                    title="Edit event details"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  {evt.status !== 'completed' ? (
                    <button
                      onClick={() => markEventCompleted(evt.id)}
                      className="px-3.5 py-2 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors flex items-center gap-1.5"
                      title="Mark event completed and issue digital certificates to all confirmed volunteers"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Complete & Award Certs</span>
                    </button>
                  ) : (
                    <span className="px-3 py-2 text-xs font-semibold text-purple-700 bg-purple-50 rounded-xl flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                  )}

                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${evt.title}"?`)) {
                        deleteEvent(evt.id);
                      }
                    }}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Delete event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
