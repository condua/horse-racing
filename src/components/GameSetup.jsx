import React from 'react';
import StudentManager from './StudentManager';
import { Settings, Play, Eye, EyeOff, Clock, Image as ImageIcon, Box, Ghost, Type } from 'lucide-react';

export default function GameSetup({ students, setStudents, config, setConfig, onStart }) {
    return (
        <div className="p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <StudentManager students={students} setStudents={setStudents} />
            </div>

            <div className="flex flex-col gap-6">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                    <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-slate-800">
                        <Settings className="w-6 h-6 text-indigo-600" /> Cài đặt Game
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                <Clock className="w-4 h-4 text-blue-500" /> Thời gian đua (Giây)
                            </label>
                            <select value={config.duration} onChange={(e) => setConfig({ ...config, duration: parseInt(e.target.value) })} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option value="15">15 Giây (Siêu tốc)</option>
                                <option value="30">30 Giây</option>
                                <option value="60">60 Giây</option>
                                <option value="120">120 Giây</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                <ImageIcon className="w-4 h-4 text-emerald-500" /> Môi trường đua
                            </label>
                            <select value={config.trackTheme} onChange={(e) => setConfig({ ...config, trackTheme: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option value="grass">Sân Cỏ (Grass Stadium)</option>
                                <option value="dirt">Đường Đất (Dirt Track)</option>
                                <option value="cyberpunk">Không Gian Ảo (Neon Cyberpunk)</option>
                                <option value="galaxy">Dải Ngân Hà (Galaxy Nebula)</option>
                                <option value="ocean">Đáy Biển (Deep Ocean)</option>
                                <option value="lava">Núi Lửa (Lava Core)</option>
                            </select>
                        </div>
                        <hr className="border-slate-100" />
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-700 flex items-center gap-2"><Box className="w-4 h-4 text-purple-500" /> Góc nhìn 3D</span>
                            <button onClick={() => setConfig({ ...config, view3D: !config.view3D })} className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${config.view3D ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${config.view3D ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Type className="w-4 h-4 text-blue-500" /> Hiện tên bảng điều khiển
                            </span>
                            <button onClick={() => setConfig({ ...config, showNames: !config.showNames })} className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${config.showNames ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${config.showNames ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                {config.anonymousMode ? <EyeOff className="w-4 h-4 text-red-500" /> : <Eye className="w-4 h-4 text-green-500" />} Ẩn tên (Ẩn danh)
                            </span>
                            <button onClick={() => setConfig({ ...config, anonymousMode: !config.anonymousMode })} className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${config.anonymousMode ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${config.anonymousMode ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>
                <button onClick={onStart} className="w-full py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl shadow-[0_10px_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 text-2xl font-black uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95">
                    <Play className="w-8 h-8 fill-current" /> BẮT ĐẦU
                </button>
            </div>
        </div>
    );
}