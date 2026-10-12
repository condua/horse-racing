import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Medal, RotateCcw, ArrowLeft } from 'lucide-react';
import { HorseIcon } from '../utils/helpers';

export default function RaceResults({ students, rankings, isAnonymous, onPlayAgain, onBack }) {

    useEffect(() => {
        // Kích hoạt pháo giấy khi hiện kết quả
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    }, []);

    // Map ranking IDs to student objects & preserve original track index for Anonymous mode
    const rankedStudents = rankings.map(id => {
        const originalIndex = students.findIndex(s => s.id === id);
        return {
            ...students[originalIndex],
            trackNumber: originalIndex + 1
        };
    });

    const top3 = rankedStudents.slice(0, 3);
    const others = rankedStudents.slice(3);

    return (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-[fadeIn_0.3s_ease-out]">

                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center text-white relative">
                    <Trophy className="w-16 h-16 mx-auto mb-2 text-yellow-300" />
                    <h2 className="text-3xl font-black uppercase tracking-wider">Kết quả chung cuộc</h2>
                </div>

                <div className="flex-grow overflow-y-auto p-6 bg-slate-50">
                    {/* Podium for Top 3 */}
                    <div className="flex justify-center items-end gap-4 mb-10 h-48 mt-4">
                        {/* 2nd Place */}
                        {top3[1] && (
                            <div className="flex flex-col items-center">
                                <HorseIcon color={top3[1].color} className="w-12 h-12 mb-2 drop-shadow" />
                                <div className="font-bold text-slate-800 mb-1 max-w-[120px] truncate text-center">
                                    {isAnonymous ? `Ngựa số ${top3[1].trackNumber}` : top3[1].name}
                                </div>
                                <div className="w-24 h-24 bg-slate-300 rounded-t-lg border-2 border-slate-400 flex items-center justify-center shadow-inner relative">
                                    <span className="text-4xl font-black text-slate-500">2</span>
                                    <Medal className="w-6 h-6 text-slate-500 absolute -top-3" />
                                </div>
                            </div>
                        )}

                        {/* 1st Place */}
                        {top3[0] && (
                            <div className="flex flex-col items-center">
                                <HorseIcon color={top3[0].color} className="w-16 h-16 mb-2 drop-shadow-lg" />
                                <div className="font-bold text-indigo-700 text-lg mb-1 max-w-[140px] truncate text-center">
                                    {isAnonymous ? `Ngựa số ${top3[0].trackNumber}` : top3[0].name}
                                </div>
                                <div className="w-28 h-32 bg-yellow-400 rounded-t-lg border-2 border-yellow-500 flex items-center justify-center shadow-inner relative">
                                    <span className="text-5xl font-black text-yellow-600">1</span>
                                    <Medal className="w-8 h-8 text-yellow-100 absolute -top-4 drop-shadow" />
                                </div>
                            </div>
                        )}

                        {/* 3rd Place */}
                        {top3[2] && (
                            <div className="flex flex-col items-center">
                                <HorseIcon color={top3[2].color} className="w-10 h-10 mb-2 drop-shadow" />
                                <div className="font-bold text-slate-800 mb-1 max-w-[120px] truncate text-center">
                                    {isAnonymous ? `Ngựa số ${top3[2].trackNumber}` : top3[2].name}
                                </div>
                                <div className="w-24 h-20 bg-amber-600 rounded-t-lg border-2 border-amber-700 flex items-center justify-center shadow-inner relative">
                                    <span className="text-4xl font-black text-amber-800">3</span>
                                    <Medal className="w-6 h-6 text-amber-200 absolute -top-3" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Rest of the leaderboard */}
                    {others.length > 0 && (
                        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-4 py-3 bg-slate-100 border-b border-slate-200 font-bold text-slate-700">
                                Bảng xếp hạng chi tiết
                            </div>
                            <div className="divide-y divide-slate-100">
                                {others.map((student, idx) => (
                                    <div key={student.id} className="flex items-center px-4 py-3 hover:bg-slate-50 transition">
                                        <div className="w-8 font-bold text-slate-400">{idx + 4}.</div>
                                        <HorseIcon color={student.color} className="w-8 h-8 mx-3" />
                                        <div className="font-medium text-slate-800">
                                            {isAnonymous ? `Ngựa số ${student.trackNumber}` : student.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-center gap-4">
                    <button
                        onClick={onPlayAgain}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition transform hover:scale-105"
                    >
                        <RotateCcw className="w-5 h-5" /> Đua lại danh sách này
                    </button>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-6 py-3 rounded-xl font-bold shadow-sm transition"
                    >
                        <ArrowLeft className="w-5 h-5" /> Về trang thiết lập
                    </button>
                </div>
            </div>
        </div>
    );
}