import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { LightningArc } from './LightningArc';
import { GlitchEffect } from './GlitchEffect';

export const Scene2ForbiddenPoster = () => {
  const frame = useCurrentFrame(); // 0 to 120 (0:03 - 0:07)

  // Camera motion: slow cinematic push towards poster & fingertip
  const scale = interpolate(frame, [0, 120], [1.02, 1.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame, [0, 120], [0, -18]);

  // Subtle breathing and pulsing of the purple neon energy lines
  // Breathing cycle: ~1.2 Hz sinusoidal pulse
  const breath = Math.sin(frame * 0.16);
  const posterGlow = 0.75 + 0.35 * breath;

  // Static electricity arcing intensity (grows as hand gets closer)
  const arcIntensity = interpolate(frame, [0, 20, 120], [0.3, 0.75, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Voiceover plays at frame 15 - 110: "Simulation instability detected..."
  const showSubtitle = frame >= 15 && frame <= 115;

  return (
    <AbsoluteFill style={{ backgroundColor: '#070913', overflow: 'hidden' }}>
      {/* Background Poster Interaction Scene */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: '40% 50%',
        }}
      >
        <Img
          src={staticFile('images/scene2_poster.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: `contrast(1.1) brightness(${0.96 + 0.08 * breath})`,
          }}
        />

        {/* Pulsing and Breathing Purple Neon Energy Overlay on the Notice Board Poster */}
        <div
          style={{
            position: 'absolute',
            top: '19%',
            left: '5%',
            width: '32%',
            height: '52%',
            border: '3px solid rgba(188, 19, 254, 0.7)',
            boxShadow: `0 0 ${35 * posterGlow}px rgba(188, 19, 254, 0.9), inset 0 0 ${25 * posterGlow}px rgba(188, 19, 254, 0.6)`,
            borderRadius: 12,
            mixBlendMode: 'screen',
            pointerEvents: 'none',
          }}
        />

        {/* Glowing Neon Energy Aura radiating outward from poster */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '6%',
            width: '30%',
            height: '50%',
            background:
              'radial-gradient(circle at center, rgba(188, 19, 254, 0.35) 0%, rgba(0, 240, 255, 0.15) 50%, transparent 80%)',
            opacity: posterGlow,
            mixBlendMode: 'screen',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Static Electricity Visible Arcs from Poster to Fingertip */}
      <LightningArc
        startX={360}
        startY={880}
        endX={420}
        endY={925}
        frame={frame}
        color="#00f0ff"
        glowColor="#bc13fe"
      />

      {/* Targeting Reticle & Quantum Scanner */}
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
          color: '#bc13fe',
          textShadow: '0 0 12px #bc13fe',
          zIndex: 30,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#bc13fe',
              boxShadow: '0 0 14px #bc13fe',
            }}
          />
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 3, color: '#ffffff' }}>
            SAI INTELLIVERSE
          </span>
        </div>
        <div style={{ fontSize: 16, letterSpacing: 2, color: '#00f0ff' }}>
          NODE 02 // NOTICE BOARD
        </div>
      </div>

      {/* Telemetry info */}
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: 140,
          fontFamily: "'Courier New', monospace",
          fontSize: 16,
          lineHeight: '26px',
          color: 'rgba(0, 240, 255, 0.85)',
          background: 'rgba(7, 10, 24, 0.75)',
          padding: '14px 20px',
          borderRadius: 8,
          borderLeft: '3px solid #bc13fe',
          backdropFilter: 'blur(10px)',
          letterSpacing: 2,
          zIndex: 25,
        }}
      >
        <div>▸ ANOMALY TARGET: SAI INTELLIVERSE POSTER</div>
        <div>▸ BIO-VOLTAGE: {Math.round(4800 + Math.sin(frame * 0.5) * 800)} V</div>
        <div>▸ CONTACT PROXIMITY: {Math.max(1, Math.round((120 - frame) * 0.15))} mm</div>
      </div>

      {/* Voiceover Subtitle Banner: "Simulation instability detected..." */}
      {showSubtitle && (
        <div
          style={{
            position: 'absolute',
            bottom: 110,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(5, 8, 24, 0.92)',
            border: '1px solid rgba(188, 19, 254, 0.7)',
            boxShadow: '0 0 35px rgba(188, 19, 254, 0.5)',
            borderRadius: 16,
            padding: '22px 42px',
            maxWidth: 960,
            textAlign: 'center',
            backdropFilter: 'blur(14px)',
            zIndex: 35,
          }}
        >
          <div
            style={{
              fontSize: 14,
              letterSpacing: 4,
              color: '#00f0ff',
              marginBottom: 8,
              fontFamily: "'Courier New', monospace",
              textTransform: 'uppercase',
            }}
          >
            [AI SYNAPSE VOICE OVERRIDE]
          </div>
          <div
            style={{
              fontFamily: "'Segoe UI', Roboto, sans-serif",
              fontSize: 30,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: 2,
              textShadow: '0 0 20px rgba(188, 19, 254, 0.9)',
            }}
          >
            "Simulation instability detected..."
          </div>
        </div>
      )}

      {/* Subtle Ambient Glitch */}
      <GlitchEffect frame={frame} intensity={0.6} />
    </AbsoluteFill>
  );
};
