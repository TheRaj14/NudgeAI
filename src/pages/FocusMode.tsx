
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Task } from '@/components/TaskCard';

// Component imports
import FocusHeader from '@/components/focus/FocusHeader';
import FocusSessionComplete from '@/components/focus/FocusSessionComplete';
import FocusActiveSession from '@/components/focus/FocusActiveSession';

const FocusMode: React.FC = () => {
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notificationsBlocked, setNotificationsBlocked] = useState(false);
  const [autoStartTimer, setAutoStartTimer] = useState(true);
  const location = useLocation();
  const { toast } = useToast();
  
  // Extract task ID from URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('task');
    
    if (taskId) {
      // Get tasks from local storage
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        const tasks: Task[] = JSON.parse(storedTasks);
        const selectedTask = tasks.find(t => t.id === taskId);
        if (selectedTask) {
          setTask(selectedTask);
        }
      }
    }
  }, [location.search]);
  
  // Auto enter fullscreen mode when component mounts
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const autoFullscreen = queryParams.get('fullscreen') !== 'false'; // Default to true unless explicitly set to false
    
    if (autoFullscreen) {
      // Attempt to enter fullscreen mode automatically
      const enterFullscreen = async () => {
        try {
          if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
            setIsFullscreen(true);
            
            // Also block notifications by default when entering fullscreen
            setNotificationsBlocked(true);
            
            toast({
              title: "Focus mode activated",
              description: "Notifications are blocked and timer has started. Stay focused!",
            });
          }
        } catch (err) {
          console.error("Failed to enter fullscreen mode: ", err);
          toast({
            title: "Could not enter fullscreen",
            description: "Please click the fullscreen button manually to maximize focus.",
            variant: "destructive"
          });
        }
      };
      
      // Small delay before requesting fullscreen to ensure component is fully mounted
      const timer = setTimeout(() => {
        enterFullscreen();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [location.search, toast]);
  
  const handleSessionComplete = () => {
    setSessionComplete(true);
    
    // Exit fullscreen when session completes
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => {
        console.error("Error exiting fullscreen: ", err);
      });
      setIsFullscreen(false);
    }
    
    // If sound is enabled, play a completion sound
    if (soundEnabled) {
      // Play sound (would be implemented with actual audio)
      console.log("Playing completion sound");
    }
    
    // Mark task as complete if one was selected
    if (task) {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        const tasks: Task[] = JSON.parse(storedTasks);
        const updatedTasks = tasks.map(t => 
          t.id === task.id ? { ...t, completed: true } : t
        );
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      }
      
      toast({
        title: "Great work!",
        description: `You've completed your focus session on "${task.title}"`,
      });
    }
  };
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    
    toast({
      title: soundEnabled ? "Sound disabled" : "Sound enabled",
      description: soundEnabled ? "Notification sounds are now off" : "You'll hear sounds when your session finishes",
    });
  };

  // Handle fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        toast({
          title: "Fullscreen error",
          description: `Error attempting to enable fullscreen: ${err.message}`,
          variant: "destructive"
        });
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  }, [toast]);

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Handle notification blocking
  const toggleNotifications = useCallback(() => {
    setNotificationsBlocked(prev => !prev);
    
    if (!notificationsBlocked) {
      // This would be replaced by actual notification blocking code
      // For now, we'll just show a toast to simulate the effect
      toast({
        title: "Notifications blocked",
        description: "All notifications will be blocked during this focus session",
      });
    } else {
      toast({
        title: "Notifications allowed",
        description: "Notifications are now enabled",
      });
    }
  }, [notificationsBlocked, toast]);

  // Toggle auto-start timer option
  const toggleAutoStart = () => {
    setAutoStartTimer(!autoStartTimer);
  };

  // Reset session state
  const resetSession = () => {
    setSessionComplete(false);
  };
  
  return (
    <div className="min-h-screen w-full bg-background flex flex-col overflow-hidden">
      {/* Ambient background with gradient overlay */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 to-secondary/10 dark:from-primary/10 dark:to-background"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="currentColor" fill-opacity="0.05" fill-rule="evenodd"/%3E%3C/svg%3E")',
        }}
      ></div>
      
      {/* Header Component */}
      <FocusHeader 
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        notificationsBlocked={notificationsBlocked}
        toggleNotifications={toggleNotifications}
      />
      
      <main className="flex-1 flex items-center justify-center p-6 pt-24 relative z-10">
        <div className="w-full max-w-lg mx-auto">
          {sessionComplete ? (
            <FocusSessionComplete resetSession={resetSession} />
          ) : (
            <FocusActiveSession
              task={task}
              handleSessionComplete={handleSessionComplete}
              autoStartTimer={autoStartTimer}
              isFullscreen={isFullscreen}
              toggleFullscreen={toggleFullscreen}
              notificationsBlocked={notificationsBlocked}
              toggleNotifications={toggleNotifications}
              soundEnabled={soundEnabled}
              toggleSound={toggleSound}
              toggleAutoStart={toggleAutoStart}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default FocusMode;
