import { getServerCookie } from "@/helper/server-cookie";
import { PollsResponse } from "./getAllPolls";
import toast from "react-hot-toast";

export type VotePayload = {
  pollId: number;
  optionId: number;
};

export const createVote = async (
  payload: VotePayload
): Promise<PollsResponse> => {
  const token = await getServerCookie("access_token");
  const response = await fetch("http://localhost:3000/polls/vote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Vote failed");
  }

  const result = await response.json();
  return result;
};
