const completionSound = new Audio("/sounds/task/task-complete.mp3");

completionSound.preload = "auto";

export function playTaskCompletionSound() {
  completionSound.currentTime = 0;

  void completionSound.play().catch((err) => {
    console.log(err);
  });
}
