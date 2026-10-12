import React, { useState, useMemo, useRef } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import GameSetup from './components/GameSetup';
import RaceArena from './components/RaceArena';
import { Trophy, Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [students, setStudents] = useLocalStorage(
    'mlpa_students',
    []
  );

  const [config, setConfig] = useLocalStorage('mlpa_config', {
    duration: 30,
    anonymousMode: false,
    trackTheme: 'grass',
    view3D: true,
    hideFinished: true,
    showNames: true,
  });

  const [appState, setAppState] = useState('setup');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicError, setMusicError] = useState('');

  const audioRef = useRef(null);

  // Danh sách học sinh đang hoạt động
  const activeStudents = useMemo(() => {
    return students.filter((student) => student.isActive !== false);
  }, [students]);

  // Phát nhạc
  const playMusic = async () => {
    const audio = audioRef.current;

    if (!audio) {
      setMusicError('Không tìm thấy trình phát nhạc.');
      return;
    }

    try {
      setMusicError('');

      // Bảo đảm âm lượng không bị tắt
      audio.muted = false;
      audio.volume = 0.5;

      // Nếu chưa tải xong, yêu cầu trình duyệt tải file
      if (audio.readyState === 0) {
        audio.load();
      }

      await audio.play();

      // Trạng thái sẽ được đồng bộ thêm qua sự kiện onPlay
      setIsMusicPlaying(true);
    } catch (error) {
      console.error('Không thể phát nhạc:', error);

      setIsMusicPlaying(false);

      if (error.name === 'NotAllowedError') {
        setMusicError(
          'Trình duyệt chặn phát nhạc. Hãy bấm nút bật nhạc lần nữa.'
        );
      } else {
        setMusicError(
          'Không thể phát nhạc. Hãy kiểm tra file public/bg.mp3.'
        );
      }
    }
  };

  // Bật hoặc tắt nhạc bằng nút trên giao diện
  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setIsMusicPlaying(false);
      setMusicError('');
    } else {
      await playMusic();
    }
  };

  // Xử lý khi nhạc bắt đầu phát thành công
  const handleMusicPlay = () => {
    setIsMusicPlaying(true);
    setMusicError('');
  };

  // Xử lý khi nhạc tạm dừng hoặc kết thúc phát
  const handleMusicPause = () => {
    setIsMusicPlaying(false);
  };

  // Xử lý lỗi tải file nhạc
  const handleMusicError = (event) => {
    const audio = event.currentTarget;
    const error = audio.error;

    console.error('Lỗi audio:', {
      src: audio.currentSrc,
      code: error?.code,
      message: error?.message,
    });

    setIsMusicPlaying(false);

    if (error?.code === 4) {
      setMusicError(
        'Định dạng nhạc không được hỗ trợ hoặc đường dẫn file không hợp lệ.'
      );
    } else {
      setMusicError(
        'Không tải được nhạc. Hãy kiểm tra file public/bg.mp3 và thử lại.'
      );
    }
  };

  // Bắt đầu cuộc đua
  const startRace = () => {
    if (activeStudents.length === 0) {
      alert('Vui lòng kích hoạt ít nhất 1 học sinh để bắt đầu!');
      return;
    }

    setAppState('racing');

    // Phát nhạc trực tiếp từ thao tác bấm nút của người dùng
    if (audioRef.current?.paused) {
      playMusic();
    }
  };

  // Vô hiệu hóa học sinh
  const handleDisableStudent = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, isActive: false }
          : student
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      {/* Trình phát nhạc nền */}
      <audio
        ref={audioRef}
        src="/bg.mp3"
        loop
        preload="auto"
        onPlay={handleMusicPlay}
        onPause={handleMusicPause}
        onError={handleMusicError}
      />

      {/* Header */}
      <header className="bg-indigo-900 text-white p-4 shadow-xl flex justify-between items-center z-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl" />

        {/* Logo và tên game */}
        <div className="flex items-center gap-3 relative z-10">
          <Trophy className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,1)] animate-pulse" />

          <h1 className="text-2xl font-black tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-300">
            MLPA 3D Racing
          </h1>
        </div>

        {/* Điều khiển nhạc và điều hướng */}
        <div className="flex items-center gap-4 relative z-10">
          <button
            type="button"
            onClick={toggleMusic}
            className="p-2 bg-indigo-800/80 hover:bg-indigo-700 rounded-full transition-all border border-indigo-500/50 shadow-[0_0_10px_rgba(79,70,229,0.3)]"
            title={isMusicPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
            aria-label={isMusicPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
          >
            {isMusicPlaying ? (
              <Volume2 className="w-6 h-6 text-green-400" />
            ) : (
              <VolumeX className="w-6 h-6 text-slate-400" />
            )}
          </button>

          {appState === 'racing' && (
            <button
              type="button"
              onClick={() => setAppState('setup')}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all transform hover:scale-105"
            >
              Quay lại Setup
            </button>
          )}
        </div>
      </header>

      {/* Thông báo lỗi nhạc */}
      {musicError && (
        <div
          role="alert"
          className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-sm text-amber-800 flex items-center justify-between gap-3"
        >
          <span>{musicError}</span>

          <button
            type="button"
            onClick={() => setMusicError('')}
            className="font-bold hover:text-amber-950"
            aria-label="Đóng thông báo"
          >
            ✕
          </button>
        </div>
      )}

      {/* Nội dung chính */}
      <main className="flex-grow flex flex-col relative">
        {appState === 'setup' ? (
          <GameSetup
            students={students}
            setStudents={setStudents}
            config={config}
            setConfig={setConfig}
            onStart={startRace}
          />
        ) : (
          <RaceArena
            students={activeStudents}
            config={config}
            setConfig={setConfig}
            onBack={() => setAppState('setup')}
            onDisableStudent={handleDisableStudent}
          />
        )}
      </main>
    </div>
  );
}
