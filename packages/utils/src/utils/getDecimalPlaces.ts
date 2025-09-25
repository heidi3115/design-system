/**
 * 숫자의 소수점 이하 자릿수를 반환합니다. 정수인 경우 0 을 반환합니다.
 * 1.23e-10, 1e+5 등 지수 표기법(e-notation)의 경우,
 *
 * @param num - 자릿수를 구할 숫자
 * @returns 소수점 이하 자릿수 (정수면 0)
 *
 * @example
 * getDecimalPlaces(12.345); // 3
 * getDecimalPlaces(100);   // 0
 * getDecimalPlaces(5.564738e-14); // 20
 */

export function getDecimalPlaces(num: number): number {
  const numStr = String(num);

  if (numStr.includes('e')) {
    // 소수점 이하 자릿수 구하기 위해 소수점 표기로 변환
    const [base = '', exp = '0'] = numStr.split('e');
    const decimalPart = base.split('.')[1] || '';
    const exponent = Number(exp);

    if (isNaN(exponent)) return 0;

    // 음수 지수(e-N) : 소수점이 왼쪽
    if (exponent < 0) {
      return decimalPart.length + Math.abs(exponent);
    }

    // 양수 지수(e+N) : 소수점 오른쪽. 소수점 이하가 없을 수도 있음
    return Math.max(decimalPart.length - exponent, 0);
  }

  return numStr.includes('.') ? numStr?.split('.')?.[1]?.length || 0 : 0;
}
