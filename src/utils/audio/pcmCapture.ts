const TARGET_SAMPLE_RATE = 16000;

function float32ToInt16(float32: Float32Array): Int16Array {
  const len = float32.length;
  const int16 = new Int16Array(len);
  for (let i = 0; i < len; i++) {
    const s = Math.max(-1, Math.min(1, float32[i]));
    int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return int16;
}

function linearInterp(arr: Float32Array, idx: number): number {
  const i0 = Math.floor(idx);
  const i1 = Math.min(i0 + 1, arr.length - 1);
  const t = idx - i0;
  return arr[i0] * (1 - t) + arr[i1] * t;
}

function resampleTo16k(float32: Float32Array, fromRate: number): Float32Array {
  if (fromRate === TARGET_SAMPLE_RATE) return float32;
  const outLen = Math.floor(float32.length * TARGET_SAMPLE_RATE / fromRate);
  const out = new Float32Array(outLen);
  for (let i = 0; i < outLen; i++) {
    const srcIdx = (i * fromRate) / TARGET_SAMPLE_RATE;
    out[i] = linearInterp(float32, srcIdx);
  }
  return out;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export type RealtimePcmCaptureStop = () => void;

export function startRealtimePcmCapture(
  stream: MediaStream,
  sendChunk: (audioBase64: string, commit: boolean, sampleRate: number) => void,
): RealtimePcmCaptureStop {
  const audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(stream);
  const bufferSize = 4096;
  const processor = audioContext.createScriptProcessor(bufferSize, 1, 1);

  processor.onaudioprocess = (e: AudioProcessingEvent) => {
    const input = e.inputBuffer.getChannelData(0);
    const sampleRate = audioContext.sampleRate;
    const at16k = resampleTo16k(input, sampleRate);
    const pcm16 = float32ToInt16(at16k);
    const b64 = arrayBufferToBase64(pcm16.buffer);
    sendChunk(b64, false, TARGET_SAMPLE_RATE);
  };

  source.connect(processor);
  processor.connect(audioContext.destination);

  return () => {
    processor.disconnect();
    source.disconnect();
    audioContext.close();
  };
}
