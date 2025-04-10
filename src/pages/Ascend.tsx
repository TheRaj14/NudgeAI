
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import ProgressChart, { DailyProgress, WeeklyProgress } from '@/components/ProgressChart';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { ArrowUp, Calendar, Clock, Target } from 'lucide-react';

// Mock data for charts
const dailyProgressData: DailyProgress[] = [
  { day: 'Mon', tasks: 4, focusMinutes: 120 },
  { day: 'Tue', tasks: 6, focusMinutes: 150 },
  { day: 'Wed', tasks: 3, focusMinutes: 90 },
  { day: 'Thu', tasks: 7, focusMinutes: 180 },
  { day: 'Fri', tasks: 5, focusMinutes: 140 },
  { day: 'Sat', tasks: 2, focusMinutes: 60 },
  { day: 'Sun', tasks: 1, focusMinutes: 30 },
];

const weeklyProgressData: WeeklyProgress[] = [
  { week: 'Week 1', tasks: 15, focusHours: 10 },
  { week: 'Week 2', tasks: 20, focusHours: 12 },
  { week: 'Week 3', tasks: 25, focusHours: 15 },
  { week: 'Week 4', tasks: 30, focusHours: 20 },
];

const Ascend: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly'>('daily');
  
  // Calculate total stats
  const totalTasks = dailyProgressData.reduce((acc, day) => acc + day.tasks, 0);
  const totalFocusMinutes = dailyProgressData.reduce((acc, day) => acc + day.focusMinutes, 0);
  const averageDailyFocus = Math.round(totalFocusMinutes / dailyProgressData.length);
  
  // Find the day with most focus time
  const mostProductiveDay = [...dailyProgressData].sort((a, b) => b.focusMinutes - a.focusMinutes)[0];
  
  // Calculate progress compared to previous period (mock data)
  const taskProgress = 15; // Percentage increase in tasks
  const focusProgress = 22; // Percentage increase in focus time
  
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="pt-20 pb-16">
        <div className="container px-4 md:px-6 mx-auto">
          {/* Header section */}
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight mb-1">Ascend</h1>
            <p className="text-muted-foreground mb-6">Track your progress and grow over time</p>
          </div>
          
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slide-up">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Total Tasks</h3>
                <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center">
                  <Target className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold">{totalTasks}</p>
              <div className="flex items-center mt-2 text-xs text-green-600">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>{taskProgress}% from last week</span>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Focus Minutes</h3>
                <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold">{totalFocusMinutes}</p>
              <div className="flex items-center mt-2 text-xs text-green-600">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>{focusProgress}% from last week</span>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Daily Average</h3>
                <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold">{averageDailyFocus} min</p>
              <p className="mt-2 text-xs text-muted-foreground">Average daily focus time</p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Most Productive</h3>
                <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center">
                  <Target className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold">{mostProductiveDay.day}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {mostProductiveDay.focusMinutes} minutes, {mostProductiveDay.tasks} tasks
              </p>
            </Card>
          </div>
          
          {/* Progress charts */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Progress Overview</h2>
                <Tabs 
                  defaultValue="daily" 
                  className="w-[200px]"
                  onValueChange={(value) => setTimeframe(value as 'daily' | 'weekly')}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="h-[350px]">
                {timeframe === 'daily' ? (
                  <ProgressChart data={dailyProgressData} type="daily" />
                ) : (
                  <ProgressChart data={weeklyProgressData} type="weekly" />
                )}
              </div>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Task Completion</h2>
              <div className="h-[300px]">
                <ProgressChart 
                  data={dailyProgressData} 
                  type="daily" 
                  chartType="bar"
                />
              </div>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Productivity Insights</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Your Strengths</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-green-50 text-green-600 rounded-full p-1 mr-2 mt-0.5">
                        <ArrowUp className="h-3 w-3" />
                      </div>
                      <span>Consistent morning focus sessions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-50 text-green-600 rounded-full p-1 mr-2 mt-0.5">
                        <ArrowUp className="h-3 w-3" />
                      </div>
                      <span>Completing high-priority tasks first</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-50 text-green-600 rounded-full p-1 mr-2 mt-0.5">
                        <ArrowUp className="h-3 w-3" />
                      </div>
                      <span>Steady improvement in focus duration</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Areas to Improve</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-amber-50 text-amber-600 rounded-full p-1 mr-2 mt-0.5">
                        <ArrowUp className="h-3 w-3 rotate-180" />
                      </div>
                      <span>Weekend productivity could be higher</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-amber-50 text-amber-600 rounded-full p-1 mr-2 mt-0.5">
                        <ArrowUp className="h-3 w-3 rotate-180" />
                      </div>
                      <span>More consistent daily task completion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ascend;
