import React from 'react';
import { Play, Pause, RotateCcw, Maximize, Eye, EyeOff, Timer, Box } from 'lucide-react';

export default function RaceControls({ raceState, timeLeft, onStart, onPause, onResume, onReset, isAnonymous, onToggleAnonymous, is3D, onToggle3D }) {

    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const timeString = `${mins}:${secs.toString().padStart(2, '0')}`;

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => { });
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 bg-slate-950 px-5 py-2 rounded-xl font-mono text-3xl font-black text-cyan-400 border-2 border-cyan-800 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <Timer className="w-7 h-7 text-cyan-600" />
                    {timeString}
                </div>

                <div className="flex gap-3">
                    {raceState === 'ready' && (
                        <button onClick={onStart} className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition transform hover:scale-105 active:scale-95">
                            <Play className="w-6 h-6 fill-current" /> Bắt đầu
                        </button>
                    )}

                    {raceState === 'racing' && (
                        <button onClick={onPause} className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition transform hover:scale-105 active:scale-95">
                            <Pause className="w-6 h-6 fill-current" /> Tạm dừng
                        </button>
                    )}

                    {raceState === 'paused' && (
                        <button onClick={onResume} className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition transform hover:scale-105 active:scale-95">
                            <Play className="w-6 h-6 fill-current" /> Tiếp tục
                        </button>
                    )}

                    {(raceState === 'paused' || raceState === 'finished') && (
                        <button onClick={onReset} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-bold text-lg shadow-lg transition">
                            <RotateCcw className="w-6 h-6" /> Chơi lại
                        </button>
                    )}
                </div>
            </div>

            <div className="flex gap-4">
                {/* Nút Toggle Góc nhìn 3D */}
                <button
                    onClick={onToggle3D}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition ${is3D ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_10px_rgba(147,51,234,0.5)]' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
                >
                    <Box className="w-5 h-5" />
                    {is3D ? '3D: Bật' : '3D: Tắt'}
                </button>

                {/* Nút Ẩn Danh */}
                <button
                    onClick={onToggleAnonymous}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition ${isAnonymous ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                    {isAnonymous ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    {isAnonymous ? 'Ẩn tên' : 'Hiện tên'}
                </button>

                <button onClick={toggleFullscreen} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition" title="Toàn màn hình">
                    <Maximize className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}