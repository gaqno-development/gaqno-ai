import React from 'react';
import { Controller } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@gaqno-development/frontcore/components/ui';
import { Button, Textarea, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@gaqno-development/frontcore/components/ui';
import { Volume2Icon } from '@gaqno-development/frontcore/components/icons';
import { useVoices } from '@/hooks/queries/useAudioQueries';
import { GeneratedAudioCard } from '../GeneratedAudioCard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAudioGenerationMutations } from '@/hooks/mutations/useAudioMutations';

const schema = z.object({
  text: z.string().min(1, 'Text is required'),
  voiceId: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export function TtsTab() {
  const { voices, isLoading } = useVoices();
  const { generate } = useAudioGenerationMutations();
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { text: '', voiceId: '' },
  });
  const text = watch('text');

  const onSubmit = async (data: FormData) => {
    try {
      const result = await generate.mutateAsync({
        text: data.text,
        voiceId: data.voiceId?.trim() || undefined,
      });
      setAudioUrl(result.audioUrl);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2Icon className="h-5 w-5" size={20} />
            Text to Speech
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="tts-text">Text</Label>
            <Textarea
              id="tts-text"
              {...register('text')}
              placeholder="Enter the text you want to convert to speech..."
              className="min-h-[120px]"
            />
            {errors.text && (
              <p className="text-sm text-destructive mt-1">{errors.text.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="tts-voice">Voice (optional)</Label>
            <Controller
              name="voiceId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value === '' || field.value == null ? '__default__' : field.value}
                  onValueChange={(val) => field.onChange(val === '__default__' ? '' : val)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="tts-voice">
                    <SelectValue placeholder={isLoading ? 'Loading voices…' : 'Default'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__default__">Default</SelectItem>
                    {voices.map((v) => (
                      <SelectItem key={v.voice_id} value={v.voice_id}>
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <Button type="submit" className="w-full" loading={generate.isPending} disabled={!text}>
            Generate Audio
          </Button>
        </CardContent>
      </Card>
      {audioUrl && <GeneratedAudioCard audioUrl={audioUrl} title="Generated Audio" />}
    </form>
  );
}
