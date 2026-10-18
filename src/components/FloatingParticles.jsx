import React, { useMemo } from 'react';

export const FloatingParticles = ({ count = 40, frame, speed = 1.0, direction = 'up', color = '#00f0ff' }) => {
  // Deterministic pseudo-random particles
  const particles = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      const seedX = (Math.sin(i * 997.1) * 10000) % 1;
      const seedY = (Math.cos(i * 443.3) * 10000) % 1;
      const seedSize = (Math.sin(i * 123.7) * 10000) % 1;
      const seedSpeed = (Math.cos(i * 654.9) * 10000) % 1;

      list.push({
        id: i,
        baseX: Math.abs(seedX) * 1080,
        baseY: Math.abs(seedY) * 1920,
        size: 3 + Math.abs(seedSize) * 8,
        speedMultiplier: 0.6 + Math.abs(seedSpeed) * 1.2,
        swayFreq: 0.02 + (i % 5) * 0.01,
        swayAmp: 15 + (i % 6) * 10,
        opacity: 0.3 + (i % 4) * 0.2,
      });
    }
    return list;
  }, [count]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 12,
      }}
    >
      {particles.map((p) => {
        // Calculate vertical position
        let yOffset;
        if (direction === 'up') {
          // Move upward
          const totalDistance = 2200;
          const moved = (frame * speed * 3.5 * p.speedMultiplier) % totalDistance;
          yOffset = (p.baseY - moved + totalDistance) % totalDistance - 100;
        } else {
          // Converge towards center
          const targetY = 960;
          const progress = Math.min(1, (frame / 120) * speed * p.speedMultiplier);
          yOffset = p.baseY + (targetY - p.baseY) * progress;
        }

        const xOffset = p.baseX + Math.sin(frame * p.swayFreq + p.id) * p.swayAmp;

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: color,
              boxShadow: `0 0 ${p.size * 2}px ${color}, 0 0 ${p.size * 4}px ${color}`,
              opacity: p.opacity,
              transform: `translate3d(${xOffset}px, ${yOffset}px, 0)`,
            }}
          />
        );
      })}
    </div>
  );
};
