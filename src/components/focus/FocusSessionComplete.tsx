
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface FocusSessionCompleteProps {
  resetSession: () => void;
}

const FocusSessionComplete: React.FC<FocusSessionCompleteProps> = ({ resetSession }) => {
  return (
    <div className="text-center animate-scale">
      <Card className="p-8 border-primary/10 bg-card/40 backdrop-blur-md shadow-xl">
        <CardContent className="p-0 flex flex-col items-center">
          <div className="mb-8 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-14 w-14 text-primary" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Session Complete!</h1>
          <p className="text-muted-foreground mb-8">
            Great job staying focused. Take a short break before starting your next task.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="relative overflow-hidden group" onClick={resetSession}>
              <span className="relative z-10">Start Another Session</span>
              <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Button>
            <Link to="/dashboard">
              <Button variant="outline" className="relative overflow-hidden group">
                <span className="relative z-10">Return to Dashboard</span>
                <span className="absolute inset-0 bg-accent/40 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FocusSessionComplete;
