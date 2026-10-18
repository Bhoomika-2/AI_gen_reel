import React from 'react';
import { Composition } from 'remotion';
import { SaiIntelliverseReel } from './SaiIntelliverseReel';

export const RemotionRoot = () => {
  return (
    <Composition
      id="SaiIntelliverseReel"
      component={SaiIntelliverseReel}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
