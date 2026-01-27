import { useMutation } from '@tanstack/react-query';
import { imagesApi } from '@/utils/api/imagesApi';
import type { ImageGenerationRequest } from '@/types/images';

export const useImageGenerationMutations = () => {
  const generate = useMutation({
    mutationFn: async (request: ImageGenerationRequest) => {
      return await imagesApi.generateImage(request);
    },
  });

  return {
    generate,
  };
};
