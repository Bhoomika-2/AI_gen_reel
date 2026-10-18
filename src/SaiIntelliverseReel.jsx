import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile } from 'remotion';
import { Scene1NormalWalk } from './components/Scene1NormalWalk';
import { Scene2ForbiddenPoster } from './components/Scene2ForbiddenPoster';
import { Scene3AntiGravityMatrix } from './components/Scene3AntiGravityMatrix';
import { Scene4MultiverseBreach } from './components/Scene4MultiverseBreach';

export const SaiIntelliverseReel = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', overflow: 'hidden' }}>
      {/* ===================== VIDEO SCENE TIMELINE (15s @ 30fps = 450 frames) ===================== */}

      {/* Scene 1 (0:00 - 0:03) | The Normal Walk & The First Glitch */}
      <Sequence from={0} durationInFrames={90} name="Scene 1: Normal Walk & First Glitch">
        <Scene1NormalWalk />
      </Sequence>

      {/* Scene 2 (0:03 - 0:07) | The Forbidden Poster */}
      <Sequence from={90} durationInFrames={120} name="Scene 2: The Forbidden Poster">
        <Scene2ForbiddenPoster />
      </Sequence>

      {/* Scene 3 (0:07 - 0:11) | The Anti-Gravity Matrix Shatter */}
      <Sequence from={210} durationInFrames={120} name="Scene 3: Anti-Gravity Matrix Shatter">
        <Scene3AntiGravityMatrix />
      </Sequence>

      {/* Scene 4 (0:11 - 0:15) | The Multiverse Breach */}
      <Sequence from={330} durationInFrames={120} name="Scene 4: The Multiverse Breach">
        <Scene4MultiverseBreach />
      </Sequence>

      {/* ===================== AUDIO & SOUND FX TIMELINE ===================== */}

      {/* 1. Scene 1 Upbeat College Chatter (0:00 - 0:02, frames 0 - 60) abruptly cut at 2.0s */}
      <Sequence from={0} durationInFrames={60} name="SFX: College Chatter">
        <Audio src={staticFile('audio/college_chatter.wav')} volume={0.9} />
      </Sequence>

      {/* 2. Scene 1 First Glitch Snap / Spark (at 2.0s / frame 60) */}
      <Sequence from={60} durationInFrames={30} name="SFX: Glitch Cut Spark">
        <Audio src={staticFile('audio/glitch_cut.wav')} volume={1.0} />
      </Sequence>

      {/* 3. Unsettling Low Digital Hum (from frame 60 through frame 210) */}
      <Sequence from={60} durationInFrames={150} name="SFX: Low Digital Hum">
        <Audio
          src={staticFile('audio/digital_hum.wav')}
          volume={(f) => interpolate(f, [0, 20, 130, 150], [0.3, 0.85, 0.85, 0.4])}
        />
      </Sequence>

      {/* 4. Scene 2 Static Electricity Arcing (frames 90 - 210) */}
      <Sequence from={90} durationInFrames={120} name="SFX: Static Electricity Arcing">
        <Audio
          src={staticFile('audio/electric_arc.wav')}
          volume={(f) => interpolate(f, [0, 20, 100, 120], [0.3, 0.85, 0.95, 0.5])}
        />
      </Sequence>

      {/* 5. Scene 2 Custom AI Voiceover: "Simulation instability detected..." */}
      <Sequence from={105} durationInFrames={105} name="VO: Simulation Instability">
        <Audio src={staticFile('audio/vo_instability.wav')} volume={1.0} />
      </Sequence>

      {/* 6. Scene 3 Massive Sonic Shockwave Blast (at frame 210 / 0:07) */}
      <Sequence from={210} durationInFrames={90} name="SFX: Sonic Shockwave Blast">
        <Audio src={staticFile('audio/shockwave_blast.wav')} volume={1.0} />
      </Sequence>

      {/* 7. Scene 3 Zero-G Tension Riser (frames 210 - 330) */}
      <Sequence from={210} durationInFrames={120} name="SFX: Zero-G Riser">
        <Audio
          src={staticFile('audio/zero_g_riser.wav')}
          volume={(f) => interpolate(f, [0, 120], [0.25, 0.95])}
        />
      </Sequence>

      {/* 8. Scene 3 Custom AI Voiceover: "...welcome to the SAI INTELLIVERSE." */}
      <Sequence from={228} durationInFrames={102} name="VO: Welcome to Sai Intelliverse">
        <Audio src={staticFile('audio/vo_welcome.wav')} volume={1.0} />
      </Sequence>

      {/* 9. Scene 4 Digital Glass Shatter FX (at frame 330 / 0:11) */}
      <Sequence from={330} durationInFrames={90} name="SFX: Digital Glass Shatter">
        <Audio src={staticFile('audio/glass_shatter.wav')} volume={1.0} />
      </Sequence>

      {/* 10. Scene 4 Earth-Shattering Cinematic Sub-Bass Drop (at frame 330 / 0:11) */}
      <Sequence from={330} durationInFrames={120} name="SFX: Cinematic Sub-Bass Drop">
        <Audio src={staticFile('audio/subbass_drop.wav')} volume={1.0} />
      </Sequence>
    </AbsoluteFill>
  );
};
