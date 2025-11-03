import PollsAction from "@/components/Dashboard Admin/pollActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPolls } from "@/services/api/polls/getAllPolls";
import { BarChart3, Calendar, Clock, Plus, Users } from "lucide-react";
import Link from "next/link";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function AdminPollsPage() {
  const polls = await getAllPolls();

  return (
    <div className="container mx-auto py-8">
      <div className="hidden md:flex overflow-x-auto rounded-lg border border-border">
        <table className="w-full">
          <thead>
            <tr className="bg-surface border-b border-border">
              <th className="th-style">Question</th>
              <th className="th-style">Status</th>
              <th className="th-style">Votes</th>
              <th className="th-style">Options</th>
              <th className="th-style">Created</th>
              <th className="th-style">Actions</th>
            </tr>
          </thead>
          <tbody>
            {polls.map((poll, index) => (
              <tr
                key={poll.id}
                className={`border-b border-border hover:bg-surface/50 transition-colors ${
                  index % 2 === 0 ? "bg-surface" : "bg-surface/30"
                }`}
              >
                <td className="py-4 px-6">
                  <div className="max-w-md">
                    <div className="font-medium text-foreground line-clamp-2">
                      {poll.question}
                    </div>
                    <div className="text-sm text-text-secondary mt-1">
                      ID: {poll.id}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-col gap-1">
                    <Badge
                      variant={poll.isActive ? "default" : "outline"}
                      className="w-fit"
                    >
                      {poll.isActive ? "Active" : "Closed"}
                    </Badge>
                    {poll.expiresAt && (
                      <div className="text-xs text-text-secondary">
                        {new Date(poll.expiresAt) > new Date()
                          ? "Expires"
                          : "Expired"}
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{poll.totalVotes}</span>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <div className="text-foreground font-medium">
                    {poll.options.length}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-text-secondary">
                    {formatDate(poll.createdAt)}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <PollsAction poll={poll} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden grid grid-cols-1 space-y-4">
        {polls.map((poll) => (
          <Card
            key={poll.id}
            className="border-border hover:border-primary/30 py-5 transition-colors"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <Badge
                  variant={poll.isActive ? "default" : "outline"}
                  className="mb-2"
                >
                  {poll.isActive ? "Active" : "Closed"}
                </Badge>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-text-secondary">
                    ID: {poll.id}
                  </div>
                  <PollsAction poll={poll} />
                </div>
              </div>
              <CardTitle className="text-base leading-tight line-clamp-3">
                {poll.question}
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{poll.totalVotes} votes</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-secondary" />
                  <span>{poll.options.length} options</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-secondary" />
                  <span>{formatDate(poll.createdAt)}</span>
                </div>
                {poll.expiresAt && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-orange-600">
                      {new Date(poll.expiresAt) > new Date()
                        ? "Expires"
                        : "Expired"}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {polls.length === 0 && (
        <div className="text-center py-12">
          <BarChart3 className="h-12 w-12 text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No polls created yet
          </h3>
          <p className="text-text-secondary mb-6">
            Create your first poll to get started
          </p>
          <Link href="/dashboard/create-poll">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Poll
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
