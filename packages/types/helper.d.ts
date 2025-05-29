type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type Without<T, K> = {
  [L in Exclude<keyof T, K>]?: never;
};

/**
 * 두 객체 타입 T, U 중 하나만 허용하는 유틸리티 타입
 * → 둘 다 제공하거나 둘 다 없으면 에러
 */
type OnlyOne<T, U> = (T & Without<U, keyof T>) | (U & Without<T, keyof U>);

/**
 * 주어진 key가 객체 obj의 key 중 하나인지 런타임에서 검사하고,
 * TypeScript에게 key가 obj의 key임을 타입 가드로 알려주는 함수입니다.
 *
 * @param obj - 검사 대상이 되는 객체
 * @param key - 객체의 key인지 확인할 값
 * @returns key가 obj의 key일 경우 true, 아니면 false
 *
 * @example
 * const obj = { a: 1, b: 2 };
 * if (isKeyOf(obj, 'a')) {
 *   // 'a'는 obj의 key이므로 타입이 좁혀짐
 *   const value = obj['a']; // 타입 안전
 * }
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
function isKeyOf<T extends object>(obj: T, key: unknown): key is keyof T {
  return typeof key === 'string' && key in obj;
}
