
import React from 'react';
import { DailyUsage } from '@/types/wellbeing';
import { Card, CardContent } from '@/components/ui/card';

interface WellbeingSummaryProps {
  dailyData: DailyUsage;
  formatTime: (minutes: number) => string;
}

const WellbeingSummary: React.FC<WellbeingSummaryProps> = ({ dailyData, formatTime }) => {
  // Get top 3 most used apps
  const topApps = [...dailyData.appUsage]
    .sort((a, b) => b.timeSpent - a.timeSpent)
    .slice(0, 3);

  return (
    <div className="mb-8">
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold text-green-300 mb-2">
          {formatTime(dailyData.totalScreenTime)}
        </h1>
        <p className="text-gray-400 uppercase tracking-widest text-sm">
          SCREEN TIME TODAY
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <h3 className="text-sm text-gray-400 uppercase mb-3">MOST USED</h3>
          <div className="flex justify-center space-x-3">
            {topApps.map(app => (
              <div 
                key={app.id} 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: app.color }}
              >
                <span className="text-white text-xs">{app.icon}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-sm text-gray-400 uppercase mb-3">FOCUS SCORE</h3>
          <p className="text-white text-2xl font-semibold">{dailyData.focusScore}%</p>
        </div>

        <div className="text-center">
          <h3 className="text-sm text-gray-400 uppercase mb-3">PICKUPS</h3>
          <p className="text-white text-2xl font-semibold">{dailyData.pickups}</p>
        </div>
      </div>
    </div>
  );
};

export default WellbeingSummary;
