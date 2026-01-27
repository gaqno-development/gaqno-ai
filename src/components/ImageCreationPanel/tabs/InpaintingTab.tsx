import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@gaqno-development/frontcore/components/ui';
import { Paintbrush } from 'lucide-react';

export function InpaintingTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Paintbrush className="h-5 w-5" />
          Inpainting
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Em breve.</p>
      </CardContent>
    </Card>
  );
}
