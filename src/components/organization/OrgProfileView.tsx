import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { initialOrganizations } from '../../data/mockData';
import { EventCategory, OrganizationUser } from '../../types';
import { ALL_CATEGORIES } from '../../data/mockData';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Save, 
  Calendar, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const OrgProfileView: React.FC = () => {
  const { activeOrg, updateOrgProfile, showToast } = useApp();

  const [name, setName] = useState(activeOrg.name);
  const [mission, setMission] = useState(activeOrg.mission);
  const [category, setCategory] = useState<EventCategory>(activeOrg.category);
  const [email, setEmail] = useState(activeOrg.email);
  const [phone, setPhone] = useState(activeOrg.phone);
  const [location, setLocation] = useState(activeOrg.location);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrgProfile({
      name,
      mission,
      category,
      email,
      phone,
      location
    });
  };

  const handleSwitchOrg = (org: OrganizationUser) => {
    updateOrgProfile(org);
    setName(org.name);
    setMission(org.mission);
    setCategory(org.category);
    setEmail(org.email);
    setPhone(org.phone);
    setLocation(org.location);
    showToast(`Switched active organization to ${org.name}`);
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Organization Profile</h1>
        <p className="text-xs text-slate-500">
          Manage your NGO identity, public mission statement, and operational headquarters.
        </p>
      </div>

      {/* Switch Between Demo Organizations */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Switch Demo Organization Account
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {initialOrganizations.map((org) => {
            const isSelected = org.name === activeOrg.name;
            return (
              <button
                key={org.id}
                type="button"
                onClick={() => handleSwitchOrg(org)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-xs text-slate-900 truncate">{org.name}</span>
                  {isSelected && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">{org.category} · {org.location.split(',')[0]}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
              {activeOrg.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-bold text-slate-900">{activeOrg.name}</h2>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-xs text-emerald-700 font-semibold">{activeOrg.category} Focus</span>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-mono">ID: {activeOrg.id}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Organization Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Primary Cause Area *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as EventCategory)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              {ALL_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Official Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Contact Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Headquarters / Operating Region
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Mission Statement & Charter
            </label>
            <textarea
              rows={3}
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Update Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
