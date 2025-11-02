import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Users, Calendar, Clock, BarChart3 } from "lucide-react";
import { PollModal } from "@/components/poolsPage/poolModal";

// Mock data
const pollsData = [
    {
        "id": 1,
        "question": "Which frontend framework do you prefer?",
        "createdAt": "2025-11-02T19:02:56.766Z",
        "expiresAt": null,
        "isActive": true,
        "createdById": 1,
        "options": [
            {
                "id": 1,
                "text": "React",
                "pollId": 1,
                "votes": []
            },
            {
                "id": 2,
                "text": "Vue",
                "pollId": 1,
                "votes": [
                    {
                        "id": 1,
                        "userId": 1,
                        "optionId": 2,
                        "pollId": 1,
                        "createdAt": "2025-11-02T19:05:36.194Z"
                    }
                ]
            },
            {
                "id": 3,
                "text": "Angular",
                "pollId": 1,
                "votes": []
            },
            {
                "id": 4,
                "text": "SvelteKit",
                "pollId": 1,
                "votes": []
            }
        ]
    },
    {
        "id": 2,
        "question": "What's your favorite programming language?",
        "createdAt": "2025-11-01T10:00:00.000Z",
        "expiresAt": "2025-12-01T10:00:00.000Z",
        "isActive": true,
        "createdById": 1,
        "options": [
            {
                "id": 5,
                "text": "JavaScript",
                "pollId": 2,
                "votes": [
                    { "id": 2, "userId": 2, "optionId": 5, "pollId": 2, "createdAt": "2025-11-02T20:00:00.000Z" },
                    { "id": 3, "userId": 3, "optionId": 5, "pollId": 2, "createdAt": "2025-11-02T21:00:00.000Z" }
                ]
            },
            {
                "id": 6,
                "text": "Python",
                "pollId": 2,
                "votes": [
                    { "id": 4, "userId": 4, "optionId": 6, "pollId": 2, "createdAt": "2025-11-02T22:00:00.000Z" }
                ]
            },
            {
                "id": 7,
                "text": "TypeScript",
                "pollId": 2,
                "votes": []
            }
        ]
    },
    {
        "id": 3,
        "question": "Which database do you use most often?",
        "createdAt": "2025-10-30T15:30:00.000Z",
        "expiresAt": "2025-11-30T15:30:00.000Z",
        "isActive": false,
        "createdById": 1,
        "options": [
            {
                "id": 8,
                "text": "PostgreSQL",
                "pollId": 3,
                "votes": [
                    { "id": 5, "userId": 5, "optionId": 8, "pollId": 3, "createdAt": "2025-11-01T10:00:00.000Z" },
                    { "id": 6, "userId": 6, "optionId": 8, "pollId": 3, "createdAt": "2025-11-01T11:00:00.000Z" },
                    { "id": 7, "userId": 7, "optionId": 8, "pollId": 3, "createdAt": "2025-11-01T12:00:00.000Z" }
                ]
            },
            {
                "id": 9,
                "text": "MongoDB",
                "pollId": 3,
                "votes": [
                    { "id": 8, "userId": 8, "optionId": 9, "pollId": 3, "createdAt": "2025-11-01T13:00:00.000Z" }
                ]
            }
        ]
    }
];

function calculateTotalVotes(options: any[]) {
    return options.reduce((total, option) => total + option.votes.length, 0);
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

export default async function PollsPage({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const searchQuery = searchParams.q as string || '';

    const filteredPolls = pollsData.filter(poll =>
        poll.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poll.options.some(option =>
            option.text.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-20 text-center">
                <h1 className="text-4xl font-bold text-foreground mb-6">Share Your Voice</h1>
                <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
                    Join our community of active participants. Vote on surveys, view instant analytics,
                    and make your opinion count in real-time discussions.
                </p>
            </div>

            {/* Polls Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPolls.map((poll) => {
                    const totalVotes = calculateTotalVotes(poll.options);

                    return (
                        <Card key={poll.id} className="group py-5 relative bg-surface/50 hover:bg-surface/70 backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl overflow-hidden">
                            {/* Gradient Border Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Active Indicator Pulse */}
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
                                            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${poll.isActive ? 'bg-white animate-pulse' : 'bg-text-secondary'}`} />
                                            {poll.isActive ? "Live" : "Closed"}
                                        </Badge>
                                        {poll.expiresAt && (
                                            <Badge variant="outline" className="text-xs bg-background/50 backdrop-blur-sm">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {new Date(poll.expiresAt) > new Date() ? 'Expires' : 'Expired'}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Participants Count */}
                                    <div className="flex items-center gap-1.5 bg-background/50 backdrop-blur-sm px-2 py-1 rounded-lg border border-border/50">
                                        <Users className="h-3.5 w-3.5 text-primary" />
                                        <span className="text-xs font-semibold text-foreground">{totalVotes}</span>
                                    </div>
                                </div>

                                {/* Enhanced Title with 2-line limit and gradient hover */}
                                <CardTitle className="text-xl font-bold leading-tight min-h-[3.5rem] line-clamp-2 group-hover:text-primary transition-all duration-500 bg-gradient-to-r from-foreground to-foreground bg-clip-text group-hover:from-primary group-hover:to-secondary hover:scale-[1.02]">
                                    {poll.question}
                                </CardTitle>

                            </CardHeader>

                            <CardContent className="pt-0 mt-4 relative z-10">

                                {/* Enhanced View Details Button */}
                                <PollModal poll={poll}>
                                    <button className="w-full cursor-pointer group/btn relative overflow-hidden bg-primary/70 to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-2 px-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] border border-primary/20">
                                        {/* Button Content */}
                                        <div className="relative flex items-center justify-center gap-3">
                                            <div className="relative">
                                                <BarChart3 className="h-5 w-5 transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12" />
                                            </div>
                                            <span className="text-sm font-semibold tracking-wide">View Details & Vote</span>
                                        </div>
                                    </button>
                                </PollModal>
                                {/* Creation Date with enhanced design */}
                                <div className="flex items-center gap-1.5 text-xs text-text-secondary mt-1 px-3 py-2 rounded-lg w-fit">
                                    <Calendar className="h-3.5 w-3.5 text-primary/70" />
                                    <span className="font-medium">{formatDate(poll.createdAt)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Empty State */}
            {filteredPolls.length === 0 && (
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