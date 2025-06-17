import { useMemo } from 'react';

/**
 * 주어진 className 문자열에서 특정 prefix로 시작하는 클래스를 추출하여
 * prefix를 제외한 나머지 문자열만 반환하는 커스텀 훅
 *
 * @param className - 대상 className 문자열
 * @param prefix - 추출할 클래스의 접두사 (기본값: 'bg-')
 * @returns prefix를 제외한 클래스 이름 (없으면 undefined)
 */
function useExtractClassName(className?: string, prefix: string = 'bg-'): string | undefined {
  return useMemo(() => {
    if (!className) return undefined;

    const matchedClass = className.split(' ').find((cls) => cls.startsWith(prefix));

    if (!matchedClass) return undefined;

    return matchedClass.replace(prefix, '');
  }, [className, prefix]);
}

export default useExtractClassName;
