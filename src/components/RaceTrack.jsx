import React from 'react';
import { HorseIcon } from '../utils/helpers';

export default function RaceTrack({ students, horseDOMRefs, isAnonymous }) {
    return (
        <div className="w-full min-w-[800px] border-4 border-white/20 rounded-lg relative bg-[#4ade80] overflow-hidden shadow-2xl">
            {/* Finish Line Pattern */}
            <div className="absolute top-0 bottom-0 right-10 w-8 flex flex-col z-0 opacity-80">
                {Array.from({ length: Math.max(10, students.length * 2) }).map((_, i) => (
                    <div key={i} className="flex h-4 w-full">
                        <div className={`flex-1 ${i % 2 === 0 ? 'bg-white' : 'bg-black'}`}></div>
                        <div className={`flex-1 ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`}></div>
                    </div>
                ))}
            </div>
            <div className="absolute top-0 bottom-0 right-10 w-1 bg-red-600 z-0"></div>
            <div className="absolute top-2 right-12 text-red-700 font-black text-xl tracking-widest" style={{ writingMode: 'vertical-rl' }}>FINISH</div>

            {/* Start Line */}
            <div className="absolute top-0 bottom-0 left-12 w-1 bg-white z-0 opacity-50"></div>

            {/* Lanes */}
            <div className="relative z-10 flex flex-col w-full py-2">
                {students.map((student, index) => (
                    <div key={student.id} className="relative h-14 border-b border-white/30 flex items-center w-full group">

                        {/* Start block / Label */}
                        <div className="absolute left-0 w-12 h-full bg-slate-800 flex items-center justify-center text-white font-bold border-r-2 border-slate-900 z-20">
                            {index + 1}
                        </div>

                        {/* The Horse & Name Plate */}
                        <div
                            ref={el => horseDOMRefs.current[student.id] = el}
                            className="absolute left-0 flex items-center transition-none will-change-transform z-10"
                            style={{ transform: 'translateX(0%)' }} // Controlled by JS
                        >
                            <div className="ml-12 relative flex items-center">
                                <HorseIcon color={student.color} className="w-10 h-10 drop-shadow-md" />
                                <div className="ml-2 bg-white/90 px-2 py-0.5 rounded shadow text-xs font-bold whitespace-nowrap border border-slate-200">
                                    {isAnonymous ? `Ngựa số ${index + 1}` : student.name}
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}