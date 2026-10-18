import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { GlitchEffect } from './GlitchEffect';

export const Scene1NormalWalk = () => {
  const frame = useCurrentFrame(); // 0 to 90 (0:00 - 0:03)

  // Camera motion: cinematic forward walking push-in
  const scale = interpolate(frame, [0, 90], [1.0, 1.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Walking bob (subtle human handheld camera sway)
  const bobY = Math.sin(frame * 0.35) * 4;
  const bobX = Math.cos(frame * 0.18) * 3;

  // The Glitch starts at frame 60 (2.0s)
  const isGlitched = frame >= 60;
  
  // Strobe flicker between frames 60 and 90
  const strobePattern = [60, 61, 63, 64, 67, 70, 71, 74, 78, 82, 83];
  const isStrobing = strobePattern.includes(frame);
  
  // Electric blue flash intensity
  const blueFlash = isGlitched
    ? interpolate(frame, [60, 65, 75, 90], [0.85, 0.4, 0.7, 0.9])
    : 0;

  // Holographic grid ripple progress (starts at frame 60)
  const gridRipple = isGlitched ? interpolate(frame, [60, 90], [0, 1]) : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0d14', overflow: 'hidden' }}>
      {/* Container with walking camera movement */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `scale(${scale}) translate3d(${bobX}px, ${bobY}px, 0)`,
          transformOrigin: '50% 45%',
        }}
      >
        {/* Base Normal Walking Image (0 - 60) */}
        <Img
          src={staticFile('images/scene1_normal.jpg')}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: frame < 60 ? 1 : isStrobing ? 0.3 : 0,
            transition: 'opacity 0.05s',
          }}
        />

        {/* Glitched State Image (60 - 90: lights turn electric blue, students pause confused) */}
        {frame >= 60 && (
          <Img
            src={staticFile('images/scene1_glitch.jpg')}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isStrobing ? 0.4 : 1,
              filter: `contrast(1.15) saturate(1.2)`,
            }}
          />
        )}

        {/* Electric Blue Overhead Light Flicker Flare */}
        {isGlitched && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '45%',
              background:
                'radial-gradient(ellipse at 50% 15%, rgba(0, 240, 255, 0.85) 0%, rgba(0, 140, 255, 0.4) 45%, transparent 80%)',
              mixBlendMode: 'screen',
              opacity: blueFlash,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Holographic Matrix Grid Ripple across walls */}
        {isGlitched && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage:
                'linear-gradient(rgba(0, 240, 255, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.35) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              opacity: gridRipple * 0.75,
              mixBlendMode: 'screen',
              transform: `perspective(600px) rotateX(15deg) translateY(${frame * 4}px)`,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      {/* Glitch filter effect active during 60 - 90 */}
      {isGlitched && <GlitchEffect frame={frame} intensity={1.4} />}

      {/* Cinematic HUD Overlay */}
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
          color: isGlitched ? '#00f0ff' : '#ffffff',
          textShadow: isGlitched ? '0 0 12px #00f0ff' : '0 2px 8px rgba(0,0,0,0.8)',
          zIndex: 30,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: isGlitched ? '#ff0055' : '#00ff66',
              boxShadow: `0 0 12px ${isGlitched ? '#ff0055' : '#00ff66'}`,
            }}
          />
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 3 }}>
            SAI INTELLIVERSE
          </span>
        </div>
        <div style={{ fontSize: 16, letterSpacing: 2, opacity: 0.85 }}>
          {isGlitched ? 'GLITCH IN PROGRESS' : 'CAMPUS HALL // 11:42 AM'}
        </div>
      </div>

      {/* Alert banner if glitched */}
      {isGlitched && (
        <div
          style={{
            position: 'absolute',
            bottom: 120,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(5, 12, 35, 0.9)',
            border: '1px solid #00f0ff',
            boxShadow: '0 0 25px rgba(0, 240, 255, 0.6)',
            borderRadius: 12,
            padding: '14px 32px',
            fontFamily: "'Courier New', monospace",
            fontSize: 20,
            fontWeight: 700,
            color: '#00f0ff',
            letterSpacing: 3,
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <span style={{ color: '#ff0055' }}>[!]</span>
          <span>ANOMALY DETECTED // FREQUENCY SHIFT</span>
        </div>
      )}
    </AbsoluteFill>
  );
};
