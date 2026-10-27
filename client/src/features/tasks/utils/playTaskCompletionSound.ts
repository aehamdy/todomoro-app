const completionSound = new Audio("/sounds/task/task-complete.mp3");

completionSound.preload = "auto";

export async function playTaskCompletionSound(enabled = true): Promise<void> {
  if (!enabled) return;

  try {
    completionSound.currentTime = 0;
    await completionSound.play();
  } catch (error) {
    console.warn("Task completion sound could not be played:", error);
  }
}
