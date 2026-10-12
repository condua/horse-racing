import React from 'react';
import { HorseIcon } from '../utils/helpers';
import { EyeOff } from 'lucide-react';

export default function RaceTrack({ students, horseDOMRefs, isAnonymous, theme, is3D, raceState, hideFinished, showNames, rankings, hiddenLanes, onHideLane }) {

    const themeStyles = {
        grass: "bg-[linear-gradient(to_bottom,#22c55e,#15803d)] border-[#14532d] track-depth-grass",
        dirt: "bg-[linear-gradient(to_bottom,#d97706,#b45309)] border-[#451a03] track-depth-dirt",
        cyberpunk: "bg-[linear-gradient(to_bottom,#0f172a,#020617)] border-cyan-400 track-depth-cyberpunk",
        galaxy: "bg-[linear-gradient(to_bottom,#1e1b4b,#312e81)] border-purple-500 track-depth-galaxy",
        ocean: "bg-[linear-gradient(to_bottom,#083344,#0e7490)] border-cyan-300 track-depth-ocean",
        lava: "bg-[linear-gradient(to_bottom,#7f1d1d,#b91c1c)] border-orange-500 track-depth-lava"
    };

    const laneStyles = {
        grass: "border-white/30 border-dashed",
        dirt: "border-[#78350f]/60 border-dashed",
        cyberpunk: "border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]",
        galaxy: "border-purple-400/40 border-dotted shadow-[0_0_15px_rgba(168,85,247,0.2)]",
        ocean: "border-cyan-200/40 border-dashed shadow-[0_0_10px_rgba(34,211,238,0.2)]",
        lava: "border-orange-400/50 shadow-[0_0_15px_rgba(249,115,22,0.4)]"
    };

    return (
        <div className={`w-full min-w-[900px] max-w-[1300px] border-[6px] relative overflow-hidden ${themeStyles[theme]} ${is3D ? 'track-3d' : 'track-2d'}`}>
            {/* CỘT MỐC ĐÍCH */}
            <div className="absolute top-0 bottom-0 right-[60px] w-12 flex flex-col z-0 opacity-80 mix-blend-overlay">
                {Array.from({ length: Math.max(10, students.length * 2) }).map((_, i) => (
                    <div key={i} className="flex h-6 w-full">
                        <div className={`flex-1 ${i % 2 === 0 ? 'bg-white' : 'bg-black'}`}></div>
                        <div className={`flex-1 ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`}></div>
                    </div>
                ))}
            </div>
            <div className={`absolute top-0 bottom-0 right-[60px] w-2 z-0 shadow-[0_0_15px_currentColor] ${['cyberpunk', 'galaxy'].includes(theme) ? 'bg-fuchsia-500 text-fuchsia-500' : 'bg-red-500 text-red-500'}`}></div>
            <div className="absolute top-0 bottom-0 left-[80px] w-1.5 bg-white/80 shadow-[0_0_8px_#fff] z-0"></div>

            {/* CÁC LÀN CHẠY - Đã thêm pt-12 để tạo khoảng trống an toàn cho bảng tên làn số 1 */}
            <div className="relative z-10 flex flex-col w-full pt-12 pb-2">
                {students.map((student, index) => {
                    const hasFinished = rankings.includes(student.id);
                    const isManuallyHidden = hiddenLanes.includes(student.id);
                    const isAutoHidden = hideFinished && hasFinished;
                    const shouldCollapse = isManuallyHidden || isAutoHidden;

                    return (
                        // SỬA LỖI BỊ CHE: Đổi thành overflow-visible (khi đua) và chỉ overflow-hidden (khi bị ẩn)
                        <div key={student.id} className={`relative border-b-[2px] ${laneStyles[theme]} flex items-center w-full transition-all duration-700 ease-in-out ${shouldCollapse ? 'h-0 opacity-0 !border-transparent overflow-hidden' : 'h-[85px] opacity-100 overflow-visible z-10'}`}>

                            <div
                                onClick={() => !shouldCollapse && onHideLane(student.id)}
                                className="absolute left-0 w-14 h-[75%] my-auto bg-slate-900/90 rounded-r-lg flex items-center justify-center text-white font-black text-xl border-y-2 border-r-2 border-white/20 shadow-[3px_3px_10px_rgba(0,0,0,0.5)] z-40 cursor-pointer group hover:bg-red-600 transition-colors"
                                title="Ẩn ngựa này"
                            >
                                <span className="group-hover:hidden">{index + 1}</span>
                                <EyeOff className="w-6 h-6 hidden group-hover:block text-white" />
                            </div>

                            <div
                                ref={el => horseDOMRefs.current[student.id] = el}
                                className="absolute left-0 flex items-end transition-none will-change-transform z-30 h-full pb-2"
                                style={{ transform: 'translateX(0%)' }}
                            >
                                <div className={`ml-16 relative flex flex-col items-center justify-end ${is3D ? 'horse-3d' : 'horse-2d'}`}>
                                    {/* BẢNG TÊN HIỂN THỊ */}
                                    {showNames && (
                                        // Căn chỉnh lại tọa độ -top-12 và thêm max-w-[160px] truncate để cắt gọn tên nếu quá dài
                                        <div className={`absolute -top-12 px-3 py-1.5 rounded-lg font-bold text-sm shadow-[0_5px_15px_rgba(0,0,0,0.5)] border z-50 transition-all max-w-[160px] truncate ${['cyberpunk', 'galaxy', 'lava'].includes(theme) ? 'bg-slate-900/90 text-cyan-300 border-cyan-500 backdrop-blur-sm' : 'bg-white/95 text-slate-800 border-slate-300 backdrop-blur-sm'}`} title={isAnonymous ? `Ngựa số ${index + 1}` : student.name}>
                                            {isAnonymous ? `Ngựa số ${index + 1}` : student.name}
                                        </div>
                                    )}
                                    <div className={`${raceState === 'racing' && !hasFinished ? 'animate-gallop-realistic' : ''}`}>
                                        <HorseIcon color={student.color} className="w-[85px] h-[85px]" isRacing={raceState === 'racing' && !hasFinished} theme={theme} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}