import React from 'react';
import StudentManager from './StudentManager';
import { Settings, Play, Eye, EyeOff, Volume2, VolumeX, Clock } from 'lucide-react';

export default function GameSetup({ students, setStudents, config, setConfig, onStart }) {
    const handleDurationChange = (e) => {
        setConfig({ ...config, duration: parseInt(e.target.value) });
    };

    const toggleAnonymous = () => {
        setConfig({ ...config, anonymousMode: !config.anonymousMode });
    };

    const toggleSound = () => {
        setConfig({ ...config, soundEnabled: !config.soundEnabled });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <StudentManager students={students} setStudents={setStudents} />
            </div>

            <div className="flex flex-col gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
                        <Settings className="w-5 h-5" /> Cài đặt cuộc đua
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
                                <Clock className="w-4 h-4" /> Thời gian đua (Giây)
                            </label>
                            <select
                                value={config.duration}
                                onChange={handleDurationChange}
                                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                                <option value="15">15 Giây</option>
                                <option value="30">30 Giây</option>
                                <option value="45">45 Giây</option>
                                <option value="60">60 Giây (1 Phút)</option>
                                <option value="90">90 Giây (1.5 Phút)</option>
                                <option value="120">120 Giây (2 Phút)</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100">
                            <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                {config.anonymousMode ? <EyeOff className="w-4 h-4 text-red-500" /> : <Eye className="w-4 h-4 text-green-500" />}
                                Chế độ ẩn danh
                            </span>
                            <button
                                onClick={toggleAnonymous}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.anonymousMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.anonymousMode ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100">
                            <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                {config.soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                                Âm thanh
                            </span>
                            <button
                                onClick={toggleSound}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.soundEnabled ? 'bg-indigo-600' : 'bg-slate-300'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.soundEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>

                        <p className="text-xs text-slate-500 italic">
                            Lưu ý: Bạn có thể bật/tắt chế độ ẩn danh ngay cả khi đang đua hoặc sau khi có kết quả.
                        </p>
                    </div>
                </div>

                <button
                    onClick={onStart}
                    className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 text-xl font-bold transition-all transform hover:scale-105"
                >
                    <Play className="w-6 h-6 fill-current" /> BẮT ĐẦU ĐUA
                </button>
            </div>
        </div>
    );
}