import React, { useState, useEffect, useRef, useCallback } from 'react';
import RaceTrack from './RaceTrack';
import RaceControls from './RaceControls';
import RaceResults from './RaceResults';

// Trạng thái cuộc đua: 'ready' | 'racing' | 'paused' | 'finished'
export default function RaceArena({ students, config, onBack }) {
    const [raceState, setRaceState] = useState('ready');
    const [timeLeft, setTimeLeft] = useState(config.duration);
    const [rankings, setRankings] = useState([]);
    const [isAnonymous, setIsAnonymous] = useState(config.anonymousMode);

    // Lưu trữ logic animation bên ngoài React State để tối ưu hiệu suất
    const animationRef = useRef(null);
    const lastTimeRef = useRef(null);

    // Lưu tọa độ X (0 - 100%) và tốc độ hiện tại của mỗi ngựa
    const horseDataRef = useRef({});
    const horseDOMRefs = useRef({}); // Refs tới element DOM để update trực tiếp

    // Khởi tạo dữ liệu ngựa
    useEffect(() => {
        const initialData = {};
        students.forEach(student => {
            initialData[student.id] = {
                pos: 0,
                speed: 0,
                finished: false,
                finishTime: 0
            };
        });
        horseDataRef.current = initialData;
        setTimeLeft(config.duration);
        setRankings([]);
        setRaceState('ready');
    }, [students, config.duration]);

    // Sync anonymous mode if changed from Setup
    useEffect(() => {
        setIsAnonymous(config.anonymousMode);
    }, [config.anonymousMode]);

    // Vòng lặp Game (chạy ~60fps)
    const animate = useCallback((time) => {
        if (!lastTimeRef.current) lastTimeRef.current = time;
        const deltaTime = (time - lastTimeRef.current) / 1000; // Giây
        lastTimeRef.current = time;

        let allFinished = true;
        const newRankings = [];

        // Tính toán lại vị trí
        students.forEach(student => {
            const data = horseDataRef.current[student.id];
            if (data.finished) return;

            allFinished = false;

            // Logic tốc độ ngẫu nhiên
            // Base speed để đảm bảo đến đích trong khoảng thời gian config
            const baseSpeed = 100 / config.duration;
            // Thay đổi tốc độ liên tục để tạo sự kịch tính
            if (Math.random() < 0.05 || data.speed === 0) {
                // Tốc độ có thể từ 0.5x đến 1.8x baseSpeed
                data.speed = baseSpeed * (0.5 + Math.random() * 1.3);
            }

            data.pos += data.speed * deltaTime;

            // Cập nhật DOM trực tiếp (Tối ưu hiệu suất)
            const domEl = horseDOMRefs.current[student.id];
            if (domEl) {
                // Giới hạn max là 100%
                const displayPos = Math.min(data.pos, 100);
                // Translate X: left property hoặc transform. Dùng left theo % cho dễ
                domEl.style.left = `calc(${displayPos}% - ${displayPos === 100 ? 40 : (displayPos * 0.4)}px)`;
            }

            // Kiểm tra cán đích
            if (data.pos >= 100) {
                data.pos = 100;
                data.finished = true;
                data.finishTime = Date.now();
                newRankings.push(student.id);
            }
        });

        if (newRankings.length > 0) {
            setRankings(prev => {
                const updated = [...prev, ...newRankings];
                // Nếu tất cả đã xong, kết thúc
                if (updated.length === students.length) {
                    setRaceState('finished');
                }
                return updated;
            });
        }

        if (!allFinished) {
            animationRef.current = requestAnimationFrame(animate);
        }
    }, [students, config.duration]);

    // Quản lý đếm ngược thời gian
    useEffect(() => {
        let timer;
        if (raceState === 'racing' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (timeLeft === 0 && raceState === 'racing') {
            // Hết giờ
            handleTimeUp();
        }
        return () => clearInterval(timer);
    }, [raceState, timeLeft]);

    const handleTimeUp = () => {
        cancelAnimationFrame(animationRef.current);

        // Thu thập những người chưa hoàn thành, xếp hạng theo quãng đường
        const unfinished = students
            .filter(s => !horseDataRef.current[s.id].finished)
            .sort((a, b) => horseDataRef.current[b.id].pos - horseDataRef.current[a.id].pos)
            .map(s => s.id);

        setRankings(prev => [...prev, ...unfinished]);
        setRaceState('finished');
    };

    // Điều khiển cuộc đua
    const startRace = () => {
        if (raceState === 'ready') {
            // Xáo trộn lane trước khi bắt đầu
        }
        setRaceState('racing');
        lastTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(animate);
    };

    const pauseRace = () => {
        setRaceState('paused');
        cancelAnimationFrame(animationRef.current);
        lastTimeRef.current = null;
    };

    const resumeRace = () => {
        setRaceState('racing');
        lastTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(animate);
    };

    const resetRace = () => {
        cancelAnimationFrame(animationRef.current);
        lastTimeRef.current = null;

        // Reset data
        students.forEach(student => {
            horseDataRef.current[student.id] = { pos: 0, speed: 0, finished: false, finishTime: 0 };
            const domEl = horseDOMRefs.current[student.id];
            if (domEl) domEl.style.left = '0%';
        });

        setTimeLeft(config.duration);
        setRankings([]);
        setRaceState('ready');
    };

    // Cleanup
    useEffect(() => {
        return () => cancelAnimationFrame(animationRef.current);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.warn(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <div className="flex-grow flex flex-col bg-green-800 relative overflow-hidden">

            {/* Track Area */}
            <div className="flex-grow overflow-y-auto custom-scrollbar relative p-4 pb-24">
                <RaceTrack
                    students={students}
                    horseDOMRefs={horseDOMRefs}
                    isAnonymous={isAnonymous}
                />
            </div>

            {/* Control Panel (Fixed Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur text-white p-4 border-t border-slate-700 z-10">
                <RaceControls
                    raceState={raceState}
                    timeLeft={timeLeft}
                    onStart={startRace}
                    onPause={pauseRace}
                    onResume={resumeRace}
                    onReset={resetRace}
                    isAnonymous={isAnonymous}
                    onToggleAnonymous={() => setIsAnonymous(!isAnonymous)}
                    onFullscreen={toggleFullscreen}
                />
            </div>

            {/* Results Modal */}
            {raceState === 'finished' && (
                <RaceResults
                    students={students}
                    rankings={rankings}
                    isAnonymous={isAnonymous}
                    onPlayAgain={resetRace}
                    onBack={onBack}
                />
            )}
        </div>
    );
}