
import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Task } from './TaskCard';
import { useToast } from '@/hooks/use-toast';

interface FocusTimerProps {
  task?: Task;
  defaultDuration?: number; // in minutes
  onComplete?: () => void;
  autoStart?: boolean; // New prop to enable auto-start
}

const FocusTimer: React.FC<FocusTimerProps> = ({ 
  task, 
  defaultDuration = 25,
  onComplete,
  autoStart = false
}) => {
  const initialSeconds = (task?.estimatedTime || defaultDuration) * 60;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(autoStart); // Use autoStart prop to initialize state
  const [progress, setProgress] = useState(100);
  const { toast } = useToast();
  
  // Format time as mm:ss
  const formatTime = useCallback(() => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, [seconds]);
  
  // Calculate circle progress
  useEffect(() => {
    setProgress((seconds / initialSeconds) * 100);
  }, [seconds, initialSeconds]);
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (isActive && seconds === 0) {
      setIsActive(false);
      
      // Notify session completion
      toast({
        title: "Focus session complete!",
        description: "Great job staying focused. Take a break before starting again.",
      });
      
      if (onComplete) {
        onComplete();
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, toast, onComplete]);

  // Effect to handle autoStart
  useEffect(() => {
    // Update isActive state when autoStart prop changes
    setIsActive(autoStart);
  }, [autoStart]);
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="circle-progress mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="text-muted/20 dark:text-muted/10"
            cx="50"
            cy="50"
            r="45"
            strokeWidth="6"
            fill="none"
            stroke="currentColor"
          />
          {/* Progress circle */}
          <circle
            className="text-primary transition-all duration-1000"
            cx="50"
            cy="50"
            r="45"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            stroke="currentColor"
            style={{
              strokeDasharray: 283,
              strokeDashoffset: 283 - (283 * progress) / 100,
            }}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="text-center z-10">
          <div className="text-5xl font-extralight tracking-widest">{formatTime()}</div>
          {task && (
            <div className="mt-2 text-sm font-medium text-muted-foreground">
              {task.title}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 border-primary/30 hover:border-primary/50 hover:bg-primary/5"
          onClick={resetTimer}
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
        
        <Button
          variant="default"
          size="icon"
          className={`rounded-full h-16 w-16 shadow-md transition-all duration-300 
            ${isActive 
              ? "bg-red-500 hover:bg-red-600" 
              : "bg-primary hover:bg-primary/90"
            }`}
          onClick={toggleTimer}
        >
          {isActive ? (
            <Pause className="h-7 w-7" />
          ) : (
            <Play className="h-7 w-7 ml-1" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default FocusTimer;
