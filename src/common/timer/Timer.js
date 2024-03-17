import { useEffect, useState } from 'react';

const useTimer = (initialMinutes, initialSeconds) => {
    const [isActive, setIsActive] = useState(false);
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(intervalId);
                        setIsActive(false);
                    } else {
                        setMinutes(prevMinutes => prevMinutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(prevSeconds => prevSeconds - 1);
                }
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isActive, minutes, seconds]);

    const startCountdown = () => {
        if (isActive) {
            setIsActive(false);
            setMinutes(minutes);
            setSeconds(seconds);
        } else if (!isActive && (initialMinutes !== minutes || initialSeconds !== seconds)) {
            setMinutes(minutes);
            setSeconds(seconds);
            setIsActive(true);
        } else if (!isActive && (initialMinutes !== 0 || initialSeconds !== 0)) {
            setMinutes(initialMinutes);
            setSeconds(initialSeconds);
            setIsActive(true);
        }
    };

    const resetCountdown = () => {
        setIsActive(false);
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
    };

    return { minutes, seconds, isActive, startCountdown, resetCountdown, setMinutes, setSeconds, setIsActive };
};

export default useTimer;
