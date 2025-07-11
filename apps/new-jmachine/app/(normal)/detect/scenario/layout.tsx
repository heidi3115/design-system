import { ReactNode } from 'react';
import { Metadata } from 'next';
import { MainContent } from '../../../../components/MainContent';

export const metadata: Metadata = {
  title: 'Detect/Scenario',
};

export default function ScenarioLayout({ children }: { children: ReactNode }) {
  return <MainContent contentType="box">{children}</MainContent>;
}
