import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  BookOpen, 
  CheckCircle, 
  Layers, 
  Database, 
  Code2, 
  Users, 
  HelpCircle, 
  Sparkles, 
  Copy, 
  Share2,
  Cpu
} from 'lucide-react';

export const VivaGuideModal: React.FC = () => {
  const { showVivaGuideModal, setShowVivaGuideModal, showToast } = useApp();
  const [activeSection, setActiveSection] = useState<'viva' | 'architecture' | 'flow' | 'database'>('viva');

  if (!showVivaGuideModal) return null;

  const copyText = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast('Copied answer to clipboard!');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto"
      onClick={() => setShowVivaGuideModal(false)}
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                HelpHub — Viva & Architecture Reference
              </h3>
              <p className="text-xs text-slate-500">
                Project explanation, Viva Q&A, Clean Architecture diagrams, and technical summary.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowVivaGuideModal(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-navigation tabs */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-slate-200 bg-white text-xs font-semibold overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveSection('viva')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeSection === 'viva'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🎤 Viva & Interview Answers
          </button>
          <button
            onClick={() => setActiveSection('architecture')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeSection === 'architecture'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🏗️ Clean Architecture & Stack
          </button>
          <button
            onClick={() => setActiveSection('flow')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeSection === 'flow'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🔄 System User Flows
          </button>
          <button
            onClick={() => setActiveSection('database')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeSection === 'database'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🗄️ PostgreSQL / Database Schema
          </button>
        </div>

        {/* Content area */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-slate-800 text-xs sm:text-sm">
          {activeSection === 'viva' && (
            <div className="space-y-6">
              {/* Technical Pitch */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                    Core Technical Definition
                  </span>
                  <button
                    onClick={() =>
                      copyText(
                        'HelpHub is a role-based Flutter/Dart mobile application following Clean Architecture, using Material 3 for responsive UI and Supabase Auth + PostgreSQL for backend, authentication, and data management.'
                      )
                    }
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
                <p className="text-sm font-medium leading-relaxed">
                  "HelpHub is a role-based Flutter/Dart mobile application following Clean Architecture, using Material 3 for responsive UI and Supabase Auth + PostgreSQL for backend, authentication, and data management."
                </p>
              </div>

              {/* Q1 */}
              <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                      Q1
                    </span>
                    <span>Tell me about your project.</span>
                  </h4>
                  <button
                    onClick={() =>
                      copyText(
                        'My project is called HelpHub. It is a mobile platform that connects volunteers with organizations. Organizations can create and manage volunteering events, while volunteers can discover, search, filter, and register for those events. The application uses Flutter and Dart for the frontend, Supabase for backend services and authentication, and PostgreSQL for database management. I designed the project using Clean Architecture with reusable widgets and responsive Material 3 UI.'
                      )
                    }
                    className="text-xs text-slate-400 hover:text-slate-800 flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  "My project is called <strong>HelpHub</strong>. It is a mobile platform that connects volunteers with organizations. Organizations can create and manage volunteering events, while volunteers can discover, search, filter, and register for those events. The application uses Flutter and Dart for the frontend, Supabase for backend services and authentication, and PostgreSQL for database management. I designed the project using Clean Architecture with reusable widgets and responsive Material 3 UI."
                </p>
              </div>

              {/* Q2 */}
              <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                      Q2
                    </span>
                    <span>Why did you build it? What problem does it solve?</span>
                  </h4>
                  <button
                    onClick={() =>
                      copyText(
                        'Currently, volunteering opportunities can be difficult to discover and manage because information is spread across fragmented social media groups, email threads, and personal messaging. Volunteers struggle to find events that match their schedule and skills, while NGOs struggle to track applicant capacities and attendance. HelpHub provides a centralized, role-based platform bridging both sides.'
                      )
                    }
                    className="text-xs text-slate-400 hover:text-slate-800 flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  "Currently, volunteering opportunities can be difficult to discover and manage because information is spread across fragmented social media groups, email threads, and personal messaging. Volunteers struggle to find events matching their schedule and skills, while NGOs struggle to track applicant capacities and attendance. HelpHub provides a centralized, role-based platform bridging both sides with verified registrations and automated digital certification."
                </p>
              </div>

              {/* Q3 */}
              <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                      Q3
                    </span>
                    <span>What was your individual role in the project?</span>
                  </h4>
                  <button
                    onClick={() =>
                      copyText(
                        'I worked on the application architecture, UI components and user flows, volunteer discovery and filtering algorithms, organization dashboard and volunteer approval state machine, and integrating authentication and relational database schema.'
                      )
                    }
                    className="text-xs text-slate-400 hover:text-slate-800 flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  "I worked on the complete application structure, reusable UI components, volunteer discovery and multi-parameter filtering, the organization dashboard and registration approval state machine, and the data models for events, registrations, and official digital certificates."
                </p>
              </div>
            </div>
          )}

          {activeSection === 'architecture' && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <h4 className="font-bold text-emerald-950 mb-1">Clean Architecture Principles</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Decoupled layers guarantee testability, maintainability, and clean separation of concerns.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span>Presentation Layer</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>Screens & Reusable Widgets</li>
                    <li>Material 3 design system</li>
                    <li>State management & UI inputs</li>
                    <li>Responsive layouts (Mobile/Tablet/Web)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <Code2 className="w-4 h-4 text-blue-600" />
                    <span>Domain Layer</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>Core Business Entities</li>
                    <li>Use Cases (RegisterEvent, ApproveVolunteer)</li>
                    <li>Repository Interfaces</li>
                    <li>Pure logic (Framework-independent)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <Database className="w-4 h-4 text-purple-600" />
                    <span>Data Layer</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>Repository Implementations</li>
                    <li>Supabase Auth & Client</li>
                    <li>PostgreSQL ORM / Query Mappers</li>
                    <li>Local cache & offline support</li>
                  </ul>
                </div>
              </div>

              {/* Tech Stack Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Technology</th>
                      <th className="p-3">Role in HelpHub</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Flutter / React</td>
                      <td className="p-3 text-slate-600">Cross-platform responsive frontend engine</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Material 3 / Tailwind</td>
                      <td className="p-3 text-slate-600">Clean design tokens, accessible touch targets</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">PostgreSQL</td>
                      <td className="p-3 text-slate-600">ACID relational database for event registration integrity</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Supabase Auth</td>
                      <td className="p-3 text-slate-600">JWT sessions and Role-Based Access Control (RBAC)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'flow' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Volunteer Flow */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>Volunteer Journey Flow</span>
                  </h4>
                  <div className="space-y-2 font-mono text-[11px] text-slate-700">
                    <div className="p-2 bg-white rounded-lg border border-slate-200">1. Open App & Auth (Volunteer Role)</div>
                    <div className="text-center text-slate-400">↓</div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">2. Discover Events (Search / Category Filter)</div>
                    <div className="text-center text-slate-400">↓</div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">3. View Details, Perks, Logistics</div>
                    <div className="text-center text-slate-400">↓</div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">4. Register with Skills & Note</div>
                    <div className="text-center text-slate-400">↓</div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">5. Receive In-App Approval Notification</div>
                    <div className="text-center text-slate-400">↓</div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">6. Event Completion & Verified Certificate</div>
                  </div>
                </div>

                {/* Organization Flow */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>Organization Workflow</span>
                  </h4>
                  <div className="space-y-2 font-mono text-[11px] text-slate-700">
                    <div className="p-2 bg-white rounded-lg border border-slate-200">1. Organization Login / Switch Org Profile</div>
                    <div className="text-center text-slate-400">↓</div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">2. Dashboard Metrics (Events, Applicants, Fill Rate)</div>
                    <div className="text-center text-slate-400">↓</div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">3. Publish Volunteering Drive (Title, Date, Skills)</div>
                    <div className="text-center text-slate-400">↓</div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">4. Review Applications (Approve / Reject)</div>
                    <div className="text-center text-slate-400">↓</div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">5. Execute Event & Mark Attendance</div>
                    <div className="text-center text-slate-400">↓</div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">6. Auto-Issue Certificates & View Analytics</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'database' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-900 text-white rounded-2xl font-mono text-[11px] leading-relaxed overflow-x-auto">
                <p className="text-emerald-400 mb-2 font-bold">// PostgreSQL Relational Schema Schema Definition</p>
                <pre>{`-- 1. Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('volunteer', 'organization')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Organizations Table
CREATE TABLE organizations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  mission TEXT,
  location TEXT,
  verified BOOLEAN DEFAULT FALSE
);

-- 3. Events Table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  event_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  city TEXT NOT NULL,
  location_address TEXT NOT NULL,
  required_volunteers INT NOT NULL,
  registered_count INT DEFAULT 0,
  status TEXT CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  skills_required TEXT[]
);

-- 4. Registrations Table
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  volunteer_id UUID REFERENCES users(id),
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT
);

-- 5. Certificates Table
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  certificate_number TEXT UNIQUE NOT NULL,
  registration_id UUID REFERENCES registrations(id),
  volunteer_id UUID REFERENCES users(id),
  event_id UUID REFERENCES events(id),
  hours_contributed INT DEFAULT 4,
  issue_date DATE DEFAULT CURRENT_DATE
);`}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            HelpHub · Presentation & Defense Ready
          </span>
          <button
            onClick={() => setShowVivaGuideModal(false)}
            className="px-4 py-1.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
