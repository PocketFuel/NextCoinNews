import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, Check, X, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EditFeedsModalProps {
  open: boolean;
  onClose: () => void;
}

const sections = [
  { value: 'xfeed', label: 'X Feed' },
  { value: 'search', label: 'Targeted Search' },
  { value: 'news', label: 'News' },
  { value: 'market', label: 'Market Analysis' },
  { value: 'nftart', label: 'NFT/Art' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'instagram', label: 'Instagram' },
];

const defaultFeeds = [
  { id: '1', name: 'X Feed', section: 'xfeed', enabled: true },
  { id: '2', name: 'Targeted Search', section: 'search', enabled: true },
  { id: '3', name: 'News', section: 'news', enabled: true },
  { id: '4', name: 'Market Analysis', section: 'market', enabled: true },
  { id: '5', name: 'NFT/Art', section: 'nftart', enabled: true },
  { id: '6', name: 'TikTok', section: 'tiktok', enabled: true },
  { id: '7', name: 'YouTube', section: 'youtube', enabled: true },
  { id: '8', name: 'Instagram', section: 'instagram', enabled: true },
];

export function EditFeedsModal({ open, onClose }: EditFeedsModalProps) {
  const [feeds, setFeeds] = useState(defaultFeeds);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFeed, setNewFeed] = useState({ name: '', section: '' });
  const [testingFeed, setTestingFeed] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleToggleFeed = (id: string) => {
    setFeeds(feeds.map(feed => 
      feed.id === id ? { ...feed, enabled: !feed.enabled } : feed
    ));
    setHasChanges(true);
  };

  const handleDeleteFeed = (id: string) => {
    setFeeds(feeds.filter(feed => feed.id !== id));
    setHasChanges(true);
  };

  const handleTestFeed = async () => {
    setTestingFeed(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTestingFeed(false);
  };

  const handleAddFeed = () => {
    const id = Math.random().toString(36).slice(2);
    setFeeds([...feeds, { ...newFeed, id, enabled: true }]);
    setNewFeed({ name: '', section: '' });
    setShowAddForm(false);
    setHasChanges(true);
  };

  const handleSave = () => {
    setHasChanges(false);
    onClose();
  };

  const handleCancel = () => {
    setFeeds(defaultFeeds);
    setHasChanges(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="flex max-h-[85vh] flex-col gap-0 p-0 sm:max-w-[600px]">
        <DialogHeader className="border-b border-border p-6 pb-4">
          <DialogTitle>Edit RSS Feeds</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-6 py-6">
            {feeds.map((feed) => (
              <div
                key={feed.id}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{feed.name}</span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                      {sections.find(s => s.value === feed.section)?.label}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={feed.enabled}
                    onCheckedChange={() => handleToggleFeed(feed.id)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteFeed(feed.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {showAddForm ? (
              <div className="space-y-4 rounded-lg border border-border p-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Feed Name</Label>
                  <Input
                    id="name"
                    value={newFeed.name}
                    onChange={(e) => setNewFeed({ ...newFeed, name: e.target.value })}
                    placeholder="Enter feed name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Select
                    value={newFeed.section}
                    onValueChange={(value) => setNewFeed({ ...newFeed, section: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a section" />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map((section) => (
                        <SelectItem key={section.value} value={section.value}>
                          {section.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false);
                      setNewFeed({ name: '', section: '' });
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddFeed}
                    disabled={!newFeed.name || !newFeed.section}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Add Feed
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                className="w-full"
                variant="outline"
                onClick={() => setShowAddForm(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Feed
              </Button>
            )}
          </div>
        </ScrollArea>

        {hasChanges && (
          <div className="flex border-t border-border bg-background">
            <Button
              variant="ghost"
              className="flex-1 rounded-none py-6"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 rounded-none bg-gradient-to-r from-yellow-500 to-green-500 text-white hover:from-yellow-600 hover:to-green-600"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}