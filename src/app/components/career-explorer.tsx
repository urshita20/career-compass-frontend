import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";
import { Progress } from "@/app/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
export function CareerExplorer({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <h1>Career Explorer</h1>
      <button onClick={onBack}>Back</button>
      {/* Render list of careers or other UI */}
    </div>
  );
}

interface Question {
  id: number;
  category: string;
  question: string;
  options: { value: string; label: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    category: "Interests",
    question: "Which activity sounds most appealing to you?",
    options: [
      { value: "technology", label: "Working with computers and technology" },
      { value: "creative", label: "Creating art, designs, or content" },
      { value: "people", label: "Helping and working with people" },
      { value: "analytical", label: "Analyzing data and solving problems" },
    ],
  },
  {
    id: 2,
    category: "Skills",
    question: "What are you naturally good at?",
    options: [
      { value: "logical", label: "Logical thinking and mathematics" },
      { value: "communication", label: "Communication and public speaking" },
      { value: "creative", label: "Creative and artistic expression" },
      { value: "organizational", label: "Organization and planning" },
    ],
  },
  {
    id: 3,
    category: "Work Style",
    question: "What type of work environment do you prefer?",
    options: [
      { value: "office", label: "Structured office environment" },
      { value: "remote", label: "Remote/flexible work" },
      { value: "outdoor", label: "Hands-on/outdoor work" },
      { value: "collaborative", label: "Collaborative team spaces" },
    ],
  },
  {
    id: 4,
    category: "Goals",
    question: "What is your primary career goal?",
    options: [
      { value: "impact", label: "Making a positive social impact" },
      { value: "innovation", label: "Innovation and entrepreneurship" },
      { value: "stability", label: "Job security and stability" },
      { value: "growth", label: "Rapid career advancement" },
    ],
  },
  {
    id: 5,
    category: "Interests",
    question: "Which subject area interests you most?",
    options: [
      { value: "stem", label: "Science, Technology, Engineering, Math" },
      { value: "business", label: "Business and Management" },
      { value: "arts", label: "Arts and Humanities" },
      { value: "health", label: "Healthcare and Life Sciences" },
    ],
  },
  {
    id: 6,
    category: "Skills",
    question: "How do you approach problem-solving?",
    options: [
      { value: "systematic", label: "Systematic and methodical" },
      { value: "creative", label: "Creative and innovative" },
      { value: "collaborative", label: "Through team collaboration" },
      { value: "research", label: "Through research and analysis" },
    ],
  },
  {
    id: 7,
    category: "Work Style",
    question: "What motivates you most at work?",
    options: [
      { value: "challenge", label: "Challenging problems to solve" },
      { value: "recognition", label: "Recognition and achievement" },
      { value: "autonomy", label: "Independence and autonomy" },
      { value: "teamwork", label: "Teamwork and collaboration" },
    ],
  },
  {
    id: 8,
    category: "Goals",
    question: "In 5 years, where do you see yourself?",
    options: [
      { value: "leadership", label: "In a leadership position" },
      { value: "specialist", label: "As a specialist/expert in my field" },
      { value: "entrepreneur", label: "Running my own business" },
      { value: "global", label: "Working on global projects" },
    ],
  },
  {
    id: 9,
    category: "Interests",
    question: "What type of impact do you want to create?",
    options: [
      { value: "technology", label: "Technological advancement" },
      { value: "social", label: "Social change and welfare" },
      { value: "education", label: "Education and knowledge sharing" },
      { value: "sustainability", label: "Environmental sustainability" },
    ],
  },
  {
    id: 10,
    category: "Skills",
    question: "What's your learning style?",
    options: [
      { value: "visual", label: "Visual learner (videos, diagrams)" },
      { value: "hands-on", label: "Hands-on/practical learning" },
      { value: "reading", label: "Reading and research" },
      { value: "discussion", label: "Group discussion and debate" },
    ],
  },
];

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

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentAnswer = answers[questions[currentQuestion].id];
  const isAnswered = currentAnswer !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
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
            <CardTitle className="text-2xl">
              {questions[currentQuestion].question}
            </CardTitle>
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
                  <Label
                    htmlFor={option.value}
                    className="flex-1 cursor-pointer text-base"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePrevious}
                variant="outline"
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isAnswered}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {currentQuestion < questions.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
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
