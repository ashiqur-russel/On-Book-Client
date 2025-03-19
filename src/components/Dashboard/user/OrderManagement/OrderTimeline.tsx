import React from "react";
import { motion } from "framer-motion";
import { FaBoxOpen, FaCheckCircle } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

interface TimelineOrderProps {
  progress: number;
  activeSteps: number;
}

const OrderTimeLine: React.FC<TimelineOrderProps> = ({
  progress,
  activeSteps,
}) => {
  return (
    <div className="relative w-full h-8 mt-4">
      <div
        className="
          absolute
          top-1/2
          -translate-y-1/2
          left-0
          w-full
          h-[2px]
          bg-gray-300
          rounded-full
          z-10
        "
      />
      <motion.div
        className="
          absolute
          top-1/2
          -translate-y-1/2
          left-0
          h-[2px]
          bg-primary
          rounded-full
          z-20
        "
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <div
        className="
          absolute
          top-1/2
          -translate-y-1/2
          left-0
          right-0
          flex
          justify-between
          items-center
          z-40
        "
      >
        <motion.div
          className="relative w-8 h-8 rounded-full bg-white flex items-center justify-center"
          animate={activeSteps >= 1 ? { scale: 1.2 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FaBoxOpen
            size={20}
            className={
              activeSteps >= 1 ? "text-primary-active" : "text-gray-300"
            }
          />
        </motion.div>

        <motion.div
          className="relative w-8 h-8 rounded-full bg-white flex items-center justify-center"
          animate={activeSteps >= 1 ? { scale: 1.2 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FaTruckFast
            size={20}
            className={
              activeSteps >= 1 ? "text-primary-active" : "text-gray-300"
            }
          />
        </motion.div>

        <motion.div
          className="relative w-8 h-8 rounded-full bg-white flex items-center justify-center"
          animate={activeSteps >= 1 ? { scale: 1.2 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FaCheckCircle
            size={20}
            className={
              activeSteps >= 1 ? "text-primary-active" : "text-gray-300"
            }
          />
        </motion.div>
      </div>
    </div>
  );
};

export default OrderTimeLine;
