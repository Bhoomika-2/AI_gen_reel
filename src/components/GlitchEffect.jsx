import React from 'react';
import { interpolate } from 'remotion';

export const GlitchEffect = ({ frame, intensity = 1.0 }) => {
  // Determine if a glitch pulse is occurring
  // Glitch spikes occur at specific frame intervals
  const isGlitching = (frame % 28 >= 24) || (frame % 45 >= 42) || (frame >= 105 && frame <= 118);
  
  if (!isGlitching) {
    // Return subtle scanlines only
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
          backgroundSize: '100% 6px',
          opacity: 0.35,
          zIndex: 15,
        }}
      />
    );
  }

  // Calculate random offsets based on current frame
  const shiftX = Math.sin(frame * 12.3) * 18 * intensity;
  const shiftY = Math.cos(frame * 7.7) * 8 * intensity;
  const sliceTop1 = (Math.sin(frame * 3.4) * 0.5 + 0.5) * 80;
  const sliceHeight1 = 4 + (frame % 7) * 3;

  const sliceTop2 = (Math.cos(frame * 5.1) * 0.5 + 0.5) * 70;
  const sliceHeight2 = 6 + (frame % 5) * 4;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 15,
      }}
    >
      {/* Scanline bars */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 240, 255, 0.15) 50%)',
          backgroundSize: '100% 4px',
          opacity: 0.6,
        }}
      />

      {/* Glitch Slice 1 */}
      <div
        style={{
          position: 'absolute',
          top: `${sliceTop1}%`,
          left: 0,
          width: '100%',
          height: `${sliceHeight1}%`,
          backgroundColor: 'rgba(0, 240, 255, 0.2)',
          transform: `translateX(${shiftX}px)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* Glitch Slice 2 with magenta tint */}
      <div
        style={{
          position: 'absolute',
          top: `${sliceTop2}%`,
          left: 0,
          width: '100%',
          height: `${sliceHeight2}%`,
          backgroundColor: 'rgba(255, 0, 128, 0.2)',
          transform: `translateX(${-shiftX * 1.2}px)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* Digital noise flash */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.1) 0%, transparent 80%)',
          transform: `translate(${shiftX * 0.5}px, ${shiftY * 0.5}px)`,
          opacity: 0.7,
        }}
      />
    </div>
  );
};
