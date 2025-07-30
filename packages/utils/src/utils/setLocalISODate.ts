/**
 * 로컬 타임존 기준으로 ISO 형식 날짜 문자열 (YYYY-MM-DD) 반환
 * @param date Date 객체
 * @returns 로컬 날짜 기준 ISO 문자열
 */
export function setLocalISODate(date: Date): string {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000; // 분 단위 오프셋 → ms
  const localTime = new Date(date.getTime() - offsetMs);

  return localTime.toISOString().split('T')[0] ?? '';
}
