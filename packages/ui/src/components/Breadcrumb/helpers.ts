// 배열 리터럴용
export function toSafeTypeValue<T extends readonly [string, ...string[]]>(
  param: T[number] | string | undefined | null,
  allowedValues: T,
): T[number] {
  return param != null && (allowedValues as readonly string[]).includes(param)
    ? (param as T[number])
    : allowedValues[0];
}

export function isSafeArray<T>(items: T[] | undefined | null): boolean {
  return Array.isArray(items) && items.length > 0;
}
