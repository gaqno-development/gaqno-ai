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
