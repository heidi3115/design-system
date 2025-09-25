// useDebounce.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  test('delay가 null/undefined일 경우 즉시 실행된다', () => {
    // Arrange
    const fn = jest.fn();
    const { result } = renderHook(() => useDebounce(fn, null));

    // Act
    act(() => {
      result.current('a', 'b');
    });

    // Assert
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('a', 'b');
  });

  test('delay가 주어지면 지정 시간 후 실행된다', () => {
    // Arrange
    const fn = jest.fn();
    const { result } = renderHook(() => useDebounce(fn, 300));

    // Act
    act(() => {
      result.current('x');
    });

    // Assert (아직 실행 안 됨)
    expect(fn).not.toHaveBeenCalled();

    // Act (300ms 경과)
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Assert (지연 실행 확인)
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('x');
  });

  test('delay 동안 여러 번 호출되면 마지막 호출만 실행된다', () => {
    // Arrange
    const fn = jest.fn();
    const { result } = renderHook(() => useDebounce(fn, 500));

    // Act
    act(() => {
      result.current('first');
      jest.advanceTimersByTime(200);
      result.current('second');
      jest.advanceTimersByTime(200);
      result.current('third');
    });

    // Assert (아직 실행 안 됨)
    expect(fn).not.toHaveBeenCalled();

    // Act (남은 500ms 경과 → 총 900ms 시점)
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Assert (마지막 호출만 실행됨)
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('third');
  });
});
