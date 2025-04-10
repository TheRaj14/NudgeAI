
import React from 'react';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate?: string;
  estimatedTime?: number; // in minutes
}

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
  const priorityColors = {
    high: 'bg-red-50 text-red-600 border-red-200',
    medium: 'bg-amber-50 text-amber-600 border-amber-200',
    low: 'bg-green-50 text-green-600 border-green-200',
  };
  
  const priorityBadge = (
    <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]} transition-all`}>
      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
    </span>
  );
  
  return (
    <div 
      className={`relative rounded-xl border p-4 transition-all duration-300 hover:shadow-md animate-scale ${
        task.completed ? 'bg-muted/50 opacity-70' : 'bg-card'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 mr-4">
          <div className="flex items-center space-x-2 mb-1">
            {priorityBadge}
            {task.estimatedTime && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{task.estimatedTime} min</span>
              </div>
            )}
          </div>
          
          <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {task.description}
            </p>
          )}
          
          <div className="mt-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs rounded-full hover:bg-primary/10 hover:text-primary"
              onClick={() => onComplete(task.id)}
            >
              <CheckCircle className={`w-4 h-4 mr-1 ${task.completed ? 'text-primary' : ''}`} />
              {task.completed ? 'Completed' : 'Mark Complete'}
            </Button>
            
            {!task.completed && (
              <Link to={`/focus?task=${task.id}`}>
                <Button variant="ghost" size="sm" className="text-xs rounded-full">
                  <span className="mr-1">Focus</span>
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
