
import React from 'react';
import { Focus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import FocusTimer from '@/components/FocusTimer';
import FocusSettings from './FocusSettings';
import { Task } from '@/components/TaskCard';

interface FocusActiveSessionProps {
  task?: Task;
  handleSessionComplete: () => void;
  autoStartTimer: boolean;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  notificationsBlocked: boolean;
  toggleNotifications: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  toggleAutoStart: () => void;
}

const FocusActiveSession: React.FC<FocusActiveSessionProps> = ({
  task,
  handleSessionComplete,
  autoStartTimer,
  isFullscreen,
  toggleFullscreen,
  notificationsBlocked,
  toggleNotifications,
  soundEnabled,
  toggleSound,
  toggleAutoStart,
}) => {
  return (
    <div className="text-center animate-slide-up space-y-6">
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-center">
          <Focus className="h-7 w-7 text-primary mr-2" />
          <h1 className="text-3xl font-bold">Focus Mode</h1>
        </div>
        <p className="text-muted-foreground">
          {task 
            ? `Focusing on: ${task.title}`
            : 'Stay focused on the task at hand'
          }
        </p>
      </div>
      
      <Card className="p-10 border-primary/10 bg-card/40 backdrop-blur-md shadow-lg">
        <CardContent className="p-0">
          <FocusTimer 
            task={task} 
            defaultDuration={25} 
            onComplete={handleSessionComplete}
            autoStart={autoStartTimer}
          />
        </CardContent>
      </Card>
      
      <FocusSettings
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        notificationsBlocked={notificationsBlocked}
        toggleNotifications={toggleNotifications}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        autoStartTimer={autoStartTimer}
        toggleAutoStart={toggleAutoStart}
      />
    </div>
  );
};

export default FocusActiveSession;
