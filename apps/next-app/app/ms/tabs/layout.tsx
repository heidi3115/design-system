import { ReactNode } from 'react';
import { Metadata } from 'next';
import { MainContent } from '../components/MainContent';

export const metadata: Metadata = {
  title: 'Tabs',
};

export default function TabsLayout({ children }: { children: ReactNode }) {
  return <MainContent contentType="tabs">{children}</MainContent>;
}
