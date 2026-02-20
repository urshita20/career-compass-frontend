import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";
import { Progress } from "@/app/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TryCareerOut from "../../components/TryCareerOut";
import type { CareerTask } from "../../types/analysis";

// ─── CAREER DATA ─────────────────────────────────────────────────────────────

const careers = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    description: "Build apps, websites, and systems that power the digital world.",
    icon: "💻",
    tags: ["Tech", "Problem Solving", "High Demand"],
    tasks: [
      {
        id: "se-1",
        title: "Watch a 'Day in the Life of a Software Engineer' video",
        description: "Find one on YouTube and note what surprised you.",
        duration: "15 min",
        icon: "🎬",
      },
      {
        id: "se-2",
        title: "Try coding a simple calculator",
        description: "Use Python, JavaScript, or any language. Even pseudocode counts!",
        duration: "30 min",
        icon: "💻",
        requiresImage: true,
        imagePrompt: "Screenshot or photo of your calculator code",
      },
      {
        id: "se-3",
        title: "Solve a beginner LeetCode challenge",
        description: "Try any 'Easy' problem and share how it went.",
        duration: "20 min",
        icon: "🧩",
        requiresImage: true,
        imagePrompt: "Screenshot of your LeetCode attempt",
      },
      {
        id: "se-4",
        title: "Create your first GitHub repository",
        description: "Upload any file to get comfortable with version control.",
        duration: "25 min",
        icon: "🔧",
      },
    ] as CareerTask[],
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    description: "Create visual content that communicates and captivates audiences.",
    icon: "🎨",
    tags: ["Creative", "Visual", "Freelance-friendly"],
    tasks: [
      {
        id: "gd-1",
        title: "Create a logo for an imaginary brand",
        description: "Use Canva, Figma, or even paper. The brand name is yours to invent!",
        duration: "30 min",
        icon: "🎨",
        requiresImage: true,
        imagePrompt: "Photo or screenshot of your logo design",
      },
      {
        id: "gd-2",
        title: "Redesign a boring poster",
        description: "Find any poster online and sketch how you'd improve it.",
        duration: "20 min",
        icon: "🖼️",
        requiresImage: true,
        imagePrompt: "Your redesign sketch or mockup",
      },
      {
        id: "gd-3",
        title: "Study a famous designer's portfolio",
        description: "Pick one designer and write 3 things you learned.",
        duration: "15 min",
        icon: "📚",
      },
      {
        id: "gd-4",
        title: "Pick a colour palette for a brand",
        description: "Choose 3–5 colours for an imaginary company and explain why.",
        duration: "15 min",
        icon: "🎭",
        requiresImage: true,
        imagePrompt: "Screenshot of your colour palette",
      },
    ] as CareerTask[],
  },
  {
    id: "doctor",
    title: "Doctor / Physician",
    description: "Diagnose and treat patients, making a direct impact on human health.",
    icon: "🩺",
    tags: ["Healthcare", "Science", "High Impact"],
    tasks: [
      {
        id: "doc-1",
        title: "Watch a medical procedure explanation video",
        description: "Find a beginner-friendly medical video on YouTube (e.g. how stitches work).",
        duration: "15 min",
        icon: "🎬",
      },
      {
        id: "doc-2",
        title: "Practice reading a basic patient case",
        description: "Find a sample medical case online and write what questions you'd ask.",
        duration: "20 min",
        icon: "📋",
      },
      {
        id: "doc-3",
        title: "Learn to take a pulse",
        description: "Time your own resting heart rate for 60 seconds. Is it in the healthy range?",
        duration: "10 min",
        icon: "❤️",
        requiresImage: true,
        imagePrompt: "Photo of you taking your pulse",
      },
      {
        id: "doc-4",
        title: "Research one medical condition in depth",
        description: "Pick any condition and write its causes, symptoms, and treatment.",
        duration: "25 min",
        icon: "🔬",
      },
    ] as CareerTask[],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Turn raw data into insights that drive decisions for businesses and governments.",
    icon: "📊",
    tags: ["Analytics", "AI/ML", "High Salary"],
    tasks: [
      {
        id: "ds-1",
        title: "Analyse a dataset in Google Sheets",
        description: "Download any free CSV dataset and create one chart from it.",
        duration: "30 min",
        icon: "📊",
        requiresImage: true,
        imagePrompt: "Screenshot of your chart",
      },
      {
        id: "ds-2",
        title: "Find a pattern in real data",
        description: "Look at weather or sports data and describe one trend you notice.",
        duration: "20 min",
        icon: "🔍",
      },
      {
        id: "ds-3",
        title: "Try a Python basics tutorial",
        description: "Complete any free beginner Python exercise (even printing 'Hello World').",
        duration: "25 min",
        icon: "🐍",
        requiresImage: true,
        imagePrompt: "Screenshot of your Python code running",
      },
      {
        id: "ds-4",
        title: "Read about a real AI use case",
        description: "Find one article about AI solving a real problem. Write 3 takeaways.",
        duration: "15 min",
        icon: "🤖",
      },
    ] as CareerTask[],
  },
  {
    id: "teacher",
    title: "Teacher / Educator",
    description: "Shape young minds and inspire the next generation of thinkers.",
    icon: "📖",
    tags: ["Education", "People-focused", "Meaningful"],
    tasks: [
      {
        id: "te-1",
        title: "Teach a concept to someone at home",
        description: "Explain anything you know (maths, cooking, a game) to a family member.",
        duration: "15 min",
        icon: "🗣️",
      },
      {
        id: "te-2",
        title: "Create a 5-minute lesson plan",
        description: "Pick any topic and write: objective, activity, and how you'd check understanding.",
        duration: "20 min",
        icon: "📝",
        requiresImage: true,
        imagePrompt: "Photo of your handwritten or typed lesson plan",
      },
      {
        id: "te-3",
        title: "Watch a master teacher in action",
        description: "Find a highly-rated YouTube educator and note 3 techniques they use.",
        duration: "20 min",
        icon: "🎬",
      },
      {
        id: "te-4",
        title: "Design a fun quiz on any topic",
        description: "Create 5 quiz questions with answers on a subject you enjoy.",
        duration: "15 min",
        icon: "❓",
      },
    ] as CareerTask[],
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur",
    description: "Build something from nothing — create businesses that solve real problems.",
    icon: "🚀",
    tags: ["Business", "Creative", "Risk-taking"],
    tasks: [
      {
        id: "en-1",
        title: "Identify a problem in your daily life",
        description: "Write down one thing that annoys you that a product or service could fix.",
        duration: "10 min",
        icon: "💡",
      },
      {
        id: "en-2",
        title: "Sketch a business idea",
        description: "For your problem: who are the customers, what do you sell, how do you make money?",
        duration: "20 min",
        icon: "📋",
        requiresImage: true,
        imagePrompt: "Photo of your business idea sketch or notes",
      },
      {
        id: "en-3",
        title: "Research your competition",
        description: "Find 2–3 companies solving similar problems. What would you do differently?",
        duration: "20 min",
        icon: "🔍",
      },
      {
        id: "en-4",
        title: "Give your business a name and tagline",
        description: "Come up with a memorable name and one-sentence tagline for your idea.",
        duration: "15 min",
        icon: "✨",
      },
    ] as CareerTask[],
  },
];

// ─── CAREER CARD ─────────────────────────────────────────────────────────────

function CareerCard({
  career,
  onClick,
}: {
  career: (typeof careers)[0];
  onClick: () => void;
}) {
  return (
    <Card
      className="border-2 hover:border-orange-400 hover:shadow-xl transition-all cursor-pointer dark:bg-zinc-900 dark:border-zinc-800 group"
      onClick={onClick}
    >
      <CardHeader>
        <div className="text-4xl mb-2">{career.icon}</div>
        <CardTitle className="text-xl dark:text-white group-hover:text-orange-500 transition-colors">
          {career.title}
        </CardTitle>
        <CardDescription className="text-sm dark:text-gray-400">
          {career.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-3">
          {career.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400"
        >
          ⚡ Try This Career Out
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── MAIN CAREER EXPLORER ────────────────────────────────────────────────────

export function CareerExplorer({ onBack, onStartLearning }: { onBack: () => void; onStartLearning?: (career: any) => void }) {
  const [selectedCareer, setSelectedCareer] = useState<(typeof careers)[0] | null>(null);

  if (selectedCareer) {
    return (
      <div className="min-h-screen bg-amber-50/30 dark:bg-zinc-950 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={() => setSelectedCareer(null)}
            variant="ghost"
            className="mb-6 text-gray-500 hover:text-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Careers
          </Button>
          <TryCareerOut
            careerTitle={selectedCareer.title}
            tasks={selectedCareer.tasks}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Explore Careers
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Pick a career, try real beginner tasks, and get a personalised AI analysis of your fit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career) => (
            <CareerCard
              key={career.id}
              career={career}
              onClick={() => setSelectedCareer(career)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── KEEP EXISTING ASSESSMENT CODE BELOW (unchanged) ─────────────────────────

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
        <Button onClick={onBack} variant="ghost" className="mb-6">
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
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer text-base">
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
