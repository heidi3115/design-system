import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const CheckPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.2559 5.24408C17.5814 5.56951 17.5814 6.09715 17.2559 6.42259L8.08926 15.5893C7.76382 15.9147 7.23618 15.9147 6.91074 15.5893L2.74408 11.4226C2.41864 11.0972 2.41864 10.5695 2.74408 10.2441C3.06951 9.91864 3.59715 9.91864 3.92259 10.2441L7.5 13.8215L16.0774 5.24408C16.4028 4.91864 16.9305 4.91864 17.2559 5.24408Z"
    />
  </>
);
/**
 * @component @name CheckIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik0xNy4yNTU5IDUuMjQ0MDhDMTcuNTgxNCA1LjU2OTUxIDE3LjU4MTQgNi4wOTcxNSAxNy4yNTU5IDYuNDIyNTlMOC4wODkyNiAxNS41ODkzQzcuNzYzODIgMTUuOTE0NyA3LjIzNjE4IDE1LjkxNDcgNi45MTA3NCAxNS41ODkzTDIuNzQ0MDggMTEuNDIyNkMyLjQxODY0IDExLjA5NzIgMi40MTg2NCAxMC41Njk1IDIuNzQ0MDggMTAuMjQ0MUMzLjA2OTUxIDkuOTE4NjQgMy41OTcxNSA5LjkxODY0IDMuOTIyNTkgMTAuMjQ0MUw3LjUgMTMuODIxNUwxNi4wNzc0IDUuMjQ0MDhDMTYuNDAyOCA0LjkxODY0IDE2LjkzMDUgNC45MTg2NCAxNy4yNTU5IDUuMjQ0MDhaIgogICAgLz48L3N2Zz4=)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const CheckIcon = (props: IconProps) =>
  CreateIcon({
    paths: CheckPath,
    viewBox: '0 0 20 20',
    ...props,
  });
