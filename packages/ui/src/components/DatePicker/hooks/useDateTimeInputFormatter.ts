'use client';

import { useRef, useEffect, type ChangeEvent } from 'react';
import { parse, format, isValid } from 'date-fns';

const FORMAT_MAP = {
  hour: 'yyyy-MM-dd HH',
  minute: 'yyyy-MM-dd HH:mm',
  second: 'yyyy-MM-dd HH:mm:ss',
  default: 'yyyy-MM-dd',
} as const;

const MAX_DIGIT_LENGTH_MAP = {
  hour: 10, // yyyyMMddHH
  minute: 12, // yyyyMMddHHmm
  second: 14, // yyyyMMddHHmmss
  default: 8, // yyyyMMdd
} as const;

const MAX_FORMATTED_LENGTH_MAP = {
  hour: 13, // yyyy-MM-dd HH
  minute: 16, // yyyy-MM-dd HH:mm
  second: 19, // yyyy-MM-dd HH:mm:ss
  default: 10, // yyyy-MM-dd
} as const;

type TimePrecision = 'date' | 'hour' | 'minute' | 'second';

/**
 * useDateTimeInputFormatter 훅에 전달되는 옵션 타입
 *
 * @property initDate? - 초기 날짜값 (Date 객체), 입력 필드 초기화용
 * @property setInputValue? - 입력 필드 값 변경 시 호출되는 콜백 함수
 * @property setIsError? - 유효성 검사 결과를 상태로 관리하기 위한 콜백 함수
 * @property withTimeType? - 시간 포함 옵션 ('date' | 'hour' | 'minute' | 'second'), 기본값 'date'
 */
type useDateTimeInputFormatterProps = {
  initDate?: Date;
  setInputValue?: (val: string) => void;
  setIsError?: (val: boolean) => void;
  withTimeType?: TimePrecision;
};

/**
 * 날짜 및 시간 입력 필드의 값을 자동으로 지정된 포맷으로 변환하고
 * 유효성 검사 결과를 반환하는 커스텀 훅.
 *
 * - 외부에서 initDate를 받아 초기화 가능
 * - 사용자가 입력할 때마다 포맷에 맞춰 자동으로 하이픈('-'), 콜론(':') 추가
 * - withTimeType 옵션에 따라 'yyyy-MM-dd', 'yyyy-MM-dd HH', 'yyyy-MM-dd HH:mm', 'yyyy-MM-dd HH:mm:ss' 지원
 * - 날짜/시간 유효성 검사 후 에러 상태도 함께 업데이트
 *
 * @param props - 초기 날짜, 입력 값 설정 함수, 에러 상태 설정 함수, 시간 포함 옵션
 * @returns handleInputChange - input의 onChange 이벤트 핸들러
 */
export function useDateTimeInputFormatter({
  initDate,
  setInputValue,
  setIsError,
  withTimeType = 'date',
}: useDateTimeInputFormatterProps) {
  const prevValueRef = useRef('');
  const prevDigitsRef = useRef('');

  type TimeType = keyof typeof FORMAT_MAP; // 'hour' | 'minute' | 'second' | 'default'

  const safeTimeType = (timeType: string): TimeType =>
    ['hour', 'minute', 'second'].includes(timeType) ? (timeType as TimeType) : 'default';

  const getFormatString = () => FORMAT_MAP[safeTimeType(withTimeType)];
  const getMaxDigitLength = () => MAX_DIGIT_LENGTH_MAP[safeTimeType(withTimeType)];
  const getMaxFormattedLength = () => MAX_FORMATTED_LENGTH_MAP[safeTimeType(withTimeType)];

  // 전체 유효성 검사 (date-fns)
  const isValidFormattedDateTime = (value: string) => {
    const formatStr = getFormatString();
    const parsed = parse(value, formatStr, new Date());

    return isValid(parsed);
  };

  useEffect(() => {
    if (initDate) {
      const formatted = format(initDate, getFormatString());

      prevValueRef.current = formatted;
      prevDigitsRef.current = formatted.replace(/\D/g, '').slice(0, getMaxDigitLength());
      setInputValue?.(formatted);
      setIsError?.(!isValidFormattedDateTime(formatted));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initDate, setInputValue, setIsError, withTimeType]);

  // 자리별 유효성 검사 함수 (필요에 따라 확장 가능)
  const isValidYear = (y: string) => y.length === 4 && Number(y) >= 1000 && Number(y) <= 9999;
  const isValidMonth = (m: string) => m.length === 2 && Number(m) >= 1 && Number(m) <= 12;
  const isValidDay = (d: string) => d.length === 2 && Number(d) >= 1 && Number(d) <= 31;
  const isValidHour = (h: string) => h.length === 2 && Number(h) >= 0 && Number(h) <= 23;
  const isValidMinute = (m: string) => m.length === 2 && Number(m) >= 0 && Number(m) <= 59;
  const isValidSecond = (s: string) => s.length === 2 && Number(s) >= 0 && Number(s) <= 59;

  const formatDateTimeInput = (raw: string, prevRaw: string) => {
    const maxDigits = getMaxDigitLength();
    const digits = raw.replace(/\D/g, '').slice(0, maxDigits);
    const prevDigits = prevDigitsRef.current;

    const year = digits.slice(0, 4);
    const month = digits.slice(4, 6);
    const singleMonthDigit = digits[4];
    const day = digits.slice(6, 8);

    // 시간 단위별로 슬라이스
    const hour = withTimeType !== 'date' ? digits.slice(8, 10) : '';
    const singleHourDigit = withTimeType !== 'date' ? digits[8] : '';
    const minute = withTimeType === 'minute' || withTimeType === 'second' ? digits.slice(10, 12) : '';
    const singleMinuteDigit = withTimeType === 'minute' || withTimeType === 'second' ? digits[10] : '';
    const second = withTimeType === 'second' ? digits.slice(12, 14) : '';

    const isTyping = prevRaw.length < raw.length;

    // 날짜 유효성 검사
    const yearValid = year.length === 4 ? isValidYear(year) : true;
    const monthValid =
      month.length === 2
        ? isValidMonth(month)
        : month.length === 1 && Number(month) >= 2 && Number(month) <= 9
          ? isValidMonth('0' + month)
          : true;
    const dayValid = day.length === 2 ? isValidDay(day) : true;

    // 시간 유효성 검사
    const hourValid =
      hour.length === 2
        ? isValidHour(hour)
        : hour.length === 1 && Number(hour) >= 3 && Number(hour) <= 9
          ? isValidHour('0' + hour)
          : true;
    const minuteValid =
      minute.length === 2
        ? isValidMinute(minute)
        : minute.length === 1 && Number(minute) >= 6 && Number(minute) <= 9
          ? isValidMinute('0' + minute)
          : true;
    const secondValid =
      second.length === 2
        ? isValidSecond(second)
        : second.length === 1 && Number(second) >= 6 && Number(second) <= 9
          ? isValidSecond('0' + second)
          : true;

    // 자동 하이픈/콜론 추가 여부 계산

    // 연 입력 완료 후 하이픈 추가
    const yearJustEntered =
      digits.length === 4 && yearValid && !prevRaw.includes('-') && !raw.endsWith('-') && isTyping;

    // 월 입력 완료 (single digit 월 2~9)
    const isSingleDigitMonth = digits.length === 5 && prevDigits.length === 4 && Number(singleMonthDigit) >= 2;
    const monthJustCompleted =
      ((digits.length === 6 && prevDigits.length === 5) || isSingleDigitMonth) &&
      yearValid &&
      monthValid &&
      (!prevRaw.includes('-') || (prevRaw.match(/-/g) || []).length === 1) &&
      !raw.endsWith('-') &&
      isTyping;

    // 일 입력 완료
    const dayJustCompleted =
      digits.length === 8 &&
      prevDigits.length === 7 &&
      yearValid &&
      monthValid &&
      dayValid &&
      (!prevRaw.includes('-') || (prevRaw.match(/-/g) || []).length === 2) &&
      !raw.endsWith('-') &&
      isTyping;

    // 시간 입력 관련
    const isSingleDigitHour =
      withTimeType !== 'date' && digits.length === 9 && prevDigits.length === 8 && Number(singleHourDigit) >= 3;
    const hourJustCompleted =
      ((digits.length === 10 && prevDigits.length === 9) || isSingleDigitHour) &&
      hourValid &&
      (!prevRaw.includes(':') || (prevRaw.match(/:/g) || []).length === 0) &&
      !raw.endsWith(':') &&
      isTyping;

    const isSingleDigitMinute =
      (withTimeType === 'minute' || withTimeType === 'second') &&
      digits.length === 11 &&
      prevDigits.length === 10 &&
      Number(singleMinuteDigit) >= 6;
    const minuteJustCompleted =
      ((digits.length === 12 && prevDigits.length === 11) || isSingleDigitMinute) &&
      minuteValid &&
      (!prevRaw.includes(':') || (prevRaw.match(/:/g) || []).length === 1) &&
      !raw.endsWith(':') &&
      isTyping;

    const secondJustCompleted =
      withTimeType === 'second' &&
      digits.length === 14 &&
      prevDigits.length === 13 &&
      secondValid &&
      (!prevRaw.includes(':') || (prevRaw.match(/:/g) || []).length === 2) &&
      !raw.endsWith(':') &&
      isTyping;

    // 하이픈/콜론 삭제 감지
    const userRemovedHyphen = prevRaw.includes('-') && !raw.includes('-') && !isTyping;
    const userRemovedColon = withTimeType !== 'date' && prevRaw.includes(':') && !raw.includes(':') && !isTyping;

    let newValue = raw;

    if (userRemovedHyphen || userRemovedColon) {
      newValue = raw;
    } else if (yearJustEntered) {
      newValue = `${digits}-`;
    } else if (monthJustCompleted) {
      const formattedMonth = isSingleDigitMonth ? `0${singleMonthDigit}` : month;

      newValue = `${year}-${formattedMonth}-`;
    } else if (dayJustCompleted) {
      newValue = `${year}-${month}-${day}`;
      if (withTimeType !== 'date' && !raw.includes(' ')) newValue += ' ';
    } else if (hourJustCompleted) {
      const formattedHour = isSingleDigitHour ? `0${singleHourDigit}` : hour;

      newValue = `${year}-${month}-${day} ${formattedHour}:`;
    } else if (minuteJustCompleted) {
      const formattedHour = hour.length === 1 ? `0${hour}` : hour;
      const formattedMinute = isSingleDigitMinute ? `0${singleMinuteDigit}` : minute;

      newValue = `${year}-${month}-${day} ${formattedHour}:${formattedMinute}`;
      if (withTimeType === 'second' && !raw.endsWith(':')) newValue += ':';
    } else if (secondJustCompleted) {
      const formattedHour = hour.length === 1 ? `0${hour}` : hour;
      const formattedMinute = minute.length === 1 ? `0${minute}` : minute;

      newValue = `${year}-${month}-${day} ${formattedHour}:${formattedMinute}:${second}`;
    } else {
      newValue = raw;
    }

    prevValueRef.current = newValue;
    prevDigitsRef.current = digits;

    // 최대 길이 제한
    const maxLen = getMaxFormattedLength();

    if (newValue.length > maxLen) {
      const digitsOnly = newValue.replace(/\D/g, '').slice(0, maxDigits);
      const y = digitsOnly.slice(0, 4);
      const m = digitsOnly.slice(4, 6);
      const d = digitsOnly.slice(6, 8);
      const h = withTimeType !== 'date' ? digitsOnly.slice(8, 10) : '';
      const min = withTimeType === 'minute' || withTimeType === 'second' ? digitsOnly.slice(10, 12) : '';
      const s = withTimeType === 'second' ? digitsOnly.slice(12, 14) : '';

      let formatted = y;
      if (m) formatted += `-${m}`;
      if (d) formatted += `-${d}`;

      if (withTimeType !== 'date') {
        if (h) formatted += ` ${h}`;
        if (min) formatted += `:${min}`;
        if (s) formatted += `:${s}`;
      }

      newValue = formatted;
    }

    return newValue;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const prevRaw = prevValueRef.current;
    const selectionStart = e.target.selectionStart ?? 0;

    const formatted = formatDateTimeInput(raw, prevRaw);

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
    setIsError?.(!isValidFormattedDateTime(formatted));
  };

  return {
    handleInputChange,
  };
}
