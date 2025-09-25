import { ReactNode } from 'react';
import { Metadata } from 'next';
import { MainContent } from '../../../../components/MainContent';
import Breadcrumbs from '../../../../components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Detect/Scenario',
};

export default function ScenarioLayout({ children }: { children: ReactNode }) {
  return (
    <MainContent contentType="tabs">
      <Breadcrumbs />
      {children}
    </MainContent>
  );
}
