import { VideoCreationPanel } from '../VideoCreationPanel';
import { VideoMode } from '@/types/videos/video-types';

export function UseVideoReferenceTab() {
  return <VideoCreationPanel defaultMode={VideoMode.USE_VIDEO_REFERENCE} />;
}
