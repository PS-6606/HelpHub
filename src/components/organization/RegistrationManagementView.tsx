import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RegistrationStatus } from '../../types';
import { 
  Users, 
  Check, 
  X, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Search, 
  Award, 
  Filter,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const RegistrationManagementView: React.FC = () => {
  const { 
    registrations, 
    events, 
    activeOrg, 
    updateRegistrationStatus, 
    setSelectedEventForDetails 
  } = useApp();

  const [selectedEventId, setSelectedEventId] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchVolunteer, setSearchVolunteer] = useState<string>('');

  const orgEvents = events.filter((e) => e.orgId === activeOrg.id);
  const orgRegistrations = registrations.filter((r) => r.orgId === activeOrg.id);

  const filteredRegistrations = orgRegistrations.filter((reg) => {
    // Event filter
    if (selectedEventId !== 'all' && reg.eventId !== selectedEventId) {
      return false;
    }

    // Status filter
    if (selectedStatus !== 'all' && reg.status !== selectedStatus) {
      return false;
    }

    // Volunteer search
    if (searchVolunteer.trim()) {
      const q = searchVolunteer.toLowerCase();
      const matchName = reg.volunteerName.toLowerCase().includes(q);
      const matchEmail = reg.volunteerEmail.toLowerCase().includes(q);
      const matchEvent = reg.eventTitle.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchEvent) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Volunteer Registration Management</h1>
        <p className="text-xs text-slate-500">
          Review candidate profiles, verify skills, accept/reject registrations, and mark attendance.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Volunteer Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search volunteer name, email..."
              value={searchVolunteer}
              onChange={(e) => setSearchVolunteer(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Event Filter */}
          <div>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="all">All Hosted Events ({orgEvents.length})</option>
              {orgEvents.map((evt) => (
                <option key={evt.id} value={evt.id}>
                  {evt.title}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="all">All Application Statuses</option>
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed & Attended</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Registrations List */}
      {filteredRegistrations.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-xs">
          <Users className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900 mb-1">No registrations found</h3>
          <p className="text-xs text-slate-500">
            No volunteer applications match your selected filter criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRegistrations.map((reg) => (
            <div
              key={reg.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={reg.volunteerAvatar}
                  alt={reg.volunteerName}
                  className="w-12 h-12 rounded-full border border-slate-200 bg-slate-50 shrink-0"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-slate-900">{reg.volunteerName}</h3>
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize ${
                      reg.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : reg.status === 'pending'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : reg.status === 'completed'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {reg.status}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Applied {reg.appliedAt}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-700">
                    Drive: <span className="text-emerald-700">{reg.eventTitle}</span> ({reg.eventDate})
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap pt-0.5">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{reg.volunteerEmail}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{reg.volunteerPhone}</span>
                    </span>
                  </div>

                  {reg.volunteerSkills.length > 0 && (
                    <div className="text-xs text-slate-600 pt-1">
                      <span className="font-medium text-slate-700">Skills: </span>
                      <span>{reg.volunteerSkills.join(', ')}</span>
                    </div>
                  )}

                  {reg.notes && (
                    <p className="text-xs text-slate-600 italic bg-slate-50 p-2 rounded-xl border border-slate-100 mt-2 max-w-xl">
                      "{reg.notes}"
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                {reg.status === 'pending' && (
                  <>
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
                  </>
                )}

                {reg.status === 'approved' && (
                  <button
                    onClick={() => updateRegistrationStatus(reg.id, 'completed')}
                    className="px-3.5 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors flex items-center gap-1"
                    title="Mark volunteer attendance as completed"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Mark Completed</span>
                  </button>
                )}

                {reg.status === 'completed' && (
                  <span className="flex items-center gap-1 text-xs text-purple-700 font-semibold bg-purple-50 px-3 py-1 rounded-xl">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Certificate Active</span>
                  </span>
                )}

                {reg.status === 'rejected' && (
                  <button
                    onClick={() => updateRegistrationStatus(reg.id, 'approved')}
                    className="px-3 py-1 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50"
                  >
                    Re-approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
