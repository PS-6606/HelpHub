import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_CATEGORIES } from '../../data/mockData';
import { EventCategory } from '../../types';
import { 
  HeartHandshake, 
  Building2, 
  User, 
  ArrowRight, 
  Mail, 
  Lock, 
  MapPin, 
  Sparkles,
  BookOpen,
  Eye,
  EyeOff,
  AlertCircle,
  KeyRound,
  ShieldCheck
} from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { 
    verifyAndLoginVolunteer, 
    registerAndLoginVolunteer, 
    verifyAndLoginOrg, 
    registerAndLoginOrg,
    setShowVivaGuideModal 
  } = useApp();

  // Role: 'volunteer' or 'organization'
  const [selectedRole, setSelectedRole] = useState<'volunteer' | 'organization'>('volunteer');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Input states (Clean and empty by default)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Volunteer signup specific fields
  const [volName, setVolName] = useState('');
  const [volLocation, setVolLocation] = useState('Bengaluru, India');
  const [volSkills, setVolSkills] = useState('Teaching, Tree Plantation, Community Support');

  // Organization signup specific fields
  const [orgName, setOrgName] = useState('');
  const [orgCategory, setOrgCategory] = useState<EventCategory>('Environment');
  const [orgLocation, setOrgLocation] = useState('Bengaluru, India');
  const [orgMission, setOrgMission] = useState('');

  // Error and Loading states
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = (role: 'volunteer' | 'organization', mode: 'signin' | 'signup') => {
    setSelectedRole(role);
    setAuthMode(mode);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage(null);
  };

  const handleFillDemo = () => {
    setErrorMessage(null);
    if (selectedRole === 'volunteer') {
      setEmail('rahul.sharma@example.com');
      setPassword('volunteer123');
    } else {
      setEmail('contact@greenfuture.ngo');
      setPassword('ngo123');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    if (authMode === 'signin') {
      if (!email.trim() || !password.trim()) {
        setErrorMessage('Both email and password are required to log in.');
        setIsSubmitting(false);
        return;
      }

      if (selectedRole === 'volunteer') {
        const res = verifyAndLoginVolunteer(email, password);
        if (!res.success) {
          setErrorMessage(res.error || 'Authentication failed. Please check your credentials.');
          setIsSubmitting(false);
        }
      } else {
        const res = verifyAndLoginOrg(email, password);
        if (!res.success) {
          setErrorMessage(res.error || 'Authentication failed. Please check your credentials.');
          setIsSubmitting(false);
        }
      }
    } else {
      // Sign Up validation
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        setIsSubmitting(false);
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please re-enter.');
        setIsSubmitting(false);
        return;
      }

      if (selectedRole === 'volunteer') {
        if (!volName.trim()) {
          setErrorMessage('Full name is required to register as a volunteer.');
          setIsSubmitting(false);
          return;
        }

        const parsedSkills = volSkills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);

        const res = registerAndLoginVolunteer({
          name: volName,
          email,
          password,
          location: volLocation,
          skills: parsedSkills.length > 0 ? parsedSkills : ['Community Support']
        });

        if (!res.success) {
          setErrorMessage(res.error || 'Registration failed.');
          setIsSubmitting(false);
        }
      } else {
        if (!orgName.trim()) {
          setErrorMessage('Organization / NGO name is required.');
          setIsSubmitting(false);
          return;
        }

        const res = registerAndLoginOrg({
          name: orgName,
          email,
          password,
          location: orgLocation,
          mission: orgMission || 'Committed to empowering communities and civic welfare.',
          category: orgCategory
        });

        if (!res.success) {
          setErrorMessage(res.error || 'Organization registration failed.');
          setIsSubmitting(false);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Bar */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-900/30">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white">HelpHub</span>
            <span className="text-xs text-slate-400 block -mt-0.5">Secure Community Platform</span>
          </div>
        </div>

        <button
          onClick={() => setShowVivaGuideModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors shadow-xs"
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span>Project Specs & Viva</span>
        </button>
      </div>

      {/* Main Authentication Gate */}
      <div className="max-w-4xl w-full mx-auto my-8 z-10">
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Authenticated Portal Access Required</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Log in to enter HelpHub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Access is restricted to authenticated members. Please log in as either a <strong>Volunteer</strong> or an <strong>Organization</strong> to proceed.
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Volunteer Role Card */}
          <button
            type="button"
            onClick={() => resetForm('volunteer', 'signin')}
            className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
              selectedRole === 'volunteer'
                ? 'bg-slate-800/95 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xl'
                : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/60 opacity-75'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  selectedRole === 'volunteer' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}>
                  <User className="w-6 h-6" />
                </div>
                {selectedRole === 'volunteer' && (
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/70 px-2.5 py-0.5 rounded-md border border-emerald-800">
                    Active Gateway
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-white mb-1">Volunteer Login</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Log in to find volunteering events, track certified hours, and view earned digital certificates.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-3 text-[11px] text-slate-400">
              <span>Event Discovery</span>
              <span>·</span>
              <span>Applications</span>
              <span>·</span>
              <span>Certificates</span>
            </div>
          </button>

          {/* Organization Role Card */}
          <button
            type="button"
            onClick={() => resetForm('organization', 'signin')}
            className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
              selectedRole === 'organization'
                ? 'bg-slate-800/95 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xl'
                : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/60 opacity-75'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  selectedRole === 'organization' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}>
                  <Building2 className="w-6 h-6" />
                </div>
                {selectedRole === 'organization' && (
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/70 px-2.5 py-0.5 rounded-md border border-emerald-800">
                    Active Gateway
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-white mb-1">Organization Login</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Log in to publish community drives, review candidate applications, and issue official certificates.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-3 text-[11px] text-slate-400">
              <span>Host Drives</span>
              <span>·</span>
              <span>Approve Volunteers</span>
              <span>·</span>
              <span>Issue Certs</span>
            </div>
          </button>
        </div>

        {/* Form Box */}
        <div className="bg-slate-800/90 backdrop-blur-md rounded-3xl border border-slate-700 p-6 sm:p-8 shadow-2xl space-y-5">
          {/* Header & Mode Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">
                {selectedRole === 'volunteer'
                  ? authMode === 'signin' ? 'Sign In as Volunteer' : 'Register New Volunteer'
                  : authMode === 'signin' ? 'Sign In as Organization' : 'Register New Organization'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {authMode === 'signin'
                  ? 'Enter your registered credentials to access the system.'
                  : 'Complete your registration to create your HelpHub credentials.'}
              </p>
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-700 text-xs font-medium self-start sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signin');
                  setErrorMessage(null);
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  authMode === 'signin'
                    ? 'bg-slate-800 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setErrorMessage(null);
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  authMode === 'signup'
                    ? 'bg-slate-800 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-950/60 border border-rose-800 text-rose-200 rounded-xl text-xs flex items-start gap-2.5 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* Verified Test Account Helper Box */}
          {authMode === 'signin' && (
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                  Registered Test Account
                </span>
                <p className="text-slate-300">
                  {selectedRole === 'volunteer' ? (
                    <>Email: <strong className="text-white">rahul.sharma@example.com</strong> · Password: <strong className="text-white">volunteer123</strong></>
                  ) : (
                    <>Email: <strong className="text-white">contact@greenfuture.ngo</strong> · Password: <strong className="text-white">ngo123</strong></>
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={handleFillDemo}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-600 transition-colors whitespace-nowrap self-start sm:self-auto flex items-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                <span>Fill Credentials</span>
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sign Up Fields for Volunteer */}
            {authMode === 'signup' && selectedRole === 'volunteer' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={volName}
                    onChange={(e) => setVolName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                    Location / City *
                  </label>
                  <input
                    type="text"
                    required
                    value={volLocation}
                    onChange={(e) => setVolLocation(e.target.value)}
                    placeholder="e.g. Bengaluru, India"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* Sign Up Fields for Organization */}
            {authMode === 'signup' && selectedRole === 'organization' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                      Organization / NGO Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. Green Future Foundation"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                      Primary Cause Category *
                    </label>
                    <select
                      value={orgCategory}
                      onChange={(e) => setOrgCategory(e.target.value as EventCategory)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    >
                      {ALL_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                      Headquarters / City *
                    </label>
                    <input
                      type="text"
                      required
                      value={orgLocation}
                      onChange={(e) => setOrgLocation(e.target.value)}
                      placeholder="e.g. Bengaluru, India"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                      Mission Statement
                    </label>
                    <input
                      type="text"
                      value={orgMission}
                      onChange={(e) => setOrgMission(e.target.value)}
                      placeholder="e.g. Urban reforestation and conservation"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email and Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                  {selectedRole === 'volunteer' ? 'Volunteer Email *' : 'Official NGO Email *'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={selectedRole === 'volunteer' ? 'volunteer@example.com' : 'contact@ngo.org'}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Confirm Password for Sign Up */}
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* Additional Volunteer Skills Field for Sign Up */}
            {authMode === 'signup' && selectedRole === 'volunteer' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                  Volunteer Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={volSkills}
                  onChange={(e) => setVolSkills(e.target.value)}
                  placeholder="e.g. Teaching, Tree Plantation, First Aid"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 rounded-xl transition-all shadow-md shadow-emerald-950/40 flex items-center justify-center gap-2"
              >
                <span>
                  {authMode === 'signin'
                    ? `Log In as ${selectedRole === 'volunteer' ? 'Volunteer' : 'Organization'}`
                    : `Complete ${selectedRole === 'volunteer' ? 'Volunteer' : 'Organization'} Registration`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Security Note */}
      <div className="max-w-5xl w-full mx-auto text-center text-xs text-slate-500 pt-4 border-t border-slate-800">
        <p>HelpHub Secure Access Control · All app views and operations are protected behind user authentication.</p>
      </div>
    </div>
  );
};
