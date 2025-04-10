
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX, Maximize2, Minimize2, BellOff, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { useToast } from '@/hooks/use-toast';

interface FocusHeaderProps {
  soundEnabled: boolean;
  toggleSound: () => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  notificationsBlocked: boolean;
  toggleNotifications: () => void;
}

const FocusHeader: React.FC<FocusHeaderProps> = ({
  soundEnabled,
  toggleSound,
  isFullscreen,
  toggleFullscreen,
  notificationsBlocked,
  toggleNotifications,
}) => {
  return (
    <header className="bg-background/60 backdrop-blur-md border-b border-border/40 fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Exit Focus Mode</span>
        </Link>
        
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleNotifications}
            className="rounded-full"
            title={notificationsBlocked ? "Enable notifications" : "Block notifications"}
          >
            {notificationsBlocked ? (
              <BellOff className="h-4 w-4" />
            ) : (
              <Bell className="h-4 w-4" />
            )}
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full" 
            onClick={toggleSound}
            title={soundEnabled ? "Disable sound" : "Enable sound"}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full" 
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          
          <ThemeToggle size="icon" variant="ghost" />
        </div>
      </div>
    </header>
  );
};

export default FocusHeader;
