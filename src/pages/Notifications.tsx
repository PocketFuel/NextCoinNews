import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNotificationStore } from '@/lib/store';
import { formatDistanceToNow } from 'date-fns';
import { TokenBanner } from '@/components/TokenBanner';

export default function Notifications() {
  const { notifications, markAllAsRead, markAsRead } = useNotificationStore();
  const navigate = useNavigate();

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.title === 'New Comment') {
      navigate('/blurts');
    }
  };

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 -mx-4 bg-background/80 px-4 pb-4 pt-4 backdrop-blur-sm">
        <TokenBanner />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Notifications</CardTitle>
            <Button variant="outline" onClick={markAllAsRead}>
              <Check className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <p className="text-center text-muted-foreground">No notifications</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex cursor-pointer items-start gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50 ${
                    !notification.read ? 'bg-primary/5' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="rounded-full bg-primary/10 p-2">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="font-medium">{notification.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}