import { Calendar, Target, TrendingUp } from 'lucide-react';
import { Project, Task } from '../types';

interface ProjectCardProps {
  project: Project;
  tasks: Task[];
  onClick: () => void;
}

export const ProjectCard = ({ project, tasks, onClick }: ProjectCardProps) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const upcomingTasks = tasks.filter(task => 
    !task.completed && new Date(task.dueDate) > new Date()
  ).length;
  
  const overdueTasks = tasks.filter(task => 
    !task.completed && new Date(task.dueDate) < new Date()
  ).length;

  const getProjectStatusColor = () => {
    if (completionPercentage === 100) return 'text-accent';
    if (overdueTasks > 0) return 'text-destructive';
    if (completionPercentage > 60) return 'text-warning';
    return 'text-primary';
  };

  return (
    <div 
      className="cyber-card cursor-pointer hover:scale-[1.02] transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-orbitron font-semibold text-lg mb-2">{project.title}</h3>
          {project.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          )}
        </div>
        <div 
          className="w-4 h-16 rounded-full"
          style={{ backgroundColor: project.color }}
        />
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className={`font-medium ${getProjectStatusColor()}`}>
            {completionPercentage.toFixed(0)}% Complete
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center gap-1">
          <Target className="w-4 h-4 text-primary" />
          <div className="text-xs text-muted-foreground">Total</div>
          <div className="font-bold text-sm">{totalTasks}</div>
        </div>
        
        <div className="flex flex-col items-center gap-1">
          <TrendingUp className="w-4 h-4 text-accent" />
          <div className="text-xs text-muted-foreground">Done</div>
          <div className="font-bold text-sm text-accent">{completedTasks}</div>
        </div>
        
        <div className="flex flex-col items-center gap-1">
          <Calendar className="w-4 h-4 text-warning" />
          <div className="text-xs text-muted-foreground">Pending</div>
          <div className="font-bold text-sm text-warning">{upcomingTasks}</div>
        </div>
      </div>

      {/* Deadline */}
      {project.deadline && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Deadline</span>
            <span className={`font-medium ${
              new Date(project.deadline) < new Date() ? 'text-destructive' : 'text-foreground'
            }`}>
              {new Date(project.deadline).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};