import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('delay가 null/undefined일 경우 즉시 실행된다', () => {
    const fn = jest.fn();
    const { result } = renderHook(() => useDebounce(fn, null));

    act(() => {
      result.current('a', 'b');
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('a', 'b');
  });

  it('delay가 주어지면 지정 시간 후 실행된다', () => {
    const fn = jest.fn();
    const { result } = renderHook(() => useDebounce(fn, 300));

    act(() => {
      result.current('x');
    });

    // 아직 실행되지 않음
    expect(fn).not.toHaveBeenCalled();

    // 300ms 지나야 실행됨
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('x');
  });

  it('delay 동안 여러 번 호출되면 마지막 호출만 실행된다', () => {
    const fn = jest.fn();
    const { result } = renderHook(() => useDebounce(fn, 500));

    act(() => {
      result.current('first');
      jest.advanceTimersByTime(200); // 200ms 경과
      result.current('second');
      jest.advanceTimersByTime(200); // 400ms 경과
      result.current('third');
    });

    // 아직 실행 안 됨
    expect(fn).not.toHaveBeenCalled();

    // 전체 500ms 추가 경과 (총 900ms 시점)
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('third');
  });
});
