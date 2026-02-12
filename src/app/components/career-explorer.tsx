import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { ArrowLeft, Search, TrendingUp, Briefcase, BookOpen, MapPin, CheckCircle2, XCircle } from "lucide-react";
import { CareerPath, careerPaths, learningResources } from "./career-data";

interface CareerExplorerProps {
  onBack: () => void;
}

export function CareerExplorer({ onBack }: CareerExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [demandFilter, setDemandFilter] = useState<string>("all");
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);

  const categories = Array.from(new Set(careerPaths.map((c) => c.category)));

  const filteredCareers = careerPaths.filter((career) => {
    const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || career.category === categoryFilter;
    const matchesDemand = demandFilter === "all" || career.demandLevel === demandFilter;
    
    return matchesSearch && matchesCategory && matchesDemand;
  });

  const resources = selectedCareer ? learningResources[selectedCareer.id] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-950 dark:to-zinc-900 px-6 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 hover:bg-white/50 dark:hover:bg-zinc-800 dark:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl mb-3 text-gray-900 dark:text-white font-bold">Explore Career Paths</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover hundreds of career options across various industries
          </p>
        </div>

        {/* Filters */}
        <Card className="border-2 shadow-lg mb-6 dark:bg-zinc-900 dark:border-zinc-800">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search careers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="dark:bg-zinc-800 dark:text-white dark:border-zinc-700">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={demandFilter} onValueChange={setDemandFilter}>
                <SelectTrigger className="dark:bg-zinc-800 dark:text-white dark:border-zinc-700">
                  <SelectValue placeholder="Market Demand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Demand Levels</SelectItem>
                  <SelectItem value="High">High Demand</SelectItem>
                  <SelectItem value="Growing">Growing Demand</SelectItem>
                  <SelectItem value="Medium">Medium Demand</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-4 text-gray-600 dark:text-gray-400">
          Showing {filteredCareers.length} career{filteredCareers.length !== 1 ? 's' : ''}
        </div>

        {/* Career Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career) => (
            <Card
              key={career.id}
              className="border-2 hover:border-indigo-300 hover:shadow-lg transition-all cursor-pointer dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-indigo-500"
              onClick={() => setSelectedCareer(career)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs dark:text-gray-300 dark:border-gray-600">
                    {career.category}
                  </Badge>
                  <Badge
                    variant={career.demandLevel === "High" ? "default" : "secondary"}
                    className={career.demandLevel === "High" ? "bg-indigo-600 text-xs text-white" : "text-xs dark:bg-zinc-800 dark:text-gray-300"}
                  >
                    {career.demandLevel}
                  </Badge>
                </div>
                <CardTitle className="text-xl dark:text-white">{career.title}</CardTitle>
                <CardDescription className="line-clamp-2 dark:text-gray-400">
                  {career.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Briefcase className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{career.averageSalary}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <TrendingUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{career.growthRate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{career.workEnvironment}</span>
                </div>
                <div className="pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-zinc-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCareer(career);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCareers.length === 0 && (
          <Card className="border-2 dark:bg-zinc-900 dark:border-zinc-800">
            <CardContent className="py-12 text-center">
              <Search className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">No careers found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                  setDemandFilter("all");
                }}
                variant="outline"
                className="mt-4 dark:border-gray-600 dark:text-white dark:hover:bg-zinc-800"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Career Detail Modal */}
      <Dialog open={selectedCareer !== null} onOpenChange={() => setSelectedCareer(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto dark:bg-zinc-900 dark:border-zinc-800 dark:text-white">
          {selectedCareer && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">{selectedCareer.category}</Badge>
                  <Badge
                    variant={selectedCareer.demandLevel === "High" ? "default" : "secondary"}
                    className={selectedCareer.demandLevel === "High" ? "bg-indigo-600 text-white" : "dark:bg-zinc-800 dark:text-gray-300"}
                  >
                    {selectedCareer.demandLevel} Demand
                  </Badge>
                </div>
                <DialogTitle className="text-2xl dark:text-white">{selectedCareer.title}</DialogTitle>
                <DialogDescription className="text-base dark:text-gray-400">
                  {selectedCareer.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Average Salary</div>
                      <div className="font-semibold text-lg">{selectedCareer.averageSalary}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Job Growth Rate</div>
                      <div className="font-semibold">{selectedCareer.growthRate}</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Work Environment</div>
                      <div className="font-semibold">{selectedCareer.workEnvironment}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Education Required</div>
                      <div className="font-semibold text-sm">{selectedCareer.educationLevel}</div>
                    </div>
                  </div>
                </div>

                {/* Required Skills */}
                <div>
                  <h4 className="font-semibold mb-3">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareer.requiredSkills.map((skill) => (
                      <Badge key={skill} variant="outline" className="px-3 py-1 dark:border-gray-600 dark:text-gray-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {/* Pros */}
                   <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-900/30">
                     <h4 className="font-semibold mb-3 text-lg text-green-700 dark:text-green-400 flex items-center gap-2">
                       <CheckCircle2 className="h-5 w-5" /> Pros
                     </h4>
                     <ul className="space-y-2">
                       {selectedCareer.pros && selectedCareer.pros.map((pro, index) => (
                         <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                           <span className="text-green-500 mt-0.5">•</span>
                           {pro}
                         </li>
                       ))}
                       {!selectedCareer.pros && <li className="text-sm text-gray-500">No specific pros listed.</li>}
                     </ul>
                   </div>

                   {/* Cons */}
                   <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                     <h4 className="font-semibold mb-3 text-lg text-red-700 dark:text-red-400 flex items-center gap-2">
                       <XCircle className="h-5 w-5" /> Cons
                     </h4>
                     <ul className="space-y-2">
                       {selectedCareer.cons && selectedCareer.cons.map((con, index) => (
                         <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                           <span className="text-red-500 mt-0.5">•</span>
                           {con}
                         </li>
                       ))}
                       {!selectedCareer.cons && <li className="text-sm text-gray-500">No specific cons listed.</li>}
                     </ul>
                   </div>
                </div>

                {/* Learning Resources */}
                {resources.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 dark:text-white">
                      <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      Recommended Learning Path
                    </h4>
                    <div className="space-y-2">
                      {resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors dark:border-zinc-700"
                        >
                          <div className="flex-1">
                            <div className="font-medium dark:text-white">{resource.title}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{resource.provider}</div>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <span>⏱️ {resource.duration}</span>
                            <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                              {resource.level}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t dark:border-zinc-800">
                  <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                    Start Learning Path
                  </Button>
                  <Button variant="outline" className="flex-1 dark:border-gray-600 dark:text-white dark:hover:bg-zinc-800">
                    Save Career
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
