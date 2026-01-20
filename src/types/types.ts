export interface ProjectCardType {
  projectName: string;
  projectOwner: string;
}

export interface ProjectCardProps extends ProjectCardType {
  idx: number;
  isSelected: boolean;
  onSelect: () => void;
}

export interface PollDataAPIResponse {
  startTime: string;
  endTime: string;
}

export interface GraphData {
  projectName: string;
  votes: number;
}
