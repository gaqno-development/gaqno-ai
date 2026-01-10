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

export const booksApi = {
  async generateBlueprint(body: {
    title?: string;
    genre?: string;
    description?: string;
    bookContext?: Record<string, any>;
  }): Promise<any> {
    const response = await fetch(`${getApiBaseUrl()}/books/generate-blueprint`, {
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

  async analyzeCharacter(body: {
    characterDescription?: string;
    characterName?: string;
    bookContext?: Record<string, any>;
  }): Promise<{ characterDetails?: any }> {
    const response = await fetch(`${getApiBaseUrl()}/books/analyze-character`, {
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

  async generateCharacterAvatar(body: {
    characterName?: string;
    characterDescription?: string;
  }): Promise<{ imageUrl?: string; avatarPrompt?: string }> {
    const response = await fetch(`${getApiBaseUrl()}/books/generate-character-avatar`, {
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

  async analyzeContext(body: {
    bookContext?: any;
    currentChapterNumber?: number;
    currentChapterTitle?: string;
    currentChapterSummary?: string;
    previousChapters?: Array<any>;
    previousChapter?: any;
    characters?: Array<any>;
  }): Promise<{ analysis: string }> {
    const response = await fetch(`${getApiBaseUrl()}/books/analyze-context`, {
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

  async generateChapter(body: {
    bookContext?: any;
    chapterNumber?: number;
    chapterTitle?: string;
    previousChapters?: Array<any>;
    previousChapter?: any;
    characters?: Array<any>;
    complexity?: number;
    tone?: string;
    useAnalysis?: boolean;
    contextualAnalysis?: string;
    minWordsPerChapter?: number;
  }): Promise<{
    content?: string;
    title?: string;
    summary?: string;
    wordCount?: number;
    expanded?: boolean;
    expansionAttempts?: number;
  }> {
    const response = await fetch(`${getApiBaseUrl()}/books/generate-chapter`, {
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
