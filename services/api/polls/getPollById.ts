import { getServerCookie } from "@/helper/server-cookie";

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

interface PollsResponse {
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
export const getPollById = async (id: number): Promise<PollsResponse> => {
  try {
    const token = await getServerCookie("access_token");
    const response = await fetch(`http://localhost:3000/polls/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
