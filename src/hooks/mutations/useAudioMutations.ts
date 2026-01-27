import { useMutation } from '@tanstack/react-query';
import { audioApi } from '@/utils/api/audioApi';
import type { AudioGenerationRequest } from '@/types/audio';

export const useAudioGenerationMutations = () => {
  const generate = useMutation({
    mutationFn: async (request: AudioGenerationRequest) => {
      const blob = await audioApi.generateAudio(request);
      const audioUrl = URL.createObjectURL(blob);
      return {
        audioUrl,
        metadata: {
          text: request.text,
          provider: 'elevenlabs' as const,
        },
      };
    },
  });

  return {
    generate,
  };
};
