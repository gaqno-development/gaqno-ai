import { useCallback, useEffect, useRef, useState } from 'react';
import { audioApi } from '@/utils/api/audioApi';

export interface UseRealtimeSttResult {
  connect: (onOpen?: () => void) => Promise<void>;
  disconnect: () => void;
  commit: () => void;
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
  const hasSentAudioRef = useRef(false);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
    setError(null);
  }, []);

  const connect = useCallback(async (onOpen?: () => void) => {
    disconnect();
    setError(null);
    try {
      const { token, wsUrl } = await audioApi.getRealtimeSttToken();
      const url = `${wsUrl}?token=${encodeURIComponent(token)}`;
      const ws = new WebSocket(url);
      wsRef.current = ws;
      hasSentAudioRef.current = false;

      ws.onopen = () => {
        setIsConnected(true);
        onOpen?.();
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data as string);
          const mt = data.message_type;
          if (mt === 'partial_transcript') setPartialTranscript(data.text ?? '');
          if (mt === 'committed_transcript' || mt === 'committed_transcript_with_timestamps')
            setCommittedTranscript((prev) => (prev ? `${prev} ${data.text}` : (data.text ?? '')).trim());
          if (mt === 'commit_throttled') return;
          const errMsg = data.error ?? data.message ?? 'Unknown error';
          if (
            mt === 'error' ||
            mt === 'auth_error' ||
            mt === 'quota_exceeded' ||
            mt === 'rate_limited' ||
            mt === 'scribe_error' ||
            mt === 'scribe_auth_error' ||
            mt === 'scribe_quota_exceeded_error' ||
            mt === 'scribe_throttled_error' ||
            mt === 'scribe_rate_limited_error' ||
            mt === 'scribe_input_error' ||
            mt === 'scribe_transcriber_error' ||
            mt === 'scribe_chunk_size_exceeded_error' ||
            mt === 'scribe_insufficient_audio_activity_error'
          )
            setError(errMsg);
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
      if (audioBase64.length > 0) hasSentAudioRef.current = true;
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

  const commit = useCallback(() => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    if (!hasSentAudioRef.current) return;
    wsRef.current.send(
      JSON.stringify({
        message_type: 'input_audio_chunk',
        audio_base_64: '',
        commit: true,
        sample_rate: 16000,
      }),
    );
  }, []);

  useEffect(() => () => disconnect(), [disconnect]);

  return {
    connect,
    disconnect,
    commit,
    sendChunk,
    partialTranscript,
    committedTranscript,
    error,
    isConnected,
  };
}
