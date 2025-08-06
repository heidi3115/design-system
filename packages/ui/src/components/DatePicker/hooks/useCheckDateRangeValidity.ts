'use client';

type RangeType = 'start' | 'end';

type UseCheckDateRangeValidityOptions = {
  maxRange?: number; // 단위: 일
  minRange?: number; // 단위: 일
};

type CheckDateRangeParams = {
  target: Date;
  compare?: Date | 'init';
  type: RangeType;
};

/**
 * useCheckDateRangeValidity
 *
 * 날짜 범위 유효성을 검사하는 커스텀 훅입니다. (시간까지 포함)
 */
export function useCheckDateRangeValidity({ maxRange, minRange }: UseCheckDateRangeValidityOptions = {}) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const checkDateRangeValidity = ({
    target,
    compare,
    type,
  }: CheckDateRangeParams): {
    isError: boolean;
    errorMessage?: string;
  } => {
    if (!compare || !(compare instanceof Date)) {
      return {
        isError: false,
        errorMessage: undefined,
      };
    }

    const targetTime = target.getTime();
    const compareTime = compare.getTime();

    const invalid = type === 'start' ? targetTime >= compareTime : targetTime < compareTime;

    if (invalid) {
      const message =
        type === 'start' ? '시작 날짜가 종료 날짜보다 늦거나 같습니다.' : '종료 날짜가 시작 날짜보다 빠릅니다.';

      return {
        isError: true,
        errorMessage: message,
      };
    }

    const diffInMs = targetTime - compareTime;
    const absDiffInDays = Math.abs(diffInMs / MS_PER_DAY);

    if (typeof maxRange === 'number' && absDiffInDays > maxRange) {
      return {
        isError: true,
        errorMessage: `Max 범위 (${maxRange}일)를 초과했습니다.`,
      };
    }

    if (typeof minRange === 'number' && absDiffInDays < minRange) {
      return {
        isError: true,
        errorMessage: `Min 범위 (${minRange}일)보다 작습니다.`,
      };
    }

    return {
      isError: false,
      errorMessage: undefined,
    };
  };

  return {
    checkDateRangeValidity,
  };
}
