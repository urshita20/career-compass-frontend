import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { ArrowLeft, Target, Award, ArrowRight } from "lucide-react";
import { Progress } from "@/app/components/ui/progress";

interface SkillGapToolProps {
  onBack: () => void;
}

export function SkillGapTool({ onBack }: SkillGapToolProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:text-white px-6 py-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="mb-6 hover:bg-white/50 dark:hover:bg-zinc-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">
            Skill Gap Analysis 🎯
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Identify your strengths and bridge the gaps to your dream career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-2 shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="dark:text-white">Current Skills</CardTitle>
              <CardDescription>What you're already good at</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium dark:text-gray-300">
                  <span>Communication</span>
                  <span>80%</span>
                </div>
                <Progress value={80} className="h-2 bg-gray-100 dark:bg-zinc-800" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium dark:text-gray-300">
                  <span>Teamwork</span>
                  <span>90%</span>
                </div>
                <Progress value={90} className="h-2 bg-gray-100 dark:bg-zinc-800" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium dark:text-gray-300">
                  <span>Creativity</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2 bg-gray-100 dark:bg-zinc-800" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="dark:text-white">Skills to Improve</CardTitle>
              <CardDescription>Focus on these to level up!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium dark:text-gray-300">
                  <span>Technical Analysis</span>
                  <span>40%</span>
                </div>
                <Progress value={40} className="h-2 bg-red-100 dark:bg-red-900/30" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium dark:text-gray-300">
                  <span>Project Management</span>
                  <span>30%</span>
                </div>
                <Progress value={30} className="h-2 bg-red-100 dark:bg-red-900/30" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium dark:text-gray-300">
                  <span>Public Speaking</span>
                  <span>50%</span>
                </div>
                <Progress value={50} className="h-2 bg-red-100 dark:bg-red-900/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-full px-8 py-6 text-lg shadow-lg">
            Start Personalized Analysis <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
