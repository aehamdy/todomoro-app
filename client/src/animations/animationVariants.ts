export const fadeScaleVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

export const createPageTransitionStyles = (shouldReduceMotion: boolean) => {
  const duration = (value: number) => (shouldReduceMotion ? 0 : value);

  return {
    verticalSlide: {
      hidden: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : 25,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: duration(0.3),
          ease: "easeOut" as const,
        },
      },
      exit: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : -40,
        transition: {
          duration: duration(0.2),
          ease: "easeIn" as const,
        },
      },
    },

    blurFade: {
      hidden: {
        opacity: 0,
        filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)",
      },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          duration: duration(0.45),
          ease: "easeOut" as const,
        },
      },
      exit: {
        opacity: 0,
        filter: shouldReduceMotion ? "blur(0px)" : "blur(6px)",
        transition: {
          duration: duration(0.2),
          ease: "easeIn" as const,
        },
      },
    },
  };
};
