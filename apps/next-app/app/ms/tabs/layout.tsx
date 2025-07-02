'use client';

import { ReactNode } from 'react';
import { MainContent } from '../components/MainContent';

export default function TabsLayout({ children }: { children: ReactNode }) {
  return <MainContent contentType="tabs">{children}</MainContent>;
}
