export type UserRole = 'volunteer' | 'organization';

export type EventCategory =
  | 'Environment'
  | 'Education'
  | 'Healthcare'
  | 'Community'
  | 'Animal Welfare'
  | 'Disaster Relief'
  | 'Hunger & Food Rescue'
  | 'Arts & Culture';

export type RegistrationStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface VolunteerUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  location: string;
  bio: string;
  skills: string[];
  hoursLogged: number;
  eventsCompleted: number;
  badges: { id: string; title: string; icon: string; description: string }[];
}

export interface OrganizationUser {
  id: string;
  name: string;
  logo: string;
  category: EventCategory;
  email: string;
  phone: string;
  location: string;
  mission: string;
  verified: boolean;
  totalEventsCreated: number;
}

export interface EventItem {
  id: string;
  title: string;
  orgId: string;
  orgName: string;
  orgLogo?: string;
  description: string;
  category: EventCategory;
  date: string; // e.g. "2026-10-25"
  time: string; // e.g. "08:00 AM - 01:00 PM"
  locationType: 'in-person' | 'remote';
  locationAddress: string;
  city: string;
  requiredVolunteers: number;
  registeredCount: number;
  status: EventStatus;
  skillsRequired: string[];
  perks: string[];
  imageUrl?: string;
  urgency?: 'normal' | 'urgent';
  createdAt: string;
}

export interface Registration {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventCity: string;
  eventCategory: EventCategory;
  orgId: string;
  orgName: string;
  volunteerId: string;
  volunteerName: string;
  volunteerEmail: string;
  volunteerPhone: string;
  volunteerAvatar: string;
  volunteerSkills: string[];
  status: RegistrationStatus;
  appliedAt: string;
  notes?: string;
  attendedHours?: number;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  volunteerId: string;
  volunteerName: string;
  eventId: string;
  eventTitle: string;
  orgName: string;
  issueDate: string;
  hoursContributed: number;
  skillsAcknowledged: string[];
  authorizedSignatory: string;
}

export interface NotificationItem {
  id: string;
  roleTarget: 'volunteer' | 'organization' | 'both';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'registration_update' | 'new_event' | 'new_applicant' | 'certificate_issued' | 'system';
  eventId?: string;
}
