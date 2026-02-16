import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home } from "@/app/components/home";
import { SwipeAssessment, SwipeAnswers } from "@/app/components/swipe-assessment";
import { ResultsDashboard } from "@/app/components/results-dashboard";
import { CareerExplorer } from "@/app/components/career-explorer";
import { LearningPathPage } from "@/app/components/learning-path-page";
import { MarketInsights } from "@/app/components/market-insights";
import { InternshipHub } from "@/app/components/internship-hub";
import { ResourceLibrary } from "@/app/components/resource-library";
import { SkillGapTool } from "@/app/components/skill-gap-tool";
import { careerPaths, CareerPath } from "@/app/components/career-data";
import { submitAssessment } from "@/app/components/api-service";

type View = "home" | "assessment" | "results" | "explorer" | "learning" | "market" | "internships" | "resources" | "skillgap";

function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [assessmentResults, setAssessmentResults] = useState<CareerPath[]>([]);
  const [aiInsight, setAiInsight] = useState<string | null>(null); // NEW: Store AI insight
  const [selectedLearningCareer, setSelectedLearningCareer] = useState<CareerPath | null>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleAssessmentComplete = async (answers: SwipeAnswers) => {
    try {
      console.log("🚀 Submitting assessment...");
      
      // Call backend API with assessment answers
      const { careers, aiInsight: insight } = await submitAssessment(answers);
      
      console.log("✅ Received careers:", careers.length);
      console.log("✅ Received AI insight:", insight);
      
      if (careers.length > 0) {
        // Map backend careers to frontend format
        const formattedCareers = careers.map((career) => ({
          id: career.name.toLowerCase().replace(/\s+/g, '-'),
          title: career.name,
          category: career.stream || "General",
          description: career.description,
          averageSalary: career.salary,
          growthRate: "Growing",
          requiredSkills: career.skills,
          educationLevel: career.education,
          workEnvironment: "Office, Remote, Hybrid",
          demandLevel: "High" as const,
          matchScore: career.matchScore || 85,
          pros: ["High demand", "Good growth", "Rewarding work"],
          cons: ["Requires dedication", "Continuous learning needed"],
        }));
        
        setAssessmentResults(formattedCareers as CareerPath[]);
        
        // Store AI insight
        if (insight && insight.insight) {
          console.log("💡 Setting AI insight:", insight.insight);
          setAiInsight(insight.insight);
        } else {
          console.log("⚠️ No AI insight received");
          setAiInsight(null);
        }
      } else {
        console.log("⚠️ No careers returned, using fallback");
        // Fallback to local data if API fails
        const scoredCareers = careerPaths.map((career) => {
          let score = 70 + Math.floor(Math.random() * 25);
          return { ...career, matchScore: score };
        });
        setAssessmentResults(scoredCareers.slice(0, 5));
        setAiInsight("Our AI is taking a quick break, but based on your responses, you're showing great potential across multiple career paths! Keep exploring and trying new things.");
      }
      
      setSlideDirection("right");
      setCurrentView("results");
    } catch (error) {
      console.error("❌ Failed to get recommendations:", error);
      // Fallback
      const scoredCareers = careerPaths.map((career) => ({
        ...career,
        matchScore: 70 + Math.floor(Math.random() * 25)
      }));
      setAssessmentResults(scoredCareers.slice(0, 5));
      setAiInsight("We're having trouble connecting to our AI right now, but your results are ready! You're showing interest across diverse fields - keep exploring!");
      setSlideDirection("right");
      setCurrentView("results");
    }
  };

  const handleStartAssessment = () => {
    setSlideDirection("right");
    setCurrentView("assessment");
  };

  const handleBackToHome = () => {
    setSlideDirection("left");
    setCurrentView("home");
    setAiInsight(null); // Clear insight when going home
  };

  const handleExploreCareers = () => {
    setSlideDirection("right");
    setCurrentView("explorer");
  };

  const handleStartLearning = (career: CareerPath) => {
    setSelectedLearningCareer(career);
    setSlideDirection("right");
    setCurrentView("learning");
  };

  const handleBackFromLearning = () => {
    setSlideDirection("left");
    setCurrentView("results");
  };

  const handleViewMarketInsights = () => {
    setSlideDirection("right");
    setCurrentView("market");
  };

  const handleViewInternships = () => {
    setSlideDirection("right");
    setCurrentView("internships");
  };

  const handleViewResources = () => {
    setSlideDirection("right");
    setCurrentView("resources");
  };

  const handleViewSkillGap = () => {
    setSlideDirection("right");
    setCurrentView("skillgap");
  };

  const slideVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      <AnimatePresence mode="wait" custom={slideDirection}>
        {currentView === "home" && (
          <motion.div
            key="home"
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.4 }}
            className="w-full h-full"
          >
            <Home
              onStartAssessment={handleStartAssessment}
              onExploreCareers={handleExploreCareers}
              onViewMarketInsights={handleViewMarketInsights}
              onViewInternships={handleViewInternships}
              onViewResources={handleViewResources}
              onViewSkillGap={handleViewSkillGap}
              toggleTheme={toggleTheme}
              isDarkMode={theme === "dark"}
            />
          </motion.div>
        )}
        
        {currentView === "assessment" && (
          <motion.div
            key="assessment"
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.4 }}
            className="w-full h-full"
          >
            <SwipeAssessment
              onComplete={handleAssessmentComplete}
              onBack={handleBackToHome}
            />
          </motion.div>
        )}
        
        {currentView === "results" && (
          <motion.div
            key="results"
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.4 }}
            className="w-full h-full"
          >
            <ResultsDashboard
              recommendedCareers={assessmentResults}
              aiInsight={aiInsight}
              onBack={handleBackToHome}
              onExploreMore={handleExploreCareers}
              onStartLearning={handleStartLearning}
            />
          </motion.div>
        )}
        
        {currentView === "explorer" && (
          <motion.div
            key="explorer"
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.4 }}
            className="w-full h-full"
          >
            <CareerExplorer onBack={handleBackToHome} />
          </motion.div>
        )}
        
        {currentView === "learning" && selectedLearningCareer && (
          <motion.div
            key="learning"
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.4 }}
            className="w-full h-full"
          >
            <LearningPathPage
              career={selectedLearningCareer}
              onBack={handleBackFromLearning}
            />
          </motion.div>
        )}

        {currentView === "market" && (
          <motion.div
            key="market"
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.4 }}
            className="w-full h-full"
          >
            <MarketInsights onBack={handleBackToHome} />
          </motion.div>
        )}

        {currentView === "internships" && (
          <motion.div
            key="internships"
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.4 }}
            className="w-full h-full"
          >
            <InternshipHub onBack={handleBackToHome} />
          </motion.div>
        )}

        {currentView === "resources" && (
          <motion.div
            key="resources"
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.4 }}
            className="w-full h-full"
          >
            <ResourceLibrary onBack={handleBackToHome} />
          </motion.div>
        )}

        {currentView === "skillgap" && (
          <motion.div
            key="skillgap"
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.4 }}
            className="w-full h-full"
          >
            <SkillGapTool onBack={handleBackToHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
