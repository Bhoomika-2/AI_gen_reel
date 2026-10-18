import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { ShockwaveBlast } from './ShockwaveBlast';
import { FloatingParticles } from './FloatingParticles';

export const Scene4TitleReveal = () => {
  const frame = useCurrentFrame();

  // Violent camera earthquake for the first 16 frames on sub-bass drop impact (0:12)
  const shakeMagnitude = interpolate(frame, [0, 5, 18], [28, 14, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shakeX = Math.sin(frame * 24.0) * shakeMagnitude;
  const shakeY = Math.cos(frame * 28.0) * shakeMagnitude;

  // Zoom surge on impact
  const scale = interpolate(frame, [0, 8, 90], [1.18, 1.05, 1.10], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Dynamic light burst brightness
  const burstBrightness = interpolate(frame, [0, 4, 25], [2.2, 1.4, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Neon green registration badge entrance
  const badgeOpacity = interpolate(frame, [10, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const badgeY = interpolate(frame, [10, 24], [35, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        overflow: 'hidden',
        transform: `translate3d(${shakeX}px, ${shakeY}px, 0)`,
      }}
    >
      {/* Background Volumetric 3D Chrome Typography & Shockwave Explosion */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `scale(${scale})`,
          transformOrigin: '50% 46%',
          filter: `contrast(1.15) brightness(${burstBrightness})`,
        }}
      >
        <Img
          src={staticFile('images/scene4.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Dynamic Shockwave Core Glow */}
        <div
          style={{
            position: 'absolute',
            top: '46%',
            left: '50%',
            width: 800,
            height: 800,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.4) 0%, rgba(180, 0, 255, 0.3) 50%, transparent 75%)',
            mixBlendMode: 'screen',
            opacity: interpolate(frame, [0, 15, 60], [1, 0.7, 0.3]),
          }}
        />
      </div>

      {/* Floating zero-g particles radiating after explosion */}
      <FloatingParticles count={40} frame={frame} speed={1.8} direction="up" color="#00f0ff" />
      <FloatingParticles count={25} frame={frame} speed={2.4} direction="up" color="#d946ef" />

      {/* Expanding Shockwave Rings & Blast Shards */}
      <ShockwaveBlast frame={frame} />

      {/* Visual Overlay: Crisp neon green text at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 140,
          left: '50%',
          transform: `translateX(-50%) translateY(${badgeY}px)`,
          opacity: badgeOpacity,
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            backgroundColor: 'rgba(3, 15, 8, 0.92)',
            border: '2px solid #00ff66',
            borderRadius: 60,
            padding: '20px 48px',
            boxShadow: '0 0 40px rgba(0, 255, 102, 0.55), inset 0 0 20px rgba(0, 255, 102, 0.25)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Pulsing indicator dot */}
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              backgroundColor: '#00ff66',
              boxShadow: '0 0 16px #00ff66, 0 0 32px #00ff66',
            }}
          />
          <div
            style={{
              fontFamily: "'Segoe UI', Roboto, sans-serif",
              fontSize: 27,
              fontWeight: 800,
              color: '#00ff66',
              letterSpacing: 3,
              textTransform: 'uppercase',
              textShadow: '0 0 18px rgba(0, 255, 102, 0.95)',
              whiteSpace: 'nowrap',
            }}
          >
            LAUNCHING SOON. Link in bio to register.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
