import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { EventCategory, EventItem } from '../../types';
import { ALL_CATEGORIES, POPULAR_CITIES } from '../../data/mockData';
import { X, Sparkles, Calendar, MapPin, Users, Gift, Save } from 'lucide-react';

export const CreateEditEventModal: React.FC = () => {
  const { 
    showCreateEventModal, 
    setShowCreateEventModal, 
    editingEvent, 
    setEditingEvent, 
    addEvent, 
    updateEvent,
    activeOrg 
  } = useApp();

  const isEditing = !!editingEvent;
  const isOpen = showCreateEventModal || isEditing;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EventCategory>('Environment');
  const [date, setDate] = useState('2026-10-30');
  const [time, setTime] = useState('08:00 AM - 12:00 PM');
  const [city, setCity] = useState('Bengaluru');
  const [locationAddress, setLocationAddress] = useState('');
  const [requiredVolunteers, setRequiredVolunteers] = useState(25);
  const [skillsStr, setSkillsStr] = useState('Teamwork, Enthusiastic attitude');
  const [perksStr, setPerksStr] = useState('Certificate of Participation, Refreshments, Volunteer T-Shirt');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal');

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setCategory(editingEvent.category);
      setDate(editingEvent.date);
      setTime(editingEvent.time);
      setCity(editingEvent.city);
      setLocationAddress(editingEvent.locationAddress);
      setRequiredVolunteers(editingEvent.requiredVolunteers);
      setSkillsStr(editingEvent.skillsRequired.join(', '));
      setPerksStr(editingEvent.perks.join(', '));
      setDescription(editingEvent.description);
      setUrgency(editingEvent.urgency || 'normal');
    } else {
      setTitle('');
      setCategory('Environment');
      setDate('2026-10-30');
      setTime('08:00 AM - 12:00 PM');
      setCity('Bengaluru');
      setLocationAddress('');
      setRequiredVolunteers(25);
      setSkillsStr('Teamwork, Community spirit');
      setPerksStr('Certificate of Participation, Refreshments');
      setDescription('');
      setUrgency('normal');
    }
  }, [editingEvent, showCreateEventModal]);

  if (!isOpen) return null;

  const handleClose = () => {
    setShowCreateEventModal(false);
    setEditingEvent(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const skillsRequired = skillsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const perks = perksStr
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);

    if (isEditing && editingEvent) {
      updateEvent(editingEvent.id, {
        title,
        category,
        date,
        time,
        city,
        locationAddress,
        requiredVolunteers: Number(requiredVolunteers),
        skillsRequired,
        perks,
        description,
        urgency
      });
    } else {
      addEvent({
        title,
        orgId: activeOrg.id,
        orgName: activeOrg.name,
        category,
        date,
        time,
        locationType: 'in-person',
        city,
        locationAddress,
        requiredVolunteers: Number(requiredVolunteers),
        status: 'upcoming',
        skillsRequired,
        perks,
        description,
        urgency
      });
    }

    handleClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              {isEditing ? 'Edit Volunteering Event' : 'Create Volunteering Event'}
            </h3>
            <p className="text-xs text-slate-500">
              Published events will appear in real time on the Volunteer Discover feed.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
              Event Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Tree Plantation Drive in Cubbon Park"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Category & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Category *
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
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Urgency Level
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as 'normal' | 'urgent')}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                <option value="normal">Normal Drive</option>
                <option value="urgent">Urgent Need (Highlighted with banner)</option>
              </select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Time Interval *
              </label>
              <input
                type="text"
                required
                placeholder="07:30 AM - 11:30 AM"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* City & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                City *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                {POPULAR_CITIES.filter((c) => c !== 'All Cities').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Venue Address / Meeting Point *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Gate 4, Cubbon Park, Opposite High Court"
                value={locationAddress}
                onChange={(e) => setLocationAddress(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Volunteer Capacity */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
              Volunteers Required *
            </label>
            <input
              type="number"
              min={1}
              max={1000}
              required
              value={requiredVolunteers}
              onChange={(e) => setRequiredVolunteers(Number(e.target.value))}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Required Skills */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
              Skills Required (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Physical stamina, Gardening, Teamwork"
              value={skillsStr}
              onChange={(e) => setSkillsStr(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Perks */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
              Perks & Recognition (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Certificate of Participation, Free Lunch, Volunteer T-Shirt"
              value={perksStr}
              onChange={(e) => setPerksStr(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
              Event Description & Volunteer Scope *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Detailed description of what volunteers will do, schedule outline, what to bring, and impact goals..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Save Changes' : 'Publish Event'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
