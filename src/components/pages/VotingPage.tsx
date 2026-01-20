import { useEffect, useState } from "react";
import type { ProjectCardType } from "../../types/types";
import ProjectCard from "../sub/ProjectCard";
import Conformation from "../sub/Conformation";
import { useNavigate } from "react-router";
import Ended from "../sub/Ended";
import Waiting from "../sub/Waiting";

const VotingPage = () => {
  const [selectedIdx, setSelectedIdx] = useState<null | number>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectCardType[] | null>(null);

  const userName = localStorage.getItem("username");
  const startTimeStr = localStorage.getItem("startTime");
  const endTimeStr = localStorage.getItem("endTime");
  const isVoted = localStorage.getItem("isVoted");

  const navigate = useNavigate();

  //Fetching Project Data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };

    fetchProjects();
  }, []);

  // Rendering Waiting Page
  if (startTimeStr) {
    const startTime = new Date(startTimeStr);
    const now = new Date();

    if (now < startTime && !(isVoted === "true")) {
      return <Waiting startTimeStr={startTimeStr} />;
    }
  }

  // Rendering Voting Ended Page
  if (endTimeStr) {
    const endTime = new Date(endTimeStr);
    const now = new Date();

    if (now > endTime) {
      return <Ended />;
    }
  }

  // Rendering Conformation page if user has already voted (safety)
  if (isVoted === "true") {
    return <Conformation />;
  }

  const handleVote = async () => {
    if (selectedIdx === null) {
      setShowError(true);
      return;
    }

    if (!projects) return;

    const selectedProject = projects[selectedIdx];

    localStorage.setItem("isVoted", "true");
    navigate("/");

    try {
      const res = fetch(`${import.meta.env.VITE_API_URL}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName: selectedProject.projectName,
          projectOwner: selectedProject.projectOwner,
        }),
      });

      if (!(await res).ok) {
        throw new Error("Vote Failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }


  };

  return (
    <div className="min-w-screen min-h-dvh py-8 px-6 flex flex-col gap-7 items-center">
      <p className="text-center">
        Which Project is the next Billion Dollar Startup{" "}
        <span className="font-bold text-lg">{userName}?</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {projects &&
          projects.map((project, idx) => {
            return (
              <ProjectCard
                key={idx}
                idx={idx}
                projectName={project.projectName}
                projectOwner={project.projectOwner}
                isSelected={selectedIdx === idx}
                onSelect={() => {
                  setSelectedIdx((prev) => (prev === idx ? null : idx));
                }}
              ></ProjectCard>
            );
          })}
      </div>

      <div
        id="errormsg"
        className={`mt-12 ${showError ? "opacity-100" : "opacity-0"}`}
      >
        Please select a project
      </div>

      <button
        onClick={handleVote}
        className="bg-bbg text-bfg px-7 cursor-pointer py-3 hover:opacity-85 rounded-full"
      >
        Vote
      </button>
    </div>
  );
};

export default VotingPage;
