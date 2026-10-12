import React, { useState } from 'react';
import { generateRandomColor } from '../utils/helpers';
import { Users, Trash2, Shuffle, Plus, RefreshCw, EyeOff, Eye } from 'lucide-react';

export default function StudentManager({ students, setStudents }) {
    const [inputText, setInputText] = useState('');

    const handleImport = () => {
        const lines = inputText.split('\n').map(line => line.trim()).filter(line => line);
        if (lines.length === 0) return;
        const currentNames = students.map(s => s.name.toLowerCase());
        const newStudents = [];
        lines.forEach(name => {
            if (!currentNames.includes(name.toLowerCase()) && !newStudents.some(s => s.name.toLowerCase() === name.toLowerCase())) {
                newStudents.push({ id: crypto.randomUUID(), name, color: generateRandomColor(), isActive: true });
            }
        });
        setStudents([...students, ...newStudents]);
        setInputText('');
    };

    const removeStudent = (id) => setStudents(students.filter(s => s.id !== id));
    const toggleActive = (id) => setStudents(students.map(s => s.id === id ? { ...s, isActive: s.isActive === false ? true : false } : s));
    const changeColor = (id, e) => setStudents(students.map(s => s.id === id ? { ...s, color: e.target.value } : s));
    const clearAll = () => window.confirm("Bạn có chắc chắn muốn xóa toàn bộ danh sách?") && setStudents([]);
    const shuffleStudents = () => setStudents([...students].sort(() => Math.random() - 0.5));

    const loadSample = () => setInputText(["Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D", "Hoàng Văn E"].join('\n'));

    const activeCount = students.filter(s => s.isActive !== false).length;

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                    <Users className="w-5 h-5" /> Quản lý danh sách (Đua: {activeCount}/{students.length})
                </h2>
                <div className="flex gap-2">
                    <button onClick={shuffleStudents} className="p-2 bg-slate-100 hover:bg-slate-200 rounded" title="Xáo trộn"><Shuffle className="w-5 h-5" /></button>
                    <button onClick={clearAll} className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded" title="Xóa tất cả"><Trash2 className="w-5 h-5" /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-600">Nhập danh sách (mỗi dòng 1 tên)</label>
                    <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} className="w-full h-48 p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-mono text-sm" placeholder="Nguyễn Văn A&#10;Trần Thị B..." />
                    <div className="flex gap-2 mt-2">
                        <button onClick={handleImport} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-bold flex justify-center items-center gap-2 transition">
                            <Plus className="w-5 h-5" /> Thêm vào danh sách
                        </button>
                        <button onClick={loadSample} className="px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded-xl font-bold flex justify-center items-center transition" title="Tải dữ liệu mẫu">
                            <RefreshCw className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="border border-slate-200 rounded-xl bg-slate-50 flex flex-col overflow-hidden h-64 md:h-auto">
                    <div className="bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700 flex justify-between">
                        <span>Tên học sinh</span>
                        <span>Trạng thái & Màu</span>
                    </div>
                    <div className="overflow-y-auto flex-grow p-2 space-y-1 custom-scrollbar">
                        {students.map((student, index) => (
                            <div key={student.id} className={`flex items-center justify-between bg-white p-2 rounded-lg border border-slate-100 shadow-sm transition ${student.isActive === false ? 'opacity-50 grayscale' : ''}`}>
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <span className="text-xs font-bold text-slate-400 w-5">{index + 1}.</span>
                                    <span className={`text-sm font-medium truncate ${student.isActive === false ? 'line-through text-slate-400' : 'text-slate-800'}`}>{student.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => toggleActive(student.id)} title={student.isActive === false ? "Đang ẩn - Bấm để cho đua" : "Đang đua - Bấm để ẩn"} className="p-1 hover:bg-slate-100 rounded">
                                        {student.isActive === false ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-green-500" />}
                                    </button>
                                    <input type="color" value={student.color} onChange={(e) => changeColor(student.id, e)} className="w-6 h-6 p-0 border-0 rounded cursor-pointer" disabled={student.isActive === false} />
                                    <button onClick={() => removeStudent(student.id)} className="text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}