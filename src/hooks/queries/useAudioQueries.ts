import { useQuery } from '@tanstack/react-query';
import { audioApi } from '@/utils/api/audioApi';

export const useVoices = () => {
  const query = useQuery({
    queryKey: ['audio', 'voices'],
    queryFn: () => audioApi.getVoices(),
  });
  return {
    voices: query.data?.voices ?? [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useAudioGenerationQueries = () => {
  return {
    // Queries podem ser adicionadas aqui no futuro
  };
};
