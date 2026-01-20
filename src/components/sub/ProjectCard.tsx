import type { ProjectCardProps } from "../../types/types";

const ProjectCard = ({
  projectName,
  projectOwner,
  idx,
  isSelected,
  onSelect,
}: ProjectCardProps) => {
  return (
    <div
      onClick={onSelect}
      className={`flex border-2 py-1 px-1 rounded-xl gap-2 cursor-pointer min-w-81 lg:min-w-95 ${isSelected ? "bg-bbg text-bfg border-[#202226]" : "text-sfg border-pfg"}`}
    >
      <div
        id="numberbox"
        className="w-12 lg:w-14 aspect-square flex justify-center items-center bg-bbg text-bfg rounded-xl"
      >
        {idx + 1}
      </div>
      <div>
        <h1>{projectName}</h1>
        <p>by {projectOwner}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
