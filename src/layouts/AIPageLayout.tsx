import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@gaqno-development/frontcore/components/ui';
import type { LucideIcon } from 'lucide-react';

export interface AIPageLayoutTab {
  id: string;
  label: string;
  icon?: LucideIcon;
}

export interface AIPageLayoutProps {
  tabs: AIPageLayoutTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  children: React.ReactNode;
  title?: string;
}

export function AIPageLayout({ tabs, activeTab, onTabChange, children, title }: AIPageLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="px-6 py-4">
          {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
          <Tabs value={activeTab} onValueChange={onTabChange}>
            <TabsList>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    {Icon && <Icon className="h-4 w-4 mr-2" />}
                    {tab.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        {children}
      </div>
    </div>
  );
}
