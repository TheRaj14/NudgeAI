
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from './TaskCard';

interface TaskInputProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [estimatedTime, setEstimatedTime] = useState<number | undefined>(undefined);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    onAddTask({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      estimatedTime,
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setEstimatedTime(undefined);
    setIsExpanded(false);
  };
  
  return (
    <div className="w-full bg-card rounded-xl border p-4 transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1"
            onFocus={() => setIsExpanded(true)}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="ml-2"
            disabled={!title.trim()}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        {isExpanded && (
          <div className="mt-4 space-y-4 animate-slide-down">
            <Textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[100px]"
            />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="text-sm font-medium mb-1 block">Priority</label>
                <Select 
                  value={priority} 
                  onValueChange={(value) => setPriority(value as 'high' | 'medium' | 'low')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-1/2">
                <label className="text-sm font-medium mb-1 block">Estimated Time (minutes)</label>
                <Input
                  type="number"
                  placeholder="25"
                  value={estimatedTime === undefined ? '' : estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value ? Number(e.target.value) : undefined)}
                  min="1"
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setIsExpanded(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={!title.trim()}
              >
                Add Task
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TaskInput;
