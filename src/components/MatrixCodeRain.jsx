import React, { useMemo } from 'react';

/**
 * Cascading Digital Binary Matrix Streams
 * Simulates cascading code rain and floating digital glyphs breaking through walls
 */
export const MatrixCodeRain = ({ frame = 0, streamCount = 18 }) => {
  const glyphs = '0100110101101001101110010101010011001010111010100101011010101011';
  
  const columns = useMemo(() => {
    const list = [];
    for (let i = 0; i < streamCount; i++) {
      const x = 40 + i * ((1080 - 80) / streamCount);
      const speed = 12 + (i % 5) * 5;
      const length = 14 + (i % 8) * 3;
      const opacity = 0.45 + (i % 3) * 0.25;
      const fontSize = 16 + (i % 4) * 4;
      const colorScheme = i % 3 === 0 ? '#00f0ff' : '#00ff66';
      list.push({ id: i, x, speed, length, opacity, fontSize, colorScheme });
    }
    return list;
  }, [streamCount]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 18,
      }}
    >
      {columns.map((col) => {
        const streamHeight = col.length * col.fontSize * 1.3;
        const totalTravel = 1920 + streamHeight;
        const curY = (frame * col.speed + col.id * 140) % totalTravel - streamHeight;

        // Render characters
        const chars = [];
        for (let j = 0; j < col.length; j++) {
          const charIndex = (col.id * 7 + j + Math.floor(frame * 0.4)) % glyphs.length;
          const char = glyphs[charIndex];
          const isLead = j === col.length - 1;
          const charOpacity = isLead ? 1.0 : (j / col.length) * col.opacity;

          chars.push(
            <div
              key={j}
              style={{
                fontSize: col.fontSize,
                lineHeight: `${col.fontSize * 1.3}px`,
                fontFamily: "'Courier New', monospace",
                fontWeight: isLead ? 800 : 600,
                color: isLead ? '#ffffff' : col.colorScheme,
                textShadow: isLead
                  ? `0 0 12px #ffffff, 0 0 20px ${col.colorScheme}`
                  : `0 0 8px ${col.colorScheme}`,
                opacity: charOpacity,
                textAlign: 'center',
              }}
            >
              {char}
            </div>
          );
        }

        return (
          <div
            key={col.id}
            style={{
              position: 'absolute',
              left: col.x,
              top: curY,
              width: col.fontSize * 1.6,
              display: 'flex',
              flexDirection: 'column',
              mixBlendMode: 'screen',
            }}
          >
            {chars}
          </div>
        );
      })}
    </div>
  );
};
