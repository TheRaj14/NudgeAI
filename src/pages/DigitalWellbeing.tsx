
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useWellbeingData } from '@/hooks/useWellbeingData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, Clock, ChevronDown, Home, Plus, User } from 'lucide-react';
import AppUsageCard from '@/components/wellbeing/AppUsageCard';
import TimeOfflineCard from '@/components/wellbeing/TimeOfflineCard';
import UsageChart from '@/components/wellbeing/UsageChart';
import WellbeingSummary from '@/components/wellbeing/WellbeingSummary';
import BlockNowButton from '@/components/wellbeing/BlockNowButton';
import ThemeToggle from '@/components/ThemeToggle';
import { Link } from 'react-router-dom';

const DigitalWellbeing: React.FC = () => {
  const { user } = useAuth();
  const { dailyData, isLoading, formatTime } = useWellbeingData();
  const [activeTab, setActiveTab] = useState('today');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <p className="text-gray-400">Loading your digital wellbeing data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold neon-text">NUDGE</h1>
            <div className="ml-3 text-green-400 flex items-center">
              Today <ChevronDown className="h-4 w-4 ml-1" />
            </div>
          </div>
          <ThemeToggle variant="ghost" className="text-white" />
        </header>

        <Tabs defaultValue="today" className="mb-6">
          <TabsList className="grid grid-cols-2 bg-gray-900 border border-gray-800">
            <TabsTrigger value="today" className="data-[state=active]:bg-gray-800 data-[state=active]:text-green-400">Today</TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-gray-800 data-[state=active]:text-green-400">Weekly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="mt-6">
            <div className="relative bg-black pb-6">
              <div className="absolute top-0 left-0 w-full h-full flex justify-center">
                <div className="w-48 h-48 opacity-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 blur-3xl"></div>
              </div>
              
              <WellbeingSummary dailyData={dailyData} formatTime={formatTime} />
              
              <UsageChart dailyData={dailyData} />
              
              <TimeOfflineCard 
                timeOffline={dailyData.timeOffline} 
                formatTime={formatTime} 
              />
              
              <h2 className="text-xl font-semibold mb-4 text-white">App Usage</h2>
              
              {dailyData.appUsage.map(app => (
                <AppUsageCard 
                  key={app.id} 
                  app={app} 
                  formatTime={formatTime} 
                />
              ))}
              
              <div className="mt-8 mb-24">
                <BlockNowButton />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="weekly">
            <div className="text-center py-12">
              <Clock className="h-12 w-12 mx-auto text-gray-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-300 mb-2">Weekly Statistics</h2>
              <p className="text-gray-500">Weekly usage data coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 py-4">
        <div className="container mx-auto px-4 max-w-md">
          <div className="flex justify-around items-center">
            <Link to="/dashboard">
              <Button variant="ghost" className="flex flex-col items-center text-white hover:text-green-400">
                <Home className="h-6 w-6 mb-1" />
                <span className="text-xs">Home</span>
              </Button>
            </Link>
            
            <Button variant="ghost" className="flex flex-col items-center text-gray-500 hover:text-green-400">
              <div className="h-6 w-6 flex items-center justify-center mb-1">
                <div className="h-5 w-5 bg-gray-800 flex items-center justify-center rounded">
                  <Plus className="h-3 w-3" />
                </div>
              </div>
              <span className="text-xs">Blocks</span>
            </Button>
            
            <Link to="/profile">
              <Button variant="ghost" className="flex flex-col items-center text-gray-500 hover:text-green-400">
                <User className="h-6 w-6 mb-1" />
                <span className="text-xs">Profile</span>
              </Button>
            </Link>
          </div>
          
          {/* Progress Indicator */}
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto mt-3"></div>
        </div>
      </div>
    </div>
  );
};

export default DigitalWellbeing;
