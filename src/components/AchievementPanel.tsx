import { Trophy, Star, Zap, Target, Award, Lock } from 'lucide-react';
import { Achievement } from '../types';

interface AchievementPanelProps {
  achievements: Achievement[];
  userStats: any;
}

export const AchievementPanel = ({ achievements, userStats }: AchievementPanelProps) => {
  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const lockedAchievements = achievements.filter(a => !a.unlockedAt);

  const getAchievementIcon = (type: string, unlocked: boolean) => {
    const iconClass = `w-6 h-6 ${unlocked ? 'text-accent' : 'text-muted-foreground'}`;
    
    switch (type) {
      case 'streak': return <Zap className={iconClass} />;
      case 'completion': return <Target className={iconClass} />;
      case 'productivity': return <Trophy className={iconClass} />;
      case 'milestone': return <Award className={iconClass} />;
      default: return <Star className={iconClass} />;
    }
  };

  return (
    <div className="cyber-card">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-accent" />
        <h2 className="text-xl font-orbitron font-semibold">Achievements</h2>
        <div className="achievement-badge">
          {unlockedAchievements.length} / {achievements.length}
        </div>
      </div>

      {/* Unlocked Achievements */}
      <div className="space-y-3 mb-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Unlocked ({unlockedAchievements.length})
        </h3>
        {unlockedAchievements.map((achievement) => (
          <div 
            key={achievement.id}
            className="flex items-center gap-4 p-3 rounded-lg bg-accent/10 border border-accent/30"
          >
            <div className="flex-shrink-0">
              {getAchievementIcon(achievement.type, true)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-accent">{achievement.title}</h4>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
              {achievement.unlockedAt && (
                <p className="text-xs text-muted-foreground mt-1">
                  Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                </p>
              )}
            </div>
            <Trophy className="w-5 h-5 text-accent flex-shrink-0" />
          </div>
        ))}
      </div>

      {/* Progress Achievements */}
      <div className="space-y-3 mb-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          In Progress
        </h3>
        {lockedAchievements
          .filter(a => a.progress !== undefined && a.maxProgress !== undefined)
          .map((achievement) => (
          <div 
            key={achievement.id}
            className="flex items-center gap-4 p-3 rounded-lg bg-muted/20 border border-border"
          >
            <div className="flex-shrink-0">
              {getAchievementIcon(achievement.type, false)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium">{achievement.title}</h4>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
              {achievement.progress !== undefined && achievement.maxProgress !== undefined && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{achievement.progress} / {achievement.maxProgress}</span>
                  </div>
                  <div className="progress-bar h-2">
                    <div 
                      className="progress-fill h-2" 
                      style={{ 
                        width: `${(achievement.progress / achievement.maxProgress) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Locked Achievements */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Locked ({lockedAchievements.filter(a => a.progress === undefined).length})
        </h3>
        {lockedAchievements
          .filter(a => a.progress === undefined)
          .slice(0, 3) // Show only first 3 locked
          .map((achievement) => (
          <div 
            key={achievement.id}
            className="flex items-center gap-4 p-3 rounded-lg bg-muted/10 border border-border opacity-60"
          >
            <div className="flex-shrink-0">
              <Lock className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-muted-foreground">{achievement.title}</h4>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};