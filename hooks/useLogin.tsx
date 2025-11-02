/* eslint-disable */
"use client";

import { LoginPayload, loginUser } from "@/services/api/auth/login";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useLogin = () => {
  const router = useRouter();
  const mutation = useMutation((payload: LoginPayload) => loginUser(payload), {
    onSuccess: (data) => {
      toast.success("Login successful!");
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Login failed");
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
};
