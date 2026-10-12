import React from 'react';

export const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 90%, 65%)`; // Tăng độ rực rỡ
};

export const HorseIcon = ({ color, className = "w-[85px] h-[85px]", isRacing = false, theme = "grass" }) => {
    const filterId = `token-${color.replace(/[^a-zA-Z0-9]/g, '')}`;

    return (
        <div className={`relative flex items-end justify-center ${className} z-50`}>
            {/* Hiệu ứng bụi / dải sáng phía sau khi chạy */}
            {isRacing && (
                <div className="absolute -left-12 bottom-3 flex flex-col gap-1">
                    <div className="w-20 h-3 rounded-full blur-md animate-pulse" style={{ backgroundColor: color, opacity: 0.9 }}></div>
                    <div className="w-12 h-1 bg-white rounded-full blur-[1px] opacity-90 dust-trail"></div>
                    {['galaxy', 'cyberpunk'].includes(theme) && (
                        <>
                            <div className="absolute left-4 bottom-2 w-2 h-2 bg-white rounded-full magic-sparkle" style={{ boxShadow: `0 0 10px ${color}` }}></div>
                            <div className="absolute left-8 bottom-6 w-1.5 h-1.5 bg-white rounded-full magic-sparkle" style={{ animationDelay: '0.2s', boxShadow: `0 0 10px ${color}` }}></div>
                        </>
                    )}
                </div>
            )}

            <svg viewBox="0 0 120 150" className="w-full h-full overflow-visible drop-shadow-[0_15px_15px_rgba(0,0,0,0.7)]">
                <defs>
                    {/* Gradient tạo độ nổi khối (3D Shading) cực kỳ chân thực */}
                    <linearGradient id={`body-grad-${filterId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                        <stop offset="40%" stopColor={color} />
                        <stop offset="85%" stopColor={color} stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
                    </linearGradient>

                    <linearGradient id={`highlight-${filterId}`} x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </linearGradient>

                    <linearGradient id="saddle-rim" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="50%" stopColor="#d97706" />
                        <stop offset="100%" stopColor="#78350f" />
                    </linearGradient>

                    <filter id={`glow-${filterId}`} x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Bóng (Shadow) in xuống nền */}
                <ellipse cx="60" cy="140" rx="45" ry="12" fill="#000" opacity="0.6" filter={`url(#glow-${filterId})`} />
                <ellipse cx="60" cy="130" rx="52" ry="16" fill="#0f172a" />

                {/* Đế đỡ con ngựa (Pedestal 3D) */}
                <ellipse cx="60" cy="125" rx="52" ry="16" fill={`url(#body-grad-${filterId})`} />
                <ellipse cx="60" cy="121" rx="46" ry="14" fill="url(#saddle-rim)" />
                <ellipse cx="60" cy="118" rx="42" ry="12" fill="#020617" opacity="0.9" />

                {/* Khung thân Ngựa (Vẽ lại dạng 3D khối pha lê / kim loại) */}
                <g transform="translate(18, 15) scale(0.85)">
                    {/* Đường bao có màu phát sáng nhẹ */}
                    <path d="M85.5,42.4c-2.3-4.2-6.5-8.1-10.4-10.6c-4.5-2.9-10.1-4.2-15.4-3.5c-1.3,0.2-2.5,0.6-3.7,1.2 c-0.7,0.3-1.4,0.7-2,1.1c-1.7,1.1-3,2.7-4,4.4c-0.2,0.4-0.4,0.8-0.6,1.2c-0.3,0.7-0.5,1.5-0.7,2.2c-1,4.2-0.5,8.8,1.5,12.7 c-2.3-0.5-4.6-0.8-7-0.8c-7.9,0-15.2,3.5-20,9.3c-1.8,2.2-3.2,4.8-4.1,7.5c-0.8,2.6-1.1,5.4-0.8,8.1c0.5,4.7,2.5,9.2,5.7,12.7 c3,3.3,6.9,5.7,11.2,6.9c2.5,0.7,5.2,1,7.9,0.8c5.4-0.4,10.6-2.8,14.6-6.6c4-3.7,6.8-8.6,8-14c0.6-2.6,0.8-5.3,0.5-7.9 c-0.2-2-0.7-4-1.5-5.9c3.2-2.5,7-4.1,11-4.8c4.2-0.7,8.6-0.2,12.5,1.5c1.8,0.8,3.5,1.9,4.9,3.2c1.2,1.1,2.2,2.4,3,3.8 c0.7,1.2,1.2,2.5,1.5,3.9c0.2,1.1,0.2,2.3,0.1,3.4c-0.3,2.4-1.2,4.6-2.5,6.5c-1.2,1.8-2.8,3.3-4.6,4.5l-2.4-5.2 c0,0,4-1.1,5-4.1c1.1-3.2-1.9-5.1-4.1-6.1c-2.4-1.1-5.1-1.6-7.8-1.5c-4.4,0.1-8.7,1.8-12.1,4.8c1,2.8,1.4,5.8,1.2,8.8 c-0.4,6.2-3.6,11.9-8.4,15.8c-4.7,3.8-10.8,5.8-16.9,5.5c-4.9-0.2-9.6-1.9-13.6-4.9c-3.6-2.7-6.4-6.4-8-10.7 c-1.6-4.3-2-9-1.1-13.5c1.2-5.7,4.2-10.8,8.5-14.5c4.7-4,10.8-6.1,17-6c2.7,0,5.3,0.4,7.8,1.2C49,38,50,33,52.2,28.7 c1.6-3.2,3.9-6.1,6.8-8.2c1-0.7,2.1-1.3,3.3-1.8c1.6-0.7,3.3-1.2,5-1.4c6.3-0.7,12.7,1,17.9,4.6c4.6,3.2,8.3,7.7,10.5,13L85.5,42.4z"
                        fill={`url(#body-grad-${filterId})`} stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />

                    {/* Khối Highlight (tạo độ bóng kính phản chiếu) */}
                    <path d="M85.5,42.4c-2.3-4.2-6.5-8.1-10.4-10.6c-4.5-2.9-10.1-4.2-15.4-3.5c-1.3,0.2-2.5,0.6-3.7,1.2 c-0.7,0.3-1.4,0.7-2,1.1c-1.7,1.1-3,2.7-4,4.4... (truncated inner path) ..."
                        fill={`url(#highlight-${filterId})`} opacity="0.4" transform="translate(-1, -1) scale(0.95)" />

                    {/* Mắt ngựa */}
                    <circle cx="67" cy="23" r="4.5" fill="#ffffff" />
                    <circle cx="68" cy="22.5" r="2.5" fill="#000000" />
                    <circle cx="69" cy="21.5" r="1" fill="#ffffff" />
                </g>
            </svg>
        </div>
    );
};