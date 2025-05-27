/**
 * 숫자 입력값을 정제하는 유틸 함수
 *
 * - 입력값은 문자열 또는 숫자형, undefined/null 가능
 * - 숫자, 지수 표현(e, E), 부호(+,-), 소수점(.) 만 허용
 * - 여러 개 중복된 부호, 소수점, 지수 표기는 올바른 형태로 정리
 * - 한글 등 기타 문자는 모두 제거
 *
 * @param input - 정제할 원본 입력값 (string | number | undefined | null)
 * @returns 정제된 문자열 숫자 표현 (e.g. "12.3e+45")
 */
export function sanitizeNumber(input: string | number | undefined | null): string {
  let val = String(input ?? '');

  // 1. 숫자, e, E, +, -, . 이외 문자 제거
  val = val.replace(/[^0-9eE+\-.]/g, '');

  // 2. 맨 앞에 '-' 하나만 허용, 그 외는 제거
  val = val.replace(/(?!^)-/g, '');

  // 3. '.'은 하나만 허용 (맨 앞에 나올 수 있음)
  const parts = val.split(/e/i); // 대소문자 구분 없이 e 분리

  parts[0] = (parts[0] ?? '').replace(/\./g, (offset, string) => {
    // 첫 번째 '.'만 허용
    return string.indexOf('.') === offset ? '.' : '';
  });

  // 4. 'e' 또는 'E'는 하나만 허용 (중복 제거)
  if (parts.length > 2) {
    val = parts[0] + 'e' + parts.slice(1).join('');
  } else {
    val = parts.join('e');
  }

  // 5. e 뒤에는 + 또는 -가 한 번만 올 수 있고, 그 외 제거
  val = val.replace(/(e[+-]?)(.*)/i, (p1, p2) => {
    p2 = p2.replace(/[+-]/g, '');

    return p1 + p2;
  });

  return val;
}
