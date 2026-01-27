import { useMutation, useQueryClient } from '@tanstack/react-query';
import { videoApi } from '@/utils/api/videoApi';
import type { VideoGenerationRequest } from '@/types/videos';

export const useVideoMutations = () => {
  const queryClient = useQueryClient();

  const generate = useMutation({
    mutationFn: async (request: VideoGenerationRequest) => {
      return await videoApi.generateVideo(request);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['video-generation', data.id], data);
    },
  });

  const upload = useMutation({
    mutationFn: async ({ file, type }: { file: File; type: 'video' | 'image' }) => {
      return await videoApi.uploadAsset(file, type);
    },
  });

  return {
    generate,
    upload,
  };
};
