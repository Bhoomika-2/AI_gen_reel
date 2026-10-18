import React, { useMemo } from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';

export const ShockwaveBlast = ({ frame }) => {
  // frame is relative to Scene 4 start (0 to 90)
  
  // Flash intensity: starts at 1, rapidly decays over 15 frames
  const flashOpacity = interpolate(frame, [0, 4, 18], [1, 0.9, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Concentric shockwave ring 1 (fast electric cyan)
  const ring1Scale = interpolate(frame, [0, 35], [0.1, 4.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ring1Opacity = interpolate(frame, [0, 8, 35], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Concentric shockwave ring 2 (heavy violet energy)
  const ring2Scale = interpolate(frame, [3, 45], [0.1, 3.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ring2Opacity = interpolate(frame, [3, 12, 45], [0, 0.85, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Radial blast shards
  const shards = useMemo(() => {
    const list = [];
    for (let i = 0; i < 48; i++) {
      const angle = (i / 48) * Math.PI * 2;
      const speed = 600 + ((i * 137.5) % 800);
      const size = 4 + (i % 5) * 3;
      const isCyan = i % 2 === 0;
      list.push({ id: i, angle, speed, size, isCyan });
    }
    return list;
  }, []);

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
        zIndex: 30,
      }}
    >
      {/* Blinding White/Cyan Blast Flash */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          opacity: flashOpacity,
          mixBlendMode: 'screen',
        }}
      />

      {/* Central Supernova Energy Core */}
      <div
        style={{
          position: 'absolute',
          top: '46%',
          left: '50%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(0,240,255,1) 0%, rgba(180,0,255,0.8) 45%, transparent 75%)',
          opacity: interpolate(frame, [0, 10, 50], [1, 0.7, 0.25]),
          filter: 'blur(20px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Shockwave Ring 1 - Cyan */}
      <div
        style={{
          position: 'absolute',
          top: '46%',
          left: '50%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          border: '18px solid #00f0ff',
          boxShadow: '0 0 60px #00f0ff, inset 0 0 60px #00f0ff',
          transform: `translate(-50%, -50%) scale(${ring1Scale})`,
          opacity: ring1Opacity,
          mixBlendMode: 'screen',
        }}
      />

      {/* Shockwave Ring 2 - Electric Purple */}
      <div
        style={{
          position: 'absolute',
          top: '46%',
          left: '50%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          border: '14px solid #bc13fe',
          boxShadow: '0 0 70px #bc13fe, inset 0 0 70px #bc13fe',
          transform: `translate(-50%, -50%) scale(${ring2Scale})`,
          opacity: ring2Opacity,
          mixBlendMode: 'screen',
        }}
      />

      {/* Exploding Radial Energy Shards */}
      {shards.map((s) => {
        const progress = Math.min(1, frame / 40);
        const distance = progress * s.speed;
        const x = 540 + Math.cos(s.angle) * distance;
        const y = 880 + Math.sin(s.angle) * distance;
        const shardOpacity = interpolate(progress, [0, 0.2, 0.9, 1], [0, 1, 0.6, 0]);

        return (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: s.size,
              height: s.size * 3.5,
              borderRadius: 3,
              backgroundColor: s.isCyan ? '#00f0ff' : '#e03bff',
              boxShadow: `0 0 15px ${s.isCyan ? '#00f0ff' : '#e03bff'}`,
              opacity: shardOpacity,
              transform: `translate3d(${x}px, ${y}px, 0) rotate(${s.angle + Math.PI / 2}rad)`,
            }}
          />
        );
      })}
    </div>
  );
};
