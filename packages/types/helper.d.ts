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
