export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  labels: string[];
  projectId?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  estimatedDuration?: number; // in minutes
  actualDuration?: number; // in minutes
  subtasks?: Subtask[];
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  color: string;
  tasks: string[]; // task IDs
  createdAt: Date;
  updatedAt: Date;
  deadline?: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
  type: 'streak' | 'completion' | 'productivity' | 'milestone';
}

export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  tasksCompleted: number;
  currentStreak: number;
  longestStreak: number;
  totalFocusTime: number; // in minutes
  productivity: number; // percentage
}

export interface Label {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
}

export interface AIInsight {
  id: string;
  type: 'schedule_optimization' | 'deadline_warning' | 'productivity_tip' | 'time_allocation';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: Date;
  actionable?: boolean;
  dismissed?: boolean;
}