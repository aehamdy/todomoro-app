import { useCallback, useEffect, useRef, useState } from "react";
import type { PomodoroSound } from "../pomodoro.types";
import { getBackgroundSoundBuffer } from "../utils/backgroundSound.utils";

interface UseBackgroundSoundOptions {
  sound: PomodoroSound;
  volume: number;
}

interface UseBackgroundSoundReturn {
  isPlaying: boolean;
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
}

export function useBackgroundSound({
  sound,
  volume,
}: UseBackgroundSoundOptions): UseBackgroundSoundReturn {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const activeSoundRef = useRef<PomodoroSound | null>(null);

  // Invalidates pending asynchronous playback requests.
  const playbackRequestIdRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const getAudioContext = useCallback((): AudioContext => {
    if (!audioContextRef.current) {
      const context = new AudioContext();
      const gainNode = context.createGain();

      gainNode.gain.value = volume;
      gainNode.connect(context.destination);

      audioContextRef.current = context;
      gainNodeRef.current = gainNode;
    }

    return audioContextRef.current;
  }, [volume]);

  const setVolume = useCallback((nextVolume: number) => {
    const gainNode = gainNodeRef.current;

    if (!gainNode) return;

    const clampedVolume = Math.max(0, Math.min(1, nextVolume));

    gainNode.gain.setTargetAtTime(
      clampedVolume,
      gainNode.context.currentTime,
      0.05,
    );
  }, []);

  // Stop and disconnect the active source.
  const stopSource = useCallback(() => {
    const sourceNode = sourceNodeRef.current;

    if (!sourceNode) return;

    sourceNodeRef.current = null;
    activeSoundRef.current = null;
    sourceNode.onended = null;

    try {
      sourceNode.stop();
    } catch {
      // The source may already have stopped.
    }

    sourceNode.disconnect();
  }, []);

  // Stop playback and cancel pending requests.
  const stop = useCallback(() => {
    playbackRequestIdRef.current += 1;

    stopSource();
    setIsPlaying(false);
  }, [stopSource]);

  // Suspend the AudioContext without destroying the source.
  const pause = useCallback(() => {
    playbackRequestIdRef.current += 1;

    const context = audioContextRef.current;

    if (context && context.state === "running") {
      void context.suspend();
    }

    setIsPlaying(false);
  }, []);

  const play = useCallback(async () => {
    if (sound === "none") {
      stop();
      return;
    }

    const requestId = ++playbackRequestIdRef.current;

    const context = getAudioContext();
    const gainNode = gainNodeRef.current;

    if (!gainNode) return;

    if (context.state === "suspended") {
      await context.resume();
    }

    // A newer request may have started while resuming.
    if (requestId !== playbackRequestIdRef.current) return;

    // Resume the existing source instead of restarting it.
    if (sourceNodeRef.current && activeSoundRef.current === sound) {
      setIsPlaying(true);
      return;
    }

    // Replace an existing source if the selected sound changed.
    stopSource();

    const buffer = await getBackgroundSoundBuffer(context, sound);

    // Ignore results from outdated playback requests.
    if (requestId !== playbackRequestIdRef.current) return;

    if (!buffer) return;

    const sourceNode = context.createBufferSource();

    sourceNode.buffer = buffer;
    sourceNode.loop = true;
    sourceNode.connect(gainNode);

    sourceNode.onended = () => {
      if (sourceNodeRef.current === sourceNode) {
        sourceNodeRef.current = null;
        activeSoundRef.current = null;
        setIsPlaying(false);
      }
    };

    sourceNodeRef.current = sourceNode;
    activeSoundRef.current = sound;

    sourceNode.start();

    setIsPlaying(true);
  }, [sound, getAudioContext, stop, stopSource]);

  // Synchronize volume with the GainNode.
  useEffect(() => {
    setVolume(volume);
  }, [volume, setVolume]);

  // Release audio resources when the hook unmounts.
  useEffect(() => {
    return () => {
      playbackRequestIdRef.current += 1;

      stopSource();

      const gainNode = gainNodeRef.current;
      const context = audioContextRef.current;

      gainNode?.disconnect();
      gainNodeRef.current = null;

      if (context && context.state !== "closed") {
        void context.close();
      }

      audioContextRef.current = null;
    };
  }, [stopSource]);

  return {
    isPlaying,
    play,
    pause,
    stop,
    setVolume,
  };
}
