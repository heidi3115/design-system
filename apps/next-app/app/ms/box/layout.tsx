'use client';

import { ReactNode } from 'react';
import { MainContent } from '../components/MainContent';

export default function BoxLayout({ children }: { children: ReactNode }) {
  return <MainContent contentType="box">{children}</MainContent>;
}
