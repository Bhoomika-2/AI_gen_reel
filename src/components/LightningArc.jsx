import React, { useMemo } from 'react';

/**
 * Procedural Dynamic Electric Lightning Arc
 * Simulates high-voltage plasma arcing between poster edge and fingertip
 */
export const LightningArc = ({
  startX = 320,
  startY = 890,
  endX = 425,
  endY = 930,
  frame = 0,
  color = '#00f0ff',
  glowColor = '#bc13fe',
  branches = 3,
}) => {
  // Generate jittered lightning path based on frame
  const paths = useMemo(() => {
    const list = [];

    // Main bolt
    const steps = 14;
    let d = `M ${startX} ${startY}`;
    let prevX = startX;
    let prevY = startY;

    // Seed jitter with frame
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      // Target linear position
      const targetX = startX + (endX - startX) * t;
      const targetY = startY + (endY - startY) * t;

      // Perpendicular jitter
      const jitterAmount = Math.sin(frame * 3.7 + i * 2.1) * 22 * (1 - Math.abs(t - 0.5) * 1.5);
      const perpAngle = Math.atan2(endY - startY, endX - startX) + Math.PI / 2;
      const jX = targetX + Math.cos(perpAngle) * jitterAmount + (Math.sin(frame * 7.1 + i) * 6);
      const jY = targetY + Math.sin(perpAngle) * jitterAmount + (Math.cos(frame * 6.3 + i) * 6);

      d += ` L ${jX} ${jY}`;
      prevX = jX;
      prevY = jY;

      // Sub-branch
      if (i === 6 || i === 9) {
        let branchD = `M ${jX} ${jY}`;
        const bLength = 40 + (i % 3) * 20;
        const bAngle = perpAngle + (i % 2 === 0 ? 0.6 : -0.6);
        const bX = jX + Math.cos(bAngle) * bLength + Math.sin(frame * 5.2) * 10;
        const bY = jY + Math.sin(bAngle) * bLength + Math.cos(frame * 4.8) * 10;
        branchD += ` L ${bX} ${bY}`;
        list.push({ d: branchD, width: 2, opacity: 0.65 });
      }
    }
    list.unshift({ d, width: 4.5, opacity: 0.95 });
    return list;
  }, [startX, startY, endX, endY, frame]);

  // Plasma sparking particles at contact point
  const sparkCount = 8;
  const sparks = useMemo(() => {
    const arr = [];
    for (let i = 0; i < sparkCount; i++) {
      const angle = (i / sparkCount) * Math.PI * 2 + (frame * 0.4);
      const dist = 12 + ((frame * 3 + i * 17) % 35);
      const sx = endX + Math.cos(angle) * dist;
      const sy = endY + Math.sin(angle) * dist;
      arr.push({ sx, sy, size: 2 + (i % 3) * 2 });
    }
    return arr;
  }, [endX, endY, frame]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        pointerEvents: 'none',
        zIndex: 25,
      }}
    >
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          filter: `drop-shadow(0 0 12px ${glowColor}) drop-shadow(0 0 25px ${color})`,
        }}
      >
        {/* Glow halo */}
        {paths.map((p, idx) => (
          <path
            key={`halo-${idx}`}
            d={p.d}
            fill="none"
            stroke={glowColor}
            strokeWidth={p.width * 3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.4}
            style={{ mixBlendMode: 'screen' }}
          />
        ))}

        {/* Core Electric Beam */}
        {paths.map((p, idx) => (
          <path
            key={`core-${idx}`}
            d={p.d}
            fill="none"
            stroke="#ffffff"
            strokeWidth={p.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={p.opacity}
          />
        ))}

        {/* Cyan outer core */}
        {paths.map((p, idx) => (
          <path
            key={`cyan-${idx}`}
            d={p.d}
            fill="none"
            stroke={color}
            strokeWidth={p.width * 1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.7}
            style={{ mixBlendMode: 'screen' }}
          />
        ))}
      </svg>

      {/* Plasma contact corona glow at fingertip */}
      <div
        style={{
          position: 'absolute',
          left: endX,
          top: endY,
          width: 50,
          height: 50,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, #ffffff 0%, ${color} 40%, ${glowColor} 70%, transparent 100%)`,
          boxShadow: `0 0 40px ${color}, 0 0 80px ${glowColor}`,
          mixBlendMode: 'screen',
        }}
      />

      {/* Sparks flying from fingertip */}
      {sparks.map((s, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            left: s.sx,
            top: s.sy,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            backgroundColor: idx % 2 === 0 ? '#00f0ff' : '#ffffff',
            boxShadow: `0 0 10px #00f0ff`,
          }}
        />
      ))}
    </div>
  );
};
