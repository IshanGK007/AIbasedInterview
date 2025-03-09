import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Share2, ArrowRight } from "lucide-react";
import InterviewAnalysis from "./InterviewAnalysis";
import NavBar from "./NavBar";

interface InterviewResultsProps {
  onStartNew?: () => void;
  onViewDashboard?: () => void;
  answers?: string[];
  questions?: string[];
  questionTypes?: string[];
  codeAnswers?: string[];
  codingLanguages?: string[];
}

const InterviewResults = ({
  onStartNew = () => {},
  onViewDashboard = () => {},
  answers = [],
  questions = [],
  questionTypes = [],
  codeAnswers = [],
  codingLanguages = [],
}: InterviewResultsProps) => {
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);

  if (showDetailedAnalysis) {
    return (
      <div className="bg-background min-h-screen">
        <NavBar />
        <div className="container mx-auto py-8 px-4">
          <InterviewAnalysis
            answers={answers}
            questions={questions}
            questionTypes={questionTypes}
            codeAnswers={codeAnswers}
            codingLanguages={codingLanguages}
          />
          <div className="container mx-auto py-4 px-4">
            <Button
              variant="outline"
              onClick={() => setShowDetailedAnalysis(false)}
            >
              Back to Summary
            </Button>
          </div>
        </div>
      </div>
    );
  }
  // Mock data for the results
  const mockResults = {
    overallScore: 78,
    metrics: {
      confidence: 82,
      clarity: 75,
      content: 80,
      pacing: 68,
    },
    questionFeedback: [
      {
        question:
          "Tell me about a time when you had to deal with a difficult team member. How did you handle it?",
        strengths: [
          "Good conflict resolution approach",
          "Clear communication strategy",
        ],
        improvements: [
          "Could provide more specific outcomes",
          "Consider mentioning what you learned",
        ],
      },
      {
        question:
          "Describe a project where you had to learn a new technology quickly. What was your approach?",
        strengths: [
          "Excellent learning methodology",
          "Good prioritization of concepts",
        ],
        improvements: [
          "Spoke too quickly at times",
          "Could elaborate on specific challenges overcome",
        ],
      },
      {
        question: "What's your greatest professional achievement and why?",
        strengths: ["Compelling story structure", "Good emphasis on impact"],
        improvements: [
          "Quantify results more precisely",
          "Highlight your unique contribution",
        ],
      },
    ],
  };

  return (
    <div className="bg-background min-h-screen">
      <NavBar />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Interview Results</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Overall Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-4">
                <div className="relative h-32 w-32 flex items-center justify-center">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted-foreground stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-primary stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - mockResults.overallScore / 100)}`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">
                      {mockResults.overallScore}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Great performance!
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Confidence</span>
                    <span className="text-sm font-medium">
                      {mockResults.metrics.confidence}%
                    </span>
                  </div>
                  <Progress
                    value={mockResults.metrics.confidence}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Speech Clarity</span>
                    <span className="text-sm font-medium">
                      {mockResults.metrics.clarity}%
                    </span>
                  </div>
                  <Progress
                    value={mockResults.metrics.clarity}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Content Quality</span>
                    <span className="text-sm font-medium">
                      {mockResults.metrics.content}%
                    </span>
                  </div>
                  <Progress
                    value={mockResults.metrics.content}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Speaking Pace</span>
                    <span className="text-sm font-medium">
                      {mockResults.metrics.pacing}%
                    </span>
                  </div>
                  <Progress
                    value={mockResults.metrics.pacing}
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detailed Feedback</CardTitle>
            <CardDescription>
              Question-by-question analysis and improvement suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="q0" className="w-full">
              <TabsList className="mb-4 flex-wrap">
                {mockResults.questionFeedback.map((_, index) => (
                  <TabsTrigger key={index} value={`q${index}`}>
                    Question {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>

              {mockResults.questionFeedback.map((feedback, index) => (
                <TabsContent
                  key={index}
                  value={`q${index}`}
                  className="space-y-4"
                >
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-medium mb-2">Question:</h3>
                    <p>{feedback.question}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2 text-green-600">
                        Strengths:
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {feedback.strengths.map((strength, i) => (
                          <li key={i}>{strength}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2 text-amber-600">
                        Areas for Improvement:
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {feedback.improvements.map((improvement, i) => (
                          <li key={i}>{improvement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>
              Personalized suggestions to improve your interview skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Practice Specific Areas</h3>
                <p>
                  Focus on improving your speaking pace by practicing with a
                  metronome app set to 120-140 BPM. This will help you maintain
                  a steady, engaging rhythm during interviews.
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Structure Your Responses</h3>
                <p>
                  Use the STAR method (Situation, Task, Action, Result) more
                  consistently to give your answers a clear structure that
                  interviewers can easily follow.
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Quantify Your Achievements</h3>
                <p>
                  When discussing accomplishments, include specific metrics and
                  numbers to make your impact more concrete and memorable.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onViewDashboard}>
              Return to Dashboard
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDetailedAnalysis(true)}
                className="flex items-center gap-1"
              >
                View Detailed Analysis
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button onClick={onStartNew}>Practice Again</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default InterviewResults;
