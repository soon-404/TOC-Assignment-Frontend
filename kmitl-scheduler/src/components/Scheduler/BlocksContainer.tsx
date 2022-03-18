import { motion, useMotionValue } from "framer-motion";
import TimeBlock from "../Block";
import { useRef } from "react";
import "./BlocksContainer.css";

export default function BlockContainer() {
  const constraintsRef = useRef(null);
  const blockRef = useRef<Element>(null);
  const x = useMotionValue(0);
  return (
    <div className="container">
      <motion.div className="drag-area" ref={constraintsRef} />
      <motion.div
        className="box"
        dragConstraints={blockRef}
        whileTap={{ scale: 0.9 }}
        whileDrag={{ scale: 1.2 }}
        style={{ x }}
      >
        <TimeBlock aref={blockRef} />
      </motion.div>
    </div>
  );
}
