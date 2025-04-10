
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AppUsage } from '@/types/wellbeing';
import { ChevronRight } from 'lucide-react';

interface AppUsageCardProps {
  app: AppUsage;
  formatTime: (minutes: number) => string;
}

const AppUsageCard: React.FC<AppUsageCardProps> = ({ app, formatTime }) => {
  return (
    <Card className="bg-black border-gray-800 mb-4">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center mr-4 text-white font-bold"
            style={{ backgroundColor: app.color || '#4ade80' }}
          >
            {app.icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{app.name}</h3>
            <div className="mt-1">
              <div className="w-16 h-1.5 rounded-full" style={{ backgroundColor: app.color || '#4ade80' }}></div>
              <span className="text-sm text-gray-400 flex items-center mt-1">
                {app.category === 'distracting' ? 'Distracting' : 'Neutral'} 
                <ChevronRight className="h-4 w-4 ml-1" />
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-xl ${app.category === 'distracting' ? 'text-red-400' : 'text-green-400'}`}>
            {formatTime(app.timeSpent)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppUsageCard;
