import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  CalendarCheck, 
  Bookmark, 
  Award, 
  User, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BarChart3, 
  Building2 
} from 'lucide-react';

export const MobileTabBar: React.FC = () => {
  const { activeRole, volunteerTab, setVolunteerTab, orgTab, setOrgTab, registrations, activeVolunteer } = useApp();

  const myPendingOrApproved = registrations.filter(
    (r) => r.volunteerId === activeVolunteer.id && (r.status === 'pending' || r.status === 'approved')
  ).length;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1">
      {activeRole === 'volunteer' ? (
        <div className="grid grid-cols-5 items-center h-14">
          <button
            onClick={() => setVolunteerTab('discover')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              volunteerTab === 'discover' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight">Discover</span>
          </button>

          <button
            onClick={() => setVolunteerTab('my-events')}
            className={`relative flex flex-col items-center justify-center py-1 transition-colors ${
              volunteerTab === 'my-events' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <CalendarCheck className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight">My Events</span>
            {myPendingOrApproved > 0 && (
              <span className="absolute top-1 right-3 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center">
                {myPendingOrApproved}
              </span>
            )}
          </button>

          <button
            onClick={() => setVolunteerTab('saved')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              volunteerTab === 'saved' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bookmark className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight">Saved</span>
          </button>

          <button
            onClick={() => setVolunteerTab('certificates')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              volunteerTab === 'certificates' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight">Certs</span>
          </button>

          <button
            onClick={() => setVolunteerTab('profile')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              volunteerTab === 'profile' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight">Profile</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-5 items-center h-14">
          <button
            onClick={() => setOrgTab('dashboard')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              orgTab === 'dashboard' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight">Dashboard</span>
          </button>

          <button
            onClick={() => setOrgTab('manage-events')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              orgTab === 'manage-events' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight">Events</span>
          </button>

          <button
            onClick={() => setOrgTab('registrations')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              orgTab === 'registrations' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight">Volunteers</span>
          </button>

          <button
            onClick={() => setOrgTab('analytics')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              orgTab === 'analytics' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight">Analytics</span>
          </button>

          <button
            onClick={() => setOrgTab('profile')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              orgTab === 'profile' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight">Org</span>
          </button>
        </div>
      )}
    </nav>
  );
};
