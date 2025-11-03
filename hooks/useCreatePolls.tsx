"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CreatePollPayload, createPoll } from "@/services/api/polls/create-poll";

export const useCreatePoll = () => {
  const router = useRouter();
  
  const mutation = useMutation({
    mutationFn: (payload: CreatePollPayload) => {
      console.log('🎯 HOOK: Calling createPoll with:', payload);
      return createPoll(payload);
    },
    onSuccess: (data) => {
      console.log('✅ HOOK: Survey created successfully:', data);
      toast.success("Survey created successfully!");
      router.push("/polls");
    },
    onError: (error: any) => {
      console.log('❌ HOOK: Create poll error:', error);
      toast.error(error?.message || "Failed to create survey");
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
};