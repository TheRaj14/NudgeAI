
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
import { ArrowUpDown, Clock, Flame, CalendarDays, CheckIcon } from 'lucide-react';

interface TaskSortProps {
  sortBy: 'priority' | 'added' | 'estimated';
  setSortBy: (sort: 'priority' | 'added' | 'estimated') => void;
}

const TaskSort: React.FC<TaskSortProps> = ({ sortBy, setSortBy }) => {
  const getSortLabel = (sort: string) => {
    switch (sort) {
      case 'priority': return 'Priority';
      case 'added': return 'Date Added';
      case 'estimated': return 'Estimated Time';
      default: return sort.charAt(0).toUpperCase() + sort.slice(1);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9">
          <ArrowUpDown className="h-4 w-4 mr-2" />
          <span>Sort: {getSortLabel(sortBy)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Sort tasks by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => setSortBy('priority')}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <Flame className="h-4 w-4 mr-2 text-red-500" />
            Priority
          </div>
          {sortBy === 'priority' && <CheckIcon className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setSortBy('added')}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 text-blue-500" />
            Date Added
          </div>
          {sortBy === 'added' && <CheckIcon className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setSortBy('estimated')}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-purple-500" />
            Estimated Time
          </div>
          {sortBy === 'estimated' && <CheckIcon className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskSort;
