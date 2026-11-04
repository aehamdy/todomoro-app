import type { PomodoroAlarmSound } from "../pomodoro.types";

let audioContext: AudioContext | null = null;

export async function unlockAlarmAudio(): Promise<void> {
  const context = getAudioContext();

  if (context.state === "suspended") {
    await context.resume();
  }
}

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  return audioContext;
}

interface PlayAlarmOptions {
  sound: PomodoroAlarmSound;
  volume: number;
}

export async function playAlarm({
  sound,
  volume,
}: PlayAlarmOptions): Promise<void> {
  if (sound === "none" || volume <= 0) return;

  const context = getAudioContext();

  if (context.state === "suspended") {
    await context.resume();
  }

  const now = context.currentTime;
  const masterGain = context.createGain();

  masterGain.gain.setValueAtTime(Math.min(volume, 100) / 100, now);

  masterGain.connect(context.destination);

  const playTone = (
    frequency: number,
    startTime: number,
    duration: number,
    type: OscillatorType = "sine",
  ) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.8, startTime + 0.02);
    gain.gain.setValueAtTime(0.8, startTime + duration - 0.05);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);

    oscillator.connect(gain);
    gain.connect(masterGain);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  };

  switch (sound) {
    case "default":
      playTone(880, now, 0.25);
      playTone(880, now + 0.35, 0.25);
      playTone(1046.5, now + 0.7, 0.45);
      break;

    case "bell":
      playTone(1046.5, now, 0.8, "sine");
      playTone(1318.5, now + 0.05, 0.7, "sine");
      break;

    case "digital":
      playTone(880, now, 0.12, "square");
      playTone(660, now + 0.18, 0.12, "square");
      playTone(880, now + 0.36, 0.12, "square");
      playTone(660, now + 0.54, 0.25, "square");
      break;

    case "gentle":
      playTone(523.25, now, 0.5, "sine");
      playTone(659.25, now + 0.4, 0.5, "sine");
      playTone(783.99, now + 0.8, 0.7, "sine");
      break;
  }
}
