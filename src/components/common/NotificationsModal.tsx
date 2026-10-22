import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Check, X, Calendar, Award, UserPlus, Info } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead, activeRole, setSelectedEventForDetails, events, setVolunteerTab, setOrgTab } = useApp();

  if (!isOpen) return null;

  // Filter notifications relevant to current role
  const relevantNotifications = notifications.filter(
    (n) => n.roleTarget === activeRole || n.roleTarget === 'both'
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'registration_update':
        return <Check className="w-4 h-4 text-emerald-600" />;
      case 'certificate_issued':
        return <Award className="w-4 h-4 text-amber-600" />;
      case 'new_applicant':
        return <UserPlus className="w-4 h-4 text-blue-600" />;
      case 'new_event':
        return <Calendar className="w-4 h-4 text-purple-600" />;
      default:
        return <Info className="w-4 h-4 text-slate-600" />;
    }
  };

  const handleNotificationClick = (id: string, eventId?: string) => {
    markNotificationRead(id);
    if (eventId) {
      const evt = events.find((e) => e.id === eventId);
      if (evt) {
        setSelectedEventForDetails(evt);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 mt-14 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-slate-700" />
            <h3 className="font-semibold text-slate-900 text-base">Notifications</h3>
            <span className="text-xs text-slate-500 font-mono">
              ({relevantNotifications.filter((n) => !n.read).length} unread)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:underline px-2 py-1"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto divide-y divide-slate-100">
          {relevantNotifications.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              No notifications at this time.
            </div>
          ) : (
            relevantNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif.id, notif.eventId)}
                className={`p-4 transition-colors cursor-pointer flex gap-3 ${
                  notif.read ? 'bg-white hover:bg-slate-50' : 'bg-emerald-50/40 hover:bg-emerald-50/60'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className={`text-sm ${notif.read ? 'font-medium text-slate-800' : 'font-semibold text-slate-900'}`}>
                      {notif.title}
                    </p>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap shrink-0">{notif.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
