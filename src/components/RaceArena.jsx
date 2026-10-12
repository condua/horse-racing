import React, { useState, useEffect, useRef, useCallback } from 'react';
import RaceTrack from './RaceTrack';
import RaceControls from './RaceControls';
import RaceResults from './RaceResults';

export default function RaceArena({ students, config, setConfig, onBack, onDisableStudent }) {
    const [raceState, setRaceState] = useState('ready');
    const [timeLeft, setTimeLeft] = useState(config.duration);
    const [rankings, setRankings] = useState([]);
    const [isAnonymous, setIsAnonymous] = useState(config.anonymousMode);
    const [hiddenLanes, setHiddenLanes] = useState([]);

    const animationRef = useRef(null);
    const lastTimeRef = useRef(null);
    const horseDataRef = useRef({});
    const horseDOMRefs = useRef({});

    useEffect(() => {
        cancelAnimationFrame(animationRef.current);
        lastTimeRef.current = null;

        const initialData = {};
        students.forEach(student => {
            initialData[student.id] = { pos: 0, speed: 0, finished: false, finishTime: 0 };
            const domEl = horseDOMRefs.current[student.id];
            if (domEl) domEl.style.left = '0%';
        });
        horseDataRef.current = initialData;
        setTimeLeft(config.duration);
        setRankings([]);
        setHiddenLanes([]);
        setRaceState('ready');
    }, [students, config.duration]);

    const animate = useCallback((time) => {
        if (!lastTimeRef.current) lastTimeRef.current = time;
        const deltaTime = (time - lastTimeRef.current) / 1000;
        lastTimeRef.current = time;

        let allFinished = true;
        const newRankings = [];

        students.forEach(student => {
            const data = horseDataRef.current[student.id];
            if (data.finished) return;
            allFinished = false;

            const baseSpeed = 100 / config.duration;
            if (Math.random() < 0.05 || data.speed === 0) data.speed = baseSpeed * (0.6 + Math.random() * 1.4);

            data.pos += data.speed * deltaTime;
            const domEl = horseDOMRefs.current[student.id];
            if (domEl) {
                const displayPos = Math.min(data.pos, 100);
                domEl.style.left = `calc(${displayPos}% - ${displayPos === 100 ? 40 : (displayPos * 0.5)}px)`;
            }

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
                if (updated.length === students.length) setRaceState('finished');
                return updated;
            });
        }

        if (!allFinished) animationRef.current = requestAnimationFrame(animate);
    }, [students, config.duration]);

    useEffect(() => {
        let timer;
        if (raceState === 'racing' && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev <= 1 ? 0 : prev - 1), 1000);
        } else if (timeLeft === 0 && raceState === 'racing') {
            handleTimeUp();
        }
        return () => clearInterval(timer);
    }, [raceState, timeLeft]);

    const handleTimeUp = () => {
        cancelAnimationFrame(animationRef.current);
        const unfinished = students.filter(s => !horseDataRef.current[s.id].finished).sort((a, b) => horseDataRef.current[b.id].pos - horseDataRef.current[a.id].pos).map(s => s.id);
        setRankings(prev => [...prev, ...unfinished]);
        setRaceState('finished');
    };

    const startRace = () => { setRaceState('racing'); lastTimeRef.current = performance.now(); animationRef.current = requestAnimationFrame(animate); };
    const pauseRace = () => { setRaceState('paused'); cancelAnimationFrame(animationRef.current); lastTimeRef.current = null; };
    const resumeRace = () => { setRaceState('racing'); lastTimeRef.current = performance.now(); animationRef.current = requestAnimationFrame(animate); };
    const resetRace = () => {
        cancelAnimationFrame(animationRef.current);
        lastTimeRef.current = null;
        students.forEach(student => {
            horseDataRef.current[student.id] = { pos: 0, speed: 0, finished: false, finishTime: 0 };
            const domEl = horseDOMRefs.current[student.id];
            if (domEl) domEl.style.left = '0%';
        });
        setTimeLeft(config.duration);
        setRankings([]);
        setHiddenLanes([]);
        setRaceState('ready');
    };

    const handleEliminateTop1 = () => {
        if (rankings.length > 0 && onDisableStudent) {
            // FIX LỖI: Chủ động reset trạng thái vòng đua để tắt bảng kết quả TRƯỚC KHI vô hiệu hóa học sinh
            setRaceState('ready');
            setRankings([]);
            onDisableStudent(rankings[0]);
        }
    };

    const bgClasses = {
        grass: 'bg-green-700',
        dirt: 'bg-amber-900',
        cyberpunk: 'bg-slate-950',
        galaxy: 'bg-indigo-950',
        ocean: 'bg-cyan-950',
        lava: 'bg-red-950'
    };

    return (
        <div className={`flex-grow flex flex-col relative overflow-hidden ${bgClasses[config.trackTheme]}`}>
            {config.trackTheme === 'cyberpunk' && <div className="absolute inset-0 bg-grid-cyberpunk opacity-50 z-0 perspective-[1000px]"></div>}
            {(config.trackTheme === 'grass' || config.trackTheme === 'dirt') && (
                <div className="absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 40%)', backgroundSize: '250px 250px' }}></div>
            )}
            {config.trackTheme === 'galaxy' && <div className="absolute inset-0 z-0 bg-stars animate-pulse opacity-80"></div>}
            {config.trackTheme === 'ocean' && <div className="absolute inset-0 z-0 bg-waves opacity-40"></div>}
            {config.trackTheme === 'lava' && <div className="absolute inset-0 z-0 bg-lava-particles opacity-60"></div>}

            <div className="flex-grow overflow-y-auto overflow-x-hidden custom-scrollbar relative p-4 pb-40 arena-perspective flex items-start justify-center pt-10 z-10">
                <RaceTrack
                    students={students}
                    horseDOMRefs={horseDOMRefs}
                    isAnonymous={isAnonymous}
                    theme={config.trackTheme}
                    is3D={config.view3D}
                    raceState={raceState}
                    hideFinished={config.hideFinished}
                    showNames={config.showNames}
                    rankings={rankings}
                    hiddenLanes={hiddenLanes}
                    onHideLane={(id) => setHiddenLanes(prev => [...prev, id])}
                />
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl text-white p-5 border-t-2 border-indigo-500/50 z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
                <RaceControls
                    raceState={raceState}
                    timeLeft={timeLeft}
                    onStart={startRace}
                    onPause={pauseRace}
                    onResume={resumeRace}
                    onReset={resetRace}
                    isAnonymous={isAnonymous}
                    onToggleAnonymous={() => setIsAnonymous(!isAnonymous)}
                    is3D={config.view3D}
                    onToggle3D={() => setConfig({ ...config, view3D: !config.view3D })}
                    hideFinished={config.hideFinished}
                    onToggleHideFinished={() => setConfig({ ...config, hideFinished: !config.hideFinished })}
                    hiddenLanesCount={hiddenLanes.length}
                    onUnhideAll={() => setHiddenLanes([])}
                    showNames={config.showNames}
                    onToggleNames={() => setConfig({ ...config, showNames: !config.showNames })}
                />
            </div>

            {raceState === 'finished' && (
                <RaceResults
                    students={students}
                    rankings={rankings}
                    isAnonymous={isAnonymous}
                    onPlayAgain={resetRace}
                    onEliminateTop1={handleEliminateTop1}
                    onBack={onBack}
                />
            )}
        </div>
    );
}