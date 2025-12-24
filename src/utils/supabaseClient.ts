

interface InvokeOptions {
  body?: unknown
}

interface InvokeResponse<T = unknown> {
  data: T | null
  error: { message: string; status?: number } | null
}

const getViteEnv = (key: string, defaultValue: string = ''): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key] as string;
  }
  return defaultValue;
};

export const useSupabaseClient = () => {
  const SUPABASE_URL = getViteEnv('VITE_SUPABASE_URL')
  const SUPABASE_ANON_KEY = getViteEnv('VITE_SUPABASE_ANON_KEY')

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase env vars missing. AI features will not work.')
  }

  const invoke = async <T>(
    functionName: string,
    options?: InvokeOptions
  ): Promise<InvokeResponse<T>> => {
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/${functionName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(options?.body || {}),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        return {
          data: null,
          error: {
            message: data?.error || `HTTP Error ${response.status}`,
            status: response.status,
          },
        }
      }
      return { data, error: null }
    } catch (err) {
      return {
        data: null,
        error: { message: (err as Error).message || 'Network error' },
      }
    }
  }

  return { functions: { invoke } }
}

