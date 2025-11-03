import { getServerCookie } from "@/helper/server-cookie";

export type CreatePollPayload = {
  question: string;
  options: string[];
};

export type CreatePollResponse = {
  id: number;
  question: string;
  createdAt: string;
  expiresAt: string | null;
  isActive: boolean;
  createdById: number;
  options: Array<{
    id: number;
    text: string;
    pollId: number;
    votes: any[];
  }>;
};

export const createPoll = async (
  payload: CreatePollPayload
): Promise<CreatePollResponse> => {
  const token = await getServerCookie("access_token");
  if (!token) {
    throw new Error("Please login first to create a survey");
  }

  try {
    const response = await fetch("http://localhost:3000/polls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error type:", error?.constructor?.name);
    throw error;
  }
};
