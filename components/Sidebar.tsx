
import React from 'react';
import { SimulationStats } from '../types';

interface SidebarProps {
  m1: number; setM1: (v: number) => void;
  u1: number; setU1: (v: number) => void;
  m2: number; setM2: (v: number) => void;
  u2: number; setU2: (v: number) => void;
  e: number; setE: (v: number) => void;
  stats: SimulationStats;
  onReset: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  m1, setM1, u1, setU1, 
  m2, setM2, u2, setU2, 
  e, setE, stats 
}) => {
  return (
    <aside className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col p-6 overflow-y-auto custom-scrollbar">
      {/* Parameters Section */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 12h10.5" />
          </svg>
          Simulation Parameters
        </h2>
        
        <div className="space-y-8">
          {/* Ball A Controls */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.05)]">
            <h3 className="text-blue-400 font-bold text-sm mb-4 flex justify-between items-center">
              <span>Object A</span>
              <span className="text-xs bg-blue-500/20 px-2 py-0.5 rounded text-blue-300">Left Ball</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 flex justify-between mb-1.5 font-medium">
                  Mass ($m_1$) <span>{m1.toFixed(1)} kg</span>
                </label>
                <input 
                  type="range" min="0.5" max="10" step="0.5" value={m1} 
                  onChange={(e) => setM1(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 flex justify-between mb-1.5 font-medium">
                  Initial Velocity ($u_1$) <span>{u1.toFixed(1)} m/s</span>
                </label>
                <input 
                  type="range" min="-10" max="10" step="0.5" value={u1} 
                  onChange={(e) => setU1(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Ball B Controls */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.05)]">
            <h3 className="text-red-400 font-bold text-sm mb-4 flex justify-between items-center">
              <span>Object B</span>
              <span className="text-xs bg-red-500/20 px-2 py-0.5 rounded text-red-300">Right Ball</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 flex justify-between mb-1.5 font-medium">
                  Mass ($m_2$) <span>{m2.toFixed(1)} kg</span>
                </label>
                <input 
                  type="range" min="0.5" max="10" step="0.5" value={m2} 
                  onChange={(e) => setM2(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 flex justify-between mb-1.5 font-medium">
                  Initial Velocity ($u_2$) <span>{u2.toFixed(1)} m/s</span>
                </label>
                <input 
                  type="range" min="-10" max="10" step="0.5" value={u2} 
                  onChange={(e) => setU2(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Restitution */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700">
            <label className="text-xs font-bold text-slate-300 flex justify-between mb-3 uppercase tracking-wider">
              Coefficient of Restitution ($e$)
              <span className="text-emerald-400">{e.toFixed(2)}</span>
            </label>
            <input 
              type="range" min="0" max="1" step="0.01" value={e} 
              onChange={(e) => setE(parseFloat(e.target.value))}
              className="w-full mb-2"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-bold">
              <span>INELASTIC (0)</span>
              <span>ELASTIC (1)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Data Monitor */}
      <section className="mt-auto">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
          Live Data
        </h2>
        
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700/50">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Total Momentum ($\Sigma p$)</span>
              <span className="text-xs font-mono text-blue-400">kg·m/s</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-mono font-bold">{stats.totalMomentum.toFixed(2)}</span>
              <span className="text-[10px] text-slate-500">Init: {stats.initialMomentum.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700/50">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Total Energy ($\Sigma E_k$)</span>
              <span className="text-xs font-mono text-emerald-400">Joules</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-mono font-bold">{stats.totalKineticEnergy.toFixed(2)}</span>
              <span className="text-[10px] text-slate-500">Init: {stats.initialKineticEnergy.toFixed(2)}</span>
            </div>
            <div className="mt-1.5 h-1 w-full bg-slate-900 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-emerald-500 transition-all duration-300" 
                 style={{ width: `${Math.min(100, (stats.totalKineticEnergy / Math.max(0.001, stats.initialKineticEnergy)) * 100)}%` }}
               />
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-400 uppercase">
            Collisions detected: {stats.collisionCount}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
