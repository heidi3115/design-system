import * as React from 'react';

export type CloneBadgeChildProps = React.HTMLAttributes<HTMLElement> & {
  [key: `data-${string}`]: string | undefined; // 인덱스 시그니처로 data-* 속성 허용하여 typescript TS2769 에러 처리.
  variant?: string | undefined; // asChild시 각 Badge 컴포넌트 의 스타일이 우선이 되도록 기본이자 공통인 variant 제거용.
};

/**
 * children에서 string/number만 추출하여 하나의 문자열로 반환합니다.
 * - 단일 children, 배열, Fragment, 중첩 구조 모두 지원
 * - 아이콘 등 텍스트가 없는 ReactElement는 무시
 */
export function getStringFromChildren(children: React.ReactNode): string | undefined {
  // text나 숫자의 경우만 title 로 처리.
  if (typeof children === 'string' || typeof children === 'number') {
    return children.toString();
  }

  // ReactElement의 경우, props.children을 재귀적으로 처리
  if (React.isValidElement(children)) {
    return getStringFromChildren((children as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  }

  // null, undefined, icon 과 문자가 있는 경우 등 기타(배열/Fragment/복합 children 등)은 React.Children.map으로 재귀 처리
  const result = (React.Children.map(children, getStringFromChildren) ?? [])
    .filter((v): v is string => typeof v === 'string' && v.length > 0)
    .join(' ');

  return result.length > 0 ? result : undefined;
}
