import { motion } from "framer-motion";

export default function AnimatedBox({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
}
