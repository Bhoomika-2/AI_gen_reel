import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { CyberHUD } from './CyberHUD';
import { FloatingParticles } from './FloatingParticles';

export const Scene2GravityOverride = () => {
  const frame = useCurrentFrame();

  // Slow upward camera pedestal drift simulating anti-gravity lift
  const translateY = interpolate(frame, [0, 120], [30, -50], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [0, 120], [1.06, 1.14], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Soft pulsing volumetric light ray effect
  const lightPulse = 0.5 + 0.3 * Math.sin(frame * 0.08);

  return (
    <AbsoluteFill style={{ backgroundColor: '#030510', overflow: 'hidden' }}>
      {/* Background Zero-G Lab Scene */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: '50% 60%',
          filter: 'contrast(1.06) brightness(1.02)',
        }}
      >
        <Img
          src={staticFile('images/scene2.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Soft Volumetric Light Beams streaming from top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(255, 230, 180, 0.18) 0%, rgba(0, 240, 255, 0.12) 40%, transparent 80%)',
            mixBlendMode: 'screen',
            opacity: lightPulse,
          }}
        />

        {/* Anti-Gravity Distortion Wave */}
        <div
          style={{
            position: 'absolute',
            top: `${interpolate(frame, [0, 120], [90, 5])}%`,
            left: 0,
            width: '100%',
            height: 180,
            background: 'linear-gradient(180deg, transparent 0%, rgba(0, 240, 255, 0.18) 50%, transparent 100%)',
            filter: 'blur(10px)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Zero-G Floating Luminous Dust Particles & Micro-Orbs */}
      <FloatingParticles count={55} frame={frame} speed={1.2} direction="up" color="#ffeaa7" />
      <FloatingParticles count={30} frame={frame} speed={1.8} direction="up" color="#00f0ff" />

      {/* Anti-Gravity Warning HUD */}
      <CyberHUD
        sceneNumber="2"
        title="The Gravity Override"
        subtitle="Local gravity fields: Overridden."
        telemetry={[
          '▲ GRAVITY FIELD: 0.00 G [ZERO-G]',
          'LOCAL MASS INVERSION: ACTIVE',
          'LAB ATTRACTION: NULLIFIED',
          'ASCENT VELOCITY: +1.42 m/s',
          'SAI FESTIVAL LAB PROTOCOL: ENGAGED',
        ]}
      />
    </AbsoluteFill>
  );
};
