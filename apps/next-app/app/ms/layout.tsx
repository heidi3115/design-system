import { ReactNode } from 'react';
import { Toaster } from '@common/ui';

export default function MsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h2>MS 테스트 페이지 전용 레이아웃</h2>
      {children}
      <Toaster position="top-center" closeButton />
    </div>
  );
}
