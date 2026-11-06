import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { createPageTransitionStyles } from "../../animations/animationVariants";

type AnimatedOutletProps = {
  children: ReactNode;
};

function AnimatedOutlet({ children }: AnimatedOutletProps) {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const pageTransitionStyles = createPageTransitionStyles(
    Boolean(shouldReduceMotion),
  );

  const pageTransitionVariants = pageTransitionStyles.blurFade;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageTransitionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          width: "100%",
          minWidth: 0,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimatedOutlet;
