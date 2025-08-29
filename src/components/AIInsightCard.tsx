import { Brain, AlertTriangle, Lightbulb, Clock, X } from 'lucide-react';
import { AIInsight } from '../types';
import { Button } from './ui/button';

interface AIInsightCardProps {
  insights: AIInsight[];
  onDismissInsight: (id: string) => void;
}

export const AIInsightCard = ({ insights, onDismissInsight }: AIInsightCardProps) => {
  const activeInsights = insights.filter(insight => !insight.dismissed).slice(0, 3);
  
  if (activeInsights.length === 0) return null;

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'deadline_warning': return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'productivity_tip': return <Lightbulb className="w-5 h-5 text-accent" />;
      case 'time_allocation': return <Clock className="w-5 h-5 text-warning" />;
      case 'schedule_optimization': return <Brain className="w-5 h-5 text-primary" />;
      default: return <Brain className="w-5 h-5 text-primary" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-destructive/50 bg-destructive/5';
      case 'medium': return 'border-warning/50 bg-warning/5';
      case 'low': return 'border-primary/50 bg-primary/5';
      default: return 'border-border bg-card';
    }
  };

  return (
    <div className="cyber-card">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-orbitron font-semibold">AI Insights</h2>
        <div className="achievement-badge">
          {activeInsights.length} Active
        </div>
      </div>

      <div className="space-y-3">
        {activeInsights.map((insight) => (
          <div 
            key={insight.id}
            className={`p-4 rounded-lg border ${getPriorityColor(insight.priority)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0 mt-0.5">
                  {getInsightIcon(insight.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground mb-1">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground">{insight.message}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span>Priority: {insight.priority}</span>
                    <span>•</span>
                    <span>{new Date(insight.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDismissInsight(insight.id)}
                className="flex-shrink-0 ml-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          AI analyzes your tasks and productivity patterns to provide personalized recommendations
        </p>
      </div>
    </div>
  );
};