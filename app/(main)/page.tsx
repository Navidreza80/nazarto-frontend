"use server";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPolls } from "@/services/api/polls/getAllPolls";
import { BarChart3, Calendar, Clock, Users } from "lucide-react";
import dynamic from "next/dynamic";
const PollModal = dynamic(() => import("@/components/PollsPage/PollModal"), {
  ssr: true,
});

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function PollsPage() {
  const polls = await getAllPolls();
  return (
    <div className="mx-auto px-4 py-8 flex justify-center items-start">
      <div className="flex flex-col items-center justify-center lg:w-2xl md:w-xl w-lg">
        {polls.map((poll) => {
          return (
            <Card
              key={poll.id}
              className="group py-5 relative bg-surface/50 hover:bg-surface/70 backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl overflow-hidden w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {poll.isActive && (
                <div className="absolute top-4 right-4">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping bg-primary/40 rounded-full w-2 h-2" />
                    <div className="relative bg-primary rounded-full w-2 h-2" />
                  </div>
                </div>
              )}

              <CardHeader className="pb-4 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={poll.isActive ? "default" : "outline"}
                      className="shrink-0 shadow-sm backdrop-blur-sm"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          poll.isActive
                            ? "bg-white animate-pulse"
                            : "bg-text-secondary"
                        }`}
                      />
                      {poll.isActive ? "Live" : "Closed"}
                    </Badge>
                    {poll.expiresAt && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-background/50 backdrop-blur-sm"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(poll.expiresAt) > new Date()
                          ? "Expires"
                          : "Expired"}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 bg-background/50 backdrop-blur-sm px-2 rounded-lg border border-border/50">
                    <Users className="w-3.5 text-primary" />
                    <span className="text-xs font-semibold text-foreground">
                      {poll.totalVotes}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-all duration-500 bg-gradient-to-r from-foreground to-foreground bg-clip-text group-hover:from-primary group-hover:to-secondary hover:scale-[1.02]">
                  {poll.question}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0 relative z-10">
                <PollModal pollId={poll.id}>
                  <button className="cursor-pointer group/btn relative overflow-hidden bg-primary/70 to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-2 px-5 text-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] border border-primary/20">
                    View Details & Vote
                  </button>
                </PollModal>
                <div className="flex items-center gap-1.5 text-xs text-text-secondary mt-1 px-3 py-2 rounded-lg w-fit">
                  <Calendar className="h-3.5 w-3.5 text-primary/70" />
                  <span className="font-medium">
                    {formatDate(poll.createdAt)}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {polls.length === 0 && (
        <div className="text-center py-16">
          <div className="text-text-secondary text-xl mb-4">
            No surveys found matching your search.
          </div>
          <p className="text-text-secondary/70">
            Try different keywords or check back later for new surveys.
          </p>
        </div>
      )}
    </div>
  );
}
