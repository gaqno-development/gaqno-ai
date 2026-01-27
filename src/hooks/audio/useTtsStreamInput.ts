import { useCallback, useEffect, useRef, useState } from 'react';
import { audioApi } from '@/utils/api/audioApi';

export interface UseTtsStreamInputResult {
  connect: (voiceId: string) => Promise<void>;
  disconnect: () => void;
  speak: (text: string) => void;
  flush: () => void;
  audioChunks: string[];
  isFinal: boolean;
  error: string | null;
  isConnected: boolean;
  clearChunks: () => void;
}

export function useTtsStreamInput(): UseTtsStreamInputResult {
  const [audioChunks, setAudioChunks] = useState<string[]>([]);
  const [isFinal, setIsFinal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const voiceIdRef = useRef<string | null>(null);

  const clearChunks = useCallback(() => {
    setAudioChunks([]);
    setIsFinal(false);
  }, []);

  const disconnect = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ text: '' }));
      wsRef.current.close();
    }
    wsRef.current = null;
    voiceIdRef.current = null;
    setIsConnected(false);
    setError(null);
  }, []);

  const connect = useCallback(async (voiceId: string) => {
    disconnect();
    setError(null);
    voiceIdRef.current = voiceId;
    try {
      const { token, wsUrlTemplate } = await audioApi.getTtsStreamInputToken();
      const wsUrl = wsUrlTemplate.replace(/{voiceId}/g, encodeURIComponent(voiceId));
      const url = `${wsUrl}?authorization=Bearer ${encodeURIComponent(token)}`;
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        ws.send(JSON.stringify({ text: ' ' }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data as string);
          if (typeof data.audio === 'string')
            setAudioChunks((prev) => [...prev, data.audio]);
          if (data.isFinal === true) setIsFinal(true);
        } catch {
          setError('Invalid message from server');
        }
      };

      ws.onerror = () => setError('WebSocket error');
      ws.onclose = () => {
        wsRef.current = null;
        voiceIdRef.current = null;
        setIsConnected(false);
      };
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to connect');
    }
  }, [disconnect]);

  const speak = useCallback((text: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    const t = text.endsWith(' ') ? text : `${text} `;
    wsRef.current.send(JSON.stringify({ text: t }));
  }, []);

  const flush = useCallback(() => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ text: ' ', flush: true }));
  }, []);

  useEffect(() => () => disconnect(), [disconnect]);

  return {
    connect,
    disconnect,
    speak,
    flush,
    audioChunks,
    isFinal,
    error,
    isConnected,
    clearChunks,
  };
}
