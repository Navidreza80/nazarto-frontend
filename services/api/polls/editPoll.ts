import { getServerCookie } from "@/helper/server-cookie";

export type EditPollResponse = {
  id: 4;
  question: "are you designer";
  createdAt: "2025-11-03T05:08:41.610Z";
  expiresAt: null;
  isActive: true;
  createdById: 9;
  totalVotes: 0;
};

export const editPoll = async (id: number): Promise<EditPollResponse> => {
  const token = await getServerCookie("access_token");
  const response = await fetch(`http://localhost:3000/polls/${id}`, {
    method: "PATCH",
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
