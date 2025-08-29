import { Task, Project, Achievement, UserStats, AIInsight } from '../types';

export const generateSampleTasks = (): Task[] => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  return [
    {
      id: '1',
      title: 'Complete Machine Learning Assignment',
      description: 'Implement neural network for image classification using TensorFlow',
      dueDate: tomorrow,
      priority: 'high',
      labels: ['College', 'AI/ML'],
      projectId: 'project-1',
      completed: false,
      createdAt: new Date(now.getTime() - 86400000 * 2),
      updatedAt: new Date(now.getTime() - 86400000),
      estimatedDuration: 180,
    },
    {
      id: '2',
      title: 'Prepare for Technical Interview',
      description: 'Practice coding problems and system design concepts',
      dueDate: new Date(now.getTime() + 86400000 * 3),
      priority: 'high',
      labels: ['On-Campus Placement', 'Interview Prep'],
      projectId: 'project-2',
      completed: false,
      createdAt: new Date(now.getTime() - 86400000 * 3),
      updatedAt: new Date(now.getTime() - 86400000),
      estimatedDuration: 240,
      subtasks: [
        { id: 'st1', title: 'Review algorithms', completed: true, createdAt: now },
        { id: 'st2', title: 'Practice system design', completed: false, createdAt: now },
        { id: 'st3', title: 'Mock interviews', completed: false, createdAt: now }
      ]
    },
    {
      id: '3',
      title: 'Update Resume',
      description: 'Add recent projects and internship experience',
      dueDate: yesterday,
      priority: 'medium',
      labels: ['Off-Campus', 'Career'],
      completed: false,
      createdAt: new Date(now.getTime() - 86400000 * 5),
      updatedAt: new Date(now.getTime() - 86400000 * 2),
      estimatedDuration: 60,
    },
    {
      id: '4',
      title: 'Buy Groceries',
      description: 'Milk, bread, eggs, vegetables for the week',
      dueDate: now,
      priority: 'low',
      labels: ['Personal'],
      completed: true,
      createdAt: new Date(now.getTime() - 86400000),
      updatedAt: now,
      estimatedDuration: 30,
      actualDuration: 25,
    },
    {
      id: '5',
      title: 'Submit Research Paper',
      description: 'Final submission for conference on distributed systems',
      dueDate: nextWeek,
      priority: 'high',
      labels: ['College', 'Research'],
      projectId: 'project-1',
      completed: false,
      createdAt: new Date(now.getTime() - 86400000 * 10),
      updatedAt: new Date(now.getTime() - 86400000 * 3),
      estimatedDuration: 120,
    }
  ];
};

export const generateSampleProjects = (): Project[] => {
  const now = new Date();
  const endOfSemester = new Date(now);
  endOfSemester.setMonth(endOfSemester.getMonth() + 2);
  const jobApplicationDeadline = new Date(now);
  jobApplicationDeadline.setDate(jobApplicationDeadline.getDate() + 30);

  return [
    {
      id: 'project-1',
      title: 'Final Semester Project',
      description: 'Machine learning based recommendation system for e-commerce',
      color: '#00FFFF',
      tasks: ['1', '5'],
      createdAt: new Date(now.getTime() - 86400000 * 30),
      updatedAt: new Date(now.getTime() - 86400000 * 3),
      deadline: endOfSemester,
    },
    {
      id: 'project-2',
      title: 'Job Application Process',
      description: 'Campus placement and off-campus job applications',
      color: '#8B5CF6',
      tasks: ['2'],
      createdAt: new Date(now.getTime() - 86400000 * 20),
      updatedAt: new Date(now.getTime() - 86400000),
      deadline: jobApplicationDeadline,
    }
  ];
};

export const generateSampleAchievements = (): Achievement[] => {
  const now = new Date();
  return [
    {
      id: 'ach-1',
      title: 'First Steps',
      description: 'Complete your first task',
      icon: '🎯',
      unlockedAt: new Date(now.getTime() - 86400000 * 5),
      type: 'milestone'
    },
    {
      id: 'ach-2',
      title: 'Consistency King',
      description: 'Complete tasks for 7 consecutive days',
      icon: '👑',
      progress: 3,
      maxProgress: 7,
      type: 'streak'
    },
    {
      id: 'ach-3',
      title: 'Speed Demon',
      description: 'Complete 10 tasks in a single day',
      icon: '⚡',
      type: 'productivity'
    },
    {
      id: 'ach-4',
      title: 'Project Master',
      description: 'Complete your first project',
      icon: '🏆',
      type: 'completion'
    },
    {
      id: 'ach-5',
      title: 'Early Bird',
      description: 'Complete 5 tasks before their due date',
      icon: '🌅',
      progress: 2,
      maxProgress: 5,
      type: 'productivity'
    }
  ];
};

export const generateSampleUserStats = (): UserStats => {
  return {
    level: 12,
    xp: 2450,
    xpToNextLevel: 3000,
    tasksCompleted: 47,
    currentStreak: 3,
    longestStreak: 12,
    totalFocusTime: 1247, // in minutes
    productivity: 85
  };
};

export const generateSampleAIInsights = (): AIInsight[] => {
  const now = new Date();
  return [
    {
      id: 'ai-1',
      type: 'deadline_warning',
      title: 'Urgent: Assignment Due Tomorrow',
      message: 'Your Machine Learning assignment is due tomorrow. Consider breaking it into smaller tasks to complete it on time.',
      priority: 'high',
      createdAt: now,
      actionable: true
    },
    {
      id: 'ai-2',
      type: 'productivity_tip',
      title: 'Productivity Boost Suggestion',
      message: 'You work best in 2-hour focused sessions. Try scheduling your high-priority tasks during your peak hours (10 AM - 12 PM).',
      priority: 'medium',
      createdAt: new Date(now.getTime() - 86400000),
      actionable: true
    },
    {
      id: 'ai-3',
      type: 'schedule_optimization',
      title: 'Schedule Optimization',
      message: 'You have 3 high-priority tasks this week. Consider redistributing them across different days for better balance.',
      priority: 'low',
      createdAt: new Date(now.getTime() - 86400000 * 2),
      actionable: true
    }
  ];
};