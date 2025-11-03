import { getServerCookie } from "@/helper/server-cookie";
import { PollsResponse } from "./getAllPolls";

export type DeletePollResponse = {
  id: number,
  question: string,
  createdAt: Date,
  expiresAt: Date,
  isActive: boolean;
  createdById: number;
  totalVotes: number;
};

export const deletePoll = async (id: number): Promise<PollsResponse> => {
  const token = await getServerCookie("access_token");
  const response = await fetch(`http://localhost:3000/polls/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Delete poll failed");
  }

  const result = await response.json();
  return result;
};
