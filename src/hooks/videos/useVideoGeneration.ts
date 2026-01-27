import { useVideoModelsQueries, useVideoGenerationQueries } from '@/hooks/queries/useVideoQueries';
import { useVideoMutations } from '@/hooks/mutations/useVideoMutations';

export const useVideoModels = () => {
  const queries = useVideoModelsQueries();
  return queries.getAll;
};

export const useVideoGeneration = () => {
  const mutations = useVideoMutations();
  const queries = useVideoGenerationQueries();

  return {
    generate: mutations.generate,
    getStatus: queries.getStatus,
  };
};

export const useVideoUpload = () => {
  const mutations = useVideoMutations();
  return mutations.upload;
};
