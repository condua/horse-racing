import React, { useMemo } from 'react';

export const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 85%, 65%)`; // Màu rực rỡ để nổi bật trên nền Pixel
};

// MA TRẬN PIXEL ART (Mô phỏng chính xác dáng ngựa đi bộ trong ảnh)
// Ký hiệu: 
// X: Viền đen / Móng ngựa
// M: Bờm và Đuôi (Nâu đậm)
// B: Thân ngựa (Màu động theo học sinh)
// D: Chân phía xa (Màu tối hơn)
// W: Mõm ngựa (Trắng)
// E: Mắt (Đen)
const horseSprite = [
    "                   XXXX       ",
    "                 XXMMMBX      ",
    "                XMMMMBBX      ",
    "               XMMMBBBBWX     ",
    "               XMMMBBEBWWX    ",
    "              XMMMBBBBBWWX    ",
    "              XMMMBBBBBXWX    ",
    "     XXXX     XMMBBBBBBXX     ",
    "    XMMMMX    XMMBBBBBBX      ",
    "   XMMMMMMX   XMBBBBBBBX      ",
    "  XMMMMMBBBXXXBBBBBBBBBX      ",
    "  XMMMBBBBBBBBBBBBBBBBBX      ",
    "  XMMBBBBBBBBBBBBBBBBBBX      ",
    "   XXBBBBBBBBBBBBBBBBBBX      ",
    "    XBBBBBBBBBBBBBBBBBBX      ",
    "    XBBBBBBBBBBBBBXXXBBX      ",
    "    XXBBBBXBBBBBBBXX XDDX     ",
    "     XBBBX XBBBBBX  XDDXX     ",
    "    XDDDX  XBBBBX  XDDDX      ",
    "   XDDDX   XBBBBX XDDDX       ",
    "   XDDX    XBBBBX XXXX        ",
    "   XXX     XBBBBX             ",
    "           XXXXXX             "
];

export const HorseIcon = ({ color, className = "w-[85px] h-[85px]", isRacing = false, theme = "grass" }) => {

    // Tự động tính toán các khối Pixel thành mã SVG Path (Chỉ chạy 1 lần nhờ useMemo)
    // Cách này giúp tối ưu hóa hiệu suất cực tốt, render siêu nhẹ thay vì dùng hàng trăm thẻ <rect>
    const paths = useMemo(() => {
        const result = { X: "", M: "", B: "", D: "", W: "", E: "" };
        horseSprite.forEach((row, y) => {
            for (let x = 0; x < row.length; x++) {
                const char = row[x];
                if (result[char] !== undefined) {
                    // Vẽ 1 ô vuông 1x1 pixel
                    result[char] += `M${x},${y} h1 v1 h-1 Z `;
                }
            }
        });
        return result;
    }, []);

    return (
        <div className={`relative flex items-end justify-center ${className} z-50`}>
            {/* Hiệu ứng bụi / tốc độ khi chạy */}
            {isRacing && (
                <div className="absolute -left-8 bottom-3 flex flex-col gap-1">
                    <div className="w-16 h-2 rounded-none animate-pulse" style={{ backgroundColor: color, opacity: 0.8 }}></div>
                    <div className="w-8 h-1 bg-white rounded-none opacity-90 dust-trail"></div>
                </div>
            )}

            {/* ---
              Khung chứa Pixel Art 
              - shapeRendering="crispEdges": Đảm bảo các cạnh viền luôn sắc nét rập khuôn 8-bit, không bị mờ (anti-aliasing)
            */}
            <svg
                viewBox="0 0 30 24"
                className="w-full h-full overflow-visible drop-shadow-[0_10px_8px_rgba(0,0,0,0.6)]"
                style={{ shapeRendering: 'crispEdges' }}
            >
                {/* Bóng (Shadow) in dưới mặt đất */}
                <ellipse cx="15" cy="23" rx="12" ry="2" fill="#000" opacity="0.4" />

                {/* Di chuyển ngựa lên một chút cho khớp bóng */}
                <g transform="translate(0, -1)">

                    {/* Lớp 1: Chân phía xa (Sử dụng màu thân ngựa + Lớp phủ đen trong suốt để tạo màu tối) */}
                    <path d={paths.D} fill={color} />
                    <path d={paths.D} fill="#000000" opacity="0.4" />

                    {/* Lớp 2: Bờm và Đuôi */}
                    <path d={paths.M} fill="#4e342e" /> {/* Nâu sẫm */}

                    {/* Lớp 3: Thân ngựa (Màu sắc thay đổi theo học sinh) */}
                    <path d={paths.B} fill={color} />

                    {/* Lớp 4: Mõm ngựa */}
                    <path d={paths.W} fill="#f5f5f5" />

                    {/* Lớp 5: Mắt ngựa */}
                    <path d={paths.E} fill="#000000" />

                    {/* Lớp 6: Viền ngoài và Móng ngựa */}
                    <path d={paths.X} fill="#1a1a1a" />
                </g>
            </svg>
        </div>
    );
};