import { useAudioGenerationQueries } from '@/hooks/queries/useAudioQueries';
import { useAudioGenerationMutations } from '@/hooks/mutations/useAudioMutations';

export const useAudioGeneration = () => {
  const queries = useAudioGenerationQueries();
  const mutations = useAudioGenerationMutations();

  return {
    generate: mutations.generate,
  };
};
