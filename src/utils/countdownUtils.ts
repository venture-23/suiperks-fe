import { useState, useEffect } from "react";

const updateCountdown = (endDate: Date): string => {
    const now = new Date().getTime();
    const distance = endDate.getTime() - now;

    if (distance <= 0) {
        return "Auction ended";
    } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let timerString = "";

        if (days > 0) {
            timerString += `${days}d `;
        }
        timerString += `${hours}h ${minutes}m ${seconds}s`;

        return timerString;
    }
};

const useCountdown = (endDate: Date): string => {
    const [countdown, setCountdown] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            const newCountdown = updateCountdown(endDate);
            setCountdown(newCountdown);
        }, 1000);

        return () => clearInterval(timer);
    }, [endDate]);

    return countdown;
};

export default useCountdown;
