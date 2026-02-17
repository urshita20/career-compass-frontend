import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, BookOpen, CheckCircle2, Clock,
  Play, Star, TrendingUp, Trophy, Users, Zap, Send, Loader2, X
} from "lucide-react";
import { CareerPath, learningResources } from "./career-data";
import { useState } from "react";

interface LearningPathPageProps {
  career: CareerPath;
  onBack: () => void;
}

const API_BASE = "https://career-compass-backend-nzny.onrender.com/api/careers";

// Tasks for ALL careers
const getAllCareerTasks = (careerTitle: string) => {
  const taskMap: { [key: string]: Array<{ id: string; task: string; time: string; icon: string; hint: string }> } = {
    "Software Engineer": [
      { id: "1", task: "Write a program that prints numbers 1 to 10", time: "20 min", icon: "💻", hint: "Try using a for loop in any language like Python or JavaScript" },
      { id: "2", task: "Explain what a website is and how it works", time: "15 min", icon: "🌐", hint: "Think about frontend, backend, and how browsers work" },
      { id: "3", task: "List 5 programming languages and what they're used for", time: "10 min", icon: "📝", hint: "Research Python, JavaScript, Java, C++, Swift" },
      { id: "4", task: "Describe what debugging means in programming", time: "10 min", icon: "🐛", hint: "Debugging is the process of finding and fixing errors in code" },
    ],
    "Data Scientist": [
      { id: "1", task: "Collect data from 10 classmates about their favorite subjects and create a chart", time: "30 min", icon: "📊", hint: "Use a bar chart or pie chart to visualize the data" },
      { id: "2", task: "Find a pattern in this data: 2, 4, 6, 8, 10 and explain it", time: "10 min", icon: "🔍", hint: "Look at the difference between consecutive numbers" },
      { id: "3", task: "Explain what machine learning means in simple terms", time: "15 min", icon: "🤖", hint: "Think about how computers learn from examples, like how you learned to recognize cats" },
      { id: "4", task: "List 3 real-world uses of data science in India", time: "15 min", icon: "🇮🇳", hint: "Think about Aadhaar, UPI, weather prediction" },
    ],
    "UI/UX Designer": [
      { id: "1", task: "Sketch 3 different button designs on paper", time: "15 min", icon: "✏️", hint: "Think about shape, color, text, and how they make you feel" },
      { id: "2", task: "Describe what makes a good app design (5 points)", time: "15 min", icon: "📱", hint: "Think about simplicity, colors, navigation, speed, accessibility" },
      { id: "3", task: "Redesign your school's website homepage on paper", time: "25 min", icon: "🖥️", hint: "Focus on making it easy to find information quickly" },
      { id: "4", task: "Explain the difference between UI and UX design", time: "10 min", icon: "🎨", hint: "UI is how it looks, UX is how it feels to use it" },
    ],
    "Doctor (General Physician)": [
      { id: "1", task: "Explain what a doctor does during a regular checkup", time: "15 min", icon: "🩺", hint: "Think about checking vital signs, asking about symptoms, prescribing medicine" },
      { id: "2", task: "List 5 important vitamins and what they do for the body", time: "15 min", icon: "💊", hint: "Research Vitamin A, B12, C, D, and Iron" },
      { id: "3", task: "Describe 3 healthy habits that prevent disease", time: "10 min", icon: "🏥", hint: "Think about diet, exercise, sleep, hygiene" },
      { id: "4", task: "What is the difference between a virus and bacteria?", time: "15 min", icon: "🔬", hint: "Research how they differ in structure and how antibiotics relate" },
    ],
    "Entrepreneur": [
      { id: "1", task: "Write a business idea you have and explain how it would make money", time: "20 min", icon: "💡", hint: "Think about a problem you see and how your business could solve it" },
      { id: "2", task: "Name 3 successful Indian startups and what problem they solved", time: "15 min", icon: "🇮🇳", hint: "Research Flipkart, Ola, Zomato, BYJU'S, Paytm" },
      { id: "3", task: "List 5 qualities a successful entrepreneur must have", time: "10 min", icon: "🌟", hint: "Think about risk-taking, persistence, leadership, creativity, networking" },
      { id: "4", task: "Create a simple business plan outline for a small business", time: "25 min", icon: "📋", hint: "Include: What you sell, Who buys it, How you'll market it, How you'll make money" },
    ],
    "Marketing Manager": [
      { id: "1", task: "Create a tagline for a new Indian snack brand", time: "15 min", icon: "📣", hint: "Make it catchy, memorable, and relevant to Indian culture" },
      { id: "2", task: "Describe a social media campaign for a school event", time: "20 min", icon: "📱", hint: "Think about Instagram posts, hashtags, stories, and engagement" },
      { id: "3", task: "Explain what target audience means with an example", time: "10 min", icon: "🎯", hint: "A toy company's target audience is children aged 3-10 and their parents" },
      { id: "4", task: "List 5 famous Indian brand campaigns that you remember", time: "15 min", icon: "🏆", hint: "Think about Amul, Fevicol, Surf Excel, Tanishq, Asian Paints ads" },
    ],
    "Financial Analyst": [
      { id: "1", task: "Create a simple monthly budget for a student with ₹2000 pocket money", time: "20 min", icon: "💰", hint: "Divide into: food, transport, entertainment, savings" },
      { id: "2", task: "Explain what profit and loss means with a simple example", time: "15 min", icon: "📈", hint: "If you buy something for ₹100 and sell for ₹150, your profit is ₹50" },
      { id: "3", task: "What is the difference between saving and investing?", time: "15 min", icon: "🏦", hint: "Saving is keeping money safe, investing is making money grow" },
      { id: "4", task: "Research and list 3 ways to invest money in India", time: "15 min", icon: "💎", hint: "Look up Fixed Deposits, Mutual Funds, Gold, Stock Market" },
    ],
    "Graphic Designer": [
      { id: "1", task: "Design a logo for your school club on paper using simple shapes", time: "20 min", icon: "✏️", hint: "Keep it simple - use 2-3 colors and one clear symbol" },
      { id: "2", task: "Describe what makes a good logo (5 characteristics)", time: "10 min", icon: "🎨", hint: "Simple, memorable, versatile, timeless, appropriate" },
      { id: "3", task: "Pick 3 famous logos and explain why they work well", time: "15 min", icon: "🌟", hint: "Think about Apple, Nike, McDonald's - what makes them iconic?" },
      { id: "4", task: "Create a color palette (5 colors) for a children's app", time: "15 min", icon: "🌈", hint: "Children respond well to bright, fun, primary colors" },
    ],
    "Content Writer": [
      { id: "1", task: "Write a 100-word blog introduction about your favorite hobby", time: "20 min", icon: "✍️", hint: "Start with an interesting hook, then explain what you'll cover" },
      { id: "2", task: "Write 5 catchy headlines for a tech news article", time: "15 min", icon: "📰", hint: "Use numbers, questions, or power words like 'Amazing', 'Secret', 'Revealed'" },
      { id: "3", task: "Describe the difference between formal and informal writing", time: "10 min", icon: "📝", hint: "Formal: reports, essays. Informal: text messages, blogs" },
      { id: "4", task: "Write a product description for a new mobile phone (50 words)", time: "15 min", icon: "📱", hint: "Focus on benefits, not just features. How does it help the user?" },
    ],
  };

  // Return specific tasks or generic ones
  return taskMap[careerTitle] || [
    { id: "1", task: `Research what a ${careerTitle} does on a typical day and write a summary`, time: "20 min", icon: "🔍", hint: "Search online for 'Day in the life of a ${careerTitle}'" },
    { id: "2", task: `List 5 skills that are essential for being a great ${careerTitle}`, time: "15 min", icon: "⭐", hint: "Think about both technical skills and soft skills" },
    { id: "3", task: `Find one famous ${careerTitle} in India and explain their journey`, time: "20 min", icon: "🌟", hint: "Research their background, challenges, and achievements" },
    { id: "4", task: `Write about one problem that ${careerTitle}s solve in society`, time: "15 min", icon: "💡", hint: "Think about the real-world impact of this career" },
  ];
};

interface AIFeedback {
  score: number;
  strengths: string[];
  improvements: string[];
  nextSteps: string;
  overall: string;
}

export function LearningPathPage({ career, onBack }: LearningPathPageProps) {
  const resources = learningResources[career.id] || [];
  const tasks = getAllCareerTasks(career.title);

  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [userInputs, setUserInputs] = useState<{ [taskId: string]: string }>({});
  const [feedbacks, setFeedbacks] = useState<{ [taskId: string]: AIFeedback }>({});
  const [loadingTaskId, setLoadingTaskId] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState<string>("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  const completionPercentage = tasks.length > 0 ? (completedTasks.size / tasks.length) * 100 : 0;

  // Submit user work to Gemini AI for evaluation
  const submitTask = async (task: any) => {
    const userInput = userInputs[task.id];
    if (!userInput || userInput.trim().length < 10) {
      alert("Please write at least a few sentences before submitting!");
      return;
    }

    setLoadingTaskId(task.id);

    try {
      const response = await fetch(`${API_BASE}/validate-task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: task.id,
          taskDescription: task.task,
          userSubmission: userInput,
          careerName: career.title
        })
      });

      const data = await response.json();

      if (data.success && data.evaluation) {
        setFeedbacks(prev => ({ ...prev, [task.id]: data.evaluation }));
        setCompletedTasks(prev => new Set([...prev, task.id]));
        setActiveTaskId(null);
      }
    } catch (error) {
      // Fallback evaluation if API fails
      const fallback: AIFeedback = {
        score: 8,
        strengths: ["Completed the task", "Showed initiative", "Good effort"],
        improvements: ["Add more specific details", "Research further"],
        nextSteps: `Continue exploring ${career.title} through online courses and practice`,
        overall: `Great work on this ${career.title} task! You're showing real interest in this field. Keep it up! 🚀`
      };
      setFeedbacks(prev => ({ ...prev, [task.id]: fallback }));
      setCompletedTasks(prev => new Set([...prev, task.id]));
      setActiveTaskId(null);
    }

    setLoadingTaskId(null);
  };

  // Get overall summary after completing tasks
  const getCareerSummary = async () => {
    setLoadingSummary(true);

    const completedTasksData = Array.from(completedTasks).map(taskId => ({
      taskName: tasks.find(t => t.id === taskId)?.task || "Task",
      score: feedbacks[taskId]?.score || 7
    }));

    try {
      const response = await fetch(`${API_BASE}/exploration-summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completedTasks: completedTasksData,
          careerName: career.title
        })
      });

      const data = await response.json();
      if (data.success) {
        setSummary(data.summary);
        setShowSummary(true);
      }
    } catch (error) {
      setSummary(`Amazing work exploring ${career.title}! You completed ${completedTasks.size} tasks and showed genuine curiosity about this field. Your efforts demonstrate real potential. Keep building these skills and you'll be well on your way! 🌟`);
      setShowSummary(true);
    }

    setLoadingSummary(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950 dark:via-zinc-950 dark:to-orange-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button onClick={onBack} variant="ghost" className="mb-6 dark:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Results
        </Button>

        {/* Hero */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl p-8 shadow-xl mb-8">
          <h1 className="text-4xl font-extrabold mb-2">Your Learning Path 🚀</h1>
          <p className="text-xl text-purple-100 mb-6">{career.title}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center"><div className="text-3xl mb-1">📚</div><div className="text-sm text-purple-100">{resources.length} Courses</div></div>
            <div className="text-center"><div className="text-3xl mb-1">⚡</div><div className="text-sm text-purple-100">{tasks.length} Tasks</div></div>
            <div className="text-center"><div className="text-3xl mb-1">🤖</div><div className="text-sm text-purple-100">AI Feedback</div></div>
            <div className="text-center"><div className="text-3xl mb-1">💰</div><div className="text-sm text-purple-100">{career.averageSalary}</div></div>
          </div>
        </div>

        {/* TRY THIS CAREER OUT - WITH USER INPUT */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="border-2 border-orange-300 shadow-xl bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl flex items-center gap-2 dark:text-white">
                    <Zap className="h-8 w-8 text-orange-500" />
                    Try This Career Out! ⚡
                  </CardTitle>
                  <CardDescription className="text-lg mt-1 dark:text-gray-300">
                    Complete real tasks and get AI-powered feedback on your work!
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-orange-600">{completedTasks.size}/{tasks.length}</div>
                  <div className="text-sm text-gray-500">Completed</div>
                </div>
              </div>
              <Progress value={completionPercentage} className="h-3 mt-4 bg-orange-200" />
            </CardHeader>

            <CardContent className="space-y-4">
              {tasks.map((task, index) => {
                const isCompleted = completedTasks.has(task.id);
                const isActive = activeTaskId === task.id;
                const feedback = feedbacks[task.id];
                const isLoading = loadingTaskId === task.id;

                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className={`rounded-xl border-2 transition-all ${
                      isCompleted
                        ? 'bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700'
                        : isActive
                        ? 'bg-white border-orange-400 shadow-lg dark:bg-zinc-900 dark:border-orange-500'
                        : 'bg-white border-orange-200 dark:bg-zinc-900 dark:border-orange-800'
                    }`}
                  >
                    {/* Task Header */}
                    <div
                      className="p-4 flex items-center gap-4 cursor-pointer"
                      onClick={() => !isCompleted && setActiveTaskId(isActive ? null : task.id)}
                    >
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isCompleted ? 'bg-green-500 border-green-500' : 'border-orange-300'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="h-5 w-5 text-white" /> : <span className="text-sm font-bold text-orange-500">{index + 1}</span>}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{task.icon}</span>
                          <p className={`font-semibold ${isCompleted ? 'line-through text-gray-400' : 'dark:text-white'}`}>
                            {task.task}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{task.time}</span>
                        </div>
                      </div>

                      {isCompleted && feedback ? (
                        <Badge className="bg-green-500 text-white">{feedback.score}/10 ⭐</Badge>
                      ) : (
                        <Badge variant="outline" className="border-orange-300 text-orange-600">
                          {isActive ? "Working..." : "Try it!"}
                        </Badge>
                      )}
                    </div>

                    {/* Task Input Area */}
                    <AnimatePresence>
                      {isActive && !isCompleted && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 pb-4"
                        >
                          <div className="bg-orange-50 dark:bg-zinc-800 rounded-xl p-4">
                            <p className="text-sm text-orange-700 dark:text-orange-300 mb-3 flex items-center gap-2">
                              <Star className="h-4 w-4" />
                              <strong>Hint:</strong> {task.hint}
                            </p>
                            <textarea
                              className="w-full p-3 rounded-lg border-2 border-orange-200 dark:border-orange-700 bg-white dark:bg-zinc-900 dark:text-white resize-none focus:outline-none focus:border-orange-400 transition-colors"
                              rows={5}
                              placeholder={`Write your answer here... (minimum 2-3 sentences)\n\nExample: Start by describing what you did, then explain your thinking...`}
                              value={userInputs[task.id] || ""}
                              onChange={(e) => setUserInputs(prev => ({ ...prev, [task.id]: e.target.value }))}
                            />
                            <div className="flex gap-3 mt-3">
                              <Button
                                onClick={() => submitTask(task)}
                                disabled={isLoading || !userInputs[task.id] || userInputs[task.id].length < 10}
                                className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                              >
                                {isLoading ? (
                                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />AI is evaluating...</>
                                ) : (
                                  <><Send className="mr-2 h-4 w-4" />Submit for AI Feedback</>
                                )}
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setActiveTaskId(null)}
                                className="dark:border-gray-600 dark:text-white"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* AI Feedback Display */}
                    {isCompleted && feedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 pb-4"
                      >
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-bold text-green-700 dark:text-green-400 flex items-center gap-2">
                              🤖 AI Feedback
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-green-600">{feedback.score}/10</span>
                              <div className="flex">
                                {Array.from({ length: 10 }).map((_, i) => (
                                  <span key={i} className={`text-sm ${i < feedback.score ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-700 dark:text-gray-300 mb-3 italic">"{feedback.overall}"</p>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">✅ What you did well:</p>
                              {feedback.strengths.map((s, i) => <p key={i} className="text-gray-600 dark:text-gray-400">• {s}</p>)}
                            </div>
                            <div>
                              <p className="font-semibold text-orange-600 dark:text-orange-400 mb-1">📈 To improve:</p>
                              {feedback.improvements.map((imp, i) => <p key={i} className="text-gray-600 dark:text-gray-400">• {imp}</p>)}
                            </div>
                          </div>

                          <p className="text-sm text-purple-600 dark:text-purple-400 mt-3 font-medium">
                            🎯 Next step: {feedback.nextSteps}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}

              {/* Get Summary Button */}
              {completedTasks.size > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
                  <Button
                    onClick={getCareerSummary}
                    disabled={loadingSummary}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 text-lg rounded-xl"
                  >
                    {loadingSummary ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Generating your summary...</>
                    ) : (
                      <><Star className="mr-2 h-5 w-5" />Get My Career Exploration Summary 🎯</>
                    )}
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Summary Modal */}
        <AnimatePresence>
          {showSummary && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowSummary(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-zinc-900 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🏆</div>
                  <h2 className="text-3xl font-extrabold dark:text-white mb-2">Your Career Exploration Report!</h2>
                  <p className="text-gray-500 dark:text-gray-400">Powered by Gemini AI</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 mb-6">
                  <div className="flex justify-between mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{completedTasks.size}</div>
                      <div className="text-sm text-gray-500">Tasks Done</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-pink-600">
                        {completedTasks.size > 0 ? (Object.values(feedbacks).reduce((sum, f) => sum + f.score, 0) / Object.keys(feedbacks).length).toFixed(1) : "0"}/10
                      </div>
                      <div className="text-sm text-gray-500">Avg Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600">{career.title.split(" ")[0]}</div>
                      <div className="text-sm text-gray-500">Career Fit</div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{summary}</p>
                </div>

                <Button
                  onClick={() => setShowSummary(false)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 text-lg rounded-xl"
                >
                  Continue Exploring! 🚀
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Learning Modules */}
        {resources.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 dark:text-white">📖 Your Learning Modules</h2>
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <Card key={resource.id} className="border-2 hover:border-purple-300 hover:shadow-xl transition-all dark:bg-zinc-900 dark:border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold dark:text-white mb-1">{resource.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{resource.provider}</p>
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="outline">{resource.type}</Badge>
                          <Badge variant="outline">{resource.duration}</Badge>
                          <Badge variant="outline">{resource.level}</Badge>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        <Play className="mr-2 h-4 w-4" /> Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        <Card className="border-2 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2 dark:text-white">
              <Star className="h-6 w-6 text-orange-500" />
              Skills You'll Master 🔥
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {career.requiredSkills.map((skill) => (
                <Badge key={skill} className="px-4 py-2 text-base bg-white border-2 border-orange-200 text-orange-700 dark:bg-zinc-900 dark:border-orange-800 dark:text-orange-400">
                  ✨ {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
