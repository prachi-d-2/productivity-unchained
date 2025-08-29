import { useState } from 'react';
import { Clock, Calendar, Flag, CheckCircle2, Circle, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Task } from '../types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) => {
  const [timeLeft, setTimeLeft] = useState('');

  // Calculate time remaining
  const updateTimeLeft = () => {
    const now = new Date().getTime();
    const dueTime = new Date(task.dueDate).getTime();
    const difference = dueTime - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    } else {
      setTimeLeft('Overdue');
    }
  };

  // Update countdown every minute
  useState(() => {
    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000);
    return () => clearInterval(interval);
  });

  const getPriorityClass = () => {
    switch (task.priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`cyber-card ${getPriorityClass()} ${task.completed ? 'opacity-60' : ''} group`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {/* Completion Toggle */}
          <button
            onClick={() => onToggleComplete(task.id)}
            className="mt-1 transition-all duration-200 hover:scale-110"
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-accent" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground hover:text-primary" />
            )}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Labels */}
            {task.labels.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {task.labels.map((label) => (
                  <span 
                    key={label}
                    className="px-2 py-1 text-xs rounded-full bg-secondary/20 text-secondary border border-secondary/30"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}

            {/* Task Meta */}
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
              
              <div className={`flex items-center gap-1 ${isOverdue ? 'text-destructive' : ''}`}>
                <Clock className="w-4 h-4" />
                <span className={isOverdue ? 'font-medium' : ''}>{timeLeft}</span>
              </div>

              <div className={`flex items-center gap-1 ${getPriorityColor()}`}>
                <Flag className="w-4 h-4" />
                <span className="capitalize">{task.priority}</span>
              </div>
            </div>

            {/* Progress for subtasks */}
            {task.subtasks && task.subtasks.length > 0 && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Subtasks</span>
                  <span>
                    {task.subtasks.filter(st => st.completed).length} / {task.subtasks.length}
                  </span>
                </div>
                <div className="progress-bar h-2">
                  <div 
                    className="progress-fill h-2" 
                    style={{ 
                      width: `${(task.subtasks.filter(st => st.completed).length / task.subtasks.length) * 100}%` 
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onEdit(task)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(task.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};