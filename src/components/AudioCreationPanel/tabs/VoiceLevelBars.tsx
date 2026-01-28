import React, { useEffect, useRef, useState } from 'react';

const BAR_COUNT = 8;
const FFT_SIZE = 256;
const SMOOTHING = 0.75;
const MIN_HEIGHT_PERCENT = 8;
const IDLE_HEIGHT_PERCENT = 12;

export interface VoiceLevelBarsProps {
  stream: MediaStream | null;
  className?: string;
}

export function VoiceLevelBars({ stream, className = '' }: VoiceLevelBarsProps) {
  const [levels, setLevels] = useState<number[]>(() =>
    Array.from({ length: BAR_COUNT }, () => IDLE_HEIGHT_PERCENT),
  );
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const frameRef = useRef<number>(0);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (!stream || stream.getAudioTracks().length === 0) {
      setLevels(Array.from({ length: BAR_COUNT }, () => IDLE_HEIGHT_PERCENT));
      return;
    }

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = FFT_SIZE;
    analyser.smoothingTimeConstant = SMOOTHING;
    source.connect(analyser);

    audioContextRef.current = audioContext;
    sourceRef.current = source;
    analyserRef.current = analyser;
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

    const binsPerBar = Math.floor(analyser.frequencyBinCount / BAR_COUNT);

    const loop = () => {
      const analyserNode = analyserRef.current;
      const dataArray = dataArrayRef.current;
      if (!analyserNode || !dataArray) return;

      analyserNode.getByteFrequencyData(dataArray);
      const next: number[] = [];
      for (let i = 0; i < BAR_COUNT; i++) {
        let sum = 0;
        const start = i * binsPerBar;
        const end = Math.min(start + binsPerBar, dataArray.length);
        for (let j = start; j < end; j++) sum += dataArray[j];
        const avg = end > start ? sum / (end - start) : 0;
        const normalized = MIN_HEIGHT_PERCENT + (avg / 255) * (100 - MIN_HEIGHT_PERCENT);
        next.push(Math.round(normalized));
      }
      setLevels(next);
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      source.disconnect();
      analyserRef.current = null;
      sourceRef.current = null;
      audioContextRef.current?.close();
      audioContextRef.current = null;
    };
  }, [stream]);

  return (
    <div
      className={`flex items-end justify-center gap-1 h-12 ${className}`}
      role="img"
      aria-label="Voice level"
    >
      {levels.map((height, i) => (
        <div
          key={i}
          className="w-1.5 min-h-[8%] rounded-full bg-primary transition-[height] duration-75 ease-out"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}
