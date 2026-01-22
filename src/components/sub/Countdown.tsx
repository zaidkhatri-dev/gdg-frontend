import { useEffect, useState } from "react";

const Countdown = ({ startTimeStr }: { startTimeStr: string }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const targetTime = new Date(startTimeStr);
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetTime.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeRemaining("00:00:00");
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      setTimeRemaining(formattedTime);
    };

    // Initial update
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [startTimeStr]);



  return (
    <div className="w-screen h-dvh flex flex-col justify-center items-center">
      <h1 className="text-lg lg:text-2xl mb-4">
        The voting will start in
      </h1>
      <h2 className="text-2xl lg:text-4xl font-bold">
        {timeRemaining || "00:00:00"}
      </h2>
      <h3 className="mt-4 text-base lg:text-lg">
        Please <span className="font-semibold">refresh</span> to see the voting
        page
      </h3>
    </div>
  );
};

export default Countdown;
