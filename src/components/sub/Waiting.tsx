const Waiting = ({ startTimeStr }: { startTimeStr: string }) => {
  const startTime = new Date(startTimeStr);

  return (
    <div className="w-screen h-dvh flex flex-col justify-center items-center">
      <h1>The voting will start at {startTime.toLocaleTimeString()}</h1>
      <h2>
        Please <span className="font-semibold">refresh</span> to see the voting
        page
      </h2>
    </div>
  );
};

export default Waiting;
