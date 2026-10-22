import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  initialCertificates,
  initialEvents,
  initialNotifications,
  initialOrganizations,
  initialRegistrations,
  initialVolunteerUser
} from '../data/mockData';
import {
  Certificate,
  EventCategory,
  EventItem,
  NotificationItem,
  OrganizationUser,
  Registration,
  RegistrationStatus,
  UserRole,
  VolunteerUser
} from '../types';

interface AppContextType {
  // Authentication & Role Restriction (Strict Guard)
  isAuthenticated: boolean;
  verifyAndLoginVolunteer: (email: string, password: string) => { success: boolean; error?: string };
  registerAndLoginVolunteer: (data: { name: string; email: string; password: string; location: string; skills: string[] }) => { success: boolean; error?: string };
  verifyAndLoginOrg: (email: string, password: string) => { success: boolean; error?: string };
  registerAndLoginOrg: (data: { name: string; email: string; password: string; location: string; mission: string; category: EventCategory }) => { success: boolean; error?: string };
  loginAsVolunteer: (userData?: { name?: string; email?: string; location?: string; skills?: string[] }) => void;
  loginAsOrganization: (orgData?: { name?: string; email?: string; location?: string; mission?: string; category?: EventCategory }) => void;
  logout: () => void;

  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeVolunteer: VolunteerUser;
  updateVolunteerProfile: (updated: Partial<VolunteerUser>) => void;
  activeOrg: OrganizationUser;
  updateOrgProfile: (updated: Partial<OrganizationUser>) => void;
  
  // Events
  events: EventItem[];
  addEvent: (event: Omit<EventItem, 'id' | 'registeredCount' | 'createdAt'>) => void;
  updateEvent: (id: string, updated: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;
  markEventCompleted: (id: string) => void;
  
  // Registrations
  registrations: Registration[];
  registerForEvent: (eventId: string, notes?: string) => { success: boolean; message: string };
  cancelRegistration: (registrationId: string) => void;
  updateRegistrationStatus: (registrationId: string, status: RegistrationStatus) => void;
  
  // Bookmarks
  savedEventIds: string[];
  toggleSaveEvent: (eventId: string) => void;
  
  // Certificates
  certificates: Certificate[];
  selectedCertificate: Certificate | null;
  setSelectedCertificate: (cert: Certificate | null) => void;
  
  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Navigation & Modals
  volunteerTab: 'discover' | 'my-events' | 'saved' | 'certificates' | 'profile';
  setVolunteerTab: (tab: 'discover' | 'my-events' | 'saved' | 'certificates' | 'profile') => void;
  orgTab: 'dashboard' | 'manage-events' | 'registrations' | 'analytics' | 'profile';
  setOrgTab: (tab: 'dashboard' | 'manage-events' | 'registrations' | 'analytics' | 'profile') => void;
  
  selectedEventForDetails: EventItem | null;
  setSelectedEventForDetails: (event: EventItem | null) => void;
  registerModalEvent: EventItem | null;
  setRegisterModalEvent: (event: EventItem | null) => void;
  showCreateEventModal: boolean;
  setShowCreateEventModal: (show: boolean) => void;
  editingEvent: EventItem | null;
  setEditingEvent: (event: EventItem | null) => void;
  showVivaGuideModal: boolean;
  setShowVivaGuideModal: (show: boolean) => void;

  // Viewport mode: Responsive vs Flutter Phone Shell
  isPhoneFrameView: boolean;
  setIsPhoneFrameView: (val: boolean) => void;

  // Toast / Feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'volunteer_connect_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('helphub_auth_session');
      return !!stored;
    } catch {
      return false;
    }
  });

  const [activeRole, setActiveRoleState] = useState<UserRole>(() => {
    try {
      const stored = localStorage.getItem('helphub_auth_session');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.role === 'organization') return 'organization';
      }
      return 'volunteer';
    } catch {
      return 'volunteer';
    }
  });

  const [activeVolunteer, setActiveVolunteer] = useState<VolunteerUser>(initialVolunteerUser);
  const [activeOrg, setActiveOrg] = useState<OrganizationUser>(initialOrganizations[0]);

  // Registry of valid accounts for strict authentication
  const [registeredVolunteers, setRegisteredVolunteers] = useState<
    Array<{ email: string; password: string; user: VolunteerUser }>
  >([
    {
      email: 'rahul.sharma@example.com',
      password: 'volunteer123',
      user: initialVolunteerUser
    },
    {
      email: 'rahul@helphub.org',
      password: 'volunteer123',
      user: initialVolunteerUser
    }
  ]);

  const [registeredOrgs, setRegisteredOrgs] = useState<
    Array<{ email: string; password: string; org: OrganizationUser }>
  >([
    {
      email: 'contact@greenfuture.ngo',
      password: 'ngo123',
      org: initialOrganizations[0]
    },
    {
      email: 'greenfuture@helphub.org',
      password: 'ngo123',
      org: initialOrganizations[0]
    },
    {
      email: 'info@prathamshiksha.org',
      password: 'ngo123',
      org: initialOrganizations[1]
    }
  ]);

  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [registrations, setRegistrations] = useState<Registration[]>(initialRegistrations);
  const [savedEventIds, setSavedEventIds] = useState<string[]>(['evt-001', 'evt-003']);
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  
  // Nav
  const [volunteerTab, setVolunteerTab] = useState<'discover' | 'my-events' | 'saved' | 'certificates' | 'profile'>('discover');
  const [orgTab, setOrgTab] = useState<'dashboard' | 'manage-events' | 'registrations' | 'analytics' | 'profile'>('dashboard');

  // Modals
  const [selectedEventForDetails, setSelectedEventForDetails] = useState<EventItem | null>(null);
  const [registerModalEvent, setRegisterModalEvent] = useState<EventItem | null>(null);
  const [showCreateEventModal, setShowCreateEventModal] = useState<boolean>(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showVivaGuideModal, setShowVivaGuideModal] = useState<boolean>(false);
  const [isPhoneFrameView, setIsPhoneFrameView] = useState<boolean>(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const verifyAndLoginVolunteer = (email: string, password: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const account = registeredVolunteers.find((v) => v.email.toLowerCase() === cleanEmail);

    if (!account) {
      return {
        success: false,
        error: 'No volunteer account found with this email. Please check your spelling or create an account under Sign Up.'
      };
    }

    if (account.password !== password) {
      return {
        success: false,
        error: 'Incorrect password. Please verify your credentials and try again.'
      };
    }

    setActiveVolunteer(account.user);
    setActiveRoleState('volunteer');
    setVolunteerTab('discover');
    setIsAuthenticated(true);
    try {
      localStorage.setItem('helphub_auth_session', JSON.stringify({ email: cleanEmail, role: 'volunteer' }));
    } catch (e) {
      console.error(e);
    }
    showToast(`Signed in successfully as Volunteer: ${account.user.name}`);
    return { success: true };
  };

  const registerAndLoginVolunteer = (data: { name: string; email: string; password: string; location: string; skills: string[] }): { success: boolean; error?: string } => {
    const cleanEmail = data.email.trim().toLowerCase();
    if (registeredVolunteers.some((v) => v.email.toLowerCase() === cleanEmail)) {
      return {
        success: false,
        error: 'An account with this email is already registered. Please Sign In.'
      };
    }

    if (!data.name.trim()) {
      return { success: false, error: 'Full name is required.' };
    }

    if (data.password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters long.'
      };
    }

    const newUser: VolunteerUser = {
      id: `vol-${Date.now()}`,
      name: data.name.trim(),
      email: cleanEmail,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name)}`,
      phone: '+91 98000 00000',
      location: data.location.trim() || 'India',
      bio: 'Enthusiastic community volunteer on HelpHub.',
      skills: data.skills.length > 0 ? data.skills : ['Community Support'],
      hoursLogged: 0,
      eventsCompleted: 0,
      badges: [{ id: 'b-new', title: 'New Member', icon: 'Award', description: 'Joined the HelpHub volunteering community' }]
    };

    setRegisteredVolunteers((prev) => [...prev, { email: cleanEmail, password: data.password, user: newUser }]);
    setActiveVolunteer(newUser);
    setActiveRoleState('volunteer');
    setVolunteerTab('discover');
    setIsAuthenticated(true);
    try {
      localStorage.setItem('helphub_auth_session', JSON.stringify({ email: cleanEmail, role: 'volunteer' }));
    } catch (e) {
      console.error(e);
    }
    showToast(`Account created! Welcome to HelpHub, ${newUser.name}.`);
    return { success: true };
  };

  const verifyAndLoginOrg = (email: string, password: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const account = registeredOrgs.find((o) => o.email.toLowerCase() === cleanEmail);

    if (!account) {
      return {
        success: false,
        error: 'No organization account found with this email. Please check your spelling or register under Sign Up.'
      };
    }

    if (account.password !== password) {
      return {
        success: false,
        error: 'Incorrect password. Please verify your credentials and try again.'
      };
    }

    setActiveOrg(account.org);
    setActiveRoleState('organization');
    setOrgTab('dashboard');
    setIsAuthenticated(true);
    try {
      localStorage.setItem('helphub_auth_session', JSON.stringify({ email: cleanEmail, role: 'organization' }));
    } catch (e) {
      console.error(e);
    }
    showToast(`Signed in successfully as Organization: ${account.org.name}`);
    return { success: true };
  };

  const registerAndLoginOrg = (data: { name: string; email: string; password: string; location: string; mission: string; category: EventCategory }): { success: boolean; error?: string } => {
    const cleanEmail = data.email.trim().toLowerCase();
    if (registeredOrgs.some((o) => o.email.toLowerCase() === cleanEmail)) {
      return {
        success: false,
        error: 'An organization with this official email is already registered. Please Sign In.'
      };
    }

    if (!data.name.trim()) {
      return { success: false, error: 'Organization name is required.' };
    }

    if (data.password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters long.'
      };
    }

    const newOrg: OrganizationUser = {
      id: `org-${Date.now()}`,
      name: data.name.trim(),
      logo: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(data.name)}`,
      category: data.category || 'Environment',
      email: cleanEmail,
      phone: '+91 80 4000 0000',
      location: data.location.trim() || 'India',
      mission: data.mission.trim() || 'Committed to empowering communities and driving grassroots civic impact.',
      verified: true,
      totalEventsCreated: 0
    };

    setRegisteredOrgs((prev) => [...prev, { email: cleanEmail, password: data.password, org: newOrg }]);
    setActiveOrg(newOrg);
    setActiveRoleState('organization');
    setOrgTab('dashboard');
    setIsAuthenticated(true);
    try {
      localStorage.setItem('helphub_auth_session', JSON.stringify({ email: cleanEmail, role: 'organization' }));
    } catch (e) {
      console.error(e);
    }
    showToast(`Organization registered! Welcome to HelpHub, ${newOrg.name}.`);
    return { success: true };
  };

  const loginAsVolunteer = (userData?: { name?: string; email?: string; location?: string; skills?: string[] }) => {
    if (userData) {
      setActiveVolunteer((prev) => ({
        ...prev,
        ...userData,
        avatar: userData.name
          ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`
          : prev.avatar
      }));
    }
    setActiveRoleState('volunteer');
    setVolunteerTab('discover');
    setIsAuthenticated(true);
    try {
      localStorage.setItem('helphub_auth_session', JSON.stringify({ email: userData?.email || activeVolunteer.email, role: 'volunteer' }));
    } catch (e) {
      console.error(e);
    }
    showToast(`Signed in as Volunteer: ${userData?.name || activeVolunteer.name}`);
  };

  const loginAsOrganization = (orgData?: { name?: string; email?: string; location?: string; mission?: string; category?: EventCategory }) => {
    if (orgData) {
      setActiveOrg((prev) => ({
        ...prev,
        ...orgData
      }));
    }
    setActiveRoleState('organization');
    setOrgTab('dashboard');
    setIsAuthenticated(true);
    try {
      localStorage.setItem('helphub_auth_session', JSON.stringify({ email: orgData?.email || activeOrg.email, role: 'organization' }));
    } catch (e) {
      console.error(e);
    }
    showToast(`Signed in as Organization: ${orgData?.name || activeOrg.name}`);
  };

  const logout = () => {
    try {
      localStorage.removeItem('helphub_auth_session');
      localStorage.removeItem('helphub_auth_role');
    } catch (e) {
      console.error(e);
    }
    setIsAuthenticated(false);
    showToast('Signed out of HelpHub. Please log in to continue.');
  };

  const setActiveRole = (role: UserRole) => {
    setActiveRoleState(role);
    try {
      localStorage.setItem('helphub_auth_role', role);
    } catch (e) {
      console.error(e);
    }
    showToast(`Switched to ${role === 'volunteer' ? 'Volunteer' : 'Organization'} mode`);
  };

  const updateVolunteerProfile = (updated: Partial<VolunteerUser>) => {
    setActiveVolunteer((prev) => ({ ...prev, ...updated }));
    showToast('Volunteer profile updated');
  };

  const updateOrgProfile = (updated: Partial<OrganizationUser>) => {
    setActiveOrg((prev) => ({ ...prev, ...updated }));
    showToast('Organization profile updated');
  };

  const addEvent = (eventData: Omit<EventItem, 'id' | 'registeredCount' | 'createdAt'>) => {
    const newId = `evt-${Date.now().toString().slice(-4)}`;
    const newEvent: EventItem = {
      ...eventData,
      id: newId,
      orgId: activeOrg.id,
      orgName: activeOrg.name,
      registeredCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setEvents((prev) => [newEvent, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      roleTarget: 'volunteer',
      title: 'New Volunteering Opportunity 🌟',
      message: `${activeOrg.name} just posted a new drive: "${newEvent.title}".`,
      timestamp: 'Just now',
      read: false,
      type: 'new_event',
      eventId: newId
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`Event "${newEvent.title}" published successfully!`);
  };

  const updateEvent = (id: string, updated: Partial<EventItem>) => {
    setEvents((prev) =>
      prev.map((evt) => (evt.id === id ? { ...evt, ...updated } : evt))
    );
    showToast('Event updated successfully');
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((evt) => evt.id !== id));
    setRegistrations((prev) => prev.filter((reg) => reg.eventId !== id));
    showToast('Event and associated registrations deleted');
  };

  const markEventCompleted = (eventId: string) => {
    const targetEvent = events.find((e) => e.id === eventId);
    if (!targetEvent) return;

    // Update event status
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, status: 'completed' } : e))
    );

    // Update registrations to completed and issue certificates
    let certificatesIssued = 0;
    const newCertificates: Certificate[] = [];

    setRegistrations((prev) =>
      prev.map((reg) => {
        if (reg.eventId === eventId && (reg.status === 'approved' || reg.status === 'completed')) {
          if (reg.status !== 'completed') {
            certificatesIssued++;
            const certId = `cert-${Date.now()}-${reg.volunteerId.slice(-3)}`;
            newCertificates.push({
              id: certId,
              certificateNumber: `HH-${targetEvent.orgName.slice(0, 2).toUpperCase()}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
              volunteerId: reg.volunteerId,
              volunteerName: reg.volunteerName,
              eventId: targetEvent.id,
              eventTitle: targetEvent.title,
              orgName: targetEvent.orgName,
              issueDate: new Date().toISOString().split('T')[0],
              hoursContributed: 4,
              skillsAcknowledged: targetEvent.skillsRequired,
              authorizedSignatory: `Director, ${targetEvent.orgName}`
            });
          }
          return { ...reg, status: 'completed', attendedHours: 4 };
        }
        return reg;
      })
    );

    if (newCertificates.length > 0) {
      setCertificates((prev) => [...newCertificates, ...prev]);
      // Update active volunteer's hours if they participated
      const isUserInvolved = newCertificates.some((c) => c.volunteerId === activeVolunteer.id);
      if (isUserInvolved) {
        setActiveVolunteer((prev) => ({
          ...prev,
          hoursLogged: prev.hoursLogged + 4,
          eventsCompleted: prev.eventsCompleted + 1
        }));
      }

      // Add notification for volunteer
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          roleTarget: 'volunteer',
          title: 'Event Completed & Certificate Issued! 🎓',
          message: `${targetEvent.title} is now marked completed. Your digital Certificate of Appreciation is ready.`,
          timestamp: 'Just now',
          read: false,
          type: 'certificate_issued',
          eventId: targetEvent.id
        },
        ...prev
      ]);
    }

    showToast(`Event marked completed! Issued ${certificatesIssued} volunteer certificates.`);
  };

  const registerForEvent = (eventId: string, notes?: string): { success: boolean; message: string } => {
    const targetEvent = events.find((e) => e.id === eventId);
    if (!targetEvent) return { success: false, message: 'Event not found' };

    // Check if already registered
    const alreadyRegistered = registrations.find(
      (r) => r.eventId === eventId && r.volunteerId === activeVolunteer.id
    );
    if (alreadyRegistered) {
      return { success: false, message: 'You have already registered for this event.' };
    }

    const newReg: Registration = {
      id: `reg-${Date.now()}`,
      eventId: targetEvent.id,
      eventTitle: targetEvent.title,
      eventDate: targetEvent.date,
      eventCity: targetEvent.city,
      eventCategory: targetEvent.category,
      orgId: targetEvent.orgId,
      orgName: targetEvent.orgName,
      volunteerId: activeVolunteer.id,
      volunteerName: activeVolunteer.name,
      volunteerEmail: activeVolunteer.email,
      volunteerPhone: activeVolunteer.phone,
      volunteerAvatar: activeVolunteer.avatar,
      volunteerSkills: activeVolunteer.skills,
      status: 'pending',
      appliedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      notes: notes || 'Enthusiastic to help and make an impact!'
    };

    setRegistrations((prev) => [newReg, ...prev]);

    // Update event registered count
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e
      )
    );

    // Notification for Organization
    setNotifications((prev) => [
      {
        id: `notif-org-${Date.now()}`,
        roleTarget: 'organization',
        title: 'New Volunteer Registration',
        message: `${activeVolunteer.name} just applied to "${targetEvent.title}".`,
        timestamp: 'Just now',
        read: false,
        type: 'new_applicant',
        eventId: targetEvent.id
      },
      ...prev
    ]);

    showToast(`Application submitted for "${targetEvent.title}"!`);
    return { success: true, message: 'Registration submitted successfully!' };
  };

  const cancelRegistration = (registrationId: string) => {
    const reg = registrations.find((r) => r.id === registrationId);
    if (!reg) return;

    setRegistrations((prev) => prev.filter((r) => r.id !== registrationId));
    // Decrement event registeredCount
    setEvents((prev) =>
      prev.map((e) =>
        e.id === reg.eventId ? { ...e, registeredCount: Math.max(0, e.registeredCount - 1) } : e
      )
    );
    showToast('Registration cancelled');
  };

  const updateRegistrationStatus = (registrationId: string, status: RegistrationStatus) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === registrationId ? { ...r, status } : r))
    );

    const reg = registrations.find((r) => r.id === registrationId);
    if (reg) {
      const statusTitle =
        status === 'approved'
          ? 'Application Approved! 🎉'
          : status === 'rejected'
          ? 'Application Update'
          : 'Registration Completed';
      
      const statusMsg =
        status === 'approved'
          ? `Your registration for "${reg.eventTitle}" was approved by ${reg.orgName}. See you there!`
          : status === 'rejected'
          ? `Your application for "${reg.eventTitle}" could not be accommodated at this time.`
          : `Your participation in "${reg.eventTitle}" is marked completed.`;

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          roleTarget: 'volunteer',
          title: statusTitle,
          message: statusMsg,
          timestamp: 'Just now',
          read: false,
          type: 'registration_update',
          eventId: reg.eventId
        },
        ...prev
      ]);
    }

    showToast(`Registration status marked as ${status}`);
  };

  const toggleSaveEvent = (eventId: string) => {
    setSavedEventIds((prev) => {
      const isSaved = prev.includes(eventId);
      if (isSaved) {
        showToast('Event removed from saved');
        return prev.filter((id) => id !== eventId);
      } else {
        showToast('Event saved to your bookmarks!');
        return [...prev, eventId];
      }
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read');
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        verifyAndLoginVolunteer,
        registerAndLoginVolunteer,
        verifyAndLoginOrg,
        registerAndLoginOrg,
        loginAsVolunteer,
        loginAsOrganization,
        logout,
        activeRole,
        setActiveRole,
        activeVolunteer,
        updateVolunteerProfile,
        activeOrg,
        updateOrgProfile,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        markEventCompleted,
        registrations,
        registerForEvent,
        cancelRegistration,
        updateRegistrationStatus,
        savedEventIds,
        toggleSaveEvent,
        certificates,
        selectedCertificate,
        setSelectedCertificate,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        volunteerTab,
        setVolunteerTab,
        orgTab,
        setOrgTab,
        selectedEventForDetails,
        setSelectedEventForDetails,
        registerModalEvent,
        setRegisterModalEvent,
        showCreateEventModal,
        setShowCreateEventModal,
        editingEvent,
        setEditingEvent,
        showVivaGuideModal,
        setShowVivaGuideModal,
        isPhoneFrameView,
        setIsPhoneFrameView,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
