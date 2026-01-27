import type { LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';

export interface ChildConfig {
  segment: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface SectionWithSubNavProps {
  basePath: string;
  defaultSegment: string;
  children: ChildConfig[];
  segmentToComponent: Record<string, ComponentType>;
  title?: string;
  variant?: 'horizontal' | 'vertical';
}
