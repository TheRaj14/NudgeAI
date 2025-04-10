
import { useState, useEffect } from 'react';
import { Task } from '@/components/TaskCard';
import { useToast } from '@/hooks/use-toast';

export const useTaskController = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [sortBy, setSortBy] = useState<'priority' | 'added' | 'estimated'>('priority');
  const [filterBy, setFilterBy] = useState<'all' | 'pending' | 'completed'>('all');
  const { toast } = useToast();
  
  // Load tasks from local storage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  
  // Save tasks to local storage
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
  
  const handleEditTask = () => {
    if (!editingTask) return;
    
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? editingTask : task
    ));
    
    setShowEditDialog(false);
    setEditingTask(null);
    
    toast({
      title: "Task updated",
      description: "Your task has been successfully updated.",
    });
  };
  
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    
    toast({
      title: "Task deleted",
      description: "Your task has been successfully deleted.",
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
  
  // Filter and sort tasks
  const processedTasks = [...tasks]
    .filter(task => {
      if (filterBy === 'pending') return !task.completed;
      if (filterBy === 'completed') return task.completed;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityValue = { high: 3, medium: 2, low: 1 };
        return (priorityValue[b.priority] || 0) - (priorityValue[a.priority] || 0);
      }
      if (sortBy === 'estimated') {
        return (b.estimatedTime || 0) - (a.estimatedTime || 0);
      }
      // Default to sort by id (as a proxy for date added)
      return parseInt(b.id) - parseInt(a.id);
    });

  return {
    tasks: processedTasks,
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
  };
};
