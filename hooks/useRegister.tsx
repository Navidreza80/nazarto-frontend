/* eslint-disable */
"use client"

import { RegisterPayload, registerUser } from "@/services/api/auth/register";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useRegister = () => {
  const router = useRouter();
  const mutation = useMutation(
    (payload: RegisterPayload) => registerUser(payload),
    {
      onSuccess: (data) => {
        toast.success("Account created successfully!");
        router.push("/");
      },
      onError: (error: any) => {
        toast.error(error?.message || "Registration failed");
      },
    }
  );

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
};
