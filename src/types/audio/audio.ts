export interface AudioGenerationRequest {
  text: string;
  voiceId?: string;
  stability?: number;
  similarityBoost?: number;
}

export interface AudioGenerationResponse {
  audioUrl: string;
  metadata: {
    text: string;
    provider: 'elevenlabs';
  };
}

export interface TranscribeRequest {
  model_id: 'scribe_v1' | 'scribe_v2';
  language_code?: string;
  tag_audio_events?: boolean;
  diarize?: boolean;
}

export interface TranscribeResponse {
  text: string;
  words?: Array<{
    text: string;
    start: number;
    end: number;
    type: string;
    speaker_id?: string;
    logprob?: number;
  }>;
  language_code?: string;
  language_probability?: number;
}

export interface MusicStreamRequest {
  prompt?: string | null;
  composition_plan?: {
    positive_global_styles: string[];
    negative_global_styles: string[];
    sections: Array<{
      section_name: string;
      positive_local_styles: string[];
      negative_local_styles: string[];
      duration_ms: number;
      lines: string[];
      source_from?: unknown;
    }>;
  } | null;
  music_length_ms?: number | null;
  model_id?: string;
  force_instrumental?: boolean;
  store_for_inpainting?: boolean;
}

export interface VoiceChangerRequest {
  output_format?: string;
  model_id?: string;
  remove_background_noise?: boolean;
}

export interface SoundEffectRequest {
  text: string;
  loop?: boolean;
  duration_seconds?: number | null;
  prompt_influence?: number | null;
  model_id?: string;
}

export interface RealtimeSttTokenResponse {
  token: string;
  wsUrl: string;
}

export interface TtsStreamInputTokenResponse {
  token: string;
  wsUrlTemplate: string;
}

export interface AudioIsolationRequest {
  file_format?: 'pcm_s16le_16' | 'other';
}
