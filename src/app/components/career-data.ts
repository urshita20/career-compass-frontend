export interface CareerPath {
  id: string;
  title: string;
  category: string;
  description: string;
  averageSalary: string;
  growthRate: string;
  requiredSkills: string[];
  educationLevel: string;
  workEnvironment: string;
  demandLevel: "High" | "Medium" | "Growing";
  matchScore?: number;
  pros: string[];
  cons: string[];
}

export interface LearningResource {
  id: string;
  title: string;
  provider: string;
  type: "Course" | "Certification" | "Bootcamp" | "Tutorial";
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  url?: string;
}

export interface SkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  priority: "High" | "Medium" | "Low";
  estimatedTime: string;
}

export const careerPaths: CareerPath[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    category: "Technology",
    description: "Design, develop, and maintain software applications and systems. Work on cutting-edge technologies and solve complex problems.",
    averageSalary: "₹8L - ₹25L per year",
    growthRate: "22% (Much faster than average)",
    requiredSkills: ["Programming", "Problem Solving", "Data Structures", "Algorithms", "Version Control"],
    educationLevel: "Bachelor's in Computer Science or related field",
    workEnvironment: "Office, Remote, Hybrid",
    demandLevel: "High",
    pros: ["High salary potential", "Remote work flexibility", "Creative problem solving"],
    cons: ["High stress deadlines", "Sedentary lifestyle", "Constant need to upskill"],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Technology",
    description: "Extract insights from data using statistical analysis, machine learning, and visualization techniques to drive business decisions.",
    averageSalary: "₹10L - ₹30L per year",
    growthRate: "35% (Much faster than average)",
    requiredSkills: ["Statistics", "Machine Learning", "Python/R", "Data Visualization", "SQL"],
    educationLevel: "Bachelor's or Master's in Data Science, Statistics, or related field",
    workEnvironment: "Office, Remote, Hybrid",
    demandLevel: "High",
    pros: ["Intellectually challenging", "High impact on decisions", "Lucrative compensation"],
    cons: ["Data cleaning is tedious", "High pressure for accuracy", "Complex stakeholder communication"],
  },
  {
    id: "ux-designer",
    title: "UX/UI Designer",
    category: "Design",
    description: "Create intuitive and engaging user experiences for digital products through research, prototyping, and visual design.",
    averageSalary: "₹6L - ₹18L per year",
    growthRate: "13% (Faster than average)",
    requiredSkills: ["User Research", "Prototyping", "Figma/Sketch", "Visual Design", "User Testing"],
    educationLevel: "Bachelor's in Design, HCI, or related field",
    workEnvironment: "Office, Remote, Hybrid",
    demandLevel: "Growing",
    pros: ["Blend of creativity & logic", "Visible impact of work", "Collaborative environment"],
    cons: ["Subjective feedback loops", "Keeping up with design trends", "Balancing aesthetics with function"],
  },
  {
    id: "product-manager",
    title: "Product Manager",
    category: "Business",
    description: "Lead product development from conception to launch, defining strategy and working with cross-functional teams.",
    averageSalary: "₹12L - ₹35L per year",
    growthRate: "18% (Much faster than average)",
    requiredSkills: ["Strategic Thinking", "Communication", "Data Analysis", "Agile/Scrum", "User Empathy"],
    educationLevel: "Bachelor's in Business, CS, or related field; MBA preferred",
    workEnvironment: "Office, Hybrid",
    demandLevel: "High",
    pros: ["Leadership opportunity", "Central role in company", "Diverse daily tasks"],
    cons: ["High responsibility with low authority", "Constant meetings", "Ambiguity in decision making"],
  },
  {
    id: "digital-marketer",
    title: "Digital Marketing Specialist",
    category: "Marketing",
    description: "Develop and execute online marketing campaigns across various channels to grow brand awareness and drive conversions.",
    averageSalary: "₹4L - ₹12L per year",
    growthRate: "10% (Faster than average)",
    requiredSkills: ["SEO/SEM", "Content Marketing", "Social Media", "Analytics", "Email Marketing"],
    educationLevel: "Bachelor's in Marketing, Communications, or related field",
    workEnvironment: "Office, Remote, Hybrid",
    demandLevel: "High",
    pros: ["Fast-paced & dynamic", "Immediate results visibility", "Creativity meets data"],
    cons: ["Constant algorithm changes", "Pressure for immediate ROI", "24/7 social media cycle"],
  },
  {
    id: "financial-analyst",
    title: "Financial Analyst",
    category: "Finance",
    description: "Analyze financial data, create reports, and provide insights to help organizations make informed investment decisions.",
    averageSalary: "₹5L - ₹15L per year",
    growthRate: "6% (Average)",
    requiredSkills: ["Financial Modeling", "Excel", "Data Analysis", "Forecasting", "Business Acumen"],
    educationLevel: "Bachelor's in Finance, Economics, or related field",
    workEnvironment: "Office",
    demandLevel: "Medium",
    pros: ["Clear career progression", "Performance-based bonuses", "Gain investment knowledge"],
    cons: ["Long working hours", "High pressure environment", "Repetitive tasks"],
  },
  {
    id: "healthcare-admin",
    title: "Healthcare Administrator",
    category: "Healthcare",
    description: "Manage healthcare facilities, ensuring quality patient care, regulatory compliance, and operational efficiency.",
    averageSalary: "₹6L - ₹20L per year",
    growthRate: "28% (Much faster than average)",
    requiredSkills: ["Healthcare Management", "Leadership", "Compliance", "Budgeting", "Communication"],
    educationLevel: "Bachelor's or Master's in Healthcare Administration",
    workEnvironment: "Hospital, Clinic, Office",
    demandLevel: "High",
    pros: ["Stable industry", "Helping community indirectly", "Good benefits"],
    cons: ["Regulatory red tape", "High stress environment", "Dealing with bureaucracy"],
  },
  {
    id: "content-creator",
    title: "Content Creator/Writer",
    category: "Creative",
    description: "Produce engaging content across various platforms including blogs, social media, video, and podcasts.",
    averageSalary: "₹3L - ₹10L per year",
    growthRate: "9% (Average)",
    requiredSkills: ["Writing", "SEO", "Social Media", "Video Editing", "Storytelling"],
    educationLevel: "Bachelor's in Communications, Journalism, or related field",
    workEnvironment: "Remote, Office, Flexible",
    demandLevel: "Growing",
    pros: ["Creative freedom", "Flexible schedule", "Build personal brand"],
    cons: ["Inconsistent income", "Creative burnout", "Platform algorithm dependency"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Analyst",
    category: "Technology",
    description: "Protect organizations from cyber threats by monitoring systems, implementing security measures, and responding to incidents.",
    averageSalary: "₹7L - ₹22L per year",
    growthRate: "33% (Much faster than average)",
    requiredSkills: ["Network Security", "Threat Analysis", "Risk Assessment", "Security Tools", "Incident Response"],
    educationLevel: "Bachelor's in Cybersecurity, CS, or related field",
    workEnvironment: "Office, Remote, Hybrid",
    demandLevel: "High",
    pros: ["High job security", "Solving puzzles", "Protecting important assets"],
    cons: ["High stress (on call)", "Constant threat monitoring", "Blame when things go wrong"],
  },
  {
    id: "environmental-scientist",
    title: "Environmental Scientist",
    category: "Science",
    description: "Study environmental issues and develop solutions to protect human health and the natural environment.",
    averageSalary: "₹5L - ₹12L per year",
    growthRate: "8% (Average)",
    requiredSkills: ["Environmental Science", "Data Analysis", "Research", "GIS", "Report Writing"],
    educationLevel: "Bachelor's or Master's in Environmental Science",
    workEnvironment: "Field, Laboratory, Office",
    demandLevel: "Growing",
    pros: ["Meaningful work", "Mix of field & office", "Contributing to planet health"],
    cons: ["Field work can be physically demanding", "Slow policy changes", "Funding uncertainty"],
  },
  {
    id: "teacher",
    title: "Education Specialist/Teacher",
    category: "Education",
    description: "Educate and mentor students, develop curriculum, and create engaging learning experiences.",
    averageSalary: "₹4L - ₹10L per year",
    growthRate: "5% (Average)",
    requiredSkills: ["Subject Expertise", "Communication", "Classroom Management", "Curriculum Design", "Patience"],
    educationLevel: "Bachelor's in Education + Teaching License",
    workEnvironment: "School, Online",
    demandLevel: "Medium",
    pros: ["Shaping future generations", "Vacation time", "Emotional rewards"],
    cons: ["Low pay relative to effort", "Emotional burnout", "Administrative paperwork"],
  },
  {
    id: "mechanical-engineer",
    title: "Mechanical Engineer",
    category: "Engineering",
    description: "Design, develop, and test mechanical devices and systems across various industries.",
    averageSalary: "₹6L - ₹18L per year",
    growthRate: "7% (Average)",
    requiredSkills: ["CAD Software", "Thermodynamics", "Materials Science", "Problem Solving", "Project Management"],
    educationLevel: "Bachelor's in Mechanical Engineering",
    workEnvironment: "Office, Manufacturing, Field",
    demandLevel: "Medium",
    pros: ["Tangible results", "Wide industry application", "Understanding how things work"],
    cons: ["Safety risks in manufacturing", "Slow project lifecycles", "Rigid design constraints"],
  },
];

export const learningResources: { [key: string]: LearningResource[] } = {
  "software-engineer": [
    {
      id: "cs50",
      title: "CS50's Introduction to Computer Science",
      provider: "Harvard University (edX)",
      type: "Course",
      duration: "12 weeks",
      level: "Beginner",
      url: "https://www.edx.org/learn/computer-science/harvard-university-cs50-s-introduction-to-computer-science",
    },
    {
      id: "fullstack-open",
      title: "Full Stack Open",
      provider: "University of Helsinki",
      type: "Course",
      duration: "12-15 weeks",
      level: "Intermediate",
      url: "https://fullstackopen.com/en/",
    },
    {
      id: "algorithms-coursera",
      title: "Algorithms Specialization",
      provider: "Stanford (Coursera)",
      type: "Course",
      duration: "6 months",
      level: "Intermediate",
      url: "https://www.coursera.org/specializations/algorithms",
    },
  ],
  "data-scientist": [
    {
      id: "python-data-science",
      title: "Python for Data Science",
      provider: "IBM (Coursera)",
      type: "Course",
      duration: "8 weeks",
      level: "Beginner",
      url: "https://www.coursera.org/professional-certificates/ibm-data-science",
    },
    {
      id: "ml-specialization",
      title: "Machine Learning Specialization",
      provider: "Andrew Ng (Coursera)",
      type: "Course",
      duration: "3 months",
      level: "Intermediate",
      url: "https://www.coursera.org/specializations/machine-learning-introduction",
    },
    {
      id: "data-science-bootcamp",
      title: "Data Science Bootcamp",
      provider: "DataCamp",
      type: "Bootcamp",
      duration: "4 months",
      level: "Intermediate",
      url: "https://www.datacamp.com/tracks/data-scientist-with-python",
    },
  ],
  "ux-designer": [
    {
      id: "google-ux",
      title: "Google UX Design Certificate",
      provider: "Google (Coursera)",
      type: "Certification",
      duration: "6 months",
      level: "Beginner",
      url: "https://www.coursera.org/professional-certificates/google-ux-design",
    },
    {
      id: "interaction-design",
      title: "Interaction Design Specialization",
      provider: "UC San Diego (Coursera)",
      type: "Course",
      duration: "5 months",
      level: "Intermediate",
      url: "https://www.coursera.org/specializations/interaction-design",
    },
    {
      id: "figma-mastery",
      title: "Figma UI/UX Design Essentials",
      provider: "Udemy",
      type: "Course",
      duration: "10 hours",
      level: "Beginner",
      url: "https://www.udemy.com/course/figma-ux-ui-design-user-experience-tutorial-course/",
    },
  ],
  "product-manager": [
    {
      id: "pm-fundamentals",
      title: "Product Management Fundamentals",
      provider: "Product School",
      type: "Course",
      duration: "8 weeks",
      level: "Beginner",
      url: "https://productschool.com/product-management-certification/",
    },
    {
      id: "digital-product-management",
      title: "Digital Product Management",
      provider: "University of Virginia (Coursera)",
      type: "Course",
      duration: "4 months",
      level: "Intermediate",
      url: "https://www.coursera.org/specializations/product-management",
    },
    {
      id: "agile-product-management",
      title: "Agile Product Management",
      provider: "Scrum Alliance",
      type: "Certification",
      duration: "2 weeks",
      level: "Intermediate",
      url: "https://www.scrumalliance.org/get-certified",
    },
  ],
  "digital-marketer": [
    {
      id: "google-digital-marketing",
      title: "Google Digital Marketing Certificate",
      provider: "Google (Coursera)",
      type: "Certification",
      duration: "6 months",
      level: "Beginner",
      url: "https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce",
    },
    {
      id: "seo-training",
      title: "SEO Training Course",
      provider: "Moz",
      type: "Course",
      duration: "4 weeks",
      level: "Intermediate",
      url: "https://moz.com/beginners-guide-to-seo",
    },
    {
      id: "content-marketing",
      title: "Content Marketing Certification",
      provider: "HubSpot Academy",
      type: "Certification",
      duration: "3 hours",
      level: "Beginner",
      url: "https://academy.hubspot.com/courses/content-marketing",
    },
  ],
};

export function generateSkillGaps(careerPath: CareerPath): SkillGap[] {
  // Mock skill gaps - in a real app, this would compare user's current skills
  const skillsToAnalyze = careerPath.requiredSkills.slice(0, 5);

  return skillsToAnalyze.map((skill, index) => ({
    skill,
    currentLevel: Math.floor(Math.random() * 5) + 1,
    requiredLevel: Math.floor(Math.random() * 3) + 7,
    priority: index < 2 ? "High" : index < 4 ? "Medium" : "Low",
    estimatedTime: index < 2 ? "3-6 months" : index < 4 ? "2-4 months" : "1-2 months",
  }));
}
