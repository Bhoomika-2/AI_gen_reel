import React from 'react';
import { interpolate } from 'remotion';

/**
 * High-tech HUD Overlay for Cyber/Sci-Fi aesthetics
 */
export const CyberHUD = ({ sceneNumber, title, subtitle, telemetry = [] }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px 60px',
        fontFamily: "'Courier New', monospace, sans-serif",
        color: '#00f0ff',
        textShadow: '0 0 10px rgba(0,240,255,0.7)',
        zIndex: 20,
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid rgba(0, 240, 255, 0.3)',
          paddingBottom: 20,
          background: 'linear-gradient(180deg, rgba(0, 240, 255, 0.05) 0%, transparent 100%)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: '#00ff66',
                boxShadow: '0 0 12px #00ff66',
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: 26, letterSpacing: 4, fontWeight: 800 }}>
              SAI INTELLIVERSE
            </span>
          </div>
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginTop: 6, letterSpacing: 2 }}>
            NODE 0{sceneNumber} :: {title.toUpperCase()}
          </div>
        </div>

        <div style={{ textAlign: 'right', fontSize: 16, color: 'rgba(0, 240, 255, 0.8)', letterSpacing: 2 }}>
          <div>REC ● [LIVE]</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
            1080x1920 // 60FPS
          </div>
        </div>
      </div>

      {/* Center Target Crosshairs / Reticle brackets */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 720,
          height: 1000,
          border: '1px solid rgba(0, 240, 255, 0.15)',
          boxShadow: 'inset 0 0 40px rgba(0, 240, 255, 0.05)',
          pointerEvents: 'none',
        }}
      >
        {/* Corner Brackets */}
        <div style={{ position: 'absolute', top: -2, left: -2, width: 30, height: 30, borderTop: '4px solid #00f0ff', borderLeft: '4px solid #00f0ff' }} />
        <div style={{ position: 'absolute', top: -2, right: -2, width: 30, height: 30, borderTop: '4px solid #00f0ff', borderRight: '4px solid #00f0ff' }} />
        <div style={{ position: 'absolute', bottom: -2, left: -2, width: 30, height: 30, borderBottom: '4px solid #00f0ff', borderLeft: '4px solid #00f0ff' }} />
        <div style={{ position: 'absolute', bottom: -2, right: -2, width: 30, height: 30, borderBottom: '4px solid #00f0ff', borderRight: '4px solid #00f0ff' }} />
        
        {/* Reticle grid marks */}
        <div style={{ position: 'absolute', top: '50%', left: 20, width: 40, height: 1, backgroundColor: 'rgba(0,240,255,0.5)' }} />
        <div style={{ position: 'absolute', top: '50%', right: 20, width: 40, height: 1, backgroundColor: 'rgba(0,240,255,0.5)' }} />
      </div>

      {/* Telemetry Stream Left */}
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: '38%',
          fontSize: 16,
          lineHeight: '26px',
          color: 'rgba(0, 240, 255, 0.75)',
          background: 'rgba(5, 12, 30, 0.65)',
          padding: '16px 22px',
          borderRadius: 8,
          borderLeft: '3px solid #00f0ff',
          backdropFilter: 'blur(10px)',
          letterSpacing: 2,
        }}
      >
        {telemetry.map((line, idx) => (
          <div key={idx} style={{ opacity: 0.9 }}>
            ▸ {line}
          </div>
        ))}
      </div>

      {/* Voiceover Subtitle Banner Bottom */}
      {subtitle && (
        <div
          style={{
            alignSelf: 'center',
            marginBottom: 40,
            background: 'rgba(3, 8, 22, 0.85)',
            border: '1px solid rgba(0, 240, 255, 0.6)',
            boxShadow: '0 0 35px rgba(0, 240, 255, 0.35)',
            borderRadius: 16,
            padding: '24px 44px',
            maxWidth: 960,
            textAlign: 'center',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div
            style={{
              fontSize: 14,
              letterSpacing: 4,
              color: '#00ffcc',
              marginBottom: 8,
              textTransform: 'uppercase',
            }}
          >
            [AUDIO SYNAPSE // VOICEOVER]
          </div>
          <div
            style={{
              fontFamily: "'Segoe UI', Roboto, sans-serif",
              fontSize: 32,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: 1.5,
              textShadow: '0 0 20px rgba(0, 240, 255, 0.9)',
            }}
          >
            "{subtitle}"
          </div>
        </div>
      )}
    </div>
  );
};
