/**
 * 주어진 값(value)이 최소(min)와 최대(max) 범위 내에서 몇 퍼센트에 해당하는지 계산합니다.
 * min 값이 더 크거나 max 값과 min 값의 차이가 0인 경우 0을 반환합니다.
 * 결과값은 min ~ max 사이로 제한됩니다.
 *
 * @param value - 기준 값
 * @param min - 최소값 (기본값: 0)
 * @param max - 최대값 (기본값: 100)
 * @returns min ~ max 사이의 백분율 숫자값
 *
 * @example
 * convertValueToPercentage({ value: 6.25, min: 1, max: 10 }); // 58.333333333333336
 * convertValueToPercentage({ value: 120, min: 0, max: 100 }); // 100
 * convertValueToPercentage({ value: -10, min: 0, max: 100 }); // 0
 */

export function convertValueToPercentage({
  value = 0,
  min = 0,
  max = 100,
}: {
  value: number;
  min: number;
  max: number;
}): number {
  const range = max - min;

  if (range <= 0) {
    return 0;
  }

  const percentage = ((value - min) / range) * 100;

  return Math.max(0, Math.min(100, percentage));
}
