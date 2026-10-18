import React, { useMemo } from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { GlassShatterEffect } from './GlassShatterEffect';
import { GlitchEffect } from './GlitchEffect';

export const Scene4MultiverseBreach = () => {
  const frame = useCurrentFrame(); // 0 to 120 (0:11 - 0:15)

  // Volumetric 3D floating and rotating motion
  const scale = interpolate(frame, [0, 120], [1.02, 1.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rotY = Math.sin(frame * 0.04) * 4.5;
  const rotX = Math.cos(frame * 0.035) * 3.5;
  const translateY = interpolate(frame, [0, 120], [0, -20]);

  // Specular light glint sweep across chrome letters
  const glintPos = interpolate(frame, [15, 80], [-20, 120], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Cosmic stardust particles
  const stardust = useMemo(() => {
    const list = [];
    for (let i = 0; i < 55; i++) {
      const x = (i * 197) % 1080;
      const y = (i * 313) % 1920;
      const size = 2 + (i % 4) * 2;
      const speed = 0.5 + (i % 3) * 0.6;
      const color = i % 2 === 0 ? '#00f0ff' : '#e03bff';
      list.push({ id: i, x, y, size, speed, color });
    }
    return list;
  }, []);

  // Neon green glitch flash logic
  const isGreenGlitching = (frame % 16 >= 13) || (frame % 23 >= 20) || (frame >= 85 && frame <= 98);
  const greenJitterX = isGreenGlitching ? Math.sin(frame * 15) * 10 : 0;
  const cursorBlink = Math.floor(frame / 8) % 2 === 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#020309', overflow: 'hidden' }}>
      {/* 3D Liquid-Chrome SAI INTELLIVERSE Stage */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `scale(${scale}) translateY(${translateY}px) perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transformOrigin: '50% 45%',
          transformStyle: 'preserve-3d',
        }}
      >
        <Img
          src={staticFile('images/scene4_reveal.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'contrast(1.15) brightness(1.08) saturate(1.2)',
          }}
        />

        {/* Specular Chrome Light Sweep */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `${glintPos}%`,
            width: '25%',
            height: '100%',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.45) 50%, transparent 100%)',
            transform: 'skewX(-25deg)',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Floating Cosmic Dust Particles */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        {stardust.map((p) => {
          const cy = (p.y - frame * p.speed * 1.5 + 1920) % 1920;
          const cx = p.x + Math.sin(frame * 0.05 + p.id) * 8;
          return (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: cx,
                top: cy,
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                opacity: 0.65,
                mixBlendMode: 'screen',
              }}
            />
          );
        })}
      </div>

      {/* Explosive 3D Glass Shatter Effect at frame 0 (0:11 impact) */}
      <GlassShatterEffect frame={frame} />

      {/* Top Cyber Ribbon */}
      <div
        style={{
          position: 'absolute',
          top: 70,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: "'Courier New', monospace",
          color: '#ffffff',
          textShadow: '0 0 16px rgba(0,240,255,0.8)',
          zIndex: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: '#00ff66',
              boxShadow: '0 0 16px #00ff66',
            }}
          />
          <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: 4 }}>
            SRI SAIRAM COLLEGE
          </span>
        </div>
        <div style={{ fontSize: 16, letterSpacing: 2, color: '#00ffcc', fontWeight: 700 }}>
          DEPT OF AIML // 2K26
        </div>
      </div>

      {/* Event Details Badge */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(5, 10, 28, 0.85)',
          border: '1px solid rgba(0, 240, 255, 0.5)',
          borderRadius: 30,
          padding: '8px 28px',
          fontFamily: "'Segoe UI', Roboto, sans-serif",
          fontSize: 15,
          fontWeight: 700,
          color: '#00f0ff',
          letterSpacing: 3,
          textTransform: 'uppercase',
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
          zIndex: 40,
        }}
      >
        A National Level Tech & Cultural Symposium
      </div>

      {/* Neon Green Glitches Cyber Frame over the Bottom Text */}
      <div
        style={{
          position: 'absolute',
          bottom: 75,
          left: '50%',
          transform: `translateX(-50%) translateX(${greenJitterX}px)`,
          width: 920,
          height: 110,
          border: isGreenGlitching ? '2px solid #00ff66' : '1px solid rgba(0, 255, 102, 0.4)',
          borderRadius: 14,
          boxShadow: isGreenGlitching
            ? '0 0 35px #00ff66, inset 0 0 20px rgba(0, 255, 102, 0.4)'
            : '0 0 20px rgba(0, 255, 102, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 30px',
          fontFamily: "'Courier New', monospace",
          pointerEvents: 'none',
          zIndex: 45,
          background: isGreenGlitching ? 'rgba(0, 255, 102, 0.1)' : 'transparent',
        }}
      >
        {/* Left Cyber bracket */}
        <div style={{ color: '#00ff66', fontSize: 18, letterSpacing: 3, fontWeight: 700 }}>
          [PORTAL OPEN]
        </div>

        {/* Right Terminal Cursor */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: '#00ff66', fontSize: 16, letterSpacing: 2, fontWeight: 700 }}>
            REGISTER NOW
          </span>
          <span
            style={{
              fontSize: 24,
              color: '#00ff66',
              opacity: cursorBlink ? 1 : 0,
              textShadow: '0 0 12px #00ff66',
            }}
          >
            █
          </span>
        </div>
      </div>

      {/* Multiverse digital scanline stutter */}
      <GlitchEffect frame={frame} intensity={0.5} />
    </AbsoluteFill>
  );
};
