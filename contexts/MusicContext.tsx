"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface MusicContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  hasInteracted: boolean;
  toggleMute: () => void;
  startMusic: () => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume] = useState(0.35);
  const [hasInteracted, setHasInteracted] = useState(false);
  const fadingRef = useRef(false);

  // Inisialisasi audio element sekali
  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio("/music/heaven.mp3");
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "auto";
    audioRef.current = audio;

    // Coba autoplay
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      })
      .catch(() => {
        // Autoplay diblokir, tunggu interaksi user
        setIsPlaying(false);
      });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [volume]);

  const startMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || hasInteracted) return;
    audio.volume = volume;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      })
      .catch(() => {});
  }, [hasInteracted, volume]);

  // Fade volume smoothly
  const fadeVolume = useCallback(
    (targetVolume: number, duration = 600) => {
      const audio = audioRef.current;
      if (!audio || fadingRef.current) return;
      fadingRef.current = true;
      const start = audio.volume;
      const diff = targetVolume - start;
      const steps = 30;
      const stepTime = duration / steps;
      let step = 0;
      const interval = setInterval(() => {
        step++;
        const newVol = Math.min(1, Math.max(0, start + diff * (step / steps)));
        audio.volume = newVol;
        if (step >= steps) {
          clearInterval(interval);
          fadingRef.current = false;
          if (targetVolume === 0) {
            audio.muted = true;
            setIsMuted(true);
          }
        }
      }, stepTime);
    },
    []
  );

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      // Unmute: fade masuk
      audio.muted = false;
      audio.volume = 0;
      fadeVolume(volume);
      setIsMuted(false);
    } else {
      // Mute: fade keluar
      fadeVolume(0);
    }
  }, [isMuted, fadeVolume, volume]);

  return (
    <MusicContext.Provider
      value={{ isPlaying, isMuted, volume, hasInteracted, toggleMute, startMusic }}
    >
      {/* Intercept first click to start music */}
      <div
        onClick={startMusic}
        onTouchStart={startMusic}
        className="contents"
      >
        {children}
      </div>
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside MusicProvider");
  return ctx;
}
