/* eslint-disable */
"use client";

import { createVote, VotePayload } from "@/services/api/polls/createVote";
import { PollsResponse } from "@/services/api/polls/getAllPolls";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useVote = (onSuccess?: () => void) => {
  const mutation = useMutation((payload: VotePayload) => createVote(payload), {
    onSuccess: (data) => {
      toast.success("Voted successful!");
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Vote failed");
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
};
