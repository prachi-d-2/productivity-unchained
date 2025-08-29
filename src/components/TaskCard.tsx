import { useState, useEffect } from 'react';
import { Calendar, Clock, Edit, Trash2, CheckCircle2, Circle, Timer, Target, MoreVertical } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { CountdownTimer } from './CountdownTimer';
import { SubtaskManager } from './SubtaskManager';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onUpdateSubtasks?: (taskId: string, subtasks: Task['subtasks']) => void;
}

export const TaskCard = ({ task, onToggleComplete, onEdit, onDelete, onUpdateSubtasks }: TaskCardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUpdateSubtasks = (subtasks: Task['subtasks']) => {
    if (onUpdateSubtasks) {
      onUpdateSubtasks(task.id, subtasks);
    }
  };

  const isOverdue = !task.completed && new Date() > task.dueDate;
  const completedSubtasks = task.subtasks?.filter(s => s.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const subtaskProgress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className={`cyber-card transition-all hover:scale-[1.02] ${task.completed ? 'opacity-60' : ''} ${isOverdue ? 'border-destructive/50' : ''} group`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleComplete(task.id)}
              className={`h-8 w-8 p-0 rounded-full border-2 transition-all ${
                task.completed
                  ? 'bg-primary border-primary text-primary-foreground hover:bg-primary/90'
                  : isOverdue
                  ? 'border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground'
                  : 'border-primary/50 hover:border-primary hover:bg-primary/10'
              }`}
            >
              {task.completed ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
            </Button>
            
            <div className="flex-1 min-w-0">
              <h3
                className={`font-medium text-base transition-all ${
                  task.completed
                    ? 'text-muted-foreground line-through'
                    : isOverdue
                    ? 'text-destructive'
                    : 'text-foreground'
                }`}
              >
                {task.title}
              </h3>
              
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
              
              {/* Subtask Progress */}
              {totalSubtasks > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1">
                    <Progress value={subtaskProgress} className="h-2" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {completedSubtasks}/{totalSubtasks}
                  </span>
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
                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
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

        {/* Task Metadata */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <CountdownTimer 
            dueDate={task.dueDate} 
            priority={task.priority}
            className="flex-shrink-0"
          />
          
          {task.estimatedDuration && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Timer className="w-4 h-4" />
              <span className="text-sm">{task.estimatedDuration}min</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Target className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
            <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Subtask Manager */}
        <SubtaskManager
          subtasks={task.subtasks || []}
          onUpdateSubtasks={handleUpdateSubtasks}
          taskCompleted={task.completed}
        />

        {/* Labels */}
        {task.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {task.labels.map((label) => (
              <Badge key={label} variant="secondary" className="text-xs">
                {label}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};