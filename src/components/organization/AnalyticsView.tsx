import React from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_CATEGORIES } from '../../data/mockData';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Award, 
  Calendar, 
  CheckCircle2, 
  PieChart,
  ShieldCheck
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { events, registrations, activeOrg } = useApp();

  const orgEvents = events.filter((e) => e.orgId === activeOrg.id);
  const orgRegs = registrations.filter((r) => r.orgId === activeOrg.id);

  const totalCapacityNeeded = orgEvents.reduce((acc, curr) => acc + curr.requiredVolunteers, 0);
  const totalRegistered = orgEvents.reduce((acc, curr) => acc + curr.registeredCount, 0);
  const overallFillRate = totalCapacityNeeded > 0 ? Math.round((totalRegistered / totalCapacityNeeded) * 100) : 0;

  const approvedCount = orgRegs.filter((r) => r.status === 'approved' || r.status === 'completed').length;
  const approvalRate = orgRegs.length > 0 ? Math.round((approvedCount / orgRegs.length) * 100) : 0;

  const completedCount = orgRegs.filter((r) => r.status === 'completed').length;
  const totalImpactHours = approvedCount * 4;

  // Breakdown by category
  const categoryBreakdown = ALL_CATEGORIES.filter((c) => c !== 'All').map((cat) => {
    const count = orgEvents.filter((e) => e.category === cat).length;
    const catRegs = orgEvents.filter((e) => e.category === cat).reduce((acc, curr) => acc + curr.registeredCount, 0);
    return { category: cat, eventsCount: count, volunteersCount: catRegs };
  }).filter((item) => item.eventsCount > 0);

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Organization Analytics</h1>
        <p className="text-xs text-slate-500">
          Real-time metrics on volunteer engagement, drive capacity utilization, and community impact.
        </p>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">Capacity Fill Rate</span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-700 tabular-nums">{overallFillRate}%</p>
          <p className="text-[11px] text-slate-400 mt-1">{totalRegistered} / {totalCapacityNeeded} spots filled</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span className="font-medium">Approval Rate</span>
          </div>
          <p className="text-2xl font-extrabold text-blue-700 tabular-nums">{approvalRate}%</p>
          <p className="text-[11px] text-slate-400 mt-1">{approvedCount} of {orgRegs.length} applicants</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Clock className="w-4 h-4 text-purple-600" />
            <span className="font-medium">Logged Hours</span>
          </div>
          <p className="text-2xl font-extrabold text-purple-700 tabular-nums">{totalImpactHours} hrs</p>
          <p className="text-[11px] text-slate-400 mt-1">Direct community labor</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Award className="w-4 h-4 text-amber-600" />
            <span className="font-medium">Certificates Issued</span>
          </div>
          <p className="text-2xl font-extrabold text-amber-700 tabular-nums">{completedCount}</p>
          <p className="text-[11px] text-slate-400 mt-1">Verified credentials</p>
        </div>
      </div>

      {/* Visual Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cause / Category Impact Distribution */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Event Distribution by Category
            </h2>
          </div>

          <div className="space-y-4 pt-2">
            {categoryBreakdown.map((item) => {
              const maxVolunteers = Math.max(...categoryBreakdown.map((c) => c.volunteersCount), 1);
              const percentage = Math.round((item.volunteersCount / maxVolunteers) * 100);

              return (
                <div key={item.category} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{item.category}</span>
                    <span className="text-slate-500 tabular-nums">
                      {item.volunteersCount} volunteers ({item.eventsCount} events)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Operational Efficiency & Quality */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Program Operations & Health
            </h2>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Volunteer Turnout Reliability</p>
                <p className="text-[11px] text-slate-500">Ratio of approved attendees showing up</p>
              </div>
              <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                92%
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Average Turnaround Time</p>
                <p className="text-[11px] text-slate-500">Time to review new volunteer applications</p>
              </div>
              <span className="text-sm font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                &lt; 6 Hours
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">NGO Trust & Verification Status</p>
                <p className="text-[11px] text-slate-500">Government NGO Darpan / 80G Certified</p>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
