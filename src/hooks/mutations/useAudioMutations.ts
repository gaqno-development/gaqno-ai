import { useMutation } from '@tanstack/react-query';
import { audioApi } from '@/utils/api/audioApi';
import type {
  AudioGenerationRequest,
  MusicStreamRequest,
  SoundEffectRequest,
  TranscribeRequest,
  VoiceChangerRequest,
} from '@/types/audio';

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

export const useTranscribeMutations = () => {
  const transcribe = useMutation({
    mutationFn: async ({
      file,
      params,
    }: {
      file: File;
      params: TranscribeRequest;
    }) => {
      return audioApi.transcribe(file, params);
    },
  });
  return { transcribe };
};

export const useMusicMutations = () => {
  const generateMusic = useMutation({
    mutationFn: async ({
      body,
      outputFormat,
    }: {
      body: MusicStreamRequest;
      outputFormat?: string;
    }) => {
      const blob = await audioApi.generateMusic(body, outputFormat);
      const audioUrl = URL.createObjectURL(blob);
      return {
        audioUrl,
        metadata: { provider: 'elevenlabs' as const },
      };
    },
  });
  return { generateMusic };
};

export const useVoiceChangerMutations = () => {
  const voiceChanger = useMutation({
    mutationFn: async ({
      voiceId,
      file,
      query,
    }: {
      voiceId: string;
      file: File;
      query?: VoiceChangerRequest;
    }) => {
      const blob = await audioApi.voiceChanger(voiceId, file, query);
      const audioUrl = URL.createObjectURL(blob);
      return {
        audioUrl,
        metadata: { provider: 'elevenlabs' as const },
      };
    },
  });
  return { voiceChanger };
};

export const useSoundEffectMutations = () => {
  const generateSoundEffect = useMutation({
    mutationFn: async ({
      body,
      outputFormat,
    }: {
      body: SoundEffectRequest;
      outputFormat?: string;
    }) => {
      const blob = await audioApi.generateSoundEffect(body, outputFormat);
      const audioUrl = URL.createObjectURL(blob);
      return {
        audioUrl,
        metadata: { text: body.text, provider: 'elevenlabs' as const },
      };
    },
  });
  return { generateSoundEffect };
};

export const useAudioIsolationMutations = () => {
  const audioIsolation = useMutation({
    mutationFn: async ({
      file,
      fileFormat,
    }: {
      file: File;
      fileFormat?: 'pcm_s16le_16' | 'other';
    }) => {
      const blob = await audioApi.audioIsolation(file, fileFormat);
      const audioUrl = URL.createObjectURL(blob);
      return {
        audioUrl,
        metadata: { provider: 'elevenlabs' as const },
      };
    },
  });
  return { audioIsolation };
};
