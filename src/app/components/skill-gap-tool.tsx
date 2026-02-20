import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { ArrowLeft, Target, ArrowRight, Loader2, Zap, BookOpen, CheckCircle2, AlertCircle } from "lucide-react";
import { Progress } from "@/app/components/ui/progress";

const API_URL = import.meta.env.VITE_API_URL || "https://career-compass-backend-1-1fnz.onrender.com";

interface SkillGapToolProps {
  onBack: () => void;
}

interface SkillGapResult {
  existingStrengths: string[];
  skillGaps: { skill: string; priority: string; reason: string; resource: string }[];
  overallReadiness: number;
  readinessLabel: string;
  estimatedTimeToReady: string;
  nextAction: string;
  encouragement: string;
}

const readinessColor = (label: string) => {
  switch (label) {
    case "Job-Ready": return "bg-green-500";
    case "Advanced": return "bg-blue-500";
    case "Intermediate": return "bg-yellow-500";
    case "Building": return "bg-orange-500";
    default: return "bg-red-500";
  }
};

const priorityColor = (p: string) => {
  if (p === "High") return "bg-red-100 text-red-700 border-red-200";
  if (p === "Medium") return "bg-yellow-100 text-yellow-700 border-yellow-200";
  return "bg-green-100 text-green-700 border-green-200";
};

export function SkillGapTool({ onBack }: SkillGapToolProps) {
  const [targetCareer, setTargetCareer] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SkillGapResult | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!targetCareer.trim() || !skillsInput.trim()) {
      setError("Please enter your target career and at least one skill.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const currentSkills = skillsInput.split(",").map(s => s.trim()).filter(Boolean);
      const res = await fetch(`${API_URL}/api/analysis/skill-gap`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetCareer: targetCareer.trim(), currentSkills }),
      });
      const data = await res.json();

      if (data.success) {
        setResult(data.result);
      } else if (data.quotaExceeded) {
        setError("AI is busy right now. Please try again in a few minutes.");
      } else {
        setError(data.error || "Analysis failed. Please try again.");
      }
    } catch {
      setError("Cannot reach the server. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

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
            Enter your target career and current skills — AI will identify your gaps and guide you.
          </p>
        </div>

        {/* Input Form */}
        {!result && (
          <Card className="border-2 shadow-xl dark:bg-zinc-900 dark:border-zinc-800 mb-8">
            <CardHeader>
              <CardTitle className="dark:text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-orange-500" />
                Tell us about yourself
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Target Career *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineer, Data Scientist, UX Designer..."
                  value={targetCareer}
                  onChange={e => setTargetCareer(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Your Current Skills *
                  <span className="text-gray-400 font-normal ml-2">(comma separated)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. HTML, CSS, JavaScript, Canva, Excel, Communication, Python basics..."
                  value={skillsInput}
                  onChange={e => setSkillsInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-xl py-6 text-lg shadow-lg"
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analysing your skills…</>
                ) : (
                  <>Start AI Analysis <ArrowRight className="ml-2 h-5 w-5" /></>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Readiness Score */}
            <Card className="border-2 shadow-xl dark:bg-zinc-900 dark:border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold dark:text-white">Your Readiness for <span className="text-orange-500">{targetCareer}</span></h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{result.encouragement}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-extrabold text-orange-500">{result.overallReadiness}%</div>
                    <Badge className={`${readinessColor(result.readinessLabel)} text-white mt-1`}>{result.readinessLabel}</Badge>
                  </div>
                </div>
                <Progress value={result.overallReadiness} className="h-4 mb-3" />
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>⏱️ Est. time to job-ready: <strong className="text-gray-800 dark:text-white">{result.estimatedTimeToReady}</strong></span>
                </div>
              </CardContent>
            </Card>

            {/* Strengths + Next Action */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
                <CardHeader>
                  <CardTitle className="dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" /> Your Strengths ✅
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.existingStrengths.map(s => (
                      <Badge key={s} className="bg-green-100 text-green-800 border border-green-200 px-3 py-1">{s}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
                <CardHeader>
                  <CardTitle className="dark:text-white flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-500" /> Your Next Step ⚡
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{result.nextAction}</p>
                </CardContent>
              </Card>
            </div>

            {/* Skill Gaps */}
            <Card className="border-2 shadow-xl dark:bg-zinc-900 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="dark:text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-red-500" /> Skills to Learn 📚
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.skillGaps.map((gap, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-800">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold dark:text-white">{gap.skill}</span>
                        <Badge className={`text-xs border ${priorityColor(gap.priority)}`}>{gap.priority}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{gap.reason}</p>
                      <p className="text-sm text-orange-600 dark:text-orange-400">📖 {gap.resource}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button
              onClick={() => { setResult(null); setTargetCareer(""); setSkillsInput(""); }}
              variant="outline"
              className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              Analyse a Different Career
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
