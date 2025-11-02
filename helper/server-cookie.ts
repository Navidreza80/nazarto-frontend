"use server";
import { cookies } from "next/headers";

export const setServerCookie = async (cookieName: string, value: string) => {
  await (
    await cookies()
  ).set(cookieName, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
};

export const getServerCookie = async (cookieName: string): Promise<string | null> => {
  const cookieValue = (await cookies()).get(cookieName);
  return cookieValue ? cookieValue.value : null;
};

export const deleteServerCookie = async (cookieName: string) => {
  await (await cookies()).delete(cookieName);
};

export const hasServerCookie = async (cookieName: string): Promise<boolean> => {
  const hasCookie = (await cookies()).has(cookieName);
  return hasCookie;
};
