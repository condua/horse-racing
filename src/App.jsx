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
  });

  // Trạng thái: 'setup' | 'racing'
  const [appState, setAppState] = useState('setup');

  const startRace = () => {
    if (students.length === 0) {
      alert("Vui lòng thêm ít nhất 1 học sinh để bắt đầu!");
      return;
    }
    setAppState('racing');
  };

  const backToSetup = () => {
    setAppState('setup');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <header className="bg-indigo-700 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <h1 className="text-2xl font-bold tracking-tight">MLPA Horse Racing</h1>
        </div>
        {appState === 'racing' && (
          <button
            onClick={backToSetup}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-800 rounded text-sm font-semibold transition-colors"
          >
            Quay lại Setup
          </button>
        )}
      </header>

      <main className="flex-grow flex flex-col relative">
        {appState === 'setup' ? (
          <GameSetup
            students={students}
            setStudents={setStudents}
            config={config}
            setConfig={setConfig}
            onStart={startRace}
          />
        ) : (
          <RaceArena
            students={students}
            config={config}
            onBack={backToSetup}
          />
        )}
      </main>
    </div>
  );
}