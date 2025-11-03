"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { useCreatePoll } from "@/hooks/useCreatePolls";
import toast from "react-hot-toast";

export function CreatePollForm() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const { mutate: createPoll, isPending } = useCreatePoll();

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty options
    const validOptions = options.filter(opt => opt.trim() !== "");
    
    if (validOptions.length < 2) {
      toast.error("Please add at least 2 options");
      return;
    }

    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    // Log for debugging
    console.log('🎯 Submitting poll data:', {
      question: question.trim(),
      options: validOptions
    });

    // Call the API
    createPoll({
      question: question.trim(),
      options: validOptions
    });
  };

  return (
    <Card className="min-w-2xl py-6">
      <CardHeader className="text-center flex items-center justify-center gap-2">
        <CardTitle className="text-2xl font-bold">Create New Survey</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question Input */}
          <div className="space-y-3">
            <Label htmlFor="question" className="text-base font-semibold">
              Survey Question *
            </Label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask your question here..."
              className="h-12 text-lg rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-primary/40"
              required
              disabled={isPending}
            />
          </div>

          {/* Options Section */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">
              Options * (Minimum 2)
            </Label>
            
            <div className="space-y-3 max-h-[18vh] overflow-y-auto">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <Input
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="h-11 rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-primary/40 flex-1"
                    required
                    disabled={isPending}
                  />
                  
                  {/* Remove Button - Only show if more than 2 options */}
                  {options.length > 2 && (
                    <Button
                      type="button"
                      onClick={() => removeOption(index)}
                      variant="outline"
                      size="sm"
                      className="h-9 w-9 p-0 border-border text-text-secondary hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-30"
                      disabled={isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Option Button */}
            <Button
              type="button"
              onClick={addOption}
              variant="outline"
              className="w-full cursor-pointer border-border hover:border-primary hover:bg-primary/5 text-text-secondary hover:text-primary transition-all duration-200 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isPending}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary/70 cursor-pointer to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            size="lg"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Survey...
              </>
            ) : (
              "Create Survey"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}