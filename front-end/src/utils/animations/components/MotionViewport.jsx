import { motion, useReducedMotion } from "framer-motion";
import { varContainer } from "../variants";

export default function MotionViewport({
  children,
  disableAnimatedMobile = false,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion || disableAnimatedMobile) {
    return <div {...props}>{children}</div>;
  }

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...props}
    >
      {children}
    </motion.div>
  );
}
