import React, { useState, useEffect } from 'react';
import { formatTime } from '../../utils/date';

interface Props {
  initialTime: number; // in seconds
  onTimeEnd: () => void;
}

export default function Timer({ initialTime, onTimeEnd }: Props) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeEnd();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeEnd]);

  return (
    <div className="text-xl font-mono">
      <span className={`${timeLeft < 300 ? 'text-red-500' : 'text-gray-700'}`}>
        {formatTime(timeLeft)}
      </span>
    </div>
  );
}