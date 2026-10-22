import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RegistrationStatus } from '../../types';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Building2, 
  Award, 
  CheckCircle, 
  Hourglass, 
  XCircle, 
  Trash2, 
  ExternalLink,
  Plus
} from 'lucide-react';

export const MyEventsView: React.FC = () => {
  const { 
    registrations, 
    activeVolunteer, 
    cancelRegistration, 
    setSelectedEventForDetails, 
    events, 
    setSelectedCertificate, 
    certificates,
    setVolunteerTab 
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<'all' | RegistrationStatus>('all');

  const myRegistrations = registrations.filter(
    (r) => r.volunteerId === activeVolunteer.id
  );

  const filteredRegistrations = myRegistrations.filter((r) => {
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  });

  const getStatusBadge = (status: RegistrationStatus) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Approved & Confirmed</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Hourglass className="w-3.5 h-3.5" />
            <span>Application Under Review</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Award className="w-3.5 h-3.5" />
            <span>Completed & Verified</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" />
            <span>Not Selected</span>
          </span>
        );
    }
  };

  const handleOpenCertificate = (eventId: string) => {
    const cert = certificates.find((c) => c.eventId === eventId && c.volunteerId === activeVolunteer.id);
    if (cert) {
      setSelectedCertificate(cert);
    } else {
      setVolunteerTab('certificates');
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Title & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Registered Events</h1>
          <p className="text-xs text-slate-500">
            Track application statuses, confirm attendance schedules, and retrieve your certificates.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-medium self-start sm:self-auto">
          {(['all', 'approved', 'pending', 'completed'] as const).map((tab) => (
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
      </div>

      {filteredRegistrations.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">
            {statusFilter === 'all'
              ? 'No event registrations yet'
              : `No registrations with status "${statusFilter}"`}
          </h3>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            Discover community initiatives across environment, education, healthcare, and animal welfare to get started.
          </p>
          <button
            onClick={() => setVolunteerTab('discover')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Discover Events</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredRegistrations.map((reg) => {
            const correspondingEvent = events.find((e) => e.id === reg.eventId);

            return (
              <div
                key={reg.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    {getStatusBadge(reg.status)}
                    <span className="text-[11px] text-slate-400 font-mono">
                      Applied {reg.appliedAt.split(' ')[0]}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1.5">
                    {reg.eventTitle}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium text-slate-700">{reg.orgName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500">{reg.eventCategory}</span>
                  </div>

                  {/* Logistics metadata */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{reg.eventDate}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{reg.eventCity}</span>
                    </span>
                  </div>

                  {/* Volunteer Notes if any */}
                  {reg.notes && (
                    <p className="mt-3 text-xs text-slate-600 italic bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                      "{reg.notes}"
                    </p>
                  )}
                </div>

                {/* Actions bottom strip */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
                  {correspondingEvent && (
                    <button
                      onClick={() => setSelectedEventForDetails(correspondingEvent)}
                      className="text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Event</span>
                    </button>
                  )}

                  <div className="flex items-center gap-2">
                    {reg.status === 'completed' && (
                      <button
                        onClick={() => handleOpenCertificate(reg.eventId)}
                        className="px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>View Certificate</span>
                      </button>
                    )}

                    {(reg.status === 'pending' || reg.status === 'approved') && (
                      <button
                        onClick={() => cancelRegistration(reg.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Withdraw Registration"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
