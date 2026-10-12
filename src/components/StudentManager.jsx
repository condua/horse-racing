import React, { useState } from 'react';
import { generateRandomColor } from '../utils/helpers';
import { Users, Trash2, Shuffle, Plus, AlertCircle, RefreshCw } from 'lucide-react';

export default function StudentManager({ students, setStudents }) {
    const [inputText, setInputText] = useState('');
    const [error, setError] = useState('');

    const handleImport = () => {
        setError('');
        const lines = inputText.split('\n').map(line => line.trim()).filter(line => line);

        if (lines.length === 0) return;

        const currentNames = students.map(s => s.name.toLowerCase());
        const newStudents = [];
        let duplicates = 0;

        lines.forEach(name => {
            if (currentNames.includes(name.toLowerCase()) || newStudents.some(s => s.name.toLowerCase() === name.toLowerCase())) {
                duplicates++;
            } else {
                newStudents.push({
                    id: crypto.randomUUID(),
                    name,
                    color: generateRandomColor()
                });
            }
        });

        if (newStudents.length > 0) {
            setStudents([...students, ...newStudents]);
            setInputText('');
        }

        if (duplicates > 0) {
            setError(`Bỏ qua ${duplicates} tên bị trùng lặp.`);
        }
    };

    const removeStudent = (id) => {
        setStudents(students.filter(s => s.id !== id));
    };

    const clearAll = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ danh sách?")) {
            setStudents([]);
        }
    };

    const shuffleStudents = () => {
        const shuffled = [...students].sort(() => Math.random() - 0.5);
        setStudents(shuffled);
    };

    const loadSample = () => {
        const samples = ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D", "Hoàng Văn E", "Vũ Thị F", "Đặng Văn G", "Bùi Thị H", "Đỗ Văn I", "Hồ Thị K"];
        setInputText(samples.join('\n'));
    };

    const changeColor = (id, e) => {
        const newColor = e.target.value;
        setStudents(students.map(s => s.id === id ? { ...s, color: newColor } : s));
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                    <Users className="w-5 h-5" /> Quản lý danh sách ({students.length})
                </h2>
                <div className="flex gap-2">
                    <button onClick={shuffleStudents} className="p-2 text-slate-600 hover:bg-slate-100 rounded tooltip" title="Xáo trộn">
                        <Shuffle className="w-5 h-5" />
                    </button>
                    <button onClick={clearAll} className="p-2 text-red-500 hover:bg-red-50 rounded tooltip" title="Xóa tất cả">
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-600">Nhập danh sách (mỗi dòng 1 tên)</label>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="w-full h-48 p-3 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-mono text-sm"
                        placeholder="Nguyễn Văn A&#10;Trần Thị B..."
                    />
                    {error && <p className="text-amber-600 text-sm flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {error}</p>}
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={handleImport}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold flex justify-center items-center gap-2 transition"
                        >
                            <Plus className="w-4 h-4" /> Thêm vào danh sách
                        </button>
                        <button
                            onClick={loadSample}
                            className="px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded font-semibold flex justify-center items-center gap-2 transition"
                            title="Tải dữ liệu mẫu"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="border border-slate-200 rounded bg-slate-50 flex flex-col overflow-hidden h-64 md:h-auto">
                    <div className="bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 flex justify-between">
                        <span>Tên học sinh</span>
                        <span>Tùy chỉnh ngựa</span>
                    </div>
                    <div className="overflow-y-auto flex-grow p-2 space-y-1 custom-scrollbar">
                        {students.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-slate-400 italic text-sm">
                                Chưa có học sinh nào
                            </div>
                        ) : (
                            students.map((student, index) => (
                                <div key={student.id} className="flex items-center justify-between bg-white p-2 rounded border border-slate-100 shadow-sm">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <span className="text-xs font-bold text-slate-400 w-5">{index + 1}.</span>
                                        <span className="text-sm font-medium text-slate-800 truncate" title={student.name}>{student.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={student.color}
                                            onChange={(e) => changeColor(student.id, e)}
                                            className="w-6 h-6 p-0 border-0 rounded cursor-pointer"
                                        />
                                        <button onClick={() => removeStudent(student.id)} className="text-slate-400 hover:text-red-500">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}