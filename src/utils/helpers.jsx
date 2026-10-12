import React from 'react';

// Sinh màu ngẫu nhiên nhưng tươi sáng
export const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 80%, 55%)`;
};

// SVG Ngựa thiết kế theo phong cách Game Token 3D nổi khối
export const HorseIcon = ({ color, className = "w-12 h-12" }) => {
    const filterId = `bevel-${color.replace(/[^a-zA-Z0-9]/g, '')}`;

    return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-2xl`} xmlns="http://www.w3.org/2000/svg">
            <defs>
                {/* Bộ lọc tạo khối 3D bóng bẩy */}
                <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                    <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1.2" specularExponent="20" lightingColor="#ffffff" result="specOut">
                        <fePointLight x="-20" y="-20" z="50" />
                    </feSpecularLighting>
                    <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
                    <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
                    <feDropShadow dx="2" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
                </filter>
            </defs>

            {/* Đế 3D */}
            <circle cx="50" cy="50" r="48" fill={color} filter={`url(#${filterId})`} />
            <circle cx="50" cy="50" r="42" fill="#000000" opacity="0.1" />
            <circle cx="50" cy="50" r="38" fill={color} />

            {/* Hình Ngựa Trắng */}
            <path
                fill="#ffffff"
                filter={`url(#${filterId})`}
                transform="translate(14, 14) scale(0.75)"
                d="M85.5,42.4c-2.3-4.2-6.5-8.1-10.4-10.6c-4.5-2.9-10.1-4.2-15.4-3.5c-1.3,0.2-2.5,0.6-3.7,1.2 c-0.7,0.3-1.4,0.7-2,1.1c-1.7,1.1-3,2.7-4,4.4c-0.2,0.4-0.4,0.8-0.6,1.2c-0.3,0.7-0.5,1.5-0.7,2.2c-1,4.2-0.5,8.8,1.5,12.7 c-2.3-0.5-4.6-0.8-7-0.8c-7.9,0-15.2,3.5-20,9.3c-1.8,2.2-3.2,4.8-4.1,7.5c-0.8,2.6-1.1,5.4-0.8,8.1c0.5,4.7,2.5,9.2,5.7,12.7 c3,3.3,6.9,5.7,11.2,6.9c2.5,0.7,5.2,1,7.9,0.8c5.4-0.4,10.6-2.8,14.6-6.6c4-3.7,6.8-8.6,8-14c0.6-2.6,0.8-5.3,0.5-7.9 c-0.2-2-0.7-4-1.5-5.9c3.2-2.5,7-4.1,11-4.8c4.2-0.7,8.6-0.2,12.5,1.5c1.8,0.8,3.5,1.9,4.9,3.2c1.2,1.1,2.2,2.4,3,3.8 c0.7,1.2,1.2,2.5,1.5,3.9c0.2,1.1,0.2,2.3,0.1,3.4c-0.3,2.4-1.2,4.6-2.5,6.5c-1.2,1.8-2.8,3.3-4.6,4.5l-2.4-5.2 c0,0,4-1.1,5-4.1c1.1-3.2-1.9-5.1-4.1-6.1c-2.4-1.1-5.1-1.6-7.8-1.5c-4.4,0.1-8.7,1.8-12.1,4.8c1,2.8,1.4,5.8,1.2,8.8 c-0.4,6.2-3.6,11.9-8.4,15.8c-4.7,3.8-10.8,5.8-16.9,5.5c-4.9-0.2-9.6-1.9-13.6-4.9c-3.6-2.7-6.4-6.4-8-10.7 c-1.6-4.3-2-9-1.1-13.5c1.2-5.7,4.2-10.8,8.5-14.5c4.7-4,10.8-6.1,17-6c2.7,0,5.3,0.4,7.8,1.2C49,38,50,33,52.2,28.7 c1.6-3.2,3.9-6.1,6.8-8.2c1-0.7,2.1-1.3,3.3-1.8c1.6-0.7,3.3-1.2,5-1.4c6.3-0.7,12.7,1,17.9,4.6c4.6,3.2,8.3,7.7,10.5,13L85.5,42.4z"
            />
            <circle cx="70" cy="24" r="4" fill="#000" />

            {/* Vệt sáng chói (Glossy highlight) */}
            <path d="M 10 50 A 40 40 0 0 1 90 50 A 50 30 0 0 0 10 50" fill="#ffffff" opacity="0.3" />
        </svg>
    );
};