import { setClientCookie } from "@/helper/client-cookie";
import { setServerCookie } from "@/helper/server-cookie";

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  fingerprint: string;
};

export type RegisterResponse = {
  access_token: string;
};

export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const response = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }
  const result = await response.json();
  setClientCookie("access_token", result.access_token, 15);
  await setServerCookie("access_token", result.access_token);

  return result;
};
