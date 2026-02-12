import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { ArrowLeft, TrendingUp, Briefcase, BookOpen, Target, ExternalLink, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { CareerPath, learningResources, generateSkillGaps } from "./career-data";
import { motion } from "motion/react";

interface ResultsDashboardProps {
  recommendedCareers: CareerPath[];
  onBack: () => void;
  onExploreMore: () => void;
  onStartLearning: (career: CareerPath) => void;
}

export function ResultsDashboard({ recommendedCareers, onBack, onExploreMore, onStartLearning }: ResultsDashboardProps) {
  const topCareer = recommendedCareers[0];
  const skillGaps = generateSkillGaps(topCareer);
  const resources = learningResources[topCareer.id] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-purple-950 dark:via-zinc-950 dark:to-orange-950 px-6 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 hover:bg-white/50 dark:hover:bg-zinc-800 dark:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-2 shadow-xl mb-6 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 text-white overflow-hidden relative dark:border-zinc-800">
            <div className="absolute top-0 right-0 opacity-20">
              <Sparkles className="h-32 w-32" />
            </div>
            <CardHeader className="relative">
              <CardTitle className="text-4xl md:text-5xl mb-2" style={{ fontWeight: 800 }}>
                Your Perfect Matches! 🎉
              </CardTitle>
              <CardDescription className="text-white/90 text-xl">
                We found careers that vibe with you! Let's explore them 🚀
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        <Tabs defaultValue="recommendations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid bg-white dark:bg-zinc-900 shadow-md">
            <TabsTrigger value="recommendations" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white dark:text-gray-300">
              Top Matches
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white dark:text-gray-300">
              Roadmap
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white dark:text-gray-300">
              Skills
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white dark:text-gray-300">
              Resources
            </TabsTrigger>
          </TabsList>

          {/* Top Career Matches */}
          <TabsContent value="recommendations" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-2 shadow-xl bg-gradient-to-br from-white to-purple-50 dark:from-zinc-900 dark:to-zinc-950 dark:border-zinc-800">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <CardTitle className="text-3xl md:text-4xl dark:text-white" style={{ fontWeight: 800 }}>
                          {topCareer.title}
                        </CardTitle>
                        <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 text-lg px-3 py-1">
                          {topCareer.matchScore}% Match 🔥
                        </Badge>
                      </div>
                      <CardDescription className="text-lg dark:text-gray-400">{topCareer.category}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Demand</div>
                      <Badge 
                        variant={topCareer.demandLevel === "High" ? "default" : "secondary"}
                        className={topCareer.demandLevel === "High" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0" : "dark:bg-zinc-800 dark:text-gray-300"}
                      >
                        {topCareer.demandLevel === "High" ? "🔥 Hot!" : topCareer.demandLevel}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700 dark:text-gray-300 text-lg">{topCareer.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-base">
                        <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        <span className="text-gray-600 dark:text-gray-400">Growth Rate:</span>
                        <span className="font-semibold dark:text-white">{topCareer.growthRate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-base">
                        <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        <span className="text-gray-600 dark:text-gray-400">Average Salary:</span>
                        <span className="font-semibold dark:text-white">{topCareer.averageSalary}</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-base mb-2">
                        <BookOpen className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        <span className="text-gray-600 dark:text-gray-400">Education:</span>
                      </div>
                      <p className="text-sm dark:text-white">{topCareer.educationLevel}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-lg dark:text-white">Skills You'll Need:</h4>
                    <div className="flex flex-wrap gap-2">
                      {topCareer.requiredSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="border-purple-300 text-purple-700 bg-purple-50 px-3 py-1 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800">
                          ✨ {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Pros and Cons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {/* Pros */}
                     <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-900/30">
                       <h4 className="font-semibold mb-3 text-lg text-green-700 dark:text-green-400 flex items-center gap-2">
                         <CheckCircle2 className="h-5 w-5" /> Pros
                       </h4>
                       <ul className="space-y-2">
                         {topCareer.pros && topCareer.pros.map((pro, index) => (
                           <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                             <span className="text-green-500 mt-0.5">•</span>
                             {pro}
                           </li>
                         ))}
                       </ul>
                     </div>

                     {/* Cons */}
                     <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                       <h4 className="font-semibold mb-3 text-lg text-red-700 dark:text-red-400 flex items-center gap-2">
                         <XCircle className="h-5 w-5" /> Cons
                       </h4>
                       <ul className="space-y-2">
                         {topCareer.cons && topCareer.cons.map((con, index) => (
                           <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                             <span className="text-red-500 mt-0.5">•</span>
                             {con}
                           </li>
                         ))}
                       </ul>
                     </div>
                  </div>

                  <Button
                    onClick={() => onStartLearning(topCareer)}
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6 rounded-full shadow-lg"
                  >
                    Start Learning Path 🚀
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Other Recommendations */}
            <div>
              <h3 className="text-2xl mb-4 dark:text-white" style={{ fontWeight: 700 }}>Other Great Matches</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedCareers.slice(1).map((career, index) => (
                  <motion.div
                    key={career.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                  >
                    <Card className="border-2 hover:border-purple-400 hover:shadow-xl transition-all bg-white dark:bg-zinc-900 dark:border-zinc-800">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl dark:text-white">{career.title}</CardTitle>
                            <CardDescription className="dark:text-gray-400">{career.category}</CardDescription>
                          </div>
                          <Badge className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800">
                            {career.matchScore}% Match
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{career.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">{career.averageSalary}</span>
                          <Badge variant="outline" className="text-xs border-orange-300 text-orange-700 bg-orange-50 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800">
                            {career.demandLevel === "High" ? "🔥 Hot" : career.demandLevel}
                          </Badge>
                        </div>
                        <Button
                          onClick={() => onStartLearning(career)}
                          variant="outline"
                          size="sm"
                          className="w-full mt-3 border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-zinc-800"
                        >
                          View Path
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={onExploreMore}
                variant="outline"
                size="lg"
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-500 dark:text-purple-400 dark:hover:bg-zinc-800 px-8 py-6 text-lg rounded-full"
              >
                Explore All Careers 🔍
              </Button>
            </div>
          </TabsContent>

          {/* Career Roadmap */}
          <TabsContent value="roadmap">
            <Card className="border-2 shadow-lg bg-white dark:bg-zinc-900 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-3xl dark:text-white" style={{ fontWeight: 700 }}>
                  Your Journey: {topCareer.title} 🗺️
                </CardTitle>
                <CardDescription className="text-lg dark:text-gray-400">Follow this roadmap to crush your goals!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      phase: "Phase 1: Foundation (0-6 months) 🌱",
                      items: [
                        "Complete foundational courses in core skills",
                        "Build a strong understanding of industry basics",
                        "Start working on small personal projects",
                        "Join online communities and forums",
                      ],
                      color: "from-green-400 to-emerald-500",
                    },
                    {
                      phase: "Phase 2: Skill Building (6-12 months) 💪",
                      items: [
                        "Take advanced courses and certifications",
                        "Build a portfolio of projects",
                        "Contribute to open source or collaborative projects",
                        "Network with professionals in the field",
                      ],
                      color: "from-blue-400 to-cyan-500",
                    },
                    {
                      phase: "Phase 3: Experience (12-18 months) 🚀",
                      items: [
                        "Apply for internships or entry-level positions",
                        "Attend industry conferences and workshops",
                        "Seek mentorship from experienced professionals",
                        "Continue expanding your portfolio",
                      ],
                      color: "from-purple-400 to-pink-500",
                    },
                    {
                      phase: "Phase 4: Career Launch (18-24 months) 🎯",
                      items: [
                        "Apply for full-time positions",
                        "Prepare for technical interviews",
                        "Build your personal brand online",
                        "Continue learning and staying updated",
                      ],
                      color: "from-orange-400 to-red-500",
                    },
                  ].map((phase, index) => (
                    <div key={index} className="relative pl-8 pb-8 border-l-4 border-purple-300 dark:border-purple-800 last:border-0 last:pb-0">
                      <div className={`absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${phase.color} border-4 border-white dark:border-zinc-900 shadow-lg`}></div>
                      <h4 className="font-semibold text-xl mb-3 dark:text-white">{phase.phase}</h4>
                      <ul className="space-y-2">
                        {phase.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <Target className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skill Gap Analysis */}
          <TabsContent value="skills">
            <Card className="border-2 shadow-lg bg-white dark:bg-zinc-900 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-3xl dark:text-white" style={{ fontWeight: 700 }}>
                  Skills to Level Up 📈
                </CardTitle>
                <CardDescription className="text-lg dark:text-gray-400">
                  Here's what you need to work on - you got this! 💪
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillGaps.map((gap, index) => (
                    <motion.div
                      key={gap.skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="space-y-3 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-lg dark:text-white">{gap.skill}</h4>
                          <Badge
                            className={
                              gap.priority === "High"
                                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white border-0"
                                : gap.priority === "Medium"
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
                                : "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-200"
                            }
                          >
                            {gap.priority === "High" ? "🔥 " : gap.priority === "Medium" ? "⚡ " : "💡 "}
                            {gap.priority} Priority
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          ⏱️ {gap.estimatedTime}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>Current: {gap.currentLevel}/10</span>
                          <span>Target: {gap.requiredLevel}/10</span>
                        </div>
                        <Progress
                          value={(gap.currentLevel / gap.requiredLevel) * 100}
                          className="h-3 bg-purple-100 dark:bg-zinc-800"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Resources */}
          <TabsContent value="resources">
            <Card className="border-2 shadow-lg bg-white dark:bg-zinc-900 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-3xl dark:text-white" style={{ fontWeight: 700 }}>
                  Awesome Resources 📚
                </CardTitle>
                <CardDescription className="text-lg dark:text-gray-400">
                  Handpicked courses just for you!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resources.length > 0 ? (
                    resources.map((resource, index) => (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Card className="border-2 hover:border-purple-400 hover:shadow-xl transition-all bg-gradient-to-br from-white to-purple-50 dark:from-zinc-900 dark:to-zinc-950 dark:border-zinc-700">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-xl dark:text-white">{resource.title}</CardTitle>
                                <CardDescription className="text-base dark:text-gray-400">{resource.provider}</CardDescription>
                              </div>
                              <Badge className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800">
                                {resource.type}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <span>⏱️ {resource.duration}</span>
                                <span>📊 {resource.level}</span>
                              </div>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                              >
                                Start Course
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <BookOpen className="h-16 w-16 mx-auto mb-3 text-gray-400" />
                      <p className="text-lg">Resources coming soon! 🎉</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
