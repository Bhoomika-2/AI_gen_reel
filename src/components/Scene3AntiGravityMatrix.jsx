import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { FloatingPapersAndCubes } from './FloatingPapersAndCubes';
import { MatrixCodeRain } from './MatrixCodeRain';
import { GlitchEffect } from './GlitchEffect';

export const Scene3AntiGravityMatrix = () => {
  const frame = useCurrentFrame(); // 0 to 120 (0:07 - 0:11)

  // Sonic Shockwave blast flash at frame 0 (touch moment)
  const blastFlash = interpolate(frame, [0, 4, 18], [1, 0.85, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Concentric shockwave ring expansion from touch point
  const shockwaveScale = interpolate(frame, [0, 40], [0.1, 4.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockwaveOpacity = interpolate(frame, [0, 8, 40], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Camera zero-g upward lift
  const translateY = interpolate(frame, [0, 120], [30, -50], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(frame, [0, 120], [1.03, 1.14], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Camera float sway
  const swayX = Math.sin(frame * 0.12) * 8;
  const rotateZ = Math.sin(frame * 0.08) * 1.5;

  // Voiceover plays at frame 20 - 110: "...welcome to the SAI INTELLIVERSE."
  const showSubtitle = frame >= 20 && frame <= 115;

  return (
    <AbsoluteFill style={{ backgroundColor: '#050711', overflow: 'hidden' }}>
      {/* Background Zero-G Levitation Scene */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `scale(${scale}) translate3d(${swayX}px, ${translateY}px, 0) rotate(${rotateZ}deg)`,
          transformOrigin: '50% 50%',
        }}
      >
        <Img
          src={staticFile('images/scene3_matrix.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'contrast(1.15) saturate(1.25) brightness(1.05)',
          }}
        />

        {/* Ambient Dark Neon Cyberpunk Glow Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'radial-gradient(ellipse at 50% 25%, rgba(188, 19, 254, 0.3) 0%, rgba(0, 240, 255, 0.2) 40%, rgba(5, 7, 18, 0.7) 100%)',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Initial Sonic Shockwave Blast Flash (Instant Touch Impact) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          opacity: blastFlash,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 40,
        }}
      />

      {/* Expanding Sonic Shockwave Rings */}
      <div
        style={{
          position: 'absolute',
          top: '28%',
          left: '42%',
          width: 350,
          height: 350,
          borderRadius: '50%',
          border: '14px solid #00f0ff',
          boxShadow: '0 0 60px #00f0ff, inset 0 0 40px #00f0ff',
          transform: `translate(-50%, -50%) scale(${shockwaveScale})`,
          opacity: shockwaveOpacity,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 38,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '28%',
          left: '42%',
          width: 420,
          height: 420,
          borderRadius: '50%',
          border: '10px solid #bc13fe',
          boxShadow: '0 0 70px #bc13fe, inset 0 0 50px #bc13fe',
          transform: `translate(-50%, -50%) scale(${shockwaveScale * 0.85})`,
          opacity: shockwaveOpacity * 0.8,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 38,
        }}
      />

      {/* Cascading Streams of Digital Binary Code Rain */}
      <MatrixCodeRain frame={frame} streamCount={18} />

      {/* High-End Particle Simulation: Floating Papers, 3D Matrix Cubes & Zero-G Sparks */}
      <FloatingPapersAndCubes frame={frame} />

      {/* Zero-G HUD Status */}
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
          color: '#00f0ff',
          textShadow: '0 0 14px #00f0ff',
          zIndex: 30,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: '#ff0055',
              boxShadow: '0 0 16px #ff0055',
            }}
          />
          <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: 4, color: '#ffffff' }}>
            SAI INTELLIVERSE
          </span>
        </div>
        <div style={{ fontSize: 16, letterSpacing: 2, color: '#ff0055', fontWeight: 700 }}>
          GRAVITY: 0.000 G [REVERSED]
        </div>
      </div>

      {/* Floating Telemetry Box */}
      <div
        style={{
          position: 'absolute',
          right: 60,
          top: 150,
          fontFamily: "'Courier New', monospace",
          fontSize: 15,
          lineHeight: '24px',
          color: '#00ffcc',
          background: 'rgba(3, 8, 25, 0.85)',
          padding: '16px 22px',
          borderRadius: 8,
          borderRight: '3px solid #00ffcc',
          backdropFilter: 'blur(10px)',
          letterSpacing: 2,
          textAlign: 'right',
          zIndex: 25,
        }}
      >
        <div>CAMPUS ANCHOR: SEVERED</div>
        <div>MATRIX DIMENSION: SYNCHRONIZED</div>
        <div>ZERO-G LIFTOFF: ACTIVE</div>
      </div>

      {/* Voiceover Subtitle: "...welcome to the SAI INTELLIVERSE." */}
      {showSubtitle && (
        <div
          style={{
            position: 'absolute',
            bottom: 110,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(4, 7, 22, 0.94)',
            border: '2px solid rgba(0, 240, 255, 0.8)',
            boxShadow: '0 0 45px rgba(0, 240, 255, 0.65)',
            borderRadius: 18,
            padding: '24px 48px',
            maxWidth: 960,
            textAlign: 'center',
            backdropFilter: 'blur(16px)',
            zIndex: 35,
          }}
        >
          <div
            style={{
              fontSize: 14,
              letterSpacing: 5,
              color: '#bc13fe',
              marginBottom: 8,
              fontFamily: "'Courier New', monospace",
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            [CYBER TRANSMISSION // DIMENSION BREACH]
          </div>
          <div
            style={{
              fontFamily: "'Segoe UI', Roboto, sans-serif",
              fontSize: 34,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: 2.5,
              textShadow: '0 0 25px rgba(0, 240, 255, 1)',
            }}
          >
            "...welcome to the SAI INTELLIVERSE."
          </div>
        </div>
      )}

      {/* Matrix Glitch Overlay */}
      <GlitchEffect frame={frame} intensity={0.7} />
    </AbsoluteFill>
  );
};
