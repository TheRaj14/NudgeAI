
import React from 'react';
import { MoonStar, BellOff, Volume2, Clock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';

interface FocusSettingsProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  notificationsBlocked: boolean;
  toggleNotifications: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  autoStartTimer: boolean;
  toggleAutoStart: () => void;
}

const FocusSettings: React.FC<FocusSettingsProps> = ({
  isFullscreen,
  toggleFullscreen,
  notificationsBlocked,
  toggleNotifications,
  soundEnabled,
  toggleSound,
  autoStartTimer,
  toggleAutoStart,
}) => {
  return (
    <Card className="border-primary/10 bg-card/40 backdrop-blur-md shadow-md">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <MoonStar className="h-4 w-4 text-primary" />
            <span className="text-sm">Fullscreen</span>
            <Switch 
              className="ml-auto"
              checked={isFullscreen}
              onCheckedChange={toggleFullscreen}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <BellOff className="h-4 w-4 text-primary" />
            <span className="text-sm">Block notifications</span>
            <Switch 
              className="ml-auto"
              checked={notificationsBlocked}
              onCheckedChange={toggleNotifications}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4 text-primary" />
            <span className="text-sm">Sound</span>
            <Switch 
              className="ml-auto"
              checked={soundEnabled}
              onCheckedChange={toggleSound}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm">Auto-start</span>
            <Switch 
              className="ml-auto"
              checked={autoStartTimer}
              onCheckedChange={toggleAutoStart}
            />
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Minimize distractions and focus on this task until the timer ends.
        </p>
      </CardContent>
    </Card>
  );
};

export default FocusSettings;
