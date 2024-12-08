import { useState } from 'react';
import { Copy, Mail, Trash2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Team() {
  const [email, setEmail] = useState('');
  const [invites, setInvites] = useState<string[]>([]);
  const { toast } = useToast();

  const addInvite = (email: string) => {
    setInvites(prev => [...prev, email]);
  };

  const removeInvite = (email: string) => {
    setInvites(prev => prev.filter(e => e !== email));
  };

  const generateInviteLink = (email: string) => {
    return `${window.location.origin}/invite?email=${encodeURIComponent(email)}&code=${Math.random().toString(36).slice(2)}`;
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      addInvite(email);
      setEmail('');
      toast({
        title: 'Invitation sent',
        description: `Invite link generated for ${email}`,
      });
    }
  };

  const copyInviteLink = (email: string) => {
    const link = generateInviteLink(email);
    navigator.clipboard.writeText(link);
    toast({
      title: 'Copied!',
      description: 'Invite link copied to clipboard',
    });
  };

  return (
    <div className="space-y-6 pt-8">
      <Card>
        <CardHeader>
          <CardTitle>Invite Team Members</CardTitle>
          <CardDescription>
            Send invites to your team members to join the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInvite} className="flex gap-4">
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="submit"
              className="bg-gradient-to-r from-yellow-500 to-green-500 text-white hover:from-yellow-600 hover:to-green-600"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Send Invite
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending Invites</CardTitle>
          <CardDescription>
            Manage your pending team invitations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invites.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">
                No pending invites
              </p>
            ) : (
              invites.map((invite) => (
                <div
                  key={invite}
                  className="flex items-center justify-between rounded-lg border border-primary/10 p-4"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>{invite}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyInviteLink(invite)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeInvite(invite)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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