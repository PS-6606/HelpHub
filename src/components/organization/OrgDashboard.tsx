import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Calendar, 
  Users, 
  Clock, 
  Plus, 
  Check, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  BarChart3
} from 'lucide-react';

export const OrgDashboard: React.FC = () => {
  const { 
    activeOrg, 
    events, 
    registrations, 
    updateRegistrationStatus, 
    setShowCreateEventModal,
    setOrgTab,
    setSelectedEventForDetails
  } = useApp();

  // Metrics for active organization
  const orgEvents = events.filter((e) => e.orgId === activeOrg.id);
  const activeEvents = orgEvents.filter((e) => e.status === 'upcoming' || e.status === 'ongoing');
  const orgRegistrations = registrations.filter((r) => r.orgId === activeOrg.id);
  const pendingRegistrations = orgRegistrations.filter((r) => r.status === 'pending');
  const approvedVolunteers = orgRegistrations.filter((r) => r.status === 'approved' || r.status === 'completed');
  const totalImpactHours = approvedVolunteers.reduce((acc, curr) => acc + (curr.attendedHours || 4), 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Welcome & KPI Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>Organization Portal</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 font-normal">{activeOrg.location}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {activeOrg.name} Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            {activeOrg.mission}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateEventModal(true)}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center gap-2 shadow-xs whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Event</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards (Matching prompt section 7 Organization Dashboard) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="font-medium">Total Events</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {orgEvents.length}
          </p>
          <span className="text-[11px] text-slate-400">Created lifetime</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">Active Events</span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-700 tabular-nums">
            {activeEvents.length}
          </p>
          <span className="text-[11px] text-slate-400">Currently recruiting</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="font-medium">Registrations</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {orgRegistrations.length}
          </p>
          <span className="text-[11px] text-slate-400">Total applications</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">Volunteers</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {approvedVolunteers.length}
          </p>
          <span className="text-[11px] text-slate-400">Approved & Active</span>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Clock className="w-4 h-4 text-purple-600" />
            <span className="font-medium">Impact Hours</span>
          </div>
          <p className="text-2xl font-extrabold text-purple-700 tabular-nums">
            {totalImpactHours}h
          </p>
          <span className="text-[11px] text-slate-400">Community service</span>
        </div>
      </div>

      {/* Pending Volunteer Registrations Review (Priority Queue) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Pending Volunteer Applications ({pendingRegistrations.length})
            </h2>
          </div>
          <button
            onClick={() => setOrgTab('registrations')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All Registrations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {pendingRegistrations.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs bg-slate-50 rounded-2xl border border-slate-100">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
            <p className="font-semibold text-slate-700">All caught up!</p>
            <p className="mt-0.5">No pending volunteer registrations awaiting review.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {pendingRegistrations.map((reg) => (
              <div
                key={reg.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={reg.volunteerAvatar}
                    alt={reg.volunteerName}
                    className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50 mt-0.5 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{reg.volunteerName}</h4>
                      <span className="text-[11px] text-slate-400 font-mono">
                        · Applied {reg.appliedAt}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Applied for: <strong className="text-slate-800">{reg.eventTitle}</strong>
                    </p>
                    {reg.notes && (
                      <p className="text-xs text-slate-500 italic mt-1 bg-slate-50 p-2 rounded-lg border border-slate-100 max-w-xl">
                        "{reg.notes}"
                      </p>
                    )}
                    {reg.volunteerSkills.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
                        <span className="font-medium text-slate-700">Skills:</span>
                        <span>{reg.volunteerSkills.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Instant Action buttons: Approve / Reject (Per prompt section 8) */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => updateRegistrationStatus(reg.id, 'rejected')}
                    className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => updateRegistrationStatus(reg.id, 'approved')}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Active Organization Events List */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Active Volunteering Drives ({activeEvents.length})
          </h2>
          <button
            onClick={() => setOrgTab('manage-events')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Manage All Events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {activeEvents.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs bg-slate-50 rounded-2xl border border-slate-100">
            <p>No active events currently published.</p>
            <button
              onClick={() => setShowCreateEventModal(true)}
              className="mt-3 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100"
            >
              Post an Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeEvents.map((evt) => {
              const spotsRemaining = Math.max(0, evt.requiredVolunteers - evt.registeredCount);
              const percent = Math.min(100, Math.round((evt.registeredCount / evt.requiredVolunteers) * 100));

              return (
                <div
                  key={evt.id}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between gap-3 bg-slate-50/50"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-emerald-700 uppercase">{evt.category}</span>
                      <span>{evt.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{evt.title}</h3>
                    <p className="text-xs text-slate-500 truncate">{evt.locationAddress}</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                      <span>{evt.registeredCount} / {evt.requiredVolunteers} Volunteers</span>
                      <span className="font-semibold tabular-nums">{percent}% Filled</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/60">
                    <button
                      onClick={() => setSelectedEventForDetails(evt)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => setOrgTab('manage-events')}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
