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
} from "lucide-react";
import { CareerPath, learningResources } from "./career-data";

interface LearningPathPageProps {
  career: CareerPath;
  onBack: () => void;
}

export function LearningPathPage({ career, onBack }: LearningPathPageProps) {
  const resources = learningResources[career.id] || [];

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
                <h1 className="text-4xl md:text-5xl mb-3" style={{ fontWeight: 800 }}>
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

        {/* Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8 border-2 shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl dark:text-white">Your Progress</CardTitle>
                  <CardDescription className="dark:text-gray-400">Keep going! You're doing amazing! 🌟</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl dark:text-white" style={{ fontWeight: 700 }}>
                    0%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Complete</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={0} className="h-3 mb-4 dark:bg-zinc-800" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Points Earned</div>
                    <div className="font-semibold text-lg dark:text-white">0 / 1000</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                  <Star className="h-8 w-8 text-purple-500" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Skills Unlocked</div>
                    <div className="font-semibold text-lg dark:text-white">0 / {career.requiredSkills.length}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                  <Clock className="h-8 w-8 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Time Invested</div>
                    <div className="font-semibold text-lg dark:text-white">0 hours</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Modules */}
        <div className="mb-8">
          <h2 className="text-3xl mb-6 dark:text-white" style={{ fontWeight: 700 }}>
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
                        {/* Module Number */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                            {index + 1}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl mb-1 dark:text-white" style={{ fontWeight: 600 }}>
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

                        {/* Status */}
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
          transition={{ delay: 0.3 }}
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
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 dark:border-purple-800">
            <CardContent className="py-8">
              <h3 className="text-2xl mb-3 dark:text-white" style={{ fontWeight: 700 }}>
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
