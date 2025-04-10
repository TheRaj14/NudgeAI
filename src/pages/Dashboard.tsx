
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import TaskCard, { Task } from '@/components/TaskCard';
import TaskInput from '@/components/TaskInput';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, ArrowRight, CheckCircle, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data to simulate tasks
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finish the draft and send for review',
    priority: 'high',
    completed: false,
    estimatedTime: 45,
  },
  {
    id: '2',
    title: 'Research market trends',
    description: 'Analyze competitors and identify opportunities',
    priority: 'medium',
    completed: false,
    estimatedTime: 30,
  },
  {
    id: '3',
    title: 'Schedule team meeting',
    description: 'Discuss roadmap and assignments',
    priority: 'low',
    completed: true,
    estimatedTime: 15,
  },
];

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading tasks from local storage or API
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(initialTasks);
    }
  }, []);
  
  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Dispatch custom event to notify other components about task updates
    window.dispatchEvent(new Event('tasksUpdated'));
  }, [tasks]);
  
  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false,
    };
    
    setTasks([task, ...tasks]);
    
    toast({
      title: "Task added",
      description: "Your new task has been successfully added.",
    });
  };
  
  const handleCompleteTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    
    const taskToUpdate = tasks.find(task => task.id === id);
    
    if (taskToUpdate) {
      if (!taskToUpdate.completed) {
        toast({
          title: "Task completed",
          description: `You've completed "${taskToUpdate.title}"`,
        });
      }
    }
  };
  
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'pending') return !task.completed;
    if (activeFilter === 'completed') return task.completed;
    return true;
  });
  
  // Get the highest priority incomplete task
  const topTask = tasks.find(task => !task.completed && task.priority === 'high') || 
                tasks.find(task => !task.completed);
  
  // Count tasks by status
  const pendingCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;
  
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="pt-20 pb-16">
        <div className="container px-4 md:px-6 mx-auto">
          {/* Header section */}
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
            <p className="text-muted-foreground mb-6">Track your focus and get things done</p>
          </div>
          
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slide-up">
            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">Tasks Pending</h3>
                <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center">
                  <PlusCircle className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold mt-2">{pendingCount}</p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">Completed</h3>
                <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold mt-2">{completedCount}</p>
            </div>
            
            <div className="md:col-span-2 bg-card rounded-xl p-6 border shadow-sm">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Time to focus on</h3>
              {topTask ? (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-50 text-red-600 border-red-200 mb-2">
                      Top Priority
                    </span>
                    <h4 className="font-medium">{topTask.title}</h4>
                  </div>
                  <Link to={`/focus?task=${topTask.id}`}>
                    <Button className="button-shine">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Focus Now</span>
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-2">No pending tasks</p>
                  <Button variant="outline" onClick={() => document.getElementById('task-input')?.focus()}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Add a new task</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Task input */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }} id="task-input">
            <TaskInput onAddTask={handleAddTask} />
          </div>
          
          {/* Task list */}
          <div className="bg-card rounded-xl border shadow-sm p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Your Tasks</h2>
              <Tabs defaultValue="all" className="w-[300px]" onValueChange={(value) => setActiveFilter(value as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onComplete={handleCompleteTask} 
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No tasks found</p>
                  <Button variant="outline" onClick={() => document.getElementById('task-input')?.focus()}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Add a new task</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
