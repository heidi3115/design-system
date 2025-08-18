import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const ChevronsLeftPath = (
  <>
    <path d="m11 17-5-5 5-5" />
    <path d="m18 17-5-5 5-5" />
  </>
);
/**
 * @component @name ChevronsLeftIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Im0xMSAxNy01LTUgNS01IiAvPgogICAgPHBhdGggZD0ibTE4IDE3LTUtNSA1LTUiIC8+PC9zdmc+)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const ChevronsLeftIcon = (props: IconProps) =>
  CreateIcon({
    paths: ChevronsLeftPath,
    viewBox: '0 0 24 24',
    fill: 'none',
    strokeWidth: 2,
    stroke: 'currentColor',
    ...props,
  });
