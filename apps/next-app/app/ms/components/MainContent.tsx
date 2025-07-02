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
  contentType?: 'tabs' | 'box' | 'flex';
}) {
  return (
    <div
      className={`
        flex-col overflow-auto
        ${contentType === 'box' && 'p-7'}
        ${contentType === 'tabs' && 'px-7 pb-7'}
        ${contentType === 'flex' && 'p-0'}
        ${className}
    `}
      style={{ height: `calc(100svh - ${headerHeight}px)` }}
      {...props}>
      <section className="layout-min-width h-full overflow-auto">
        {contentType === 'box' ? <div className="bg-juiBackground-paper min-h-full">{children}</div> : children}
      </section>
    </div>
  );
}
