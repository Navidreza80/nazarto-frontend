"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDeletePoll } from "@/hooks/useDeletePoll";
import { PollsResponse } from "@/services/api/polls/getAllPolls";
import { Loader, MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import PollDetail from "./PollDetail";

const PollsAction = ({ poll }: { poll: PollsResponse }) => {
  const router = useRouter();
  const { mutate: deletePoll, isPending } = useDeletePoll(() =>
    router.refresh()
  );

  function handleDeletePoll(id: number) {
    try {
      deletePoll(id);
    } catch (error) {
      throw error;
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        <div className="space-y-1">
          <PollDetail poll={poll} />

          <form action={handleDeletePoll.bind(null, poll.id)}>
            <Button
              variant="ghost"
              size="sm"
              type="submit"
              className="w-full justify-start hover:bg-red-500/10 hover:text-red-500 text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isPending ? <Loader className="animate-spin" /> : "Delete"}
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default PollsAction;
