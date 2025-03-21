import React, { useState, useRef, useEffect } from "react";

interface TimerProps {
  duration: number;
  onTimeout: () => void;
}

const Timer = ({ duration = 10, onTimeout }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (!timerRef || timerRef.current) return; // Tránh chạy nhiều lần

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = null;
          onTimeout?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (!timerRef.current) return;
      return clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div>
      <h1>Time Left: {timeLeft}s</h1>
      <button onClick={start}>Start Timer</button>
    </div>
  );
};

export default Timer;
