import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { ArrowLeft, Briefcase, MapPin, Building, Calendar, Search } from "lucide-react";
import { Input } from "@/app/components/ui/input";

interface InternshipHubProps {
  onBack: () => void;
}

const internships = [
  {
    id: 1,
    role: "Software Engineering Intern",
    company: "TechFlow Solutions",
    location: "Bangalore (Remote)",
    stipend: "₹25,000/mo",
    duration: "6 Months",
    tags: ["React", "Node.js", "Startup"],
    posted: "2 days ago",
    applyUrl: "https://internshala.com/internships/web-development-internship/"
  },
  {
    id: 2,
    role: "Social Media Marketing Intern",
    company: "BuzzCreate Agency",
    location: "Mumbai",
    stipend: "₹15,000/mo",
    duration: "3 Months",
    tags: ["Instagram", "Content", "Creative"],
    posted: "5 hours ago",
    applyUrl: "https://internshala.com/internships/social-media-marketing-internship/"
  },
  {
    id: 3,
    role: "Data Analytics Intern",
    company: "FinServe Corp",
    location: "Gurgaon (Hybrid)",
    stipend: "₹30,000/mo",
    duration: "6 Months",
    tags: ["SQL", "Python", "Finance"],
    posted: "1 week ago",
    applyUrl: "https://www.naukri.com/data-analytics-internship-jobs"
  },
  {
    id: 4,
    role: "UI/UX Design Intern",
    company: "Creative Pulse",
    location: "Remote",
    stipend: "₹20,000/mo",
    duration: "4 Months",
    tags: ["Figma", "User Research"],
    posted: "3 days ago",
    applyUrl: "https://internshala.com/internships/ui-ux-design-internship/"
  },
  {
    id: 5,
    role: "Machine Learning Intern",
    company: "AI Labs India",
    location: "Hyderabad (Hybrid)",
    stipend: "₹35,000/mo",
    duration: "6 Months",
    tags: ["Python", "TensorFlow", "Research"],
    posted: "Today",
    applyUrl: "https://www.linkedin.com/jobs/machine-learning-intern-jobs/"
  },
  {
    id: 6,
    role: "Business Development Intern",
    company: "StartupX",
    location: "Delhi (Remote)",
    stipend: "₹12,000/mo",
    duration: "3 Months",
    tags: ["Sales", "Strategy", "Startup"],
    posted: "4 days ago",
    applyUrl: "https://internshala.com/internships/business-development-internship/"
  }
];

export function InternshipHub({ onBack }: InternshipHubProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:text-white px-6 py-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="mb-6 hover:bg-white/50 dark:hover:bg-zinc-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">
            Internship Hub 💼
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Kickstart your career with real-world experience. Find the coolest internships tailored for you.
          </p>
        </div>

        <div className="flex gap-4 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by role, company, or skill..."
              className="pl-10 bg-white dark:bg-zinc-900 dark:border-zinc-700 h-12 text-lg"
            />
          </div>
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">Search</Button>
        </div>

        <div className="grid gap-6">
          {internships.map((internship) => (
            <Card key={internship.id} className="border hover:border-teal-400 hover:shadow-lg transition-all cursor-pointer dark:bg-zinc-900 dark:border-zinc-800 group">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold dark:text-white group-hover:text-teal-500 transition-colors">
                        {internship.role}
                      </h3>
                      <Badge variant="secondary" className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100">
                        {internship.posted}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                      <Building className="h-5 w-5 text-gray-400" />
                      {internship.company}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {internship.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {internship.stipend}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {internship.duration}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <Button
                      size="lg"
                      className="w-full md:w-auto bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                      onClick={(e) => { e.stopPropagation(); window.open(internship.applyUrl, "_blank", "noopener,noreferrer"); }}
                    >
                      Apply Now 🚀
                    </Button>
                    <div className="flex gap-2">
                      {internship.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="border-gray-300 dark:border-gray-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
