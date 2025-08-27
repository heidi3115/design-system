'use client';

import { cn } from '@common/ui/lib/utils';
import React from 'react';

export type HighlightedTextProps = {
  /** 하이라이팅 여부 */
  isHightLighting?: boolean;
  /** 표시할 텍스트 */
  text: string;
  /** 하이라이팅할 검색어 */
  searchQuery?: string;
  /** 추가 하이라이트 CSS 클래스 */
  className?: string;
};

/**
 * 검색어와 일치하는 부분을 하이라이팅하는 텍스트 컴포넌트
 */
export default function HighlightedText({
  isHightLighting = false,
  text = '',
  searchQuery = '',
  className,
}: HighlightedTextProps) {
  // isHightLighting이 false이거나 검색어가 없는 경우 일반 텍스트 반환
  if (!isHightLighting || !searchQuery || !searchQuery.trim()) {
    return (
      <span data-matched={false} className={cn('select-none')}>
        {text}
      </span>
    );
  }

  // 정규식에서 특수 문자 이스케이프 처리
  const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  try {
    // 대소문자 무시하고 검색어로 텍스트 분할
    const escapedQuery = escapeRegExp(searchQuery.trim());
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const parts = text.split(regex);

    return (
      <React.Fragment>
        {parts.map((part, index: number) => {
          // 검색어와 일치하는 부분인지 확인 (대소문자 무시)
          const isMatch = part.toLowerCase() === searchQuery.toLowerCase();

          return isMatch ? (
            <span
              key={index}
              data-matched={true}
              className={cn('select-none', 'font-bold bg-juiText-primary/30', isHightLighting && className)}>
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          );
        })}
      </React.Fragment>
    );
  } catch (error) {
    // 정규식 오류가 발생한 경우 일반 텍스트로 폴백
    console.warn('HighlightedText: Invalid search query', error);

    return (
      <span data-matched={false} className={cn('select-none')}>
        {text}
      </span>
    );
  }
}
