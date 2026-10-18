import React, { useMemo } from 'react';
import { interpolate } from 'remotion';

/**
 * 3D Explosive Digital Glass Shatter Effect
 * Creates fractured polygonal shards that burst outward from the center
 */
export const GlassShatterEffect = ({ frame = 0 }) => {
  // Flash opacity decays quickly
  const flashOpacity = interpolate(frame, [0, 3, 14], [1, 0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Shatter polygons definition
  const shards = useMemo(() => {
    const list = [];
    const shardCount = 28;
    for (let i = 0; i < shardCount; i++) {
      const angle = (i / shardCount) * Math.PI * 2 + ((i * 17) % 7) * 0.1;
      const speed = 750 + ((i * 193) % 950);
      const rotSpeedX = 2.5 + (i % 4) * 1.5;
      const rotSpeedY = 2.0 + (i % 3) * 1.8;
      const rotSpeedZ = 1.8 + (i % 5) * 1.2;
      const width = 80 + (i % 6) * 35;
      const height = 90 + (i % 5) * 40;
      
      // Irregular polygon vertices
      const p1 = `${10 + (i % 20)}% 0%`;
      const p2 = `100% ${15 + ((i * 3) % 25)}%`;
      const p3 = `${85 - (i % 15)}% 100%`;
      const p4 = `0% ${75 - ((i * 4) % 20)}%`;
      const clipPath = `polygon(${p1}, ${p2}, ${p3}, ${p4})`;

      list.push({
        id: i,
        angle,
        speed,
        rotSpeedX,
        rotSpeedY,
        rotSpeedZ,
        width,
        height,
        clipPath,
      });
    }
    return list;
  }, []);

  // Only render during the explosion frames (first 50 frames of Scene 4)
  if (frame > 50) return null;

  const progress = Math.min(1, frame / 40);

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
        perspective: 1400,
        zIndex: 35,
      }}
    >
      {/* Blinding White/Cyan Shatter Flash */}
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

      {/* Bursting Shards */}
      {shards.map((s) => {
        const distance = progress * s.speed;
        const curX = 540 + Math.cos(s.angle) * distance - s.width / 2;
        const curY = 960 + Math.sin(s.angle) * distance - s.height / 2;
        const rotX = frame * s.rotSpeedX * 3.5;
        const rotY = frame * s.rotSpeedY * 3.2;
        const rotZ = frame * s.rotSpeedZ * 2.8;
        const opacity = interpolate(progress, [0, 0.1, 0.75, 1], [0.95, 0.9, 0.45, 0]);

        return (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: s.width,
              height: s.height,
              clipPath: s.clipPath,
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(0, 240, 255, 0.35) 45%, rgba(188, 19, 254, 0.3) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              opacity,
              transform: `translate3d(${curX}px, ${curY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
              mixBlendMode: 'screen',
            }}
          />
        );
      })}
    </div>
  );
};
