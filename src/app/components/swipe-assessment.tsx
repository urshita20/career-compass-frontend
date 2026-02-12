import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { motion, useMotionValue, useTransform, PanInfo } from "motion/react";
import { X, Heart, SkipForward, Sparkles } from "lucide-react";

interface Question {
  id: number;
  emoji: string;
  question: string;
  leftLabel: string;
  rightLabel: string;
  category: string;
}

const questions: Question[] = [
  {
    id: 1,
    emoji: "💻",
    question: "Spending all day with technology?",
    leftLabel: "Nah, not my thing",
    rightLabel: "Yes! Love it!",
    category: "tech",
  },
  {
    id: 2,
    emoji: "🎨",
    question: "Creating art and designs?",
    leftLabel: "Not really",
    rightLabel: "Absolutely!",
    category: "creative",
  },
  {
    id: 3,
    emoji: "👥",
    question: "Working with lots of people?",
    leftLabel: "Prefer solo",
    rightLabel: "Sounds fun!",
    category: "social",
  },
  {
    id: 4,
    emoji: "🎮",
    question: "Gaming or coding in your free time?",
    leftLabel: "Not my vibe",
    rightLabel: "All the time!",
    category: "tech",
  },
  {
    id: 5,
    emoji: "📱",
    question: "Always on social media creating content?",
    leftLabel: "Nope",
    rightLabel: "24/7!",
    category: "creative",
  },
  {
    id: 6,
    emoji: "🎬",
    question: "Making videos or taking photos?",
    leftLabel: "Not interested",
    rightLabel: "Love it!",
    category: "creative",
  },
  {
    id: 7,
    emoji: "🧮",
    question: "Solving puzzles and math problems?",
    leftLabel: "Hard pass",
    rightLabel: "Challenge accepted!",
    category: "analytical",
  },
  {
    id: 8,
    emoji: "💬",
    question: "Talking and presenting in front of people?",
    leftLabel: "Scary!",
    rightLabel: "Bring it on!",
    category: "social",
  },
  {
    id: 9,
    emoji: "🌍",
    question: "Helping make the world a better place?",
    leftLabel: "Not priority",
    rightLabel: "My dream!",
    category: "impact",
  },
  {
    id: 10,
    emoji: "💰",
    question: "Starting your own business one day?",
    leftLabel: "Too risky",
    rightLabel: "Hell yeah!",
    category: "entrepreneurial",
  },
  {
    id: 11,
    emoji: "📚",
    question: "Reading and researching stuff?",
    leftLabel: "Boring",
    rightLabel: "Interesting!",
    category: "analytical",
  },
  {
    id: 12,
    emoji: "🎵",
    question: "Music, dance, or performing arts?",
    leftLabel: "Not my thing",
    rightLabel: "Yesss!",
    category: "creative",
  },
  {
    id: 13,
    emoji: "🏥",
    question: "Taking care of people's health?",
    leftLabel: "Nah",
    rightLabel: "Would love to!",
    category: "healthcare",
  },
  {
    id: 14,
    emoji: "⚡",
    question: "Fast-paced, exciting work environment?",
    leftLabel: "Too stressful",
    rightLabel: "Bring the energy!",
    category: "dynamic",
  },
  {
    id: 15,
    emoji: "🎯",
    question: "Setting big goals and crushing them?",
    leftLabel: "Meh",
    rightLabel: "Always!",
    category: "ambitious",
  },
];

export interface SwipeAnswers {
  [key: number]: "left" | "right" | "skip";
}

interface SwipeAssessmentProps {
  onComplete: (answers: SwipeAnswers) => void;
  onBack: () => void;
}

export function SwipeAssessment({ onComplete, onBack }: SwipeAssessmentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<SwipeAnswers>({});
  const [exitX, setExitX] = useState(0);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      // Swiped
      const direction = info.offset.x > 0 ? "right" : "left";
      setExitX(info.offset.x > 0 ? 200 : -200);
      setAnswers({ ...answers, [currentQuestion.id]: direction });
      
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setExitX(0);
          x.set(0);
        } else {
          onComplete({ ...answers, [currentQuestion.id]: direction });
        }
      }, 200);
    } else {
      // Return to center
      x.set(0);
    }
  };

  const handleSwipe = (direction: "left" | "right") => {
    setExitX(direction === "right" ? 200 : -200);
    setAnswers({ ...answers, [currentQuestion.id]: direction });
    
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setExitX(0);
        x.set(0);
      } else {
        onComplete({ ...answers, [currentQuestion.id]: direction });
      }
    }, 200);
  };

  const handleSkip = () => {
    setAnswers({ ...answers, [currentQuestion.id]: "skip" });
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      x.set(0);
    } else {
      onComplete({ ...answers, [currentQuestion.id]: "skip" });
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 overflow-hidden z-50 transition-colors duration-300">
      {/* Header */}
      <div className="relative z-20 px-6 py-4 bg-white/10 dark:bg-black/30 backdrop-blur-sm">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-white hover:bg-white/20"
              size="sm"
            >
              ← Back
            </Button>
            <div className="text-white font-semibold">
              {currentIndex + 1} / {questions.length}
            </div>
          </div>
          <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center h-[calc(100vh-180px)] px-6">
        <div className="max-w-md w-full relative">
          {currentQuestion && (
            <>
              {/* Swipe Indicators */}
              <div className="absolute inset-x-0 -top-16 flex justify-between px-12 pointer-events-none z-10">
                <motion.div
                  className="text-4xl"
                  animate={{ scale: x.get() < -50 ? 1.2 : 1, opacity: x.get() < -50 ? 1 : 0.3 }}
                >
                  ❌
                </motion.div>
                <motion.div
                  className="text-4xl"
                  animate={{ scale: x.get() > 50 ? 1.2 : 1, opacity: x.get() > 50 ? 1 : 0.3 }}
                >
                  ❤️
                </motion.div>
              </div>

              {/* Card */}
              <motion.div
                className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 cursor-grab active:cursor-grabbing relative"
                style={{
                  x,
                  rotate,
                  opacity,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                animate={{ x: exitX }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Emoji */}
                <div className="text-8xl text-center mb-6">{currentQuestion.emoji}</div>
                
                {/* Question */}
                <h2 className="text-3xl text-center mb-8 text-gray-800 dark:text-white font-bold">
                  {currentQuestion.question}
                </h2>

                {/* Swipe Instructions */}
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <span>👈</span>
                    <span>{currentQuestion.leftLabel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{currentQuestion.rightLabel}</span>
                    <span>👉</span>
                  </div>
                </div>

                {/* Sparkle decoration */}
                <div className="absolute top-4 right-4">
                  <Sparkles className="h-6 w-6 text-purple-400" />
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex justify-center items-center gap-6 mt-8">
                <motion.button
                  className="w-16 h-16 rounded-full bg-red-500 shadow-lg flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipe("left")}
                >
                  <X className="h-8 w-8" />
                </motion.button>

                <motion.button
                  className="w-14 h-14 rounded-full bg-white dark:bg-zinc-800 shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSkip}
                >
                  <SkipForward className="h-6 w-6" />
                </motion.button>

                <motion.button
                  className="w-16 h-16 rounded-full bg-green-500 shadow-lg flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipe("right")}
                >
                  <Heart className="h-8 w-8" />
                </motion.button>
              </div>

              {/* Helper Text */}
              <div className="text-center mt-6 text-white text-sm">
                <p>Swipe left ❌ or right ❤️</p>
                <p className="text-xs opacity-80 mt-1">Or use the buttons below!</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
