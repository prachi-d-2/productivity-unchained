import { Clock, AlertTriangle } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';

interface CountdownTimerProps {
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  className?: string;
}

export const CountdownTimer = ({ dueDate, priority, className = '' }: CountdownTimerProps) => {
  const { days, hours, minutes, seconds, isOverdue, totalMinutesRemaining } = useCountdown(dueDate);

  const getUrgencyColor = () => {
    if (isOverdue) return 'text-destructive';
    if (totalMinutesRemaining <= 60) return 'text-destructive'; // Less than 1 hour
    if (totalMinutesRemaining <= 1440) return 'text-warning'; // Less than 1 day
    if (totalMinutesRemaining <= 4320) return 'text-accent'; // Less than 3 days
    return 'text-muted-foreground';
  };

  const formatTime = () => {
    if (isOverdue) {
      return 'OVERDUE';
    }

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {isOverdue ? (
        <AlertTriangle className="w-4 h-4 text-destructive animate-pulse" />
      ) : (
        <Clock className="w-4 h-4" />
      )}
      <span className={`font-mono text-sm font-semibold ${getUrgencyColor()}`}>
        {formatTime()}
      </span>
      {totalMinutesRemaining <= 60 && !isOverdue && (
        <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
      )}
    </div>
  );
};