import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PollsResponse } from "@/services/api/polls/getAllPolls";
import { DialogTitle } from "@radix-ui/react-dialog";
import { BarChart3, Calendar, Clock, Eye, Users } from "lucide-react";

const PollDetail = ({ poll }: { poll: PollsResponse }) => {
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function formatDateTime(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return (
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

      <DialogContent className="max-w-2xl p-0 overflow-auto max-h-[70%]">
        <DialogTitle></DialogTitle>

        <div className="p-6 space-y-6">
          <div className="bg-surface/50 rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Survey Question
            </h3>
            <p className="text-foreground text-lg leading-relaxed bg-background/50 p-3 rounded-lg border border-border/50">
              {poll.question}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-surface/50 rounded-xl p-4 border border-border text-center">
              <div className="flex justify-center mb-2">
                <Badge
                  variant={poll.isActive ? "default" : "outline"}
                  className="text-sm"
                >
                  {poll.isActive ? "Active" : "Closed"}
                </Badge>
              </div>
              <p className="text-text-secondary text-sm">Status</p>
            </div>

            <div className="bg-surface/50 rounded-xl p-4 border border-border text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-xl font-bold text-foreground">
                  {poll.totalVotes}
                </span>
              </div>
              <p className="text-text-secondary text-sm">Total Votes</p>
            </div>

            <div className="bg-surface/50 rounded-xl p-4 border border-border text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-secondary" />
                <span className="text-xl font-bold text-foreground">
                  {poll.options.length}
                </span>
              </div>
              <p className="text-text-secondary text-sm">Options</p>
            </div>

            <div className="bg-surface/50 rounded-xl p-4 border border-border text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-text-secondary" />
                <span className="text-sm font-semibold text-foreground">
                  {formatDate(poll.createdAt)}
                </span>
              </div>
              <p className="text-text-secondary text-sm">Created</p>
            </div>
          </div>
          {poll.options.length > 0 && (
            <div className="bg-surface/50 rounded-xl p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                Survey Options
              </h3>
              <div className="space-y-3">
                {poll.options.map((option, index) => {
                  const voteCount = option.totalVotes || 0;
                  const percentage =
                    poll.totalVotes > 0
                      ? (voteCount / poll.totalVotes) * 100
                      : 0;

                  return (
                    <div
                      key={option.id}
                      className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50 group hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </div>
                        <span className="text-foreground font-medium flex-1">
                          {option.text}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20 bg-secondary/20 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="text-right min-w-[80px]">
                          <div className="text-foreground font-semibold text-sm">
                            {voteCount}
                          </div>
                          <div className="text-text-secondary text-xs">
                            ({Math.round(percentage)}%)
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="bg-surface/50 rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between p-2">
                <span className="text-text-secondary">Survey ID:</span>
                <span className="text-foreground font-mono">#{poll.id}</span>
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="text-text-secondary">Created At:</span>
                <span className="text-foreground">
                  {formatDateTime(poll.createdAt)}
                </span>
              </div>
              {poll.expiresAt && (
                <div className="flex items-center justify-between p-2 md:col-span-2">
                  <span className="text-text-secondary">Expiration:</span>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span
                      className={`font-semibold ${
                        new Date(poll.expiresAt) > new Date()
                          ? "text-orange-600"
                          : "text-red-600"
                      }`}
                    >
                      {new Date(poll.expiresAt) > new Date()
                        ? "Expires"
                        : "Expired"}{" "}
                      {formatDate(poll.expiresAt)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PollDetail;
