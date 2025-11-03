"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDeletePoll } from "@/hooks/useDeletePoll";
import { PollsResponse } from "@/services/api/polls/getAllPolls";
import { Eye, Loader, MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const PollsAction = ({ poll }: { poll: PollsResponse }) => {
  const router = useRouter();
  const { mutate: deletePoll, isPending } = useDeletePoll(() => router.refresh());

  function formatDateTime(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

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
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start hover:bg-primary/10 hover:text-primary"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl p-5">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Question:
                  </h3>
                  <p className="text-foreground">{poll.question}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Status:
                    </h4>
                    <Badge variant={poll.isActive ? "default" : "outline"}>
                      {poll.isActive ? "Active" : "Closed"}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Total Votes:
                    </h4>
                    <p className="text-foreground">{poll.totalVotes}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Options:
                    </h4>
                    <p className="text-foreground">{poll.options.length}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Created:
                    </h4>
                    <p className="text-foreground">
                      {formatDateTime(poll.createdAt)}
                    </p>
                  </div>
                </div>
                {poll.options.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Options:
                    </h4>
                    <div className="space-y-2">
                      {poll.options.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center justify-between p-2 bg-surface rounded-lg"
                        >
                          <span className="text-foreground">{option.text}</span>
                          <span className="text-text-secondary text-sm">
                            {option.totalVotes || 0} votes
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

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
