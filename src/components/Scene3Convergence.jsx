import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { CyberHUD } from './CyberHUD';
import { GlitchEffect } from './GlitchEffect';

export const Scene3Convergence = () => {
  const frame = useCurrentFrame();

  // Fast dynamic camera panning and Dutch angle tilt
  const rotation = interpolate(frame, [0, 60, 120], [-2.5, 2.0, -1.0]);
  const scale = interpolate(frame, [0, 40, 80, 120], [1.10, 1.18, 1.14, 1.25]);
  const translateX = interpolate(frame, [0, 60, 120], [-35, 40, -10]);
  const translateY = interpolate(frame, [0, 60, 120], [20, -30, 15]);

  // Accelerating speed lines / chromatic vibration approaching drop at frame 120
  const vibration = frame > 80 ? (Math.sin(frame * 2.5) * (frame - 80) * 0.3) : 0;
  const convergeProgress = interpolate(frame, [0, 120], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#02030a', overflow: 'hidden' }}>
      {/* Background Assembling 3D Data Structure */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `scale(${scale}) rotate(${rotation}deg) translate(${translateX + vibration}px, ${translateY}px)`,
          transformOrigin: '50% 50%',
          filter: `contrast(1.15) saturate(1.2) brightness(${1.0 + convergeProgress * 0.2})`,
        }}
      >
        <Img
          src={staticFile('images/scene3.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Dynamic Holographic Convergence Pulse */}
        <div
          style={{
            position: 'absolute',
            top: '48%',
            left: '50%',
            width: 700,
            height: 700,
            borderRadius: '50%',
            transform: `translate(-50%, -50%) scale(${0.8 + 0.4 * Math.sin(frame * 0.25)})`,
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.35) 0%, rgba(220, 20, 255, 0.25) 45%, transparent 70%)',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Holographic Wireframe Geometric Nodes Assembling */}
      <div
        style={{
          position: 'absolute',
          top: '48%',
          left: '50%',
          width: 500,
          height: 500,
          transform: `translate(-50%, -50%) rotate(${frame * 1.5}deg)`,
          border: '2px solid rgba(0, 240, 255, 0.4)',
          boxShadow: '0 0 40px rgba(0, 240, 255, 0.3)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '15%',
            width: '70%',
            height: '70%',
            border: '2px solid rgba(220, 20, 255, 0.5)',
            transform: `rotate(${-frame * 3.0}deg)`,
          }}
        />
      </div>

      {/* Radial Speed streaks during final riser buildup (frames 80 to 120) */}
      {frame > 70 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 50% 48%, transparent 40%, rgba(0, 240, 255, 0.25) 90%)',
            mixBlendMode: 'screen',
            opacity: interpolate(frame, [70, 120], [0, 0.8]),
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Dynamic Cyber Glitch during high energy assembly */}
      <GlitchEffect frame={frame} intensity={1.4} />

      {/* Cyber HUD Overlay */}
      <CyberHUD
        sceneNumber="3"
        title="The Convergence"
        subtitle="Welcome to the next dimension."
        telemetry={[
          'DIMENSIONAL BREACH: ACTIVE',
          '3D GEOMETRIC NODES: ASSEMBLING',
          'HOLOGRAPHIC DENSITY: 98.4%',
          'EVENT HORIZON: APPROACHING',
          `CORE SYNTHESIS: ${Math.min(100, Math.floor(65 + convergeProgress * 35))}%`,
        ]}
      />
    </AbsoluteFill>
  );
};
