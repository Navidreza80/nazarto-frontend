/* eslint-disable */
"use client";

import {
  createPoll,
  CreatePollPayload,
} from "@/services/api/polls/create-poll";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useCreatePoll = () => {
  const router = useRouter();
  const mutation = useMutation(
    (payload: CreatePollPayload) => createPoll(payload),
    {
      onSuccess: () => {
        toast.success("Poll created successfully!");
        router.push("/");
      },
      onError: (error: any) => {
        toast.error(error?.message || "Poll creation failed");
      },
    }
  );

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
};
