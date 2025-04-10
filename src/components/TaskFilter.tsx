
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { CheckCircle2, Clock, Filter, CheckIcon } from 'lucide-react';

interface TaskFilterProps {
  filterBy: 'all' | 'pending' | 'completed';
  setFilterBy: (filter: 'all' | 'pending' | 'completed') => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ filterBy, setFilterBy }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9">
          <Filter className="h-4 w-4 mr-2" />
          <span>Status: {filterBy.charAt(0).toUpperCase() + filterBy.slice(1)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => setFilterBy('all')}
          className="flex items-center justify-between"
        >
          All
          {filterBy === 'all' && <CheckIcon className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setFilterBy('pending')}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-amber-500" />
            Pending
          </div>
          {filterBy === 'pending' && <CheckIcon className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setFilterBy('completed')}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
            Completed
          </div>
          {filterBy === 'completed' && <CheckIcon className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskFilter;
