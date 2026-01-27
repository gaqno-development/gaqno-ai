import { VideoCreationPanel } from '../VideoCreationPanel';
import { VideoMode } from '@/types/videos/video-types';

export function ModifyVideoTab() {
  return <VideoCreationPanel defaultMode={VideoMode.MODIFY_VIDEO} />;
}
