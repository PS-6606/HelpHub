import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, Send, User, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export const RegisterModal: React.FC = () => {
  const { 
    registerModalEvent, 
    setRegisterModalEvent, 
    registerForEvent, 
    activeVolunteer, 
    setVolunteerTab 
  } = useApp();

  const [notes, setNotes] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!registerModalEvent) return null;

  const event = registerModalEvent;

  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullNote = selectedSkills.length > 0 
      ? `${notes ? notes + ' | ' : ''}Contributing skills: ${selectedSkills.join(', ')}`
      : notes;

    setTimeout(() => {
      registerForEvent(event.id, fullNote);
      setIsSubmitting(false);
      setRegisterModalEvent(null);
      setVolunteerTab('my-events');
    }, 400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={() => setRegisterModalEvent(null)}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Volunteer Registration</h3>
            <p className="text-xs text-slate-500 truncate max-w-xs">{event.title}</p>
          </div>
          <button
            onClick={() => setRegisterModalEvent(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Volunteer profile preview */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Applicant Details</p>
            <div className="flex items-center gap-3">
              <img
                src={activeVolunteer.avatar}
                alt={activeVolunteer.name}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white"
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">{activeVolunteer.name}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    <span>{activeVolunteer.email}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{activeVolunteer.location}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Event requirements alignment */}
          {event.skillsRequired.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Select skills you can assist with:
              </label>
              <div className="flex flex-wrap gap-2">
                {event.skillsRequired.map((skill) => {
                  const isChecked = selectedSkills.includes(skill);
                  return (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => handleToggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Sparkles className={`w-3 h-3 ${isChecked ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Personal message/note */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Message to Organizer (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Mention your relevant experience, excitement, or if you require carpool/specific accessibility accommodations..."
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 resize-none"
            />
          </div>

          {/* Commitment acknowledgment */}
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-start gap-2.5 text-xs text-emerald-950">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              By submitting, you pledge your availability for the event schedule on <strong>{event.date}</strong> ({event.time}).
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setRegisterModalEvent(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Confirm Registration'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
