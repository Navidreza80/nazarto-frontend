export interface PollOption {
  id: number;
  text: string;
  pollId: number;
  totalVotes: number;
}

export interface UserVote {
  optionId: number;
  text: string;
}

export interface PollsResponse {
  id: number;
  question: string;
  createdAt: string;
  expiresAt: string | null;
  isActive: boolean;
  createdById: number;
  totalVotes: number;
  options: PollOption[];
  userVote: UserVote | null;
}
export const getAllPolls = async (): Promise<PollsResponse[]> => {
  try {
    const response = await fetch("http://localhost:3000/polls", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
