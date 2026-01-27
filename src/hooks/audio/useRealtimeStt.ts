import { useCallback, useEffect, useRef, useState } from 'react';
import { audioApi } from '@/utils/api/audioApi';

export interface UseRealtimeSttResult {
  connect: () => Promise<void>;
  disconnect: () => void;
  sendChunk: (audioBase64: string, commit: boolean, sampleRate: number) => void;
  partialTranscript: string;
  committedTranscript: string;
  error: string | null;
  isConnected: boolean;
}

export function useRealtimeStt(): UseRealtimeSttResult {
  const [partialTranscript, setPartialTranscript] = useState('');
  const [committedTranscript, setCommittedTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
    setError(null);
  }, []);

  const connect = useCallback(async () => {
    disconnect();
    setError(null);
    try {
      const { token, wsUrl } = await audioApi.getRealtimeSttToken();
      const url = `${wsUrl}?token=${encodeURIComponent(token)}`;
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => setIsConnected(true);

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data as string);
          const mt = data.message_type;
          if (mt === 'partial_transcript') setPartialTranscript(data.text ?? '');
          if (mt === 'committed_transcript' || mt === 'committed_transcript_with_timestamps')
            setCommittedTranscript((prev) => (prev ? `${prev} ${data.text}` : (data.text ?? '')).trim());
          if (mt === 'error' || mt === 'auth_error' || mt === 'quota_exceeded' || mt === 'rate_limited')
            setError(data.error ?? 'Unknown error');
        } catch {
          setError('Invalid message from server');
        }
      };

      ws.onerror = () => setError('WebSocket error');
      ws.onclose = () => {
        wsRef.current = null;
        setIsConnected(false);
      };
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to connect');
    }
  }, [disconnect]);

  const sendChunk = useCallback(
    (audioBase64: string, commit: boolean, sampleRate: number) => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
      wsRef.current.send(
        JSON.stringify({
          message_type: 'input_audio_chunk',
          audio_base_64: audioBase64,
          commit,
          sample_rate: sampleRate,
        }),
      );
    },
    [],
  );

  useEffect(() => () => disconnect(), [disconnect]);

  return {
    connect,
    disconnect,
    sendChunk,
    partialTranscript,
    committedTranscript,
    error,
    isConnected,
  };
}
