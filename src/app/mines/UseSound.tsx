import React, { useEffect, useState } from "react";
import { Audio } from 'expo-av';

export default function useSound(location: string ){
    const [sound, setSound] = useState<Audio.Sound>();

  const loadSound = async () =>  {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( {uri: location});
    setSound(sound);

    console.log('Playing Sound');
    
  }

  const playAudio = async () => {
    sound?.replayAsync();
  };

  useEffect(() => {
    loadSound();

    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return playAudio;
}