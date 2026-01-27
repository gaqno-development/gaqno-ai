import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@gaqno-development/frontcore/components/ui';
import { Button } from '@gaqno-development/frontcore/components/ui';
import { Textarea } from '@gaqno-development/frontcore/components/ui';
import { Label } from '@gaqno-development/frontcore/components/ui';
import { Volume2 } from 'lucide-react';
import { useAudioCreationPanel } from './hooks/useAudioCreationPanel';
import type { AudioCreationPanelProps } from './types';

export const AudioCreationPanel: React.FC<AudioCreationPanelProps> = ({ className }) => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    audioUrl,
    isSubmitLoading,
    isSubmitDisabled,
  } = useAudioCreationPanel();

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Audio Generation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="text">Text</Label>
              <Textarea
                id="text"
                {...register('text')}
                placeholder="Enter the text you want to convert to speech..."
                className="min-h-[120px]"
              />
              {errors.text && (
                <p className="text-sm text-destructive mt-1">{errors.text.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={isSubmitLoading}
              disabled={isSubmitDisabled}
            >
              Generate Audio
            </Button>
          </CardContent>
        </Card>

        {audioUrl && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Audio</CardTitle>
            </CardHeader>
            <CardContent>
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
};
