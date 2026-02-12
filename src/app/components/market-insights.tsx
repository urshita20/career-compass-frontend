import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { ArrowLeft, TrendingUp, DollarSign, Briefcase } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Legend } from "recharts";

interface MarketInsightsProps {
  onBack: () => void;
}

const salaryData = [
  { name: 'Software Engineer', salary: 16.5 },
  { name: 'Data Scientist', salary: 20 },
  { name: 'Product Manager', salary: 23.5 },
  { name: 'UX Designer', salary: 12 },
  { name: 'Digital Marketer', salary: 8 },
  { name: 'Financial Analyst', salary: 10 },
];

const trendData = [
  { year: '2020', tech: 100, health: 100, creative: 100 },
  { year: '2021', tech: 120, health: 110, creative: 105 },
  { year: '2022', tech: 150, health: 125, creative: 110 },
  { year: '2023', tech: 170, health: 135, creative: 120 },
  { year: '2024', tech: 200, health: 150, creative: 135 },
];

export function MarketInsights({ onBack }: MarketInsightsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:text-white px-6 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="mb-6 hover:bg-white/50 dark:hover:bg-zinc-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Market Insights 📈
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Real-time data on the hottest jobs, salaries, and trends. Stay ahead of the curve!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="border-2 shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl dark:text-white">
                <DollarSign className="h-6 w-6 text-green-500" />
                Average Salary by Role (Lakhs/Year)
              </CardTitle>
              <CardDescription className="dark:text-gray-400">Software & Product roles are leading the pack!</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryData} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12, fill: '#888888'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    formatter={(value) => [`₹${value} Lakhs`, 'Avg Salary']}
                  />
                  <Bar dataKey="salary" fill="#8884d8" radius={[0, 4, 4, 0]} barSize={20}>
                    {
                      salaryData.map((entry, index) => (
                        <cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8b5cf6' : '#ec4899'} />
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl dark:text-white">
                <TrendingUp className="h-6 w-6 text-blue-500" />
                Industry Growth Trends
              </CardTitle>
              <CardDescription className="dark:text-gray-400">Tech continues to skyrocket 🚀</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="year" tick={{fontSize: 12, fill: '#888888'}} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="tech" name="Technology" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4}} />
                  <Line type="monotone" dataKey="health" name="Healthcare" stroke="#10b981" strokeWidth={3} dot={{r: 4}} />
                  <Line type="monotone" dataKey="creative" name="Creative" stroke="#f43f5e" strokeWidth={3} dot={{r: 4}} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <Card className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 border-orange-200 dark:border-orange-800">
             <CardHeader>
               <Badge className="w-fit mb-2 bg-orange-500 hover:bg-orange-600">Hot Skill</Badge>
               <CardTitle className="text-xl dark:text-white">AI & Machine Learning</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-gray-700 dark:text-gray-300">Demand has grown by 450% in the last 2 years. Essential for future-proofing your career.</p>
             </CardContent>
           </Card>

           <Card className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-200 dark:border-blue-800">
             <CardHeader>
               <Badge className="w-fit mb-2 bg-blue-500 hover:bg-blue-600">Emerging Field</Badge>
               <CardTitle className="text-xl dark:text-white">Sustainability Tech</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-gray-700 dark:text-gray-300">Companies are investing heavily in green tech. Great for engineers and scientists.</p>
             </CardContent>
           </Card>

           <Card className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-200 dark:border-purple-800">
             <CardHeader>
               <Badge className="w-fit mb-2 bg-purple-500 hover:bg-purple-600">Remote Friendly</Badge>
               <CardTitle className="text-xl dark:text-white">Digital Content</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-gray-700 dark:text-gray-300">The creator economy is booming. Brands need storytellers more than ever.</p>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
