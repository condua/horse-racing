import React from 'react';
import { Play, Pause, RotateCcw, Maximize, Eye, EyeOff, Timer } from 'lucide-react';

export default function RaceControls({ raceState, timeLeft, onStart, onPause, onResume, onReset, isAnonymous, onToggleAnonymous, onFullscreen }) {

    // Format time
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const timeString = `${mins}:${secs.toString().padStart(2, '0')}`;

    return (
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg font-mono text-2xl font-bold text-yellow-400 border border-slate-600">
                    <Timer className="w-6 h-6 text-slate-400" />
                    {timeString}
                </div>

                <div className="flex gap-2">
                    {raceState === 'ready' && (
                        <button onClick={onStart} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-bold transition">
                            <Play className="w-5 h-5 fill-current" /> Bắt đầu
                        </button>
                    )}

                    {raceState === 'racing' && (
                        <button onClick={onPause} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 px-6 py-2 rounded-lg font-bold transition">
                            <Pause className="w-5 h-5 fill-current" /> Tạm dừng
                        </button>
                    )}

                    {raceState === 'paused' && (
                        <button onClick={onResume} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-bold transition">
                            <Play className="w-5 h-5 fill-current" /> Tiếp tục
                        </button>
                    )}

                    {(raceState === 'paused' || raceState === 'finished') && (
                        <button onClick={onReset} className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 px-4 py-2 rounded-lg font-bold transition">
                            <RotateCcw className="w-5 h-5" /> Chơi lại
                        </button>
                    )}
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={onToggleAnonymous}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${isAnonymous ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                    {isAnonymous ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    {isAnonymous ? 'Đang ẩn tên' : 'Hiện tên'}
                </button>

                <button onClick={onFullscreen} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition" title="Toàn màn hình">
                    <Maximize className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}