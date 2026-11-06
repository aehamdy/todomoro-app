import type { PomodoroSound } from "../types/pomodoro.types";

const BACKGROUND_SOUND_PATHS: Partial<Record<PomodoroSound, string>> = {
  bonfire: "sounds/background/bonfire.mp3",
  cafe: "sounds/background/cafe.mp3",
  classroom: "sounds/background/classroom.mp3",
  fireplace: "sounds/background/fireplace.mp3",
  forest: "sounds/background/forest.mp3",
  library: "sounds/background/library.mp3",
  "ocean-shore": "sounds/background/ocean-shore.mp3",
  rain: "sounds/background/rain.mp3",
  wind: "sounds/background/wind.mp3",
};

const NOISE_BUFFER_DURATION = 5;

const audioBufferCache = new WeakMap<
  AudioContext,
  Map<PomodoroSound, AudioBuffer>
>();

function getAudioBufferCache(context: AudioContext) {
  let cache = audioBufferCache.get(context);

  if (!cache) {
    cache = new Map();
    audioBufferCache.set(context, cache);
  }

  return cache;
}

function createNoiseBuffer(
  context: AudioContext,
  sound: PomodoroSound,
): AudioBuffer {
  const sampleRate = context.sampleRate;
  const length = sampleRate * NOISE_BUFFER_DURATION;

  const buffer = context.createBuffer(1, length, sampleRate);
  const channelData = buffer.getChannelData(0);

  let lastOut = 0;

  // Pink noise filter coefficients.
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  let b3 = 0;
  let b4 = 0;
  let b5 = 0;
  let b6 = 0;

  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;

    switch (sound) {
      case "white-noise":
        channelData[i] = white;
        break;

      case "pink-noise": {
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.969 * b2 + white * 0.153852;
        b3 = 0.8665 * b3 + white * 0.3104856;
        b4 = 0.55 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.016898;

        const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;

        b6 = white * 0.115926;
        channelData[i] = pink * 0.11;
        break;
      }

      case "brown-noise":
        lastOut = (lastOut + 0.02 * white) / 1.02;
        channelData[i] = lastOut * 3.5;
        break;
    }
  }

  return buffer;
}

async function loadAudioBuffer(
  context: AudioContext,
  sound: PomodoroSound,
): Promise<AudioBuffer | null> {
  const path = BACKGROUND_SOUND_PATHS[sound];

  if (!path) return null;

  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load background sound: ${sound}`);
  }

  const arrayBuffer = await response.arrayBuffer();

  return context.decodeAudioData(arrayBuffer);
}

export async function getBackgroundSoundBuffer(
  context: AudioContext,
  sound: PomodoroSound,
): Promise<AudioBuffer | null> {
  if (sound === "none") return null;

  const cache = getAudioBufferCache(context);
  const cachedBuffer = cache.get(sound);

  if (cachedBuffer) return cachedBuffer;

  let buffer: AudioBuffer;

  if (
    sound === "white-noise" ||
    sound === "pink-noise" ||
    sound === "brown-noise"
  ) {
    buffer = createNoiseBuffer(context, sound);
  } else {
    const loadedBuffer = await loadAudioBuffer(context, sound);

    if (!loadedBuffer) return null;

    buffer = loadedBuffer;
  }

  cache.set(sound, buffer);

  return buffer;
}
