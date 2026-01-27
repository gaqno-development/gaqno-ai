export enum VideoMode {
  MODIFY_VIDEO = 'modify_video',
  USE_VIDEO_REFERENCE = 'use_video_reference',
}

export enum VideoGenerationStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export type { VideoModel, VideoGenerationRequest, VideoGenerationResponse, UploadAssetResponse } from '@gaqno-development/types/video';
