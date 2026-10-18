import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { CyberHUD } from './CyberHUD';
import { GlitchEffect } from './GlitchEffect';

export const Scene1BootUp = () => {
  const frame = useCurrentFrame();

  // Slow motion push-in zoom into the android's glowing face
  const scale = interpolate(frame, [0, 120], [1.02, 1.16], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Slow drift
  const translateY = interpolate(frame, [0, 120], [0, -25]);

  // Neon circuit pulse intensity (breathing glow)
  const circuitGlow = 0.8 + 0.3 * Math.sin(frame * 0.15);

  return (
    <AbsoluteFill style={{ backgroundColor: '#02040a', overflow: 'hidden' }}>
      {/* Background Image Container with Slow-Motion Camera Push */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: '50% 40%',
          filter: `contrast(1.08) brightness(${0.95 + 0.1 * circuitGlow})`,
        }}
      >
        <Img
          src={staticFile('images/scene1.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Dynamic Neon Circuit Bloom Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(ellipse at 48% 42%, rgba(0, 240, 255, 0.22) 0%, transparent 60%)',
            mixBlendMode: 'screen',
            opacity: circuitGlow,
          }}
        />
      </div>

      {/* Cybernetic Face Reticle / Scanner Ring */}
      <div
        style={{
          position: 'absolute',
          top: '36%',
          left: '46%',
          width: 320,
          height: 320,
          borderRadius: '50%',
          border: '1px dashed rgba(0, 240, 255, 0.5)',
          transform: `translate(-50%, -50%) rotate(${frame * 0.8}deg)`,
          pointerEvents: 'none',
          boxShadow: '0 0 25px rgba(0, 240, 255, 0.25)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -6,
            left: '50%',
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#00f0ff',
            boxShadow: '0 0 10px #00f0ff',
          }}
        />
      </div>

      {/* Subtle Digital Matrix Camera Glitch */}
      <GlitchEffect frame={frame} intensity={0.8} />

      {/* Cyber HUD Overlay */}
      <CyberHUD
        sceneNumber="1"
        title="The Boot-Up"
        subtitle="System diagnostic complete. Disengaging standard physics."
        telemetry={[
          'SYSTEM BOOT: SAI-CORE v4.9',
          'NEURAL SYNAPSE: ACTIVE',
          'DIAGNOSTIC: 100% COMPLETE',
          'PHYSICS STATUS: DISENGAGING',
          'GRAVITY ANCHOR: RELEASING...',
        ]}
      />
    </AbsoluteFill>
  );
};
