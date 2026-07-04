import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useTranslation } from 'react-i18next';

export default function CountDown({ hour, minute }) {
  const { t, i18n } = useTranslation();
  const [remainingTime, setRemainingTime] = useState(0);
  const [text, setText] = useState("00:00:00");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const now = currentTime;
    const target = new Date(now);

    target.setHours(parseInt(hour));
    target.setMinutes(parseInt(minute));
    target.setSeconds(0);

    if (target < now) {
      target.setDate(target.getDate() + 1);
    }

    const diffMs = target - now;
    const totalSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    setRemainingTime(totalSeconds);
    setText(
      isNaN(hours)
        ? "00:00:00"
        : `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    );
  }, [hour, minute, currentTime]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full ring-white dark:ring-[#1E2A38] rounded-full bg-white dark:bg-[#1E2A38] flex items-center justify-center p-4">
        <CircularProgressbar 
          value={remainingTime} 
          text={text}
          maxValue={10000}
          styles={buildStyles({
            textColor:'rgba(253, 224, 71, 0.9)',
            tailColor:'rgba(255,255,255,.2)',
            pathColor:'rgba(253, 224, 71, 0.9)',
          })}
        />
        <h1 className='absolute right-[50%] translate-x-1/2 top-[50%] translate-y-10 text-xs bg-yellow-400/90 text-indigo-950/80 rounded-full px-2 py-[1px] text-nowrap font-bold'>{t("timeRemaining")}</h1>
      </div>
    </div>
  );
}
