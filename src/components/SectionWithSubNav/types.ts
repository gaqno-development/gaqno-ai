import type { IconComponent } from '@gaqno-development/frontcore/utils';
import type { ComponentType } from 'react';

export interface ChildConfig {
  segment: string;
  label: string;
  href: string;
  icon: IconComponent;
}

export interface SectionWithSubNavProps {
  basePath: string;
  defaultSegment: string;
  children: ChildConfig[];
  segmentToComponent: Record<string, ComponentType>;
  title?: string;
  variant?: 'horizontal' | 'vertical';
}
