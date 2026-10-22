import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Calendar, Clock, Download, ExternalLink, ShieldCheck } from 'lucide-react';

export const CertificatesView: React.FC = () => {
  const { certificates, activeVolunteer, setSelectedCertificate, setVolunteerTab } = useApp();

  const myCertificates = certificates.filter(
    (c) => c.volunteerId === activeVolunteer.id
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Verified Certificates</h1>
        <p className="text-xs text-slate-500">
          Official digital credentials issued by hosting NGOs for your documented volunteer hours.
        </p>
      </div>

      {myCertificates.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">No certificates issued yet</h3>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            Certificates are automatically awarded when an organization marks your attended event as completed.
          </p>
          <button
            onClick={() => setVolunteerTab('discover')}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs"
          >
            Find Volunteering Opportunities
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {myCertificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-amber-300 transition-all p-6 shadow-xs flex flex-col justify-between gap-4 relative overflow-hidden"
            >
              {/* Gold seal accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-400 uppercase">Credential ID</p>
                      <p className="text-xs font-mono font-semibold text-slate-800">{cert.certificateNumber}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1">
                  {cert.eventTitle}
                </h3>
                <p className="text-xs text-emerald-700 font-medium mb-3">
                  {cert.orgName}
                </p>

                {/* Logistics */}
                <div className="flex items-center gap-3 text-xs text-slate-500 py-2 border-y border-slate-100 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold text-slate-800">{cert.hoursContributed} Hours</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Issued {cert.issueDate}</span>
                  </span>
                </div>

                {/* Attested Skills */}
                {cert.skillsAcknowledged.length > 0 && (
                  <div className="text-xs text-slate-600">
                    <span className="font-medium text-slate-700">Skills: </span>
                    <span>{cert.skillsAcknowledged.join(', ')}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 italic">
                  Signed: {cert.authorizedSignatory.split('(')[0].trim()}
                </span>
                <button
                  onClick={() => setSelectedCertificate(cert)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View & Print</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
