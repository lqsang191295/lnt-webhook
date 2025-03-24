"use client";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";

interface TimerProps {
  duration: number;
  onTimeout: () => void;
}

export interface TimerHandle {
  start: () => void;
}

const RenderTime = ({ remainingTime }: { remainingTime: number }) => {
  if (remainingTime === 0) {
    return <div className="timer">Hết giờ</div>;
  }

  return (
    <div className="timer relative w-full h-full">
      {remainingTime < 5 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 0.88, 0.88],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="w-full h-full bg-red-500 rounded-full absolute z-0"
        />
      )}
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    </div>
  );
};

const Timer = forwardRef<TimerHandle, TimerProps>(
  ({ duration = 10, onTimeout }, ref) => {
    const [isPlay, setIsPlay] = useState<boolean>(false);

    const start = () => {
      setIsPlay(true);
    };

    // Expose start method using ref
    useImperativeHandle(ref, () => ({
      start,
    }));

    return (
      <CountdownCircleTimer
        isPlaying={isPlay}
        duration={duration}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={onTimeout}
        size={120}
        strokeWidth={8}>
        {RenderTime}
      </CountdownCircleTimer>
    );
  }
);

Timer.displayName = "Timer";

export default Timer;
