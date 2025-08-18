'use client';

import ErrorFallback from '../components/ErrorFallback';

export default function NotFound() {
  return <ErrorFallback message="페이지를 찾을 수 없습니다." />;
}
