const getViteEnv = (key: string, defaultValue: string = ''): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key] as string;
  }
  return defaultValue;
};

const getApiBaseUrl = (): string => {
  const aiServiceUrl = getViteEnv('VITE_AI_SERVICE_URL', 'https://api.gaqno.com.br/ai');
  return aiServiceUrl.replace(/\/$/, '');
};

export const audioApi = {
  async generateAudio(body: {
    text: string;
    voiceId?: string;
    stability?: number;
    similarityBoost?: number;
  }): Promise<Blob> {
    const response = await fetch(`${getApiBaseUrl()}/audio/text-to-speech`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: {
          text: body.text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: body.stability ?? 0.5,
            similarity_boost: body.similarityBoost ?? 0.75,
          },
        },
        headers: ['audio/mpeg'],
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: `HTTP Error ${response.status}` }));
      throw new Error(error.message || `HTTP Error ${response.status}`);
    }

    return await response.blob();
  },
};
