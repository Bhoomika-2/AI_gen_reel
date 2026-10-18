import React, { useMemo } from 'react';

/**
 * High-End Zero-Gravity Particle Simulation:
 * Floating college exam papers, loose sheets fluttering in 3D,
 * glowing 3D geometric matrix blocks / cubes, and anti-gravity embers.
 */
export const FloatingPapersAndCubes = ({ frame = 0 }) => {
  // 1. Floating college papers (sheets)
  const papers = useMemo(() => {
    const list = [];
    for (let i = 0; i < 24; i++) {
      const baseX = 80 + ((i * 197) % 920);
      const startY = 1950 - ((i * 143) % 1800);
      const speed = 3.5 + (i % 4) * 1.8;
      const rotSpeedX = 1.2 + (i % 3) * 0.8;
      const rotSpeedY = 1.5 + (i % 4) * 0.6;
      const rotSpeedZ = 0.8 + (i % 5) * 0.4;
      const swayAmp = 25 + (i % 6) * 15;
      const swayFreq = 0.04 + (i % 3) * 0.02;
      const width = 38 + (i % 4) * 12;
      const height = width * 1.414; // A4 aspect ratio
      list.push({
        id: i,
        baseX,
        startY,
        speed,
        rotSpeedX,
        rotSpeedY,
        rotSpeedZ,
        swayAmp,
        swayFreq,
        width,
        height,
      });
    }
    return list;
  }, []);

  // 2. 3D Geometric Glowing Matrix Blocks / Cubes
  const cubes = useMemo(() => {
    const list = [];
    for (let i = 0; i < 28; i++) {
      const baseX = 60 + ((i * 283) % 960);
      const startY = 1980 - ((i * 179) % 1850);
      const speed = 2.8 + (i % 5) * 2.2;
      const size = 22 + (i % 4) * 16;
      const rotSpeed = 1.4 + (i % 3) * 1.2;
      const colorScheme = i % 2 === 0 ? '#00f0ff' : '#bc13fe';
      list.push({
        id: i,
        baseX,
        startY,
        speed,
        size,
        rotSpeed,
        colorScheme,
      });
    }
    return list;
  }, []);

  // 3. Floating zero-g sparks
  const sparks = useMemo(() => {
    const list = [];
    for (let i = 0; i < 40; i++) {
      const baseX = (i * 27) % 1080;
      const startY = (i * 47) % 1920;
      const speed = 4.0 + (i % 5) * 2.5;
      const size = 3 + (i % 4) * 3;
      const color = i % 3 === 0 ? '#00ff66' : i % 2 === 0 ? '#00f0ff' : '#ffffff';
      list.push({ id: i, baseX, startY, speed, size, color });
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
        perspective: 1200,
        zIndex: 22,
      }}
    >
      {/* 1. Floating Paper Sheets */}
      {papers.map((p) => {
        const totalDistance = 2200;
        const currentY = (p.startY - frame * p.speed * 4.5 + totalDistance) % totalDistance - 150;
        const currentX = p.baseX + Math.sin(frame * p.swayFreq + p.id) * p.swayAmp;
        const rotX = (frame * p.rotSpeedX * 2.5 + p.id * 40) % 360;
        const rotY = (frame * p.rotSpeedY * 2.2 + p.id * 60) % 360;
        const rotZ = Math.sin(frame * p.swayFreq * 0.5) * 35;

        return (
          <div
            key={`paper-${p.id}`}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: p.width,
              height: p.height,
              backgroundColor: 'rgba(245, 245, 250, 0.88)',
              borderRadius: 2,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 10px rgba(0, 240, 255, 0.3)',
              transform: `translate3d(${currentX}px, ${currentY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
              transformStyle: 'preserve-3d',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              overflow: 'hidden',
            }}
          >
            {/* Lined paper texture lines */}
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage:
                  'repeating-linear-gradient(transparent, transparent 5px, rgba(0, 180, 255, 0.25) 5px, rgba(0, 180, 255, 0.25) 6px)',
                opacity: 0.8,
              }}
            />
          </div>
        );
      })}

      {/* 2. 3D Geometric Matrix Cubes */}
      {cubes.map((c) => {
        const totalDist = 2200;
        const curY = (c.startY - frame * c.speed * 4.0 + totalDist) % totalDist - 120;
        const curX = c.baseX + Math.cos(frame * 0.03 + c.id) * 20;
        const rotX = (frame * c.rotSpeed * 2.0 + c.id * 30) % 360;
        const rotY = (frame * c.rotSpeed * 1.8 + c.id * 50) % 360;

        return (
          <div
            key={`cube-${c.id}`}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: c.size,
              height: c.size,
              backgroundColor: `${c.colorScheme}33`,
              border: `2px solid ${c.colorScheme}`,
              boxShadow: `0 0 16px ${c.colorScheme}, inset 0 0 12px ${c.colorScheme}`,
              transform: `translate3d(${curX}px, ${curY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              mixBlendMode: 'screen',
              backdropFilter: 'blur(4px)',
            }}
          >
            {/* Inner crosswire */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '100%',
                height: 1,
                backgroundColor: c.colorScheme,
                opacity: 0.6,
              }}
            />
          </div>
        );
      })}

      {/* 3. Floating Zero-G Embers & Sparks */}
      {sparks.map((s) => {
        const totalDist = 2100;
        const curY = (s.startY - frame * s.speed * 3.5 + totalDist) % totalDist - 50;
        const curX = s.baseX + Math.sin(frame * 0.05 + s.id) * 15;

        return (
          <div
            key={`spark-${s.id}`}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              backgroundColor: s.color,
              boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
              transform: `translate3d(${curX}px, ${curY}px, 0)`,
              mixBlendMode: 'screen',
            }}
          />
        );
      })}
    </div>
  );
};
