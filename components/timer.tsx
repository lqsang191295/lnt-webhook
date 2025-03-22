import { TimerIcon } from "lucide-react";
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
  ({ duration = 10, onTimeout }, ref) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isStarted, setIsStarted] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const start = () => {
      if (timerRef.current) return;

      setIsStarted(true);
    };

    // Expose start method using ref
    useImperativeHandle(ref, () => ({
      start,
    }));

    useEffect(() => {
      if (!isStarted) return;

      if (timerRef.current) return;

      timerRef.current = setInterval(() => {
        console.log("run inter val", isStarted);

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
    }, [isStarted]);

    useEffect(() => {
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    }, []);

    return (
      <div className="flex">
        <TimerIcon /> {timeLeft}s
      </div>
    );
  }
);

Timer.displayName = "Timer";

export default Timer;
