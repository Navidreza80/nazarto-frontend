/* eslint-disable */
"use client";

import { deletePoll } from "@/services/api/polls/deleteEdit";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeletePoll = () => {
  const mutation = useMutation((id: number) => deletePoll(id), {
    onSuccess: () => {
      toast.success("Poll deleted successful!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Delete failed");
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
};
