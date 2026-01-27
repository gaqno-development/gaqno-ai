import React from 'react';
import { Label } from '@gaqno-development/frontcore/components/ui';
import { Switch } from '@gaqno-development/frontcore/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@gaqno-development/frontcore/components/ui';

interface VideoSettingsProps {
  addAudio: boolean;
  addVoice: boolean;
  onAddAudioChange: (value: boolean) => void;
  onAddVoiceChange: (value: boolean) => void;
  className?: string;
}

export const VideoSettings: React.FC<VideoSettingsProps> = ({
  addAudio,
  addVoice,
  onAddAudioChange,
  onAddVoiceChange,
  className,
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="add-audio" className="text-sm font-normal">
            Add Audio
          </Label>
          <Switch
            id="add-audio"
            checked={addAudio}
            onCheckedChange={onAddAudioChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="add-voice" className="text-sm font-normal">
            Add Voice
          </Label>
          <Switch
            id="add-voice"
            checked={addVoice}
            onCheckedChange={onAddVoiceChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};
