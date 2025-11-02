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
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Community Surveys</h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Participate in surveys and share your opinions with the community
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pollsData.length}</p>
                <p className="text-text-secondary text-sm">Total Surveys</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-xl">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {pollsData.reduce((total, poll) => total + calculateTotalVotes(poll.options), 0)}
                </p>
                <p className="text-text-secondary text-sm">Total Votes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-xl">
                <Clock className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {pollsData.filter(poll => poll.isActive).length}
                </p>
                <p className="text-text-secondary text-sm">Active Surveys</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary h-5 w-5" />
          <Input
            type="text"
            placeholder="Search surveys, questions, or options..."
            className="pl-12 pr-4 py-3 w-full rounded-2xl border-border focus:border-primary focus:ring-2 focus:ring-primary/40 text-lg"
            defaultValue={searchQuery}
          />
        </div>
      </div>

      {/* Polls Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPolls.map((poll) => {
          const totalVotes = calculateTotalVotes(poll.options);
          
          return (
            <Card key={poll.id} className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-border hover:border-primary/30">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <Badge 
                    variant={poll.isActive ? "default" : "outline"}
                    className="shrink-0"
                  >
                    {poll.isActive ? "Active" : "Closed"}
                  </Badge>
                  {poll.expiresAt && (
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Expires
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {poll.question}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Participants and Date */}
                <div className="flex items-center justify-between mb-4 text-sm text-text-secondary">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {totalVotes} participants
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(poll.createdAt)}
                  </span>
                </div>

                {/* Options Progress */}
                <div className="space-y-3 mb-6">
                  {poll.options.slice(0, 3).map((option) => {
                    const percentage = totalVotes > 0 ? (option.votes.length / totalVotes) * 100 : 0;
                    return (
                      <div key={option.id} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-foreground truncate">
                            {option.text}
                          </span>
                          <span className="text-text-secondary text-xs">
                            {option.votes.length} ({Math.round(percentage)}%)
                          </span>
                        </div>
                        <div className="w-full bg-secondary/20 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  {poll.options.length > 3 && (
                    <div className="text-center text-text-secondary text-sm">
                      +{poll.options.length - 3} more options
                    </div>
                  )}
                </div>

                {/* View Details Button */}
                <PollModal poll={poll}>
                  <button className="w-full flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 transition-all duration-300 py-3 px-4 rounded-xl font-semibold group/btn">
                    View Details
                    <BarChart3 className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </PollModal>
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