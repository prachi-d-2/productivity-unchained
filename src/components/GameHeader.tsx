import { Trophy, Zap, Target, Clock } from 'lucide-react';
import { UserStats } from '../types';

interface GameHeaderProps {
  stats: UserStats;
  currentTime: string;
}

export const GameHeader = ({ stats, currentTime }: GameHeaderProps) => {
  const xpPercentage = (stats.xp / stats.xpToNextLevel) * 100;

  return (
    <header className="cyber-card mb-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* User Level and XP */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-3xl font-orbitron font-bold neon-text">
              LVL {stats.level}
            </div>
            <div className="text-sm text-muted-foreground">
              Productivity Master
            </div>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Experience</span>
              <span className="text-sm font-medium">
                {stats.xp} / {stats.xpToNextLevel} XP
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 neon-border">
            <Target className="w-5 h-5 text-accent" />
            <div className="text-center">
              <div className="text-lg font-bold">{stats.tasksCompleted}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 neon-border">
            <Zap className="w-5 h-5 text-warning" />
            <div className="text-center">
              <div className="text-lg font-bold">{stats.currentStreak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 neon-border">
            <Trophy className="w-5 h-5 text-secondary" />
            <div className="text-center">
              <div className="text-lg font-bold">{stats.productivity}%</div>
              <div className="text-xs text-muted-foreground">Efficiency</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 neon-border">
            <Clock className="w-5 h-5 text-primary" />
            <div className="text-center">
              <div className="text-lg font-bold font-orbitron">{currentTime}</div>
              <div className="text-xs text-muted-foreground">Local Time</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};