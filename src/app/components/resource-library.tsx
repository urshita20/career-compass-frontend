import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { ArrowLeft, BookOpen, Filter, Search } from "lucide-react";
import { Input } from "@/app/components/ui/input";

interface ResourceLibraryProps {
  onBack: () => void;
}

const resources = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    category: "Technology",
    provider: "Udemy",
    level: "Beginner",
    rating: 4.8
  },
  {
    id: 2,
    title: "Digital Marketing Masterclass",
    category: "Marketing",
    provider: "Coursera",
    level: "Intermediate",
    rating: 4.7
  },
  {
    id: 3,
    title: "Financial Analysis Fundamentals",
    category: "Finance",
    provider: "LinkedIn Learning",
    level: "Beginner",
    rating: 4.6
  },
  {
    id: 4,
    title: "UX Design for Beginners",
    category: "Design",
    provider: "Skillshare",
    level: "Beginner",
    rating: 4.9
  },
  {
    id: 5,
    title: "Data Science Specialization",
    category: "Technology",
    provider: "edX",
    level: "Advanced",
    rating: 4.5
  }
];

export function ResourceLibrary({ onBack }: ResourceLibraryProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:text-white px-6 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="mb-6 hover:bg-white/50 dark:hover:bg-zinc-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Resource Library 📚
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Curated courses, books, and tools to supercharge your learning.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search resources..." 
              className="pl-10 bg-white dark:bg-zinc-900 dark:border-zinc-700 h-12 text-lg"
            />
          </div>
          <Button variant="outline" className="h-12 border-gray-300 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800">
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Card key={resource.id} className="border hover:border-indigo-400 hover:shadow-lg transition-all dark:bg-zinc-900 dark:border-zinc-800 group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                    {resource.category}
                  </Badge>
                  <span className="text-sm font-semibold text-yellow-500">★ {resource.rating}</span>
                </div>
                <CardTitle className="text-xl mt-3 dark:text-white group-hover:text-indigo-500 transition-colors">
                  {resource.title}
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  By {resource.provider}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mt-2">
                  <Badge variant="outline" className="border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-400">
                    {resource.level}
                  </Badge>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Start Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
