/* eslint-disable */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useVote } from "@/hooks/useVote";
import { getPollById } from "@/services/api/polls/getPollById";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Loader,
  Users,
} from "lucide-react";
import { useState } from "react";

interface PollModalProps {
  pollId: number;
  children: React.ReactNode;
}

export default function PollModal({ pollId, children }: PollModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: poll,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getPollById(pollId),
    queryKey: ["GET_POLL_BY_ID", pollId, isOpen],
    enabled: isOpen,
  });

  const { mutate, isPending } = useVote(refetch);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const totalVotes = poll?.totalVotes || 0;
  const hasVoted = poll?.userVote !== null;
  const votedOption = poll?.userVote?.optionId;

  const handleVote = () => {
    if (selectedOption !== null && poll) {
      mutate({ pollId: poll.id, optionId: selectedOption });
    }
  };

  const calculatePercentage = (votes: number) => {
    return totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">{children}</div>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {isLoading && <Loader className="animate-spin" />}
        <DialogHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant={poll?.isActive ? "default" : "outline"}>
              {poll?.isActive ? "Active" : "Closed"}
            </Badge>
          </div>
          <DialogTitle className="text-2xl leading-tight">
            {poll?.question}
          </DialogTitle>
          <div className="flex items-center gap-6 text-sm text-text-secondary mt-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{totalVotes} total votes</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                Created {new Date(poll?.createdAt || "").toLocaleDateString()}
              </span>
            </div>
          </div>
        </DialogHeader>

        <div className="px-8 py-6 space-y-6">

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              {hasVoted ? "Thank you for voting!" : "Select your answer:"}
            </h3>

            {poll?.options.map((option: any) => {
              const percentage = calculatePercentage(option.totalVotes);
              const isSelected = selectedOption === option.id;

              return (
                <div
                  key={option.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/30 hover:bg-primary/5"
                  } ${hasVoted ? "cursor-default" : ""}`}
                  onClick={() => !hasVoted && setSelectedOption(option.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {!hasVoted ? (
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-primary bg-primary shadow-sm"
                              : "border-border hover:border-primary/60"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-3 h-3 rounded-full bg-white" />
                          )}
                        </div>
                      ) : (
                        <CheckCircle
                          className={`h-6 w-6 ${
                            isSelected || votedOption === option.id
                              ? "text-primary"
                              : "text-text-secondary"
                          }`}
                        />
                      )}
                      <span className="font-medium text-foreground text-base">
                        {option.text}
                      </span>
                    </div>
                    <span className="text-text-secondary text-sm font-medium bg-background px-2 py-1 rounded-lg">
                      {option.totalVotes} votes ({Math.round(percentage)}
                      %)
                    </span>
                  </div>

                  <div className="w-full bg-secondary/20 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-primary/60 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-3">
            {!hasVoted && poll?.isActive && (
              <Button
                onClick={handleVote}
                disabled={isPending}
                className="w-full py-4 text-lg cursor-pointer font-semibold bg-primary/60 hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Submit Your Vote"
                )}
              </Button>
            )}

            {!poll?.isActive && (
              <div className="text-center p-6 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-2xl">
                <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                <p className="text-yellow-600 font-semibold text-lg">
                  This survey is closed for voting
                </p>
                <p className="text-yellow-500/70 text-sm mt-1">
                  You can view the results above
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
