import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@gaqno-development/frontcore/components/ui';
import { EditImageTab, TextToImageTab } from './tabs';
import type { ImageCreationPanelProps } from './types';

export const ImageCreationPanel: React.FC<ImageCreationPanelProps> = ({
  className,
  activeTab,
  onTabChange,
}) => {
  const controlled = activeTab != null && onTabChange != null;

  return (
    <div className={className}>
      <Tabs
        value={controlled ? activeTab : undefined}
        defaultValue={controlled ? undefined : 'text'}
        onValueChange={controlled ? onTabChange : undefined}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">Texto para Imagem</TabsTrigger>
          <TabsTrigger value="edit">Editar Imagem</TabsTrigger>
        </TabsList>
        <TabsContent value="text" className="mt-4">
          <TextToImageTab />
        </TabsContent>
        <TabsContent value="edit" className="mt-4">
          <EditImageTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
