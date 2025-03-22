import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

interface TimerProps {
  duration: number;
  onTimeout: () => void;
}

export interface TimerHandle {
  start: () => void;
}

const Timer = forwardRef<TimerHandle, TimerProps>(
  ({ duration = 10, onTimeout }: TimerProps, ref) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const start = () => {
      if (!timerRef || timerRef.current) return; // Tránh chạy nhiều lần

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            timerRef.current = null;
            onTimeout?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    useImperativeHandle(ref, () => ({
      start,
    }));

    useEffect(() => {
      return () => {
        return clearInterval(timerRef.current!);
      };
    }, []);

    return (
      <div>
        <h1>Time Left: {timeLeft}s</h1>
      </div>
    );
  }
);

Timer.displayName = "Timer";

export default Timer;
