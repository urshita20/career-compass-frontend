import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { motion } from "motion/react";
import {
  Stethoscope,
  Laptop,
  Code,
  Palette,
  Camera,
  Briefcase,
  Gavel,
  Microscope,
  BookOpen,
  Calculator,
  GraduationCap,
  Building,
  Lightbulb,
  Globe,
  Target,
  Compass,
  TrendingUp,
  Users,
  Award,
  Menu,
  X,
  Sun,
  Moon
} from "lucide-react";

interface HomeProps {
  onStartAssessment: () => void;
  onExploreCareers: () => void;
  onViewMarketInsights: () => void;
  onViewInternships: () => void;
  onViewResources: () => void;
  onViewSkillGap: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

// Career icons for falling animation
const careerIcons = [
  Stethoscope,
  Laptop,
  Code,
  Palette,
  Camera,
  Briefcase,
  Gavel,
  Microscope,
  BookOpen,
  Calculator,
  GraduationCap,
  Building,
  Lightbulb,
  Globe,
];

interface FallingIcon {
  id: number;
  Icon: typeof Stethoscope;
  startX: number;
  duration: number;
  delay: number;
  size: number;
  color: string;
}

export function Home({ 
  onStartAssessment, 
  onExploreCareers,
  onViewMarketInsights,
  onViewInternships,
  onViewResources,
  onViewSkillGap,
  toggleTheme,
  isDarkMode
}: HomeProps) {
  const [fallingIcons, setFallingIcons] = useState<FallingIcon[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Generate random falling icons with vibrant colors
    const colors = [
      "#FF6B6B", // Red
      "#4ECDC4", // Teal
      "#45B7D1", // Blue
      "#FFA07A", // Salmon
      "#98D8C8", // Mint
      "#F7DC6F", // Yellow
      "#BB8FCE", // Purple
      "#85C1E2", // Sky Blue
      "#F8B739", // Orange
      "#EC7063", // Pink
      "#52BE80", // Green
      "#AF7AC5", // Lavender
    ];
    
    const icons: FallingIcon[] = [];
    for (let i = 0; i < 40; i++) {
      icons.push({
        id: i,
        Icon: careerIcons[Math.floor(Math.random() * careerIcons.length)],
        startX: Math.random() * 100,
        duration: 8 + Math.random() * 10, // 8-18 seconds (faster)
        delay: Math.random() * 5,
        size: 28 + Math.random() * 36, // 28-64px (larger)
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setFallingIcons(icons);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden transition-colors duration-300">
      {/* Navigation Bar */}
      <nav className="bg-black text-white relative z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl tracking-tight font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Career Compass
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="hover:text-gray-300 transition-colors">
                Home
              </a>
              <a href="#how-it-works" className="hover:text-gray-300 transition-colors">
                How It Works
              </a>
              <a
                href="#careers"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreCareers();
                }}
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                Careers
              </a>
              <a href="#about" className="hover:text-gray-300 transition-colors">
                About
              </a>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-white hover:bg-gray-800 rounded-full"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black dark:border-white dark:hover:bg-white dark:hover:text-black"
                onClick={onStartAssessment}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-white hover:bg-gray-800 rounded-full"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <a href="#home" className="block hover:text-gray-300 transition-colors">
                Home
              </a>
              <a href="#how-it-works" className="block hover:text-gray-300 transition-colors">
                How It Works
              </a>
              <a
                href="#careers"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreCareers();
                  setMobileMenuOpen(false);
                }}
                className="block hover:text-gray-300 transition-colors cursor-pointer"
              >
                Careers
              </a>
              <a href="#about" className="block hover:text-gray-300 transition-colors">
                About
              </a>
              <Button
                variant="outline"
                className="w-full border-white text-white hover:bg-white hover:text-black"
                onClick={() => {
                  onStartAssessment();
                  setMobileMenuOpen(false);
                }}
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Falling Icons Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 dark:opacity-30">
        {fallingIcons.map((item) => {
          const IconComponent = item.Icon;
          return (
            <motion.div
              key={item.id}
              className="absolute"
              style={{
                left: `${item.startX}%`,
                top: -100,
                color: item.color,
                opacity: 0.3,
              }}
              animate={{
                y: ["0vh", "110vh"],
                rotate: [0, 360],
              }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <IconComponent size={item.size} />
            </motion.div>
          );
        })}
      </div>

      {/* Hero Section */}
      <section id="home" className="relative z-10 px-6 py-24 md:py-32 text-center">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl mb-8 text-black dark:text-white tracking-tight"
            style={{ fontWeight: 800 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Swipe right on the right career
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            AI-powered career guidance designed for students. Discover your perfect path through
            personalized assessments and expert insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Button
              onClick={onStartAssessment}
              size="lg"
              className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 px-12 py-7 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 px-6 py-20 bg-gray-50 dark:bg-zinc-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-4 text-black dark:text-white" style={{ fontWeight: 700 }}>
            How It Works
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto text-lg">
            Three simple steps to discover your ideal career path
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-xl transition-all dark:bg-black dark:border-zinc-800">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <CardTitle className="text-2xl dark:text-white">Take Assessment</CardTitle>
                <CardDescription className="text-base mt-2 dark:text-gray-400">
                  Answer thoughtful questions about your interests, skills, and goals
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-xl transition-all dark:bg-black dark:border-zinc-800">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <CardTitle className="text-2xl dark:text-white">Get Matched</CardTitle>
                <CardDescription className="text-base mt-2 dark:text-gray-400">
                  Our AI analyzes your profile and matches you with suitable careers
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-xl transition-all dark:bg-black dark:border-zinc-800">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <CardTitle className="text-2xl dark:text-white">Start Your Journey</CardTitle>
                <CardDescription className="text-base mt-2 dark:text-gray-400">
                  Access personalized roadmaps, resources, and guidance
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20 bg-white dark:bg-black transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-4 text-black dark:text-white" style={{ fontWeight: 700 }}>
            Everything You Need
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto text-lg">
            Comprehensive tools and insights to guide your career decisions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card 
              className="border hover:border-black dark:hover:border-white transition-all hover:shadow-lg cursor-pointer dark:bg-zinc-900 dark:border-zinc-800"
              onClick={onStartAssessment}
            >
              <CardHeader>
                <Target className="h-12 w-12 text-black dark:text-white mb-3" />
                <CardTitle className="text-xl dark:text-white">Personalized Assessments</CardTitle>
                <CardDescription className="text-base dark:text-gray-400">
                  Fun, accurate quizzes to find your perfect career match. 🎯
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="border hover:border-black dark:hover:border-white transition-all hover:shadow-lg cursor-pointer dark:bg-zinc-900 dark:border-zinc-800"
              onClick={onViewResources}
            >
              <CardHeader>
                <BookOpen className="h-12 w-12 text-black dark:text-white mb-3" />
                <CardTitle className="text-xl dark:text-white">Learning Resources</CardTitle>
                <CardDescription className="text-base dark:text-gray-400">
                  Curated courses and materials to boost your skills. 📚
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="border hover:border-black dark:hover:border-white transition-all hover:shadow-lg cursor-pointer dark:bg-zinc-900 dark:border-zinc-800"
              onClick={onExploreCareers}
            >
              <CardHeader>
                <Compass className="h-12 w-12 text-black dark:text-white mb-3" />
                <CardTitle className="text-xl dark:text-white">Career Roadmaps</CardTitle>
                <CardDescription className="text-base dark:text-gray-400">
                  Step-by-step guides to help you navigate from student to pro. 🗺️
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="border hover:border-black dark:hover:border-white transition-all hover:shadow-lg cursor-pointer dark:bg-zinc-900 dark:border-zinc-800"
              onClick={onViewMarketInsights}
            >
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-black dark:text-white mb-3" />
                <CardTitle className="text-xl dark:text-white">Market Insights</CardTitle>
                <CardDescription className="text-base dark:text-gray-400">
                  Real data on salaries and trends. Know your worth! 💰
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="border hover:border-black dark:hover:border-white transition-all hover:shadow-lg cursor-pointer dark:bg-zinc-900 dark:border-zinc-800"
              onClick={onViewSkillGap}
            >
              <CardHeader>
                <Users className="h-12 w-12 text-black dark:text-white mb-3" />
                <CardTitle className="text-xl dark:text-white">Skill Gap Analysis</CardTitle>
                <CardDescription className="text-base dark:text-gray-400">
                  See what you need to learn to land your dream job. 🚀
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="border hover:border-black dark:hover:border-white transition-all hover:shadow-lg cursor-pointer dark:bg-zinc-900 dark:border-zinc-800"
              onClick={onViewInternships}
            >
              <CardHeader>
                <Award className="h-12 w-12 text-black dark:text-white mb-3" />
                <CardTitle className="text-xl dark:text-white">Internship Guidance</CardTitle>
                <CardDescription className="text-base dark:text-gray-400">
                  Tips and tricks to land your first real-world experience. 💼
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-20 bg-black text-white border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-6xl md:text-7xl mb-3" style={{ fontWeight: 800 }}>
                500+
              </div>
              <div className="text-xl text-gray-300">Career Paths</div>
            </div>
            <div>
              <div className="text-6xl md:text-7xl mb-3" style={{ fontWeight: 800 }}>
                10,000+
              </div>
              <div className="text-xl text-gray-300">Learning Resources</div>
            </div>
            <div>
              <div className="text-6xl md:text-7xl mb-3" style={{ fontWeight: 800 }}>
                95%
              </div>
              <div className="text-xl text-gray-300">Student Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="relative z-10 px-6 py-24 bg-white dark:bg-black transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl mb-6 text-black dark:text-white" style={{ fontWeight: 700 }}>
            Ready to Shape Your Future?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of students who have found their perfect career path through Career Compass
          </p>
          <Button
            onClick={onStartAssessment}
            size="lg"
            className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 px-12 py-7 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
}
