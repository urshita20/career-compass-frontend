import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { motion } from "motion/react";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  ExternalLink,
  Play,
  Star,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { CareerPath, learningResources } from "./career-data";
import { useState } from "react";
import TryCareerOut from "../../components/TryCareerOut";
import type { CareerTask } from "../../types/analysis";

interface LearningPathPageProps {
  career: CareerPath;
  onBack: () => void;
}

// ── Per-career task definitions for TryCareerOut ──────────────────────────────
const careerTaskMap: { [key: string]: CareerTask[] } = {
  "software-engineer": [
    { id: "1", title: "Code a simple calculator", description: "Build a calculator using HTML, CSS, and JavaScript. Try to make it work for +, -, ×, ÷.", duration: "30 min", icon: "💻" },
    { id: "2", title: "Solve a LeetCode beginner challenge", description: "Pick any Easy problem on LeetCode and try to solve it in any language you know.", duration: "20 min", icon: "🧩" },
    { id: "3", title: "Create your first GitHub repo", description: "Sign up on GitHub, create a new repository, and commit your calculator code from task 1.", duration: "25 min", icon: "🔄" },
    { id: "4", title: "Watch a 'Day in the Life' video", description: "Search YouTube for 'Day in the Life Software Engineer' — watch one and note 3 things that surprised you.", duration: "15 min", icon: "🎥", requiresImage: false },
  ],
  "data-scientist": [
    { id: "1", title: "Explore a Kaggle dataset", description: "Open any beginner dataset on kaggle.com. Look at its columns, write down 3 questions you could answer with it.", duration: "30 min", icon: "📊" },
    { id: "2", title: "Make a chart in Google Sheets", description: "Take any dataset (even just class marks) and create a bar chart or pie chart. Screenshot your result.", duration: "20 min", icon: "📈", requiresImage: true, imagePrompt: "Screenshot of your chart" },
    { id: "3", title: "Python basics tutorial", description: "Complete the first 3 lessons of a Python tutorial on Codecademy or W3Schools.", duration: "40 min", icon: "🐍" },
    { id: "4", title: "What is ML? Video", description: "Watch 'Machine Learning for Everybody' intro (first 15 min) on YouTube and summarise it in 2-3 sentences.", duration: "15 min", icon: "🎥" },
  ],
  "ux-designer": [
    { id: "1", title: "Sketch 5 app icon concepts", description: "Draw 5 different ideas for an app icon (it can be for anything). No digital tools needed — pen and paper is fine!", duration: "20 min", icon: "✏️", requiresImage: true, imagePrompt: "Photo of your sketches" },
    { id: "2", title: "Create a free Figma account", description: "Go to figma.com, create an account, and explore the interface. Try dragging a rectangle and adding text.", duration: "25 min", icon: "🖼️" },
    { id: "3", title: "Redesign a bad UI", description: "Find an app or website with a confusing button/form. Sketch or describe how you would improve it.", duration: "20 min", icon: "🎨" },
    { id: "4", title: "Watch a UX case study", description: "Search 'UX case study redesign' on YouTube and watch one full video. Note what process they followed.", duration: "25 min", icon: "🎥" },
  ],
  "product-manager": [
    { id: "1", title: "Write a feature proposal", description: "Pick any app you use daily and write a 1-page proposal for one feature you wish it had. Include: the problem, the solution, and who benefits.", duration: "30 min", icon: "📝" },
    { id: "2", title: "Prioritize 5 features", description: "List 5 features for a hypothetical food delivery app and rank them by priority. Explain your reasoning briefly.", duration: "20 min", icon: "🎯" },
    { id: "3", title: "Learn Agile basics", description: "Read the Wikipedia summary of Agile methodology. Write 3 bullet points explaining it to a friend.", duration: "25 min", icon: "📚" },
    { id: "4", title: "Watch a PM interview", description: "Search 'Product Manager mock interview' on YouTube and watch one. What surprised you about the questions?", duration: "20 min", icon: "🎥" },
  ],
  "digital-marketer": [
    { id: "1", title: "Write 3 social media captions", description: "Choose a brand you like and write 3 different Instagram caption ideas for the same product. Make them distinct in tone.", duration: "20 min", icon: "📱" },
    { id: "2", title: "Analyze a viral post", description: "Find a post that went viral recently. Write a short analysis: why did it spread? What emotions did it trigger?", duration: "15 min", icon: "🔍" },
    { id: "3", title: "Design a Canva poster", description: "Use Canva (free) to design a simple promotional poster for an imaginary event. Screenshot the result.", duration: "30 min", icon: "🎨", requiresImage: true, imagePrompt: "Screenshot of your Canva poster" },
    { id: "4", title: "Learn SEO basics", description: "Read Moz's Beginner's Guide to SEO introduction. List 3 things you didn't know about how Google ranks pages.", duration: "20 min", icon: "🎥" },
  ],
};

// Fallback tasks for any career not in the map
function getCareerTasks(career: CareerPath): CareerTask[] {
  // Try direct ID
  if (careerTaskMap[career.id]) return careerTaskMap[career.id];
  // Try normalised title
  const key = career.title.toLowerCase().replace(/[\s/]+/g, "-");
  if (careerTaskMap[key]) return careerTaskMap[key];
  // Generic fallback
  return [
    { id: "1", title: `Research what a ${career.title} does daily`, description: `Search 'day in the life ${career.title}' on YouTube. Watch one video and write down 3 things that surprised you.`, duration: "20 min", icon: "🔍" },
    { id: "2", title: "Try the core skill", description: `Pick one skill from the list below and find a free beginner exercise for it online. Spend 30 minutes trying it out.`, duration: "30 min", icon: "💡" },
    { id: "3", title: "Read a professional's story", description: `Search LinkedIn or Medium for '${career.title} career journey'. Read one person's story and note what path they took.`, duration: "25 min", icon: "📚" },
    { id: "4", title: "Connect on LinkedIn", description: `Search for 3 people with the title '${career.title}' on LinkedIn. Look at their profiles and see what education/skills they have.`, duration: "15 min", icon: "💼" },
  ];
}

export function LearningPathPage({ career, onBack }: LearningPathPageProps) {
  const resources = learningResources[career.id] || [];
  const tasks = getCareerTasks(career);
  const [openPreview, setOpenPreview] = useState<string | null>(null);

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
                <div className="text-sm text-purple-100">{resources.length} Courses</div>
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

        {/* ── TRY THIS CAREER OUT (full AI-powered version) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <TryCareerOut careerTitle={career.title} tasks={tasks} />
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

                          <div className="flex gap-3 flex-wrap">
                            {/* Start Learning — opens URL */}
                            {resource.url ? (
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                                  <Play className="mr-2 h-4 w-4" />
                                  Start Learning
                                  <ExternalLink className="ml-2 h-3 w-3" />
                                </Button>
                              </a>
                            ) : (
                              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white" disabled>
                                <Play className="mr-2 h-4 w-4" />
                                Start Learning
                              </Button>
                            )}

                            {/* Preview — toggles an inline info panel */}
                            <Button
                              variant="outline"
                              className="dark:text-white dark:border-gray-600 dark:hover:bg-zinc-800"
                              onClick={() =>
                                setOpenPreview(
                                  openPreview === resource.id ? null : resource.id
                                )
                              }
                            >
                              <BookOpen className="mr-2 h-4 w-4" />
                              {openPreview === resource.id ? "Hide Preview" : "Preview"}
                            </Button>
                          </div>

                          {/* Inline preview panel */}
                          {openPreview === resource.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="mt-4 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
                            >
                              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                <strong>{resource.title}</strong> by {resource.provider}
                              </p>
                              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                                <li>Level: {resource.level}</li>
                                <li>Duration: {resource.duration}</li>
                                <li>Type: {resource.type}</li>
                                {resource.url && (
                                  <li>
                                    <a
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-purple-600 dark:text-purple-400 underline"
                                    >
                                      Open course →
                                    </a>
                                  </li>
                                )}
                              </ul>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Generic links when no curated resources for this career */
            <div className="space-y-4">
              {[
                { title: "Coursera", desc: "University-backed courses & certificates", url: "https://www.coursera.org", icon: "🎓" },
                { title: "edX", desc: "Free courses from MIT, Harvard & more", url: "https://www.edx.org", icon: "📘" },
                { title: "YouTube Learning", desc: "Free tutorials from world-class creators", url: `https://www.youtube.com/results?search_query=${encodeURIComponent(career.title + " tutorial beginner")}`, icon: "▶️" },
                { title: "Udemy", desc: "Affordable hands-on courses", url: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(career.title)}`, icon: "🏫" },
              ].map((link, i) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Card className="border-2 hover:border-purple-300 hover:shadow-xl transition-all dark:bg-zinc-900 dark:border-zinc-800">
                    <CardContent className="p-5 flex items-center gap-5">
                      <div className="text-4xl">{link.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg dark:text-white">{link.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{link.desc}</p>
                      </div>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                          Open <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Progress Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-8 border-2 shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-2xl dark:text-white">Your Journey Stats</CardTitle>
              <CardDescription className="dark:text-gray-400">Track your path to becoming a {career.title}!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Courses Available</div>
                    <div className="font-semibold text-lg dark:text-white">{resources.length > 0 ? resources.length : "4+"}</div>
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
                    <div className="text-sm text-gray-600 dark:text-gray-400">Time to Career Ready</div>
                    <div className="font-semibold text-lg dark:text-white">6-12 months</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

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
                {resources[0]?.url ? (
                  <a href={resources[0].url} target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-lg"
                    >
                      Begin First Course 🚀 <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                ) : (
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-lg"
                    onClick={() => window.open("https://www.coursera.org", "_blank")}
                  >
                    Begin First Course 🚀
                  </Button>
                )}
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
