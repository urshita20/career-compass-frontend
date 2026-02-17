import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ArrowLeft, X, Heart, SkipForward } from "lucide-react";

export type SwipeAnswers = { [questionId: string]: "left" | "right" | "skip" };

interface Question {
  id: number;
  emoji: string;
  question: string;
  leftLabel: string;
  rightLabel: string;
  category: string;
}

// 30 QUESTIONS matching all 50 careers
const questions: Question[] = [
  { id: 1, emoji: "💻", question: "Do you enjoy solving problems using computers and coding?", leftLabel: "Not really", rightLabel: "Love it!", category: "technology" },
  { id: 2, emoji: "🎨", question: "Do you like creating visual designs and artwork?", leftLabel: "Not my thing", rightLabel: "Yes, creative!", category: "creative" },
  { id: 3, emoji: "👥", question: "Do you enjoy helping people and working in teams?", leftLabel: "Prefer solo", rightLabel: "Love people!", category: "social" },
  { id: 4, emoji: "📊", question: "Are you fascinated by data, numbers and patterns?", leftLabel: "Boring to me", rightLabel: "Absolutely!", category: "analytical" },
  { id: 5, emoji: "🏥", question: "Are you interested in medicine and helping sick people?", leftLabel: "Not really", rightLabel: "Very much!", category: "healthcare" },
  { id: 6, emoji: "💼", question: "Do you dream of starting your own business someday?", leftLabel: "Not for me", rightLabel: "My dream!", category: "entrepreneurial" },
  { id: 7, emoji: "🔬", question: "Do you enjoy conducting experiments and research?", leftLabel: "Not interested", rightLabel: "Love exploring!", category: "research" },
  { id: 8, emoji: "⚖️", question: "Are you interested in laws, justice and rights?", leftLabel: "Not my field", rightLabel: "Very interested!", category: "legal" },
  { id: 9, emoji: "🎬", question: "Do you enjoy creating videos, films or media content?", leftLabel: "Not really", rightLabel: "Love it!", category: "media" },
  { id: 10, emoji: "🏋️", question: "Are you passionate about fitness and sports?", leftLabel: "Not much", rightLabel: "Yes, active!", category: "sports" },
  { id: 11, emoji: "🤖", question: "Are you excited by Artificial Intelligence and Machine Learning?", leftLabel: "Not sure", rightLabel: "Super excited!", category: "ai" },
  { id: 12, emoji: "📈", question: "Do you like analyzing markets and financial trends?", leftLabel: "Not interesting", rightLabel: "Very much!", category: "finance" },
  { id: 13, emoji: "🏗️", question: "Do you like building things like machines or structures?", leftLabel: "Not hands-on", rightLabel: "Love building!", category: "practical" },
  { id: 14, emoji: "🌿", question: "Do you care deeply about protecting the environment?", leftLabel: "Not a priority", rightLabel: "It matters to me!", category: "environmental" },
  { id: 15, emoji: "✈️", question: "Do you dream of flying planes or working in aviation?", leftLabel: "Not interested", rightLabel: "My dream!", category: "aviation" },
  { id: 16, emoji: "📚", question: "Do you enjoy teaching and helping others learn?", leftLabel: "Not for me", rightLabel: "Love teaching!", category: "education" },
  { id: 17, emoji: "🎭", question: "Do you enjoy performing or presenting in front of people?", leftLabel: "Too scary", rightLabel: "Born performer!", category: "performance" },
  { id: 18, emoji: "👗", question: "Are you passionate about fashion and style?", leftLabel: "Not really", rightLabel: "Fashion is life!", category: "fashion" },
  { id: 19, emoji: "🍕", question: "Do you love cooking and creating new dishes?", leftLabel: "Not a chef", rightLabel: "Love cooking!", category: "culinary" },
  { id: 20, emoji: "🧠", question: "Are you curious about how people think and behave?", leftLabel: "Not much", rightLabel: "Fascinating!", category: "psychology" },
  { id: 21, emoji: "🔒", question: "Are you interested in cybersecurity and protecting systems?", leftLabel: "Not interested", rightLabel: "Very much!", category: "security" },
  { id: 22, emoji: "📣", question: "Do you enjoy marketing products and creating campaigns?", leftLabel: "Not my thing", rightLabel: "Love marketing!", category: "marketing" },
  { id: 23, emoji: "🏛️", question: "Do you want to serve the country through government service?", leftLabel: "Not really", rightLabel: "Want to serve!", category: "leadership" },
  { id: 24, emoji: "🏠", question: "Do you enjoy designing buildings and interior spaces?", leftLabel: "Not creative that way", rightLabel: "Love design!", category: "design" },
  { id: 25, emoji: "🎵", question: "Are you artistic and enjoy creative expression through any medium?", leftLabel: "Not artistic", rightLabel: "Very creative!", category: "creative" },
  { id: 26, emoji: "💊", question: "Are you interested in medicines, pharmacy and drug science?", leftLabel: "Not really", rightLabel: "Interested!", category: "healthcare" },
  { id: 27, emoji: "🌐", question: "Do you enjoy working with cloud computing and networks?", leftLabel: "Not technical", rightLabel: "Love tech!", category: "technology" },
  { id: 28, emoji: "📰", question: "Do you like writing articles and reporting news stories?", leftLabel: "Not a writer", rightLabel: "Love writing!", category: "media" },
  { id: 29, emoji: "🎪", question: "Do you enjoy planning and organizing events?", leftLabel: "Not organized", rightLabel: "Love planning!", category: "organization" },
  { id: 30, emoji: "🤝", question: "Do you enjoy customer service and hospitality work?", leftLabel: "Not really", rightLabel: "Love helping!", category: "service" },
];

interface SwipeAssessmentProps {
  onComplete: (answers: SwipeAnswers) => void;
  onBack: () => void;
}

export function SwipeAssessment({ onComplete, onBack }: SwipeAssessmentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<SwipeAnswers>({});
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  const handleSwipe = (direction: "left" | "right" | "skip") => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: direction,
    };
    setAnswers(newAnswers);
    setExitDirection(direction === "skip" ? "right" : direction);

    setTimeout(() => {
      setExitDirection(null);
      x.set(0);
      if (currentIndex + 1 >= questions.length) {
        onComplete(newAnswers);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 300);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x > 100) {
      handleSwipe("right");
    } else if (info.offset.x < -100) {
      handleSwipe("left");
    } else {
      x.set(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Button onClick={onBack} variant="ghost" className="dark:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Question {currentIndex + 1} of {questions.length}
          </div>
          <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
            {Math.round(progress)}% Complete
          </Badge>
        </div>
        <div className="w-20" />
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-4">
        <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Card Area */}
      <div className="flex-1 flex items-center justify-center px-6 relative">
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              style={{ x, rotate, opacity }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={
                exitDirection
                  ? {
                      x: exitDirection === "right" ? 300 : -300,
                      opacity: 0,
                      scale: 0.8,
                    }
                  : { scale: 1, opacity: 1 }
              }
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-sm cursor-grab active:cursor-grabbing"
            >
              {/* LIKE / NOPE labels */}
              <motion.div
                style={{ opacity: likeOpacity }}
                className="absolute top-8 right-8 z-10 border-4 border-green-500 text-green-500 font-black text-3xl px-4 py-2 rounded-xl rotate-12"
              >
                LIKE! 💚
              </motion.div>
              <motion.div
                style={{ opacity: nopeOpacity }}
                className="absolute top-8 left-8 z-10 border-4 border-red-500 text-red-500 font-black text-3xl px-4 py-2 rounded-xl -rotate-12"
              >
                NOPE 🚫
              </motion.div>

              <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 border-2 border-gray-100 dark:border-zinc-800">
                {/* Emoji */}
                <div className="text-center mb-6">
                  <span className="text-8xl">{currentQuestion.emoji}</span>
                </div>

                {/* Question */}
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8 leading-relaxed">
                  {currentQuestion.question}
                </h2>

                {/* Labels */}
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="text-red-400">👈</span>
                    {currentQuestion.leftLabel}
                  </span>
                  <span className="flex items-center gap-1">
                    {currentQuestion.rightLabel}
                    <span className="text-green-400">👉</span>
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <div className="p-6 flex justify-center gap-6">
        <Button
          size="lg"
          variant="outline"
          onClick={() => handleSwipe("left")}
          className="w-16 h-16 rounded-full border-2 border-red-300 hover:bg-red-50 dark:hover:bg-red-950"
        >
          <X className="h-6 w-6 text-red-500" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={() => handleSwipe("skip")}
          className="w-12 h-12 rounded-full border-2 border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 self-center"
        >
          <SkipForward className="h-4 w-4 text-gray-500" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={() => handleSwipe("right")}
          className="w-16 h-16 rounded-full border-2 border-green-300 hover:bg-green-50 dark:hover:bg-green-950"
        >
          <Heart className="h-6 w-6 text-green-500" />
        </Button>
      </div>

      {/* Hint */}
      <p className="text-center text-sm text-gray-400 dark:text-gray-600 pb-6">
        Swipe right to like · Swipe left to skip · Or use the buttons!
      </p>
    </div>
  );
}
