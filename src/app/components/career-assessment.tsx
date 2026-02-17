import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";
import { Progress } from "@/app/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { submitAssessment } from "@/app/components/api-service"; // your API service

interface Question {
  id: number;
  category: string;
  question: string;
  options: { value: string; label: string }[];
}

// ... (keep your existing questions array)

export interface AssessmentAnswers {
  [key: number]: string;
}

interface CareerAssessmentProps {
  onComplete: (answers: AssessmentAnswers) => void;
  onBack: () => void;
}

export function CareerAssessment({ onComplete, onBack }: CareerAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit answers to backend AI
      setIsSubmitting(true);
      try {
        const response = await submitAssessment(answers);
        const { careers, aiInsight } = response;

        // Map careers from backend to frontend format
        const formattedCareers = careers.map((career) => ({
          id: career.name.toLowerCase().replace(/\s+/g, '-'),
          title: career.name,
          category: career.stream || "General",
          description: career.description,
          averageSalary: career.salary,
          growthRate: "Growing",
          requiredSkills: career.skills,
          educationLevel: career.education,
          workEnvironment: "Office, Remote, Hybrid",
          demandLevel: "High" as const,
          matchScore: career.matchScore || 85,
          pros: ["High demand", "Good growth", "Rewarding work"],
          cons: ["Requires dedication", "Continuous learning needed"],
        }));

        // Pass formatted careers and insight to App
        onComplete({ careers: formattedCareers, aiInsight });
      } catch (err) {
        console.error("Failed to submit assessment", err);
        alert("Oops! Something went wrong. We'll show you fallback results.");
        onComplete({ careers: [], aiInsight: null });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const currentAnswer = answers[questions[currentQuestion].id];
  const isAnswered = currentAnswer !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardDescription className="text-base">
                Question {currentQuestion + 1} of {questions.length}
              </CardDescription>
              <CardDescription className="text-base">
                {questions[currentQuestion].category}
              </CardDescription>
            </div>
            <Progress value={progress} className="mb-4" />
            <CardTitle className="text-2xl">{questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={currentAnswer}
              onValueChange={handleAnswerSelect}
              className="space-y-4"
            >
              {questions[currentQuestion].options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-indigo-50 transition-colors cursor-pointer"
                  onClick={() => handleAnswerSelect(option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer text-base">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button onClick={handlePrevious} variant="outline" disabled={currentQuestion === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isAnswered || isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {isSubmitting ? "Submitting..." : currentQuestion < questions.length - 1 ? (
                  <>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  "Complete Assessment"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
