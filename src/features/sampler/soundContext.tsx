import { Audio } from "expo-av";
import { AVPlaybackSource } from "expo-av/build/AV.types";
import { createContext, FC, useContext, useState } from "react";

interface SoundContextType {
  sound: Audio.Sound | undefined;
  updateSound: (sound: Audio.Sound) => void;
  playSound: (uri: AVPlaybackSource | string) => Promise<void>;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const useSoundContext = () => {
  return useContext(SoundContext);
};

const SoundContextProvider: FC = ({ children }) => {
  const [sound, setSound] = useState<Audio.Sound | undefined>();
  const updateSound = (newSound: Audio.Sound) => {
    sound?.unloadAsync();
    setSound(newSound);
  };
  async function playSound(uri: AVPlaybackSource | string) {
    sound?.unloadAsync();
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    if (typeof uri === "string") {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
      updateSound(sound);
    } else {
      const { sound } = await Audio.Sound.createAsync(uri);

      await sound.playAsync();
      updateSound(sound);
    }
  }

  return (
    <SoundContext.Provider value={{ sound, updateSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export default SoundContextProvider;
