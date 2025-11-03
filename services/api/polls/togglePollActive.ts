// services/api/polls/togglePollActive.ts
import { getServerCookie } from "@/helper/server-cookie";

export type TogglePollResponse = {
  id: number;
  question: string;
  createdAt: Date;
  expiresAt: Date;
  isActive: boolean;
  createdById: number;
  totalVotes: number;
};

export const togglePollActive = async (id: number, isActive: boolean): Promise<TogglePollResponse> => {
  const token = await getServerCookie("access_token");
  const response = await fetch(`http://localhost:3000/polls/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isActive }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Toggle poll active failed");
  }

  const result = await response.json();
  return result;
};