import React, { Suspense } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { cn } from '@gaqno-development/frontcore/lib/utils';
import { Breadcrumbs, LoadingSkeleton } from '@gaqno-development/frontcore/components/ui';
import type { SectionWithSubNavProps } from './types';

function getSegmentFromPath(pathname: string, basePath: string, validSegments: Set<string>): string | null {
  const pattern = new RegExp(`^${basePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/([^/]+)`);
  const match = pathname.match(pattern);
  return match && validSegments.has(match[1]) ? match[1] : null;
}

function renderNavLinks(
  children: SectionWithSubNavProps['children'],
  segment: string,
  linkClass: string
) {
  return children.map(({ segment: s, label, href, icon: Icon }) => {
    const isActive = segment === s;
    return (
      <Link
        key={s}
        to={href}
        className={cn(
          'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          linkClass
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {label}
      </Link>
    );
  });
}

export function SectionWithSubNav({
  basePath,
  defaultSegment,
  children,
  segmentToComponent,
  title,
  variant = 'horizontal',
}: SectionWithSubNavProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const validSegments = new Set(children.map((c) => c.segment));
  const segment = getSegmentFromPath(pathname, basePath, validSegments);
  const defaultRedirect = `${basePath}/${defaultSegment}`;

  React.useEffect(() => {
    const exact = pathname === basePath || pathname === `${basePath}/`;
    if (exact) navigate(defaultRedirect, { replace: true });
  }, [pathname, navigate, basePath, defaultRedirect]);

  if (pathname === basePath || pathname === `${basePath}/`) return null;

  if (!segment || !(segment in segmentToComponent)) {
    navigate(defaultRedirect, { replace: true });
    return null;
  }

  const ChildPage = segmentToComponent[segment] as React.ComponentType;
  const currentChild = children.find((c) => c.segment === segment);
  const currentLabel = currentChild?.label ?? segment ?? '';

  const breadcrumbItems = [
    { label: 'AI', href: '/ai/books' },
    ...(title ? [{ label: title, href: defaultRedirect }] : []),
    ...(currentLabel ? [{ label: currentLabel, href: undefined }] : []),
  ].filter((i) => i.label);

  const isVertical = variant === 'vertical';
  const showBreadcrumbs = breadcrumbItems.length > 0;

  const horizontalNav = (
    <div className="overflow-x-auto pb-2 -mx-1">
      <nav
        className="flex flex-nowrap gap-2 min-w-min border-b pb-3"
        aria-label={title ?? 'Sub-navegação'}
      >
        {renderNavLinks(children, segment, 'shrink-0')}
      </nav>
    </div>
  );

  const verticalSidebar = (
    <aside className="hidden sm:flex flex-col w-52 shrink-0 border-r pr-4">
      <nav
        className="flex flex-col gap-1"
        aria-label={title ?? 'Sub-navegação'}
      >
        {renderNavLinks(children, segment, 'w-full')}
      </nav>
    </aside>
  );

  return (
    <div className="flex flex-col gap-6">
      {showBreadcrumbs && (
        <Breadcrumbs items={breadcrumbItems} showHome={false} />
      )}
      {title && <h2 className="text-xl font-semibold">{title}</h2>}
      <div className={cn(isVertical && 'flex flex-col sm:flex-row sm:gap-8 gap-6')}>
        {isVertical ? (
          <>
            <div className="sm:hidden">{horizontalNav}</div>
            {verticalSidebar}
          </>
        ) : (
          horizontalNav
        )}
        <div className={cn('max-w-4xl', isVertical && 'sm:flex-1 sm:min-w-0')}>
          <h1 className="text-xl font-semibold mb-4">{currentChild?.label}</h1>
          <Suspense fallback={<LoadingSkeleton variant="card" count={1} />}>
            <ChildPage />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
