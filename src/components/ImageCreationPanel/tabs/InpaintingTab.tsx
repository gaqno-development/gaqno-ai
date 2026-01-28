import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@gaqno-development/frontcore/components/ui';
import { PaintIcon } from '@gaqno-development/frontcore/components/icons';

export function InpaintingTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PaintIcon className="h-5 w-5" size={20} />
          Inpainting
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Em breve.</p>
      </CardContent>
    </Card>
  );
}
