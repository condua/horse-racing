import React from 'react';
import { HorseIcon } from '../utils/helpers';

export default function RaceTrack({ students, horseDOMRefs, isAnonymous, theme, is3D, raceState }) {
    // Styles theo Theme
    const themeStyles = {
        grass: "bg-[linear-gradient(to_bottom,#4ade80,#16a34a)] border-green-800",
        dirt: "bg-[linear-gradient(to_bottom,#d97706,#92400e)] border-amber-950",
        cyberpunk: "bg-[linear-gradient(to_bottom,#0f172a,#020617)] border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.4)]"
    };

    const laneStyles = {
        grass: "border-white/40",
        dirt: "border-yellow-900/50",
        cyberpunk: "border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
    };

    const startFinishLine = theme === 'cyberpunk' ? "bg-cyan-400 shadow-[0_0_15px_#22d3ee]" : "bg-white";

    return (
        <div className={`w-full min-w-[900px] max-w-[1400px] border-[12px] rounded-2xl relative overflow-hidden ${themeStyles[theme]} ${is3D ? 'track-3d' : 'track-2d'}`}>

            {/* Vạch Đích (Finish Line Pattern) */}
            <div className="absolute top-0 bottom-0 right-14 w-12 flex flex-col z-0 opacity-90">
                {Array.from({ length: Math.max(10, students.length * 2) }).map((_, i) => (
                    <div key={i} className="flex h-6 w-full">
                        <div className={`flex-1 ${i % 2 === 0 ? 'bg-white' : 'bg-black'}`}></div>
                        <div className={`flex-1 ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`}></div>
                    </div>
                ))}
            </div>
            <div className={`absolute top-0 bottom-0 right-14 w-2 z-0 ${theme === 'cyberpunk' ? 'bg-fuchsia-500 shadow-[0_0_20px_#d946ef]' : 'bg-red-600'}`}></div>
            <div className={`absolute top-4 right-1 text-2xl font-black tracking-widest ${theme === 'cyberpunk' ? 'text-fuchsia-500 drop-shadow-[0_0_10px_#d946ef]' : 'text-red-800'}`} style={{ writingMode: 'vertical-rl' }}>FINISH</div>

            {/* Vạch Xuất Phát (Start Line) */}
            <div className={`absolute top-0 bottom-0 left-16 w-2 z-0 ${startFinishLine}`}></div>

            {/* Các làn chạy */}
            <div className="relative z-10 flex flex-col w-full py-4">
                {students.map((student, index) => (
                    <div key={student.id} className={`relative h-[72px] border-b ${laneStyles[theme]} flex items-center w-full`}>

                        {/* Cột số thứ tự */}
                        <div className="absolute left-0 w-16 h-full bg-slate-900/80 backdrop-blur flex items-center justify-center text-white font-black text-xl border-r-4 border-black/50 z-20">
                            {index + 1}
                        </div>

                        {/* Container di chuyển (2D Plane) */}
                        <div
                            ref={el => horseDOMRefs.current[student.id] = el}
                            className="absolute left-0 flex items-center transition-none will-change-transform z-30"
                            style={{ transform: 'translateX(0%)' }}
                        >
                            {/* Vùng chứa bẻ góc 3D & Animation phi ngựa */}
                            <div className={`ml-16 relative flex items-center justify-center ${is3D ? 'horse-3d' : 'horse-2d'}`}>

                                {/* Khói bụi (Chỉ hiện khi đang đua) */}
                                {raceState === 'racing' && (
                                    <div className="absolute -left-6 bottom-2 w-6 h-6 bg-white/40 rounded-full blur-md dust-particle"></div>
                                )}

                                <div className={`flex flex-col items-center ${raceState === 'racing' ? 'animate-gallop' : ''}`}>
                                    {/* Bảng tên bay phía trên ngựa */}
                                    <div className={`mb-1 px-3 py-1 rounded-lg font-bold text-sm whitespace-nowrap shadow-xl border-2 ${theme === 'cyberpunk' ? 'bg-slate-900 text-cyan-400 border-cyan-500' : 'bg-white text-slate-800 border-slate-300'}`}>
                                        {isAnonymous ? `Ngựa số ${index + 1}` : student.name}
                                    </div>

                                    {/* Icon Ngựa 3D */}
                                    <HorseIcon color={student.color} className="w-14 h-14" />
                                </div>

                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}