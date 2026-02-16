import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Sparkles, BookOpen, Target, TrendingUp } from "lucide-react";
import { CareerPath } from "./career-data";
import { useState } from "react";

interface LearningPathPageProps {
  career: CareerPath;
  onBack: () => void;
}

interface CareerTask {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const careerTasks: { [key: string]: CareerTask[] } = {
  "software-engineer": [
    { id: "1", title: "Build a Simple Calculator", description: "Create a calculator app using HTML, CSS, and JavaScript", difficulty: "Easy" },
    { id: "2", title: "Create Your Portfolio Website", description: "Design and code your personal portfolio from scratch", difficulty: "Medium" },
    { id: "3", title: "Solve 10 Coding Problems", description: "Practice problem-solving on platforms like LeetCode or HackerRank", difficulty: "Medium" },
    { id: "4", title: "Build a To-Do List App", description: "Create a functional to-do app with add, delete, and mark as complete features", difficulty: "Hard" },
  ],
  "data-scientist": [
    { id: "1", title: "Analyze a Public Dataset", description: "Download a dataset from Kaggle and perform basic analysis using Python/Excel", difficulty: "Easy" },
    { id: "2", title: "Create Data Visualizations", description: "Make 5 different charts to tell a story with data", difficulty: "Medium" },
    { id: "3", title: "Build a Simple ML Model", description: "Train a basic prediction model using scikit-learn", difficulty: "Hard" },
    { id: "4", title: "Write a Data Story", description: "Present your findings in a blog post or presentation", difficulty: "Medium" },
  ],
  "data-analyst": [
    { id: "1", title: "Clean a Messy Dataset", description: "Take a real dataset and clean it - handle missing values, duplicates, etc.", difficulty: "Easy" },
    { id: "2", title: "Create an Excel Dashboard", description: "Build an interactive dashboard with charts and pivot tables", difficulty: "Medium" },
    { id: "3", title: "Perform SQL Queries", description: "Practice 20 SQL queries on a sample database", difficulty: "Medium" },
    { id: "4", title: "Present Business Insights", description: "Analyze sales data and present actionable insights", difficulty: "Hard" },
  ],
  "cybersecurity-specialist": [
    { id: "1", title: "Learn Basic Networking", description: "Understand how IP addresses, DNS, and HTTP work", difficulty: "Easy" },
    { id: "2", title: "Set Up a Virtual Lab", description: "Install VirtualBox and create a practice hacking environment", difficulty: "Medium" },
    { id: "3", title: "Complete TryHackMe Room", description: "Finish a beginner-level cybersecurity challenge", difficulty: "Medium" },
    { id: "4", title: "Perform a Security Audit", description: "Check your home network for vulnerabilities", difficulty: "Hard" },
  ],
  "ux/ui-designer": [
    { id: "1", title: "Redesign a Mobile App", description: "Take an existing app and create an improved design mockup", difficulty: "Easy" },
    { id: "2", title: "Create a Design System", description: "Build a basic design system with colors, fonts, and components", difficulty: "Medium" },
    { id: "3", title: "Conduct User Research", description: "Interview 5 people about their app usage habits", difficulty: "Medium" },
    { id: "4", title: "Build an Interactive Prototype", description: "Create a clickable prototype in Figma with animations", difficulty: "Hard" },
  ],
  "graphic-designer": [
    { id: "1", title: "Design 5 Logos", description: "Create logo concepts for different types of businesses", difficulty: "Easy" },
    { id: "2", title: "Make Social Media Graphics", description: "Design a set of Instagram posts for a brand", difficulty: "Medium" },
    { id: "3", title: "Create a Brand Identity", description: "Develop a complete brand kit (logo, colors, fonts, patterns)", difficulty: "Hard" },
    { id: "4", title: "Design a Poster", description: "Create an eye-catching poster for an event or movie", difficulty: "Medium" },
  ],
  "content-creator": [
    { id: "1", title: "Post Daily for a Week", description: "Create and share content on any platform for 7 consecutive days", difficulty: "Easy" },
    { id: "2", title: "Edit a Short Video", description: "Create a 60-second video with music, transitions, and effects", difficulty: "Medium" },
    { id: "3", title: "Write 5 Blog Posts", description: "Write informative articles on topics you're passionate about", difficulty: "Medium" },
    { id: "4", title: "Grow to 100 Followers", description: "Build an engaged audience on a social platform", difficulty: "Hard" },
  ],
  "entrepreneur": [
    { id: "1", title: "Identify a Problem", description: "Find 3 problems people face daily that could be solved with a business", difficulty: "Easy" },
    { id: "2", title: "Create a Business Plan", description: "Write a one-page business plan for a startup idea", difficulty: "Medium" },
    { id: "3", title: "Make Your First Sale", description: "Sell a product or service to at least one customer", difficulty: "Hard" },
    { id: "4", title: "Build a Landing Page", description: "Create a simple website to showcase your business idea", difficulty: "Medium" },
  ],
  "marketing-manager": [
    { id: "1", title: "Run a Social Media Campaign", description: "Plan and execute a week-long campaign for a brand or cause", difficulty: "Easy" },
    { id: "2", title: "Analyze Competitor Strategy", description: "Study 3 brands and document their marketing approaches", difficulty: "Medium" },
    { id: "3", title: "Create Marketing Materials", description: "Design posters, flyers, and digital ads for a product", difficulty: "Medium" },
    { id: "4", title: "Track Campaign Metrics", description: "Use analytics to measure reach, engagement, and conversions", difficulty: "Hard" },
  ],
  "investment-banker": [
    { id: "1", title: "Learn Stock Market Basics", description: "Understand stocks, bonds, IPOs, and market indices", difficulty: "Easy" },
    { id: "2", title: "Analyze a Company", description: "Read financial statements and evaluate a company's health", difficulty: "Medium" },
    { id: "3", title: "Create a Mock Portfolio", description: "Build a virtual investment portfolio and track its performance", difficulty: "Medium" },
    { id: "4", title: "Present an Investment Pitch", description: "Prepare a 5-minute pitch recommending a stock to invest in", difficulty: "Hard" },
  ],
  "chartered-accountant": [
    { id: "1", title: "Learn Accounting Basics", description: "Understand debits, credits, and double-entry bookkeeping", difficulty: "Easy" },
    { id: "2", title: "Prepare a Personal Budget", description: "Track your income and expenses for a month", difficulty: "Easy" },
    { id: "3", title: "File Mock Tax Returns", description: "Practice filling out tax forms with sample data", difficulty: "Medium" },
    { id: "4", title: "Audit Financial Statements", description: "Review a company's balance sheet for errors or inconsistencies", difficulty: "Hard" },
  ],
  "doctor": [
    { id: "1", title: "Shadow a Healthcare Professional", description: "Spend a day observing a doctor or nurse at work", difficulty: "Easy" },
    { id: "2", title: "Learn First Aid", description: "Complete an online first aid and CPR certification course", difficulty: "Medium" },
    { id: "3", title: "Read Medical Cases", description: "Study 5 real medical case studies and their diagnoses", difficulty: "Medium" },
    { id: "4", title: "Volunteer at a Clinic", description: "Help out at a local health camp or clinic for a day", difficulty: "Hard" },
  ],
  "nurse": [
    { id: "1", title: "Take a CPR Course", description: "Get certified in basic life support and CPR", difficulty: "Easy" },
    { id: "2", title: "Learn Medical Terminology", description: "Memorize 50 common medical terms and abbreviations", difficulty: "Medium" },
    { id: "3", title: "Practice Patient Care", description: "Volunteer to help elderly or sick family members/neighbors", difficulty: "Medium" },
    { id: "4", title: "Understand Medications", description: "Research 10 common medications and their uses", difficulty: "Hard" },
  ],
  "pharmacist": [
    { id: "1", title: "Learn Drug Categories", description: "Study the main categories of medicines (antibiotics, painkillers, etc.)", difficulty: "Easy" },
    { id: "2", title: "Visit a Pharmacy", description: "Shadow a pharmacist and observe how they work", difficulty: "Medium" },
    { id: "3", title: "Understand Prescriptions", description: "Learn how to read and interpret medical prescriptions", difficulty: "Medium" },
    { id: "4", title: "Research Drug Interactions", description: "Study which medications shouldn't be taken together and why", difficulty: "Hard" },
  ],
  "teacher": [
    { id: "1", title: "Create a Lesson Plan", description: "Plan a 30-minute lesson on any topic of your choice", difficulty: "Easy" },
    { id: "2", title: "Tutor Someone", description: "Help a younger student or friend learn something new", difficulty: "Medium" },
    { id: "3", title: "Make Educational Content", description: "Create teaching materials like slides, worksheets, or videos", difficulty: "Medium" },
    { id: "4", title: "Teach a Mini Class", description: "Conduct a small class or workshop for 5+ people", difficulty: "Hard" },
  ],
  "lawyer": [
    { id: "1", title: "Study a Legal Case", description: "Read about a famous court case and understand the verdict", difficulty: "Easy" },
    { id: "2", title: "Learn Legal Terms", description: "Memorize 20 common legal terms and their meanings", difficulty: "Medium" },
    { id: "3", title: "Practice Argumentation", description: "Debate both sides of a controversial legal issue", difficulty: "Medium" },
    { id: "4", title: "Draft a Legal Document", description: "Write a simple contract or legal agreement", difficulty: "Hard" },
  ],
  "civil-engineer": [
    { id: "1", title: "Design a Simple Structure", description: "Sketch plans for a small bridge or building", difficulty: "Easy" },
    { id: "2", title: "Learn CAD Software", description: "Complete beginner tutorials for AutoCAD or SketchUp", difficulty: "Medium" },
    { id: "3", title: "Calculate Structural Loads", description: "Practice basic calculations for weight and stress distribution", difficulty: "Hard" },
    { id: "4", title: "Visit a Construction Site", description: "Observe real construction work and ask questions", difficulty: "Medium" },
  ],
  "mechanical-engineer": [
    { id: "1", title: "Build a Simple Machine", description: "Create a basic mechanism using household items", difficulty: "Easy" },
    { id: "2", title: "Learn 3D Modeling", description: "Design a mechanical part in software like Fusion 360", difficulty: "Medium" },
    { id: "3", title: "Disassemble & Reassemble", description: "Take apart an old device and put it back together", difficulty: "Medium" },
    { id: "4", title: "Solve Thermodynamics Problems", description: "Work through practice problems on heat and energy", difficulty: "Hard" },
  ],
  "architect": [
    { id: "1", title: "Sketch Building Designs", description: "Draw floor plans for your dream house", difficulty: "Easy" },
    { id: "2", title: "Study Famous Buildings", description: "Research 5 iconic buildings and their architectural styles", difficulty: "Medium" },
    { id: "3", title: "Create a 3D Model", description: "Design a building in SketchUp or Blender", difficulty: "Hard" },
    { id: "4", title: "Visit Architectural Sites", description: "Explore and photograph interesting buildings in your city", difficulty: "Medium" },
  ],
  "psychologist": [
    { id: "1", title: "Learn Psychology Basics", description: "Study major psychological theories and concepts", difficulty: "Easy" },
    { id: "2", title: "Practice Active Listening", description: "Have deep conversations where you focus on truly understanding others", difficulty: "Medium" },
    { id: "3", title: "Study Case Studies", description: "Read and analyze 5 famous psychological case studies", difficulty: "Medium" },
    { id: "4", title: "Conduct a Mini Research", description: "Design and conduct a simple survey on human behavior", difficulty: "Hard" },
  ],
};

export function LearningPathPage({ career, onBack }: LearningPathPageProps) {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  
  const availableTasks = careerTasks[career.id] || [];
  const completionPercentage = availableTasks.length > 0 
    ? Math.round((completedTasks.size / availableTasks.length) * 100) 
    : 0;

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 hover:bg-white/50"
        >
          ← Back to Results
        </Button>

        <Card className="mb-8 overflow-hidden border-2 border-purple-200 bg-gradient-to-br from-purple-500 to-pink-500">
          <CardContent className="p-8 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-8 w-8" />
              <h1 className="text-4xl font-bold">Your Learning Path 🚀</h1>
            </div>
            <h2 className="text-2xl font-semibold mb-3">{career.title}</h2>
            <p className="text-lg opacity-90 max-w-3xl">
              We've curated the perfect learning journey just for you! Follow these steps to become a pro {career.title.toLowerCase()}.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 border-blue-200 bg-white/70 backdrop-blur">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-10 w-10 mx-auto mb-3 text-blue-500" />
              <h3 className="font-semibold text-lg mb-1">0 Courses</h3>
              <p className="text-sm text-gray-600">Curated for you</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-white/70 backdrop-blur">
            <CardContent className="p-6 text-center">
              <Target className="h-10 w-10 mx-auto mb-3 text-purple-500" />
              <h3 className="font-semibold text-lg mb-1">6-12 Months</h3>
              <p className="text-sm text-gray-600">Learning timeline</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-pink-200 bg-white/70 backdrop-blur">
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="h-10 w-10 mx-auto mb-3 text-pink-500" />
              <h3 className="font-semibold text-lg mb-1">Career Ready</h3>
              <p className="text-sm text-gray-600">Upon completion</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-white/70 backdrop-blur">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-10 w-10 mx-auto mb-3 text-orange-500" />
              <h3 className="font-semibold text-lg mb-1">{career.averageSalary}</h3>
              <p className="text-sm text-gray-600">Starting salary</p>
            </CardContent>
          </Card>
        </div>

        {availableTasks.length > 0 && (
          <Card className="mb-8 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500 text-white rounded-full p-2">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Try This Career Out ⚡</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Get hands-on experience before committing! Complete these tasks to see if this career is right for you.
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-600">{completionPercentage}%</div>
                  <div className="text-xs text-gray-600">Complete</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {availableTasks.map((task) => {
                const isCompleted = completedTasks.has(task.id);
                return (
                  <Card
                    key={task.id}
                    className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                      isCompleted
                        ? "bg-green-50 border-green-300"
                        : "bg-white border-gray-200 hover:border-orange-300"
                    }`}
                    onClick={() => toggleTask(task.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {isCompleted ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                          ) : (
                            <Circle className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`font-semibold ${isCompleted ? "text-green-800" : "text-gray-900"}`}>
                              {task.title}
                            </h4>
                            <Badge
                              variant="outline"
                              className={`
                                ${task.difficulty === "Easy" && "border-green-300 text-green-700 bg-green-50"}
                                ${task.difficulty === "Medium" && "border-yellow-300 text-yellow-700 bg-yellow-50"}
                                ${task.difficulty === "Hard" && "border-red-300 text-red-700 bg-red-50"}
                              `}
                            >
                              {task.difficulty}
                            </Badge>
                          </div>
                          <p className={`text-sm ${isCompleted ? "text-green-700" : "text-gray-600"}`}>
                            {task.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        )}

        <Card className="border-2 border-purple-200 bg-white/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Target className="h-6 w-6 text-purple-500" />
              Skills You'll Master
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {career.requiredSkills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-300 px-4 py-2 text-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
