import { Calendar, Clock, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';
import { Task } from '../types';

interface QuickStatsProps {
  tasks: Task[];
}

export const QuickStats = ({ tasks }: QuickStatsProps) => {
  const today = new Date();
  const todayStart = new Date(today.setHours(0, 0, 0, 0));
  const todayEnd = new Date(today.setHours(23, 59, 59, 999));
  
  const completedToday = tasks.filter(task => 
    task.completed && 
    new Date(task.updatedAt || task.createdAt) >= todayStart &&
    new Date(task.updatedAt || task.createdAt) <= todayEnd
  ).length;

  const dueToday = tasks.filter(task => 
    !task.completed &&
    new Date(task.dueDate) >= todayStart &&
    new Date(task.dueDate) <= todayEnd
  ).length;

  const overdue = tasks.filter(task => 
    !task.completed && new Date(task.dueDate) < todayStart
  ).length;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const upcomingThisWeek = tasks.filter(task => {
    if (task.completed) return false;
    const taskDate = new Date(task.dueDate);
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return taskDate > todayEnd && taskDate <= weekFromNow;
  }).length;

  const stats = [
    {
      title: 'Completed Today',
      value: completedToday,
      icon: CheckCircle2,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30'
    },
    {
      title: 'Due Today',
      value: dueToday,
      icon: Calendar,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/30'
    },
    {
      title: 'Overdue',
      value: overdue,
      icon: AlertTriangle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/30'
    },
    {
      title: 'This Week',
      value: upcomingThisWeek,
      icon: Clock,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30'
    },
    {
      title: 'Completion Rate',
      value: `${Math.round(completionRate)}%`,
      icon: TrendingUp,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/30'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className={`cyber-card p-4 text-center ${stat.bgColor} border ${stat.borderColor}`}
        >
          <div className="flex flex-col items-center gap-2">
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
            <div className="text-2xl font-orbitron font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};