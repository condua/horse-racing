import React from 'react';
import { Play, Pause, RotateCcw, Maximize, Eye, EyeOff, Timer, Box, Ghost, Undo2, Type } from 'lucide-react';

export default function RaceControls({ raceState, timeLeft, onStart, onPause, onResume, onReset, isAnonymous, onToggleAnonymous, is3D, onToggle3D, hideFinished, onToggleHideFinished, hiddenLanesCount, onUnhideAll, showNames, onToggleNames }) {

    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const timeString = `${mins}:${secs.toString().padStart(2, '0')}`;

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => { });
        else document.exitFullscreen();
    };

    return (
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 bg-slate-950 px-5 py-2 rounded-xl font-mono text-3xl font-black text-cyan-400 border-2 border-cyan-800 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <Timer className="w-7 h-7 text-cyan-600" />
                    {timeString}
                </div>

                <div className="flex gap-3">
                    {raceState === 'ready' && <button onClick={onStart} className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105"><Play className="w-6 h-6 fill-current" /> Bắt đầu</button>}
                    {raceState === 'racing' && <button onClick={onPause} className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105"><Pause className="w-6 h-6 fill-current" /> Tạm dừng</button>}
                    {raceState === 'paused' && <button onClick={onResume} className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105"><Play className="w-6 h-6 fill-current" /> Tiếp tục</button>}
                    {(raceState === 'paused' || raceState === 'finished') && <button onClick={onReset} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-xl font-bold text-lg shadow-lg"><RotateCcw className="w-5 h-5" /> Chơi lại</button>}
                </div>
            </div>

            <div className="flex gap-4">
                {hiddenLanesCount > 0 && (
                    <button onClick={onUnhideAll} className="flex items-center gap-2 px-4 py-3 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-pulse">
                        <Undo2 className="w-5 h-5" /> Hiện lại ({hiddenLanesCount})
                    </button>
                )}

                {/* NÚT TẮT / HIỆN TÊN TRONG TRẬN */}
                <button onClick={onToggleNames} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition ${showNames ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`} title="Tắt / Hiện bảng tên trên đầu ngựa">
                    <Type className="w-5 h-5" /> {showNames ? 'Tên: Hiện' : 'Tên: Tắt'}
                </button>

                <button onClick={onToggleHideFinished} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition ${hideFinished ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                    <Ghost className="w-5 h-5" /> {hideFinished ? 'Đang ẩn đích' : 'Hiện cả đích'}
                </button>

                <button onClick={onToggle3D} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition ${is3D ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.5)]' : 'bg-slate-800 text-slate-300'}`}>
                    <Box className="w-5 h-5" /> {is3D ? '3D' : '2D'}
                </button>

                <button onClick={onToggleAnonymous} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition ${isAnonymous ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`} title="Ẩn danh học sinh">
                    {isAnonymous ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>

                <button onClick={toggleFullscreen} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition text-white">
                    <Maximize className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}