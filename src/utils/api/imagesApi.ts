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

export const imagesApi = {
  async generateImage(body: {
    prompt: string;
    style?: string;
    aspect_ratio?: string;
    negative_tags?: string[];
  }): Promise<any> {
    const response = await fetch(`${getApiBaseUrl()}/v1/images/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: `HTTP Error ${response.status}` }));
      throw new Error(error.message || `HTTP Error ${response.status}`);
    }

    return await response.json();
  },
};
