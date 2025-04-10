
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Task } from '@/components/TaskCard';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';
import TaskFilter from '@/components/TaskFilter';
import TaskSort from '@/components/TaskSort';
import TaskEditDialog from '@/components/TaskEditDialog';
import { useTaskController } from '@/hooks/useTaskController';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout, PlusCircle, ListFilter, CheckCircle2, Clock, CalendarDays, Kanban } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ThemeToggle from '@/components/ThemeToggle';

const Tasks: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    tasks,
    editingTask,
    setEditingTask,
    showEditDialog,
    setShowEditDialog,
    sortBy,
    setSortBy,
    filterBy,
    setFilterBy,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleCompleteTask
  } = useTaskController();
  
  const filteredTasks = tasks.filter(task => {
    if (filterBy === 'all') return true;
    if (filterBy === 'pending') return !task.completed;
    if (filterBy === 'completed') return task.completed;
    return true;
  });
  
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sortBy === 'added') {
      // For simplicity, using ID as a proxy for creation time
      return a.id.localeCompare(b.id);
    }
    if (sortBy === 'estimated') {
      const aTime = a.estimatedTime || 0;
      const bTime = b.estimatedTime || 0;
      return bTime - aTime;
    }
    return 0;
  });
  
  // Group tasks by status for Kanban view
  const taskGroups = {
    todo: sortedTasks.filter(task => !task.completed && task.priority !== 'high'),
    inProgress: sortedTasks.filter(task => !task.completed && task.priority === 'high'),
    completed: sortedTasks.filter(task => task.completed)
  };
  
  const handleCloseEditDialog = () => {
    setShowEditDialog(false);
    setEditingTask(null);
  };
  
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Task Management</h1>
          <p className="text-muted-foreground">Organize, track, and complete your tasks efficiently</p>
        </div>
        <ThemeToggle />
      </header>
      
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="w-full md:w-auto">
          <TaskInput onAddTask={handleAddTask} />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="outline" 
            className={`${viewMode === 'list' ? 'bg-secondary' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <Layout className="h-4 w-4 mr-2" />
            List
          </Button>
          <Button 
            variant="outline" 
            className={`${viewMode === 'kanban' ? 'bg-secondary' : ''}`}
            onClick={() => setViewMode('kanban')}
          >
            <Kanban className="h-4 w-4 mr-2" />
            Kanban
          </Button>
          <TaskFilter filterBy={filterBy} setFilterBy={setFilterBy} />
          <TaskSort sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>
      
      {viewMode === 'list' ? (
        <div className="mb-8">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading tasks...</p>
            </div>
          ) : (
            <TaskList 
              tasks={sortedTasks} 
              onComplete={handleCompleteTask}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
            />
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* To Do Column */}
          <Card>
            <CardHeader className="bg-muted/50 pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Clock className="h-4 w-4 mr-2 text-orange-500" />
                To do
                <span className="ml-2 bg-muted rounded-full px-2 py-0.5 text-xs">
                  {taskGroups.todo.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              {taskGroups.todo.length === 0 ? (
                <p className="text-muted-foreground text-center py-8 text-sm">No tasks to do</p>
              ) : (
                <div className="space-y-3">
                  {taskGroups.todo.map(task => (
                    <TaskList
                      key={`todo-${task.id}`}
                      tasks={[task]}
                      onComplete={handleCompleteTask}
                      onEdit={setEditingTask}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* In Progress Column */}
          <Card>
            <CardHeader className="bg-muted/50 pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <ListFilter className="h-4 w-4 mr-2 text-amber-500" />
                In progress
                <span className="ml-2 bg-muted rounded-full px-2 py-0.5 text-xs">
                  {taskGroups.inProgress.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              {taskGroups.inProgress.length === 0 ? (
                <p className="text-muted-foreground text-center py-8 text-sm">No tasks in progress</p>
              ) : (
                <div className="space-y-3">
                  {taskGroups.inProgress.map(task => (
                    <TaskList
                      key={`inprogress-${task.id}`}
                      tasks={[task]}
                      onComplete={handleCompleteTask}
                      onEdit={setEditingTask}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Completed Column */}
          <Card>
            <CardHeader className="bg-muted/50 pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                Completed
                <span className="ml-2 bg-muted rounded-full px-2 py-0.5 text-xs">
                  {taskGroups.completed.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              {taskGroups.completed.length === 0 ? (
                <p className="text-muted-foreground text-center py-8 text-sm">No completed tasks</p>
              ) : (
                <div className="space-y-3">
                  {taskGroups.completed.map(task => (
                    <TaskList
                      key={`completed-${task.id}`}
                      tasks={[task]}
                      onComplete={handleCompleteTask}
                      onEdit={setEditingTask}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Edit Task Dialog */}
      {showEditDialog && editingTask && (
        <TaskEditDialog
          showDialog={showEditDialog}
          setShowDialog={setShowEditDialog}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          onSave={handleEditTask}
        />
      )}
    </div>
  );
};

export default Tasks;
