import { useNavigate } from "react-router";
import Conformation from "../sub/Conformation";
import { useEffect } from "react";
import type { PollDataAPIResponse } from "../../types/types";

const NamePage = () => {
  const navigate = useNavigate();

  //Fetching Poll Data & storing in local storage
  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/poll`);
        const data: PollDataAPIResponse =
          (await res.json()) as PollDataAPIResponse;

        localStorage.setItem("startTime", data.startTime);
        localStorage.setItem("endTime", data.endTime);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPollData();
  }, []);

  // Rendering Conformation page if user has already voted
  if (localStorage.getItem("isVoted") === "true") {
    return <Conformation />;
  }

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userName = formData.get("username") as string;

    localStorage.setItem("username", userName);

    navigate("/voting");
  };

  return (
    <div
      id="namepage"
      className="min-w-screen min-h-dvh flex flex-col items-center justify-center gap-13"
    >
      <img src="gdg_icon.png" alt="" />
      <form
        className="flex flex-col justify-center items-center gap-3"
        onSubmit={handleForm}
      >
        <label htmlFor="username">Enter Your Name: </label>
        <input
          type="text"
          className="border-2 border-pfg text-sfg rounded-lg w-60 px-2 py-1"
          id="username"
          name="username"
        />
        <button
          type="submit"
          className="cursor-pointer px-4 py-2 bg-bbg text-bfg rounded-full mt-5 hover:opacity-85"
        >
          Let's Go
        </button>
      </form>
    </div>
  );
};

export default NamePage;
