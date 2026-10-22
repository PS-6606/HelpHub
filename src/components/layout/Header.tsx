import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, HeartHandshake, Smartphone, Monitor, BookOpen, User, Building2, LogOut } from 'lucide-react';
import { NotificationsModal } from '../common/NotificationsModal';

export const Header: React.FC = () => {
  const {
    activeRole,
    activeVolunteer,
    activeOrg,
    logout,
    volunteerTab,
    setVolunteerTab,
    orgTab,
    setOrgTab,
    notifications,
    isPhoneFrameView,
    setIsPhoneFrameView,
    setShowVivaGuideModal
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(
    (n) => !n.read && (n.roleTarget === activeRole || n.roleTarget === 'both')
  ).length;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <button
              onClick={() => {
                if (activeRole === 'volunteer') setVolunteerTab('discover');
                else setOrgTab('dashboard');
              }}
              className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap hover:text-emerald-700 transition-colors text-left"
            >
              HelpHub
            </button>
          </div>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 shrink-0">
            {activeRole === 'volunteer' ? (
              <>
                <button
                  onClick={() => setVolunteerTab('discover')}
                  className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
                    volunteerTab === 'discover'
                      ? 'border-emerald-600 text-emerald-700 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Discover
                </button>
                <button
                  onClick={() => setVolunteerTab('my-events')}
                  className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
                    volunteerTab === 'my-events'
                      ? 'border-emerald-600 text-emerald-700 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  My Events
                </button>
                <button
                  onClick={() => setVolunteerTab('saved')}
                  className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
                    volunteerTab === 'saved'
                      ? 'border-emerald-600 text-emerald-700 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Saved
                </button>
                <button
                  onClick={() => setVolunteerTab('certificates')}
                  className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
                    volunteerTab === 'certificates'
                      ? 'border-emerald-600 text-emerald-700 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Certificates
                </button>
                <button
                  onClick={() => setVolunteerTab('profile')}
                  className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
                    volunteerTab === 'profile'
                      ? 'border-emerald-600 text-emerald-700 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Profile
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setOrgTab('dashboard')}
                  className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
                    orgTab === 'dashboard'
                      ? 'border-emerald-600 text-emerald-700 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setOrgTab('manage-events')}
                  className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
                    orgTab === 'manage-events'
                      ? 'border-emerald-600 text-emerald-700 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Manage Events
                </button>
                <button
                  onClick={() => setOrgTab('registrations')}
                  className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
                    orgTab === 'registrations'
                      ? 'border-emerald-600 text-emerald-700 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Registrations
                </button>
                <button
                  onClick={() => setOrgTab('analytics')}
                  className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
                    orgTab === 'analytics'
                      ? 'border-emerald-600 text-emerald-700 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Analytics
                </button>
                <button
                  onClick={() => setOrgTab('profile')}
                  className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
                    orgTab === 'profile'
                      ? 'border-emerald-600 text-emerald-700 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Org Profile
                </button>
              </>
            )}
          </nav>

          {/* Zone 3: Primary Action & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Current Logged-in Account & Sign Out */}
            <div className="flex items-center gap-2 pl-2">
              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-slate-100 rounded-xl border border-slate-200">
                <img
                  src={activeRole === 'volunteer' ? activeVolunteer.avatar : activeOrg.logo}
                  alt={activeRole === 'volunteer' ? activeVolunteer.name : activeOrg.name}
                  className="w-6 h-6 rounded-full border border-slate-200 bg-white object-cover"
                />
                <div className="text-left text-xs leading-none">
                  <p className="font-bold text-slate-800 truncate max-w-[110px]">
                    {activeRole === 'volunteer' ? activeVolunteer.name : activeOrg.name}
                  </p>
                  <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider">
                    {activeRole === 'volunteer' ? 'Volunteer' : 'Organization'}
                  </span>
                </div>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-200 hover:border-rose-200 transition-colors whitespace-nowrap"
                title="Sign out of HelpHub"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>

            {/* Mobile / Desktop Simulator Toggle */}
            <button
              onClick={() => setIsPhoneFrameView(!isPhoneFrameView)}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors whitespace-nowrap"
              title="Toggle Mobile Simulator view vs Responsive Web view"
            >
              {isPhoneFrameView ? (
                <>
                  <Monitor className="w-3.5 h-3.5 text-slate-500" />
                  <span>Desktop View</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                  <span>Mobile Sim</span>
                </>
              )}
            </button>

            {/* Notifications Button */}
            <button
              onClick={() => setShowNotifications(true)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Viva & Specs Guide */}
            <button
              onClick={() => setShowVivaGuideModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Viva & Specs</span>
            </button>
          </div>
        </div>
      </header>

      <NotificationsModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
};
