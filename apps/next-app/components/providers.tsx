'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { DndContext } from '@dnd-kit/core';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DndContext>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        enableColorScheme>
        {children}
      </NextThemesProvider>
    </DndContext>
  );
}
