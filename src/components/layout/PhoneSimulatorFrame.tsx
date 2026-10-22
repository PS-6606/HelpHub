import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wifi, Battery, Signal, Monitor, RotateCcw } from 'lucide-react';

interface PhoneSimulatorFrameProps {
  children: React.ReactNode;
}

export const PhoneSimulatorFrame: React.FC<PhoneSimulatorFrameProps> = ({ children }) => {
  const { isPhoneFrameView, setIsPhoneFrameView } = useApp();

  if (!isPhoneFrameView) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-900 py-6 px-4 flex flex-col items-center justify-center">
      {/* Top Banner explaining Mobile Sim mode */}
      <div className="mb-4 flex items-center justify-between gap-4 max-w-md w-full bg-slate-800 text-white px-4 py-2 rounded-xl text-xs border border-slate-700 shadow-lg">
        <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
          📱 <strong>Flutter Mobile Mockup Frame</strong> (390 × 844px)
        </span>
        <button
          onClick={() => setIsPhoneFrameView(false)}
          className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200 transition-colors flex items-center gap-1"
        >
          <Monitor className="w-3 h-3" />
          <span>Exit Sim</span>
        </button>
      </div>

      {/* Realistic Mobile Device Mockup */}
      <div className="w-[390px] h-[844px] bg-white rounded-[48px] shadow-2xl border-8 border-slate-800 relative overflow-hidden flex flex-col ring-1 ring-white/10">
        {/* Device Notch & Status Bar */}
        <div className="h-10 bg-white border-b border-slate-100 flex items-center justify-between px-6 pt-1 text-[11px] font-semibold text-slate-900 shrink-0 select-none z-50">
          <span>09:41</span>
          {/* Dynamic Island / Notch */}
          <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto" />
          <div className="flex items-center gap-1.5 text-slate-700">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Scrollable Screen Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col bg-slate-50">
          {children}
        </div>

        {/* Home Indicator Bar */}
        <div className="h-4 bg-white flex items-center justify-center shrink-0 z-50">
          <div className="w-32 h-1 bg-slate-400 rounded-full" />
        </div>
      </div>
    </div>
  );
};
