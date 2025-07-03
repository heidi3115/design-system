'use client';

import { ComponentProps } from 'react';

export function MainContent({
  children,
  className,
  headerHeight = 48,
  contentType = 'box',
  ...props
}: ComponentProps<'div'> & {
  headerHeight?: number;
  contentType?: 'tabs' | 'box' | 'inBox' | 'flex';
}) {
  return (
    <div
      className={`
        flex-col overflow-auto
        ${(contentType === 'box' || contentType === 'inBox') && 'p-7'}
        ${contentType === 'tabs' && 'px-7 pb-7'}
        ${contentType === 'flex' && 'p-0'}
        ${className}
    `}
      style={{ height: `calc(100svh - ${headerHeight}px)` }}
      {...props}>
      <section className="layout-min-width h-full overflow-auto">
        {contentType === 'box' || contentType === 'inBox' ? (
          <div
            className={`bg-juiBackground-paper ${contentType === 'inBox' ? 'p-4 h-full overflow-hidden' : 'min-h-full'}`}>
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    </div>
  );
}
