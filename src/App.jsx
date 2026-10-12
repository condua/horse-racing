import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import GameSetup from './components/GameSetup';
import RaceArena from './components/RaceArena';
import { Trophy } from 'lucide-react';

export default function App() {
  const [students, setStudents] = useLocalStorage('mlpa_students', []);
  const [config, setConfig] = useLocalStorage('mlpa_config', {
    duration: 30,
    anonymousMode: false,
    soundEnabled: true,
    trackTheme: 'grass', // 'grass' | 'dirt' | 'cyberpunk'
    view3D: true,        // Chế độ 3D mặc định
  });

  const [appState, setAppState] = useState('setup');

  const startRace = () => {
    if (students.length === 0) {
      alert("Vui lòng thêm ít nhất 1 học sinh để bắt đầu!");
      return;
    }
    setAppState('racing');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <header className="bg-indigo-900 text-white p-4 shadow-xl flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
          <h1 className="text-2xl font-black tracking-tight uppercase">MLPA 3D Racing</h1>
        </div>
        {appState === 'racing' && (
          <button onClick={() => setAppState('setup')} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold shadow-lg transition-colors">
            Quay lại Setup
          </button>
        )}
      </header>
      <main className="flex-grow flex flex-col relative">
        {appState === 'setup' ? (
          <GameSetup students={students} setStudents={setStudents} config={config} setConfig={setConfig} onStart={startRace} />
        ) : (
          <RaceArena students={students} config={config} setConfig={setConfig} onBack={() => setAppState('setup')} />
        )}
      </main>
    </div>
  );
}