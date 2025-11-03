import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getAllPolls } from "@/services/api/polls/getAllPolls";
import { deletePoll } from "@/services/api/polls/deletePoll";
import { togglePollActive } from "@/services/api/polls/togglePollActive";
import { BarChart3, Calendar, Clock, Users, Edit, Trash2, Plus, Eye, MoreVertical, Play, Pause } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

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
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Server Action for Delete
async function handleDeletePoll(id: number) {
    "use server";
    try {
        await deletePoll(id);
        redirect("/dashboard");
    } catch (error) {
        console.error("Delete failed:", error);
        throw error;
    }
}

// Server Action for Toggle Active/Inactive
async function handleTogglePollActive(id: number, currentStatus: boolean) {
    "use server";
    try {
        await togglePollActive(id, !currentStatus);
        redirect("/dashboard");
    } catch (error) {
        console.error("Toggle active failed:", error);
        throw error;
    }
}

export default async function AdminPollsPage() {
    const polls = await getAllPolls();

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Desktop Table - Hidden on mobile */}
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
                                className={`border-b border-border hover:bg-surface/50 transition-colors ${index % 2 === 0 ? 'bg-surface' : 'bg-surface/30'
                                    }`}
                            >
                                {/* Question */}
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

                                {/* Status */}
                                <td className="py-4 px-6">
                                    <div className="flex flex-col gap-1">
                                        <Badge
                                            variant={poll.isActive ? "default" : "outline"}
                                            className="w-fit"
                                        >
                                            {poll.isActive ? 'Active' : 'Closed'}
                                        </Badge>
                                        {poll.expiresAt && (
                                            <div className="text-xs text-text-secondary">
                                                {new Date(poll.expiresAt) > new Date() ? 'Expires' : 'Expired'}
                                            </div>
                                        )}
                                    </div>
                                </td>

                                {/* Votes */}
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-primary" />
                                        <span className="font-semibold">{poll.totalVotes}</span>
                                    </div>
                                </td>

                                {/* Options */}
                                <td className="py-4 px-6">
                                    <div className="text-foreground font-medium">
                                        {poll.options.length}
                                    </div>
                                </td>

                                {/* Created Date */}
                                <td className="py-4 px-6">
                                    <div className="text-sm text-text-secondary">
                                        {formatDate(poll.createdAt)}
                                    </div>
                                </td>

                                {/* Actions with Popover */}
                                <td className="py-4 px-6">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-48 p-2" align="end">
                                            <div className="space-y-1">
                                                {/* View Details with Dialog */}
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
                                                                <h3 className="font-semibold text-foreground mb-2">Question:</h3>
                                                                <p className="text-foreground">{poll.question}</p>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <h4 className="font-semibold text-foreground mb-1">Status:</h4>
                                                                    <Badge variant={poll.isActive ? "default" : "outline"}>
                                                                        {poll.isActive ? 'Active' : 'Closed'}
                                                                    </Badge>
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-semibold text-foreground mb-1">Total Votes:</h4>
                                                                    <p className="text-foreground">{poll.totalVotes}</p>
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-semibold text-foreground mb-1">Options:</h4>
                                                                    <p className="text-foreground">{poll.options.length}</p>
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-semibold text-foreground mb-1">Created:</h4>
                                                                    <p className="text-foreground">{formatDateTime(poll.createdAt)}</p>
                                                                </div>
                                                            </div>
                                                            {poll.options.length > 0 && (
                                                                <div>
                                                                    <h4 className="font-semibold text-foreground mb-2">Options:</h4>
                                                                    <div className="space-y-2">
                                                                        {poll.options.map((option, index) => (
                                                                            <div key={option.id} className="flex items-center justify-between p-2 bg-surface rounded-lg">
                                                                                <span className="text-foreground">{option.text}</span>
                                                                                <span className="text-text-secondary text-sm">{option.votes?.length || 0} votes</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>

                                                {/* Toggle Active/Inactive */}
                                                <form action={handleTogglePollActive.bind(null, poll.id, poll.isActive)}>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        type="submit"
                                                        className={`w-full justify-start ${poll.isActive ? 'hover:bg-orange-500/10 hover:text-orange-500' : 'hover:bg-green-500/10 hover:text-green-500'}`}
                                                    >
                                                        {poll.isActive ? (
                                                            <>
                                                                <Pause className="h-4 w-4 mr-2" />
                                                                Deactivate
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Play className="h-4 w-4 mr-2" />
                                                                Activate
                                                            </>
                                                        )}
                                                    </Button>
                                                </form>

                                                {/* Delete */}
                                                <form action={handleDeletePoll.bind(null, poll.id)}>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        type="submit"
                                                        className="w-full justify-start hover:bg-red-500/10 hover:text-red-500 text-red-600"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Delete
                                                    </Button>
                                                </form>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards - Show only on mobile */}
            <div className="md:hidden grid grid-cols-1 space-y-4">
                {polls.map((poll) => (
                    <Card key={poll.id} className="border-border hover:border-primary/30 py-5 transition-colors">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between mb-2">
                                <Badge
                                    variant={poll.isActive ? "default" : "outline"}
                                    className="mb-2"
                                >
                                    {poll.isActive ? 'Active' : 'Closed'}
                                </Badge>
                                <div className="flex items-center gap-2">
                                    <div className="text-sm text-text-secondary">
                                        ID: {poll.id}
                                    </div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-7 w-7 p-0 "
                                            >
                                                <MoreVertical className="h-3 w-3" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 p-2" align="end">
                                            <div className="space-y-1">
                                                {/* View Details with Dialog */}
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="w-full justify-start hover:bg-primary/10 hover:text-primary text-sm"
                                                        >
                                                            <Eye className="h-3 w-3 mr-2" />
                                                            View Details
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-md mx-4">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-lg">Poll Details</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <h3 className="font-semibold text-foreground mb-2">Question:</h3>
                                                                <p className="text-foreground">{poll.question}</p>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <h4 className="font-semibold text-foreground mb-1">Status:</h4>
                                                                    <Badge variant={poll.isActive ? "default" : "outline"}>
                                                                        {poll.isActive ? 'Active' : 'Closed'}
                                                                    </Badge>
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-semibold text-foreground mb-1">Votes:</h4>
                                                                    <p className="text-foreground">{poll.totalVotes}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>

                                                {/* Toggle Active/Inactive */}
                                                <form action={handleTogglePollActive.bind(null, poll.id, poll.isActive)}>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        type="submit"
                                                        className={`w-full justify-start text-sm ${poll.isActive ? 'hover:bg-orange-500/10 hover:text-orange-500' : 'hover:bg-green-500/10 hover:text-green-500'}`}
                                                    >
                                                        {poll.isActive ? (
                                                            <>
                                                                <Pause className="h-3 w-3 mr-2" />
                                                                Deactivate
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Play className="h-3 w-3 mr-2" />
                                                                Activate
                                                            </>
                                                        )}
                                                    </Button>
                                                </form>

                                                {/* Delete */}
                                                <form action={handleDeletePoll.bind(null, poll.id)}>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        type="submit"
                                                        className="w-full justify-start hover:bg-red-500/10 hover:text-red-500 text-red-600 text-sm"
                                                    >
                                                        <Trash2 className="h-3 w-3 mr-2" />
                                                        Delete
                                                    </Button>
                                                </form>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <CardTitle className="text-base leading-tight line-clamp-3">
                                {poll.question}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="pt-0">
                            {/* Poll Info */}
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
                                            {new Date(poll.expiresAt) > new Date() ? 'Expires' : 'Expired'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {polls.length === 0 && (
                <div className="text-center py-12">
                    <BarChart3 className="h-12 w-12 text-text-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No polls created yet</h3>
                    <p className="text-text-secondary mb-6">Create your first poll to get started</p>
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