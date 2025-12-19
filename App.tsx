
import React, { useState, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar';
import CollisionCanvas from './components/CollisionCanvas';
import Header from './components/Header';
import { PHYSICS_DEFAULTS } from './constants';
import { LabConfig, BallState } from './types';

const App: React.FC = () => {
  // Global simulation state
  const [isPlaying, setIsPlaying] = useState(false);
  const [m1, setM1] = useState(PHYSICS_DEFAULTS.m1);
  const [u1, setU1] = useState(PHYSICS_DEFAULTS.u1);
  const [m2, setM2] = useState(PHYSICS_DEFAULTS.m2);
  const [u2, setU2] = useState(PHYSICS_DEFAULTS.u2);
  const [e, setE] = useState(PHYSICS_DEFAULTS.e);

  // Stats for the data panel
  const [stats, setStats] = useState({
    totalMomentum: 0,
    totalKineticEnergy: 0,
    initialMomentum: 0,
    initialKineticEnergy: 0,
    collisionCount: 0,
  });

  // Reference to reset the animation
  const resetTriggerRef = useRef(0);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    resetTriggerRef.current += 1;
    setStats(prev => ({
      ...prev,
      collisionCount: 0
    }));
  }, []);

  const handleTogglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      <Header />
      
      <main className="flex flex-1 overflow-hidden">
        {/* Left Side: Simulation Area */}
        <div className="flex-1 relative flex items-center justify-center p-4">
          <div className="w-full h-full rounded-2xl border border-slate-800 bg-slate-900/50 shadow-2xl overflow-hidden relative">
            <CollisionCanvas 
              isPlaying={isPlaying}
              m1={m1}
              u1={u1}
              m2={m2}
              u2={u2}
              e={e}
              resetTrigger={resetTriggerRef.current}
              onStatsUpdate={setStats}
            />
            
            {/* Overlay Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 rounded-full bg-slate-800/80 backdrop-blur-md border border-slate-700 shadow-xl">
              <button 
                onClick={handleTogglePlay}
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                  isPlaying ? 'bg-amber-500 hover:bg-amber-400' : 'bg-emerald-500 hover:bg-emerald-400'
                } text-white`}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" />
                  </svg>
                )}
              </button>
              
              <button 
                onClick={handleReset}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 transition-all text-white border border-slate-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Configuration & Data */}
        <Sidebar 
          m1={m1} setM1={setM1}
          u1={u1} setU1={setU1}
          m2={m2} setM2={setM2}
          u2={u2} setU2={setU2}
          e={e} setE={setE}
          stats={stats}
          onReset={handleReset}
        />
      </main>
    </div>
  );
};

export default App;
