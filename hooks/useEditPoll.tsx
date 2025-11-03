/* eslint-disable */
"use client";

import { editPoll } from "@/services/api/polls/togglePollActive";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useEditPoll = () => {
  const mutation = useMutation((id: number) => editPoll(id), {
    onSuccess: () => {
      toast.success("Poll edited successful!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Edit failed");
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
};
