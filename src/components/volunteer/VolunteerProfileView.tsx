import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Award, 
  CheckCircle2, 
  Plus, 
  X, 
  Save, 
  Sparkles,
  Leaf,
  ShieldCheck
} from 'lucide-react';

export const VolunteerProfileView: React.FC = () => {
  const { activeVolunteer, updateVolunteerProfile, registrations } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(activeVolunteer.name);
  const [location, setLocation] = useState(activeVolunteer.location);
  const [phone, setPhone] = useState(activeVolunteer.phone);
  const [bio, setBio] = useState(activeVolunteer.bio);
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState<string[]>(activeVolunteer.skills);

  const myApprovedRegistrations = registrations.filter(
    (r) => r.volunteerId === activeVolunteer.id && (r.status === 'approved' || r.status === 'completed')
  );

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateVolunteerProfile({
      name,
      location,
      phone,
      bio,
      skills
    });
    setIsEditing(false);
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Leaf':
        return <Leaf className="w-5 h-5 text-emerald-600" />;
      case 'CheckCircle':
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
      default:
        return <Award className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Volunteer Profile</h1>
        <p className="text-xs text-slate-500">
          Manage your volunteer credentials, impact milestones, and contact preferences.
        </p>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={activeVolunteer.avatar}
              alt={activeVolunteer.name}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-emerald-500/20 bg-slate-50 p-1"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{activeVolunteer.name}</h2>
                <span title="Verified Volunteer">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeVolunteer.location}</span>
              </p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{activeVolunteer.email}</p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap self-stretch sm:self-auto text-center"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        {/* Impact Statistics Counter */}
        <div className="grid grid-cols-3 gap-4 pt-6 text-center">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mb-1">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Hours Donated</span>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {activeVolunteer.hoursLogged}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mb-1">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Completed Drives</span>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {activeVolunteer.eventsCompleted}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mb-1">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Badges Earned</span>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {activeVolunteer.badges.length}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Form (if editing) or Profile details */}
      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <h3 className="text-base font-bold text-slate-900">Edit Personal Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Location / City
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Bio / Volunteer Statement
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
              />
            </div>
          </div>

          {/* Manage Skills */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
              Volunteer Skills & Expertise
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-slate-100 text-slate-800"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="p-0.5 rounded-full hover:bg-slate-300 text-slate-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 max-w-sm">
              <input
                type="text"
                placeholder="Add skill (e.g. Photography, First Aid)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bio & Skills */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">About</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeVolunteer.bio}
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Verified Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeVolunteer.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Badges Collection */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Earned Badges ({activeVolunteer.badges.length})
              </h3>
            </div>

            <div className="space-y-3">
              {activeVolunteer.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-200 shadow-2xs">
                    {getBadgeIcon(badge.icon)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{badge.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      {badge.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
