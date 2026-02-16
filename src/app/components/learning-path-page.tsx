import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { motion } from "motion/react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Play,
  Star,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { CareerPath, learningResources } from "./career-data";
import { useState, useEffect } from "react";

interface LearningPathPageProps {
  career: CareerPath;
  onBack: () => void;
}

// TASKS - Now using MULTIPLE ID formats to catch all careers!
const getAllCareerTasks = () => {
  const baseTasks = {
    "software-engineer": [
      { id: "1", task: "Watch a 'Day in the Life of a Software Engineer' video", time: "15 min", icon: "🎥" },
      { id: "2", task: "Try coding a simple calculator using any language", time: "30 min", icon: "💻" },
      { id: "3", task: "Solve a beginner coding challenge on LeetCode", time: "20 min", icon: "🧩" },
      { id: "4", task: "Create your first GitHub repository", time: "25 min", icon: "🔄" },
    ],
    "data-scientist": [
      { id: "1", task: "Explore a dataset on Kaggle and analyze statistics", time: "30 min", icon: "📊" },
      { id: "2", task: "Watch a video on 'What is Machine Learning?'", time: "15 min", icon: "🎥" },
      { id: "3", task: "Create a simple chart using Excel or Google Sheets", time: "20 min", icon: "📈" },
      { id: "4", task: "Try a Python basics tutorial", time: "40 min", icon: "🐍" },
    ],
    "ux-designer": [
      { id: "1", task: "Sketch 5 different app icon designs on paper", time: "20 min", icon: "✏️" },
      { id: "2", task: "Redesign a button or form you use daily", time: "15 min", icon: "🎨" },
      { id: "3", task: "Watch a UX design case study video", time: "20 min", icon: "🎥" },
      { id: "4", task: "Create a free Figma account and explore", time: "25 min", icon: "🖼️" },
    ],
    "product-manager": [
      { id: "1", task: "Write a one-page feature proposal for an app", time: "30 min", icon: "📝" },
      { id: "2", task: "Prioritize 5 features for a hypothetical product", time: "20 min", icon: "🎯" },
      { id: "3", task: "Watch a 'Day in the Life of a PM' video", time: "15 min", icon: "🎥" },
      { id: "4", task: "Read about Agile/Scrum basics", time: "25 min", icon: "📚" },
    ],
    "digital-marketer": [
      { id: "1", task: "Create 3 social media captions for a brand", time: "20 min", icon: "📱" },
      { id: "2", task: "Analyze why a viral post went viral", time: "15 min", icon: "🔍" },
      { id: "3", task: "Design a simple poster using Canva", time: "30 min", icon: "🎨" },
      { id: "4", task: "Watch a video on SEO basics", time: "20 min", icon: "🎥" },
    ],
    "entrepreneur": [
      { id: "1", task: "Write down 10 business ideas", time: "20 min", icon: "💡" },
      { id: "2", task: "Research a successful startup story", time: "25 min", icon: "📚" },
      { id: "3", task: "Create a simple business plan outline", time: "30 min", icon: "📝" },
      { id: "4", task: "Watch a video about startup failures and lessons", time: "20 min", icon: "🎥" },
    ],
    "content-creator": [
      { id: "1", task: "Record a 30-second video about your passion", time: "20 min", icon: "🎬" },
      { id: "2", task: "Write a blog post (300-500 words)", time: "40 min", icon: "✍️" },
      { id: "3", task: "Edit a photo using free tools", time: "15 min", icon: "📸" },
      { id: "4", task: "Brainstorm 10 content ideas", time: "20 min", icon: "💡" },
    ],
    "cybersecurity": [
      { id: "1", task: "Learn about common cybersecurity threats", time: "25 min", icon: "🛡️" },
      { id: "2", task: "Try a beginner CTF challenge", time: "40 min", icon: "🚩" },
      { id: "3", task: "Watch a documentary on cyber attacks", time: "30 min", icon: "🎥" },
      { id: "4", task: "Set up two-factor authentication", time: "15 min", icon: "🔐" },
    ],
    "teacher": [
      { id: "1", task: "Teach a 10-minute lesson to a friend", time: "20 min", icon: "👨‍🏫" },
      { id: "2", task: "Create a fun quiz with 10 questions", time: "25 min", icon: "📝" },
      { id: "3", task: "Watch a TED talk on teaching methods", time: "20 min", icon: "🎥" },
      { id: "4", task: "Design a classroom activity or game", time: "30 min", icon: "🎮" },
    ],
    "doctor": [
      { id: "1", task: "Read about a medical specialty", time: "25 min", icon: "📚" },
      { id: "2", task: "Watch a surgery documentary", time: "40 min", icon: "🎥" },
      { id: "3", task: "Learn basic first aid techniques", time: "30 min", icon: "🏥" },
      { id: "4", task: "Research medical school requirements", time: "20 min", icon: "📝" },
    ]
  };

  // Create ALL possible ID variations for EVERY career
  const expandedTasks: { [key: string]: any[] } = {};
  
  Object.keys(baseTasks).forEach(baseKey => {
    const tasks = baseTasks[baseKey as keyof typeof baseTasks];
    
    // Add original key
    expandedTasks[baseKey] = tasks;
    
    // Add title-case variations
    const titleCase = baseKey.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    expandedTasks[titleCase] = tasks;
    
    // Add variations without hyphens
    expandedTasks[baseKey.replace(/-/g, '')] = tasks;
    expandedTasks[titleCase.replace(/\s/g, '')] = tasks;
    
    // Add lowercase no-space
    expandedTasks[baseKey.replace(/-/g, '').toLowerCase()] = tasks;
  });
  
  // Add specific backend career names
  expandedTasks["Software Engineer"] = baseTasks["software-engineer"];
  expandedTasks["Data Analyst"] = baseTasks["data-scientist"];
  expandedTasks["Data Scientist"] = baseTasks["data-scientist"];
  expandedTasks["AI Engineer"] = baseTasks["software-engineer"];
  expandedTasks["UI/UX Designer"] = baseTasks["ux-designer"];
  expandedTasks["UX/UI Designer"] = baseTasks["ux-designer"];
  expandedTasks["Graphic Designer"] = baseTasks["ux-designer"];
  expandedTasks["Product Manager"] = baseTasks["product-manager"];
  expandedTasks["Digital Marketing Specialist"] = baseTasks["digital-marketer"];
  expandedTasks["Marketing Manager"] = baseTasks["digital-marketer"];
  expandedTasks["Entrepreneur"] = baseTasks["entrepreneur"];
  expandedTasks["Business Analyst"] = baseTasks["entrepreneur"];
  expandedTasks["Financial Analyst"] = baseTasks["entrepreneur"];
  expandedTasks["Content Writer"] = baseTasks["content-creator"];
  expandedTasks["Journalist"] = baseTasks["content-creator"];
  expandedTasks["Cybersecurity Specialist"] = baseTasks["cybersecurity"];
  expandedTasks["Cybersecurity Analyst"] = baseTasks["cybersecurity"];
  expandedTasks["Education Specialist/Teacher"] = baseTasks["teacher"];
  expandedTasks["Teacher"] = baseTasks["teacher"];
  expandedTasks["Doctor"] = baseTasks["doctor"];
  expandedTasks["Healthcare Administrator"] = baseTasks["doctor"];
  
  return expandedTasks;
};

export function LearningPathPage({ career, onBack }: LearningPathPageProps) {
  const resources = learningResources[career.id] || [];
  const allCareerTasks = getAllCareerTasks();
  
  // Try MULTIPLE ways to find tasks
  const findTasks = () => {
    // Try direct ID match
    if (allCareerTasks[career.id]) return allCareerTasks[career.id];
    
    // Try title match
    if (allCareerTasks[career.title]) return allCareerTasks[career.title];
    
    // Try normalized versions
    const normalized = career.title.toLowerCase().replace(/\s+/g, '-');
    if (allCareerTasks[normalized]) return allCareerTasks[normalized];
    
    // Try without special characters
    const simplified = career.title.replace(/[\/\s-]/g, '').toLowerCase();
    if (allCareerTasks[simplified]) return allCareerTasks[simplified];
    
    // Default generic tasks for ANY career
    return [
      { id: "1", task: `Research what a ${career.title} does daily`, time: "20 min", icon: "🔍" },
      { id: "2", task: `Watch a 'Day in the Life' video about this career`, time: "15 min", icon: "🎥" },
      { id: "3", task: `Read an article or blog post by a ${career.title}`, time: "25 min", icon: "📚" },
      { id: "4", task: `Connect with someone in this field on LinkedIn`, time: "15 min", icon: "💼" },
      { id: "5", task: `Create a list of skills you need to develop`, time: "20 min", icon: "📝" },
    ];
  };
  
  const tasks = findTasks();
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  // Debug logging (remove after testing)
  useEffect(() => {
    console.log("🎯 Career ID:", career.id);
    console.log("🎯 Career Title:", career.title);
    console.log("🎯 Tasks found:", tasks.length);
    console.log("🎯 Available task keys:", Object.keys(allCareerTasks).slice(0, 10));
  }, [career]);

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

  const completionPercentage = tasks.length > 0 ? (completedTasks.size / tasks.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950 dark:via-zinc-950 dark:to-orange-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Button onClick={onBack} variant="ghost" className="mb-6 dark:text-white dark:hover:bg-zinc-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Results
        </Button>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl md:text-5xl mb-3 font-extrabold">
                  Your Learning Path 🚀
                </h1>
                <p className="text-xl text-purple-100">{career.title}</p>
              </div>
              <Badge className="bg-white text-purple-600 px-4 py-2 text-base">
                Personalized
              </Badge>
            </div>
            <p className="text-lg text-purple-100 mb-6 max-w-3xl">
              We've curated the perfect learning journey just for you! Follow these steps to
              become a pro {career.title.toLowerCase()}.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-1">📚</div>
                <div className="text-sm text-purple-100">
                  {resources.length} Courses
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-1">⏱️</div>
                <div className="text-sm text-purple-100">6-12 Months</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-1">🎯</div>
                <div className="text-sm text-purple-100">Career Ready</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-1">💰</div>
                <div className="text-sm text-purple-100">{career.averageSalary}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* TRY THIS CAREER OUT - ALWAYS SHOWS NOW! */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-2 shadow-xl bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 dark:border-orange-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl flex items-center gap-2 dark:text-white">
                    <Zap className="h-8 w-8 text-orange-500" />
                    Try This Career Out! ⚡
                  </CardTitle>
                  <CardDescription className="text-lg mt-2 dark:text-gray-300">
                    Get a real taste of what it's like to be a {career.title}. Complete these beginner-friendly tasks!
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                    {completedTasks.size}/{tasks.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                </div>
              </div>
              <Progress value={completionPercentage} className="h-3 mt-4 bg-orange-200 dark:bg-orange-900/50" />
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.map((task, index) => {
                const isCompleted = completedTasks.has(task.id);
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700'
                        : 'bg-white border-orange-200 hover:border-orange-400 dark:bg-zinc-900 dark:border-orange-800 dark:hover:border-orange-600'
                    }`}
                    onClick={() => toggleTask(task.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          isCompleted
                            ? 'bg-green-500 border-green-500'
                            : 'border-orange-300 dark:border-orange-700'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-white" />
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-orange-200 dark:bg-orange-800" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{task.icon}</span>
                          <h3 className={`text-lg font-semibold ${
                            isCompleted
                              ? 'line-through text-gray-500 dark:text-gray-500'
                              : 'text-gray-800 dark:text-white'
                          }`}>
                            {task.task}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4" />
                          <span>{task.time}</span>
                        </div>
                      </div>

                      <Badge variant={isCompleted ? "default" : "outline"} className={
                        isCompleted
                          ? "bg-green-500 text-white"
                          : "border-orange-300 text-orange-700 dark:border-orange-700 dark:text-orange-400"
                      }>
                        {isCompleted ? "Done! ✓" : "Try it!"}
                      </Badge>
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-8 border-2 shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl dark:text-white">Your Progress</CardTitle>
                  <CardDescription className="dark:text-gray-400">Keep going! You're doing amazing! 🌟</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl dark:text-white font-bold">
                    {Math.round(completionPercentage)}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Complete</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={completionPercentage} className="h-3 mb-4 dark:bg-zinc-800" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Tasks Done</div>
                    <div className="font-semibold text-lg dark:text-white">{completedTasks.size} / {tasks.length}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                  <Star className="h-8 w-8 text-purple-500" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Skills to Learn</div>
                    <div className="font-semibold text-lg dark:text-white">{career.requiredSkills.length}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                  <Clock className="h-8 w-8 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Est. Time</div>
                    <div className="font-semibold text-lg dark:text-white">{tasks.length * 20} mins</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Modules */}
        <div className="mb-8">
          <h2 className="text-3xl mb-6 dark:text-white font-bold">
            📖 Your Learning Modules
          </h2>

          {resources.length > 0 ? (
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="border-2 hover:border-purple-300 hover:shadow-xl transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-purple-500">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                            {index + 1}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl mb-1 dark:text-white font-semibold">
                                {resource.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {resource.provider}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
                            >
                              {resource.type}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Clock className="h-4 w-4 text-purple-500" />
                              <span>{resource.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <TrendingUp className="h-4 w-4 text-purple-500" />
                              <span>{resource.level}</span>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                              <Play className="mr-2 h-4 w-4" />
                              Start Learning
                            </Button>
                            <Button variant="outline" className="dark:text-white dark:border-gray-600 dark:hover:bg-zinc-800">
                              <BookOpen className="mr-2 h-4 w-4" />
                              Preview
                            </Button>
                          </div>
                        </div>

                        <div className="flex-shrink-0 hidden md:block">
                          <div className="text-center">
                            <div className="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-zinc-700 flex items-center justify-center text-gray-300 dark:text-zinc-600 mb-2">
                              <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Not Started</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="border-2 dark:bg-zinc-900 dark:border-zinc-800">
              <CardContent className="py-12 text-center">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                  We're curating awesome resources for this career! 🎉
                </p>
                <p className="text-gray-500 dark:text-gray-500">Check back soon for personalized courses.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Skills to Unlock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-2 shadow-lg bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 dark:text-white">
                <Star className="h-6 w-6 text-orange-500" />
                Skills You'll Master 🔥
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                These are the superpowers you'll unlock on this journey!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {career.requiredSkills.map((skill) => (
                  <Badge
                    key={skill}
                    className="px-4 py-2 text-base bg-white border-2 border-orange-200 text-orange-700 hover:bg-orange-50 dark:bg-zinc-900 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-zinc-800"
                  >
                    ✨ {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 dark:border-purple-800">
            <CardContent className="py-8">
              <h3 className="text-2xl mb-3 dark:text-white font-bold">
                Ready to Start? 🎯
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-xl mx-auto">
                Your journey to becoming an amazing {career.title.toLowerCase()} starts now!
                Let's do this! 💪
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-lg"
                >
                  Begin First Course 🚀
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-500 dark:text-purple-400 dark:hover:bg-zinc-800 px-8 py-6 text-lg rounded-full"
                  onClick={onBack}
                >
                  Explore More Careers
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
