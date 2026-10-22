import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, Award, ShieldCheck, Download, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const CertificateModal: React.FC = () => {
  const { selectedCertificate, setSelectedCertificate, showToast } = useApp();

  if (!selectedCertificate) return null;

  const cert = selectedCertificate;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
    showToast('Use "Save as PDF" in your print preview window');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto"
      onClick={() => setSelectedCertificate(null)}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">Official Digital Certificate</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={() => setSelectedCertificate(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Has ID #printable-certificate for clean CSS printing) */}
        <div id="printable-certificate" className="p-8 sm:p-12 bg-amber-50/20 text-center relative border-8 border-double border-amber-800/20 m-4 rounded-2xl">
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <HeartHandshake className="w-72 h-72 text-amber-900" />
          </div>

          <div className="relative z-10 space-y-6">
            {/* Certificate Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-semibold mb-3">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Verified Volunteer Impact Credential</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-serif">
                Certificate of Appreciation
              </h1>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                HelpHub Verified Credential
              </p>
            </div>

            {/* Main Recipient Text */}
            <div className="py-2">
              <p className="text-xs text-slate-500 italic">This is proudly presented to</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 underline decoration-amber-400/80 decoration-2 underline-offset-8 mt-2">
                {cert.volunteerName}
              </h2>
            </div>

            {/* Recognition Text */}
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              in grateful recognition of their voluntary contribution, dedicated community service, and outstanding civic spirit during the event
            </p>

            {/* Event Name */}
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-amber-200/60 max-w-md mx-auto shadow-xs">
              <p className="text-base font-bold text-slate-900">{cert.eventTitle}</p>
              <p className="text-xs text-emerald-700 font-semibold mt-0.5">Organized by {cert.orgName}</p>
              <p className="text-xs text-slate-500 mt-2">
                Documented Service Contribution: <strong className="text-slate-800 font-semibold">{cert.hoursContributed} Hours</strong>
              </p>
            </div>

            {/* Skills Acknowledged */}
            {cert.skillsAcknowledged.length > 0 && (
              <div className="text-xs text-slate-600">
                <span className="font-semibold text-slate-700">Competencies Attested: </span>
                <span>{cert.skillsAcknowledged.join(' · ')}</span>
              </div>
            )}

            {/* Signatures & Seal */}
            <div className="pt-6 border-t border-amber-200/50 grid grid-cols-2 gap-6 items-end max-w-md mx-auto text-left">
              <div>
                <div className="font-serif italic text-base text-slate-800 border-b border-slate-400 pb-1 mb-1">
                  {cert.authorizedSignatory}
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Authorized Officer</p>
                <p className="text-[10px] text-slate-400">Date: {cert.issueDate}</p>
              </div>

              <div className="text-right">
                <div className="inline-block p-2 bg-white rounded-lg border border-slate-200 text-left">
                  <p className="text-[9px] font-mono text-slate-400 uppercase">Credential ID</p>
                  <p className="text-[11px] font-mono font-bold text-slate-800">{cert.certificateNumber}</p>
                  <div className="flex items-center gap-1 text-[9px] text-emerald-600 mt-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Cryptographically Signed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
