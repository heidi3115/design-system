import { differenceInCalendarDays } from 'date-fns';

type RangeType = 'start' | 'end';

type UseCheckDateRangeValidityOptions = {
  maxRange?: number;
  minRange?: number;
};

type CheckDateRangeParams = {
  target: Date;
  compare?: Date | 'init';
  type: RangeType;
};

/**
 * useCheckDateRangeValidity
 *
 * 날짜 범위 유효성을 검사하는 커스텀 훅입니다.
 *
 * @param maxRange - 허용되는 최대 범위 (일수 기준). 이보다 크면 에러 반환.
 * @param minRange - 허용되는 최소 범위 (일수 기준). 이보다 작으면 에러 반환.
 *
 * @returns checkDateRangeValidity 함수: 주어진 두 날짜(target, compare)와 타입에 따라 유효성을 검사하고,
 *          유효하지 않은 경우 에러 메시지와 함께 반환합니다.
 */
export function useCheckDateRangeValidity({ maxRange, minRange }: UseCheckDateRangeValidityOptions = {}) {
  /**
   * checkDateRangeValidity
   *
   * 날짜 유효성을 검사하는 함수입니다.
   * - 시작 날짜는 종료 날짜보다 이전이어야 합니다.
   * - 종료 날짜는 시작 날짜보다 이후여야 합니다.
   * - 날짜 간 차이가 최대 범위를 초과하거나 최소 범위 미만일 경우 에러를 반환합니다.
   *
   * @param target - 기준이 되는 날짜 (사용자가 선택한 날짜)
   * @param compare - 비교 대상 날짜
   * @param type - 날짜 비교 기준 ('start' | 'end')
   *
   * @returns isError - 유효성 검사 결과 (true일 경우 에러)
   * @returns errorMessage - 유효하지 않을 경우의 에러 메시지 (옵셔널)
   */
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

    const invalid = type === 'start' ? target >= compare : target < compare;

    if (invalid) {
      const message =
        type === 'start' ? '시작 날짜가 종료 날짜보다 늦거나 같습니다.' : '종료 날짜가 시작 날짜보다 빠릅니다.';

      return {
        isError: true,
        errorMessage: message,
      };
    }

    const diff = differenceInCalendarDays(target, compare);

    if (typeof maxRange === 'number' && Math.abs(diff) > maxRange) {
      const message = `Max 범위 (${maxRange}일)를 초과했습니다.`;

      return {
        isError: true,
        errorMessage: message,
      };
    }

    if (typeof minRange === 'number' && Math.abs(diff) < minRange) {
      const message = `Min 범위 (${minRange}일)보다 작습니다.`;

      return {
        isError: true,
        errorMessage: message,
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
