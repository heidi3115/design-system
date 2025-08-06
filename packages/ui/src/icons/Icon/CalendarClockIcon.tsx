import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const CalendarClockPath = (
  <>
    <path d="M16 14v2.2l1.6 1" />
    <path d="M16 2v4" />
    <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
    <path d="M3 10h5" />
    <path d="M8 2v4" />
    <circle cx="16" cy="16" r="6" />
  </>
);
/**
 * @component @name CalendarClockIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0xNiAxNHYyLjJsMS42IDEiIC8+CiAgICA8cGF0aCBkPSJNMTYgMnY0IiAvPgogICAgPHBhdGggZD0iTTIxIDcuNVY2YTIgMiAwIDAgMC0yLTJINWEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoMy41IiAvPgogICAgPHBhdGggZD0iTTMgMTBoNSIgLz4KICAgIDxwYXRoIGQ9Ik04IDJ2NCIgLz4KICAgIDxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjYiIC8+PC9zdmc+)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const CalendarClockIcon = (props: IconProps) =>
  CreateIcon({
    paths: CalendarClockPath,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    ...props,
  });
