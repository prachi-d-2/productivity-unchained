import { useEffect, useState } from 'react';
import { Task } from '../types';

interface NotificationSettings {
  enabled: boolean;
  deadlineReminders: boolean;
  dailyDigest: boolean;
}

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: false,
    deadlineReminders: true,
    dailyDigest: true,
  });

  useEffect(() => {
    // Check current permission status
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Load settings from localStorage
    const savedSettings = localStorage.getItem('notification-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    if (permission === 'granted') {
      return true;
    }

    const result = await Notification.requestPermission();
    setPermission(result);
    
    if (result === 'granted') {
      setSettings(prev => ({ ...prev, enabled: true }));
      return true;
    }
    
    return false;
  };

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (permission === 'granted' && settings.enabled) {
      new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options,
      });
    }
  };

  const scheduleTaskReminders = (tasks: Task[]) => {
    if (!settings.enabled || !settings.deadlineReminders) return;

    tasks.forEach(task => {
      if (task.completed) return;

      const now = new Date().getTime();
      const dueTime = task.dueDate.getTime();
      const timeUntilDue = dueTime - now;

      // Schedule notifications for different intervals
      const intervals = [
        { time: 24 * 60 * 60 * 1000, message: '24 hours until due' }, // 1 day
        { time: 60 * 60 * 1000, message: '1 hour until due' }, // 1 hour
        { time: 15 * 60 * 1000, message: '15 minutes until due' }, // 15 minutes
      ];

      intervals.forEach(({ time, message }) => {
        const notificationTime = timeUntilDue - time;
        
        if (notificationTime > 0 && notificationTime <= 5 * 60 * 1000) { // Only schedule if within 5 minutes
          setTimeout(() => {
            sendNotification(`Task Reminder: ${task.title}`, {
              body: `${message} - ${task.title}`,
              tag: `task-${task.id}-${time}`,
              requireInteraction: true,
            });
          }, notificationTime);
        }
      });

      // Overdue notification
      if (timeUntilDue < 0 && timeUntilDue > -60 * 1000) { // Just became overdue
        sendNotification(`⚠️ Task Overdue: ${task.title}`, {
          body: `This task is now overdue. Priority: ${task.priority.toUpperCase()}`,
          tag: `task-overdue-${task.id}`,
          requireInteraction: true,
        });
      }
    });
  };

  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('notification-settings', JSON.stringify(updatedSettings));
  };

  return {
    permission,
    settings,
    requestPermission,
    sendNotification,
    scheduleTaskReminders,
    updateSettings,
  };
};