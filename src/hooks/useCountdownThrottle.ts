import { useCallback, useEffect, useMemo, useState } from "react";

interface UseCountdownThrottleValues {
  secondsRemaining: number;
  reset: () => void;
}

const useCountdownThrottle = (interval: number): UseCountdownThrottleValues => {
  const [lastTriggerTime, setLastTriggerTime] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  const secondsRemaining = useMemo(() => {
    return Math.max(
      interval -
        Math.floor((currentTime.getTime() - lastTriggerTime.getTime()) / 1000),
      0
    );
  }, [interval, currentTime, lastTriggerTime]);

  useEffect(() => {
    const handle = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(handle);
    };
  }, []);

  const reset = useCallback(() => {
    setLastTriggerTime(new Date());
  }, []);

  return {
    secondsRemaining,
    reset,
  };
};

export default useCountdownThrottle;
