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

type View = "home" | "assessment" | "results" | "explorer" | "learning" | "market" | "internships" | "resources" | "skillgap";

function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [assessmentResults, setAssessmentResults] = useState<CareerPath[]>([]);
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

  const handleAssessmentComplete = (answers: SwipeAnswers) => {
    const scoredCareers = careerPaths.map((career) => {
      let score = 70;
      score += Math.floor(Math.random() * 25);
      
      Object.values(answers).forEach((answer) => {
        if (answer === "right") {
          if (career.category === "Technology") score += 3;
          if (career.category === "Design" || career.category === "Creative") score += 3;
          if (career.category === "Healthcare" || career.category === "Education") score += 2;
        }
      });

      return {
        ...career,
        matchScore: Math.min(Math.max(score, 65), 98),
      };
    });

    const topCareers = scoredCareers
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
      .slice(0, 5);

    setAssessmentResults(topCareers);
    setSlideDirection("right");
    setCurrentView("results");
  };

  const handleStartAssessment = () => {
    setSlideDirection("right");
    setCurrentView("assessment");
  };

  const handleBackToHome = () => {
    setSlideDirection("left");
    setCurrentView("home");
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
