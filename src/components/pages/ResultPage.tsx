import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { GraphData } from "../../types/types";
import { io } from "socket.io-client";

const socket = io(`${import.meta.env.VITE_WS_URL}`);

const ResultPage = () => {
  const [data, setData] = useState<GraphData[]>([]);

  const startTimeStr = localStorage.getItem("startTime");
  const endTimeStr = localStorage.getItem("endTime");

  //Fetching Project Data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/result/projects`,
        );
        const projects: GraphData[] = await res.json();

        setData(projects);

        socket.on("vote-update", (data) => {
          setData(data);
        });
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }

      return () => {
        socket.off("vote-update");
      };
    };

    fetchProjects();
  }, []);

  const maxVotes = Math.max(...data.map((d) => d.votes));

  return (
    <div className="min-w-screen min-h-dvh flex flex-col gap-8 justify-center items-center">
      <div className="flex justify-center items-center gap-5">
        <img className="rounded-lg h-22" src="gdg_logo.png" alt="" />

      </div>
      <ResponsiveContainer width="80%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="projectName" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar
            dataKey="votes"
            isAnimationActive={true}
            animationBegin={0}
            animationDuration={200}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.votes === maxVotes ? "#22c55e" : "#4285F4"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <h1>
        Voting Duration - {new Date(startTimeStr as string).toLocaleTimeString()} to {new Date(endTimeStr as string).toLocaleTimeString()}
      </h1>
    </div>
  );
};

export default ResultPage;
