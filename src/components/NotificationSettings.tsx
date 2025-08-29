import { useState } from 'react';
import { Bell, BellOff, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useNotifications } from '../hooks/useNotifications';
import { useToast } from '../hooks/use-toast';

export const NotificationSettings = () => {
  const { permission, settings, requestPermission, updateSettings } = useNotifications();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleEnableNotifications = async () => {
    const granted = await requestPermission();
    if (granted) {
      toast({
        title: "Notifications Enabled! 🔔",
        description: "You'll now receive reminders for your tasks and deadlines.",
      });
    } else {
      toast({
        title: "Notifications Blocked",
        description: "Please enable notifications in your browser settings to get task reminders.",
        variant: "destructive",
      });
    }
  };

  const getPermissionStatus = () => {
    switch (permission) {
      case 'granted': return { text: 'Enabled', color: 'text-accent' };
      case 'denied': return { text: 'Blocked', color: 'text-destructive' };
      default: return { text: 'Not Set', color: 'text-muted-foreground' };
    }
  };

  const status = getPermissionStatus();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          {permission === 'granted' && settings.enabled ? (
            <Bell className="w-4 h-4" />
          ) : (
            <BellOff className="w-4 h-4" />
          )}
          <Settings className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="cyber-card max-w-md">
        <DialogHeader>
          <DialogTitle className="font-orbitron text-xl">Notification Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Permission Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Notification Permission</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <span className={`text-sm font-medium ${status.color}`}>
                  {status.text}
                </span>
              </div>
              
              {permission !== 'granted' && (
                <Button
                  onClick={handleEnableNotifications}
                  className="gaming-button w-full mt-3"
                  size="sm"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Enable Notifications
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Notification Settings */}
          {permission === 'granted' && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="text-sm">
                    Enable Notifications
                  </Label>
                  <Switch
                    id="notifications"
                    checked={settings.enabled}
                    onCheckedChange={(enabled) => updateSettings({ enabled })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="deadline-reminders" className="text-sm">
                    Deadline Reminders
                  </Label>
                  <Switch
                    id="deadline-reminders"
                    checked={settings.deadlineReminders}
                    onCheckedChange={(deadlineReminders) => updateSettings({ deadlineReminders })}
                    disabled={!settings.enabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="daily-digest" className="text-sm">
                    Daily Digest
                  </Label>
                  <Switch
                    id="daily-digest"
                    checked={settings.dailyDigest}
                    onCheckedChange={(dailyDigest) => updateSettings({ dailyDigest })}
                    disabled={!settings.enabled}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info */}
          <div className="text-xs text-muted-foreground space-y-2">
            <p>• Get notified 24 hours, 1 hour, and 15 minutes before deadlines</p>
            <p>• Receive alerts for overdue tasks</p>
            <p>• Daily digest with your task summary</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};