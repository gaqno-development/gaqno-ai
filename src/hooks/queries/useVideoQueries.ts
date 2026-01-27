import { useQuery } from '@tanstack/react-query';
import { videoApi } from '@/utils/api/videoApi';
import type { VideoModel } from '@/types/videos';

export const useVideoModelsQueries = () => {
  const getAll = useQuery<VideoModel[]>({
    queryKey: ['video-models'],
    queryFn: async () => {
      const response = await videoApi.getModels();
      return response.data || response;
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    getAll,
  };
};

export const useVideoGenerationQueries = () => {
  const getStatus = (videoId: string) => {
    return useQuery({
      queryKey: ['video-generation', videoId],
      queryFn: async () => {
        return await videoApi.getVideoStatus(videoId);
      },
      enabled: !!videoId,
      refetchInterval: (query) => {
        const data = query.state.data;
        if (data?.status === 'completed' || data?.status === 'failed') {
          return false;
        }
        return 2000;
      },
    });
  };

  return {
    getStatus,
  };
};
