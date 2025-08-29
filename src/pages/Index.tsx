import { useState, useEffect } from 'react';
import { Filter, Search, Plus, LayoutGrid, List } from 'lucide-react';
import { GameHeader } from '../components/GameHeader';
import { QuickStats } from '../components/QuickStats';
import { TaskCard } from '../components/TaskCard';
import { ProjectCard } from '../components/ProjectCard';
import { AchievementPanel } from '../components/AchievementPanel';
import { AIInsightCard } from '../components/AIInsightCard';
import { CreateTaskDialog } from '../components/CreateTaskDialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Task, Project, Achievement, UserStats, AIInsight } from '../types';
import { 
  generateSampleTasks, 
  generateSampleProjects, 
  generateSampleAchievements, 
  generateSampleUserStats,
  generateSampleAIInsights 
} from '../utils/sampleData';
import { useToast } from '../hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  
  // State Management with Local Storage
  const [tasks, setTasks] = useLocalStorage<Task[]>('cyberpunk-tasks', generateSampleTasks());
  const [projects, setProjects] = useLocalStorage<Project[]>('cyberpunk-projects', generateSampleProjects());
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('cyberpunk-achievements', generateSampleAchievements());
  const [userStats, setUserStats] = useLocalStorage<UserStats>('cyberpunk-stats', generateSampleUserStats());
  const [aiInsights, setAIInsights] = useLocalStorage<AIInsight[]>('cyberpunk-insights', generateSampleAIInsights());
  
  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentTime, setCurrentTime] = useState('');

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Task Management Functions
  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setTasks(prev => [newTask, ...prev]);
    
    // Update XP and stats
    setUserStats(prev => ({
      ...prev,
      xp: prev.xp + 50,
    }));

    toast({
      title: "Task Created! 🎯",
      description: `"${newTask.title}" has been added to your task list. +50 XP earned!`,
    });
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const isCompleting = !task.completed;
        const updatedTask = {
          ...task,
          completed: isCompleting,
          updatedAt: new Date(),
        };

        // Update stats when completing task
        if (isCompleting) {
          setUserStats(prevStats => {
            const newXP = prevStats.xp + (task.priority === 'high' ? 100 : task.priority === 'medium' ? 75 : 50);
            const newTasksCompleted = prevStats.tasksCompleted + 1;
            const newLevel = Math.floor(newXP / 1000) + 1;
            
            return {
              ...prevStats,
              xp: newXP,
              tasksCompleted: newTasksCompleted,
              level: newLevel > prevStats.level ? newLevel : prevStats.level,
              currentStreak: prevStats.currentStreak + 1,
            };
          });

          toast({
            title: "Task Completed! 🎉",
            description: `Great work! You earned ${task.priority === 'high' ? 100 : task.priority === 'medium' ? 75 : 50} XP!`,
          });
        }

        return updatedTask;
      }
      return task;
    }));
  };

  const handleEditTask = (task: Task) => {
    // For now, just show a toast. In a full implementation, this would open an edit dialog
    toast({
      title: "Edit Feature",
      description: "Task editing will be available in the next update!",
    });
  };

  const handleDeleteTask = (taskId: string) => {
    const taskToDelete = tasks.find(t => t.id === taskId);
    setTasks(prev => prev.filter(task => task.id !== taskId));
    
    toast({
      title: "Task Deleted",
      description: `"${taskToDelete?.title}" has been removed from your task list.`,
      variant: "destructive",
    });
  };

  const handleDismissInsight = (insightId: string) => {
    setAIInsights(prev => prev.map(insight => 
      insight.id === insightId 
        ? { ...insight, dismissed: true }
        : insight
    ));
  };

  // Filter and Search Logic
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.labels.some(label => label.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'completed' && task.completed) ||
                         (filterStatus === 'pending' && !task.completed);
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const getTasksForProject = (projectId: string) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Game Header */}
        <GameHeader stats={userStats} currentTime={currentTime} />

        {/* Quick Stats */}
        <QuickStats tasks={tasks} />

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mt-8">
          {/* Left Column - Tasks and Projects */}
          <div className="xl:col-span-3 space-y-8">
            {/* Search and Filters */}
            <div className="cyber-card">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tasks</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <CreateTaskDialog onCreateTask={handleCreateTask} projects={projects} />
                </div>
              </div>
            </div>

            {/* Tasks and Projects Tabs */}
            <Tabs defaultValue="tasks" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="tasks" className="font-orbitron">
                  Tasks ({filteredTasks.length})
                </TabsTrigger>
                <TabsTrigger value="projects" className="font-orbitron">
                  Projects ({projects.length})
                </TabsTrigger>
              </TabsList>

              {/* Tasks Tab */}
              <TabsContent value="tasks">
                {filteredTasks.length === 0 ? (
                  <div className="cyber-card text-center py-12">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-xl font-orbitron font-semibold mb-2">No Tasks Found</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchTerm || filterPriority !== 'all' || filterStatus !== 'all'
                        ? 'Try adjusting your filters or search terms'
                        : 'Create your first task to start your productivity journey!'
                      }
                    </p>
                    <CreateTaskDialog onCreateTask={handleCreateTask} projects={projects} />
                  </div>
                ) : (
                  <div className={`grid gap-4 ${
                    viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
                  }`}>
                    {filteredTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onToggleComplete={handleToggleComplete}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects">
                {projects.length === 0 ? (
                  <div className="cyber-card text-center py-12">
                    <div className="text-6xl mb-4">📁</div>
                    <h3 className="text-xl font-orbitron font-semibold mb-2">No Projects</h3>
                    <p className="text-muted-foreground mb-6">
                      Projects help organize your tasks. Create one to get started!
                    </p>
                    <Button className="gaming-button">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Project
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        tasks={getTasksForProject(project.id)}
                        onClick={() => {
                          toast({
                            title: "Project Details",
                            description: "Project management features coming soon!",
                          });
                        }}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Achievements and AI Insights */}
          <div className="xl:col-span-1 space-y-6">
            <AIInsightCard 
              insights={aiInsights} 
              onDismissInsight={handleDismissInsight}
            />
            <AchievementPanel 
              achievements={achievements} 
              userStats={userStats}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;