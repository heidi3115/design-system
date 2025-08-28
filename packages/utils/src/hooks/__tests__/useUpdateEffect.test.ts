import { renderHook } from '@testing-library/react';
import { useUpdateEffect } from '../useUpdateEffect';

describe('useUpdateEffect', () => {
  test('처음 마운트 시에는 callback이 실행되지 않아야 함', () => {
    const callback = jest.fn();

    renderHook(() => useUpdateEffect(callback, []));

    expect(callback).not.toHaveBeenCalled();
  });

  test('deps가 업데이트되면 callback이 호출되어야 함', () => {
    const callback = jest.fn();

    const { rerender } = renderHook(({ dep }) => useUpdateEffect(callback, [dep]), { initialProps: { dep: 0 } });

    // 초기 마운트에서는 호출되지 않음
    expect(callback).not.toHaveBeenCalled();

    // 의존성 업데이트
    rerender({ dep: 1 });
    expect(callback).toHaveBeenCalledTimes(1);

    // 다시 업데이트
    rerender({ dep: 2 });
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('의존성이 변경되지 않으면 callback이 호출되지 않아야 함', () => {
    const callback = jest.fn();

    const { rerender } = renderHook(({ dep }) => useUpdateEffect(callback, [dep]), { initialProps: { dep: 0 } });

    // 마운트 시 호출되지 않음
    expect(callback).not.toHaveBeenCalled();

    // 의존성 동일
    rerender({ dep: 0 });
    expect(callback).not.toHaveBeenCalled();
  });
});
