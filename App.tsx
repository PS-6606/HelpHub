/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { MobileTabBar } from './components/layout/MobileTabBar';
import { PhoneSimulatorFrame } from './components/layout/PhoneSimulatorFrame';

// Volunteer Views
import { VolunteerHome } from './components/volunteer/VolunteerHome';
import { MyEventsView } from './components/volunteer/MyEventsView';
import { SavedEventsView } from './components/volunteer/SavedEventsView';
import { CertificatesView } from './components/volunteer/CertificatesView';
import { VolunteerProfileView } from './components/volunteer/VolunteerProfileView';
import { EventDetailsModal } from './components/volunteer/EventDetailsModal';
import { RegisterModal } from './components/volunteer/RegisterModal';

// Organization Views
import { OrgDashboard } from './components/organization/OrgDashboard';
import { ManageEventsView } from './components/organization/ManageEventsView';
import { RegistrationManagementView } from './components/organization/RegistrationManagementView';
import { AnalyticsView } from './components/organization/AnalyticsView';
import { OrgProfileView } from './components/organization/OrgProfileView';
import { CreateEditEventModal } from './components/organization/CreateEditEventModal';

// Common Modals & Feedback
import { CertificateModal } from './components/modals/CertificateModal';
import { VivaGuideModal } from './components/modals/VivaGuideModal';
import { Toast } from './components/common/Toast';
// Authentication Screen
import { LoginScreen } from './components/auth/LoginScreen';

const MainAppContent: React.FC = () => {
  const { activeRole, volunteerTab, orgTab, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900">
        <LoginScreen />
        <VivaGuideModal />
        <Toast />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-900">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:pb-12">
        {activeRole === 'volunteer' ? (
          <>
            {volunteerTab === 'discover' && <VolunteerHome />}
            {volunteerTab === 'my-events' && <MyEventsView />}
            {volunteerTab === 'saved' && <SavedEventsView />}
            {volunteerTab === 'certificates' && <CertificatesView />}
            {volunteerTab === 'profile' && <VolunteerProfileView />}
          </>
        ) : (
          <>
            {orgTab === 'dashboard' && <OrgDashboard />}
            {orgTab === 'manage-events' && <ManageEventsView />}
            {orgTab === 'registrations' && <RegistrationManagementView />}
            {orgTab === 'analytics' && <AnalyticsView />}
            {orgTab === 'profile' && <OrgProfileView />}
          </>
        )}
      </main>

      {/* Global Modals & Notifications */}
      <EventDetailsModal />
      <RegisterModal />
      <CreateEditEventModal />
      <CertificateModal />
      <VivaGuideModal />
      <Toast />

      {/* Mobile Ergonomic Bottom Tab Bar */}
      <MobileTabBar />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <PhoneSimulatorFrame>
        <MainAppContent />
      </PhoneSimulatorFrame>
    </AppProvider>
  );
}
