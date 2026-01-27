import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@gaqno-development/frontcore/components/ui';
import {
  TtsTab,
  SttTab,
  MusicTab,
  VoiceChangerTab,
  SoundEffectsTab,
  AudioIsolationTab,
  PodcastTab,
} from './tabs';
import type { AudioCreationPanelProps } from './types';

export const AudioCreationPanel: React.FC<AudioCreationPanelProps> = ({
  className,
  activeTab,
  onTabChange,
}) => {
  const controlled = activeTab != null && onTabChange != null;
  return (
    <div className={className}>
      <Tabs
        value={controlled ? activeTab : undefined}
        defaultValue={controlled ? undefined : 'tts'}
        onValueChange={controlled ? onTabChange : undefined}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="tts">TTS</TabsTrigger>
          <TabsTrigger value="stt">STT</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="voice">Voice</TabsTrigger>
          <TabsTrigger value="sfx">Sound FX</TabsTrigger>
          <TabsTrigger value="isolation">Isolation</TabsTrigger>
          <TabsTrigger value="podcast">Podcast</TabsTrigger>
        </TabsList>
        <TabsContent value="tts" className="mt-4">
          <TtsTab />
        </TabsContent>
        <TabsContent value="stt" className="mt-4">
          <SttTab />
        </TabsContent>
        <TabsContent value="music" className="mt-4">
          <MusicTab />
        </TabsContent>
        <TabsContent value="voice" className="mt-4">
          <VoiceChangerTab />
        </TabsContent>
        <TabsContent value="sfx" className="mt-4">
          <SoundEffectsTab />
        </TabsContent>
        <TabsContent value="isolation" className="mt-4">
          <AudioIsolationTab />
        </TabsContent>
        <TabsContent value="podcast" className="mt-4">
          <PodcastTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
