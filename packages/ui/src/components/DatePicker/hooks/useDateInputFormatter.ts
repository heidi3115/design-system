'use client';

import { type ChangeEvent, useRef, useEffect } from 'react';
import { isValid, parse, format } from 'date-fns';

type UseDateInputFormatterProps = {
  /** 초기 날짜값 (Date 객체), 입력 필드 초기화용 */
  initDate?: Date;
  /** 입력 필드 값 변경 시 호출되는 콜백 함수 */
  setInputValue?: (val: string) => void;
  /** 유효성 검사 결과를 상태로 관리하기 위한 콜백 함수 */
  setIsError?: (val: boolean) => void;
};

/**
 * 날짜 입력 필드의 값을 자동으로 'yyyy-MM-dd' 포맷으로 변환하고
 * 유효성 검사 결과를 반환하는 커스텀 훅.
 *
 * - 외부에서 initDate를 받아 초기화 가능
 * - 사용자가 입력할 때마다 포맷을 맞춰 자동으로 하이픈('-') 추가
 * - 날짜 유효성 검사 후 에러 상태도 함께 업데이트
 *
 * @param props - 초기 날짜, 입력 값 설정 함수, 에러 상태 설정 함수
 * @returns handleInputChange - input의 onChange 이벤트 핸들러
 */
export function useDateInputFormatter({ initDate, setInputValue, setIsError }: UseDateInputFormatterProps) {
  const prevValueRef = useRef('');
  const prevDigitsRef = useRef('');

  const isValidFormattedDate = (value: string) => {
    const parsed = parse(value, 'yyyy-MM-dd', new Date());

    return isValid(parsed);
  };

  useEffect(() => {
    if (initDate) {
      const formatted = format(initDate, 'yyyy-MM-dd');

      prevValueRef.current = formatted;
      prevDigitsRef.current = formatted.replace(/[^0-9]/g, '').slice(0, 8);
      setInputValue?.(formatted);

      setIsError?.(!isValidFormattedDate(formatted));
    }
  }, [initDate, setInputValue, setIsError]);

  const isValidYear = (year: string) => {
    const n = Number(year);

    return year.length === 4 && n >= 1000 && n <= 9999;
  };

  const isValidMonth = (month: string) => {
    const n = Number(month);

    return month.length === 2 && n >= 1 && n <= 12;
  };

  const formatDateInput = (raw: string, prevRaw: string) => {
    const digits = raw.replace(/[^0-9]/g, '').slice(0, 8);
    const prevDigits = prevDigitsRef.current;

    const year = digits.slice(0, 4);
    const month = digits.slice(4, 6);
    const singleMonthDigit = digits[4];

    const isTyping = prevRaw.length < raw.length;

    const yearValid = year.length === 4 ? isValidYear(year) : true;
    const monthValid =
      month.length === 2
        ? isValidMonth(month)
        : month.length === 1 && Number(month) >= 2 && Number(month) <= 9
          ? isValidMonth('0' + month)
          : true;

    const yearJustEntered =
      digits.length === 4 && yearValid && !prevRaw.includes('-') && !raw.endsWith('-') && isTyping;

    const isSingleDigitMonth = digits.length === 5 && prevDigits.length === 4 && Number(singleMonthDigit) >= 2;

    const monthJustCompleted =
      ((digits.length === 6 && prevDigits.length === 5) || isSingleDigitMonth) &&
      yearValid &&
      monthValid &&
      (!prevRaw.includes('-') || (prevRaw.match(/-/g) || []).length === 1) &&
      !raw.endsWith('-') &&
      isTyping;

    const userRemovedHyphen = prevRaw.includes('-') && !raw.includes('-') && !isTyping;

    let newValue = raw;

    if (userRemovedHyphen) {
      newValue = raw;
    } else if (yearJustEntered) {
      newValue = `${digits}-`;
    } else if (monthJustCompleted) {
      const formattedMonth = isSingleDigitMonth ? `0${singleMonthDigit}` : month;

      newValue = `${year}-${formattedMonth}-`;
    }

    prevValueRef.current = newValue;
    prevDigitsRef.current = digits;

    if (newValue.length > 10) {
      // 10자로 자르기 전에 숫자만 추출
      const digitsOnly = newValue.replace(/\D/g, '').slice(0, 8);

      const digitsOnlyYear = digitsOnly.slice(0, 4);
      const digitsOnlyMonth = digitsOnly.slice(4, 6);
      const didgitsOnlyDay = digitsOnly.slice(6, 8);

      let formatted = digitsOnlyYear;

      if (digitsOnlyMonth) {
        formatted += '-' + digitsOnlyMonth;
      }

      if (didgitsOnlyDay) {
        formatted += '-' + didgitsOnlyDay;
      }

      newValue = formatted;
    }

    return newValue;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const prevRaw = prevValueRef.current;
    const selectionStart = e.target.selectionStart || 0;

    const formatted = formatDateInput(raw, prevRaw);

    let newPos = selectionStart;

    if (formatted.length > raw.length) {
      newPos += formatted.length - raw.length;
    }

    requestAnimationFrame(() => {
      setTimeout(() => {
        e.target.setSelectionRange(newPos, newPos);
      }, 1);
    });

    setInputValue?.(formatted);

    setIsError?.(!isValidFormattedDate(formatted));
  };

  return {
    handleInputChange,
  };
}
