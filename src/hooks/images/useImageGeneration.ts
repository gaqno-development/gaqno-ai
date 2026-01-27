import { useImageGenerationQueries } from '@/hooks/queries/useImageQueries';
import { useImageGenerationMutations } from '@/hooks/mutations/useImageMutations';

export const useImageGeneration = () => {
  const queries = useImageGenerationQueries();
  const mutations = useImageGenerationMutations();

  return {
    generate: mutations.generate,
  };
};
