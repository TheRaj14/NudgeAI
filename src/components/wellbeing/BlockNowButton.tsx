
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BlockNowButton: React.FC = () => {
  const { toast } = useToast();

  const handleBlockNow = () => {
    toast({
      title: "Focus Mode Activated",
      description: "Distracting apps have been blocked for the next 30 minutes.",
    });
  };

  return (
    <Button 
      onClick={handleBlockNow}
      className="w-full py-6 rounded-full text-lg font-semibold bg-gradient-to-r from-green-300 to-blue-300 hover:from-green-400 hover:to-blue-400 text-black"
    >
      <Play className="mr-2 h-5 w-5" /> Block Now
    </Button>
  );
};

export default BlockNowButton;
