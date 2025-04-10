
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Cloud, Sun } from 'lucide-react';

interface TimeOfflineCardProps {
  timeOffline: number;
  formatTime: (minutes: number) => string;
}

const TimeOfflineCard: React.FC<TimeOfflineCardProps> = ({ timeOffline, formatTime }) => {
  // Calculate percentage of day
  const percentageOfDay = Math.round((timeOffline / (24 * 60)) * 100);

  return (
    <Card className="bg-black border-gray-800 mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-green-900 flex items-center justify-center mr-3">
              <Cloud className="h-5 w-5 text-green-300" />
            </div>
            <h3 className="text-xl font-semibold text-white">Time Offline</h3>
          </div>
          <span className="text-xl text-green-400">{formatTime(timeOffline)}</span>
        </div>
        <p className="text-gray-400 mt-1">{percentageOfDay}% of your day</p>
      </CardContent>
    </Card>
  );
};

export default TimeOfflineCard;
