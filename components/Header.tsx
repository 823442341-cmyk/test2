
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="px-8 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Momentum Lab</h1>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">A-Level Physics Simulator</p>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-6">
        <div className="text-right">
          <p className="text-xs text-slate-500 uppercase font-bold">Concept</p>
          <p className="text-sm font-semibold text-slate-300">Elastic & Inelastic Collisions</p>
        </div>
        <div className="h-8 w-px bg-slate-800"></div>
        <div className="text-right">
          <p className="text-xs text-slate-500 uppercase font-bold">Model</p>
          <p className="text-sm font-semibold text-slate-300">1D Linear Momentum</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
