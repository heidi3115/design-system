import { ReactNode } from 'react';
import { Metadata } from 'next';
import { MainContent } from '../components/MainContent';

export const metadata: Metadata = {
  title: 'InBox',
};

export default function BoxLayout({ children }: { children: ReactNode }) {
  return <MainContent contentType="inBox">{children}</MainContent>;
}
