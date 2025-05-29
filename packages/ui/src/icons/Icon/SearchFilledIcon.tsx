import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const SearchFilledPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.475 14.3a6.799 6.799 0 0 0 4.488 -1.695l1.304 2.73s0.268 0.218 0.637 0.581c0.377 0.354 0.874 0.832 1.349 1.333l1.323 1.357 0.589 0.63 2.068 -2.068 -0.63 -0.589 -1.356 -1.325a33.8 33.8 0 0 1 -1.334 -1.349c-0.363 -0.368 -0.581 -0.637 -0.581 -0.637l-2.73 -1.303A6.799 6.799 0 0 0 14.3 7.475 6.834 6.834 0 0 0 7.475 0.65 6.834 6.834 0 0 0 0.65 7.475 6.834 6.834 0 0 0 7.475 14.3"
    />
  </>
);
/**
 * @component @name SearchFilledIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik03LjQ3NSAxNC4zYTYuNzk5IDYuNzk5IDAgMCAwIDQuNDg4IC0xLjY5NWwxLjMwNCAyLjczczAuMjY4IDAuMjE4IDAuNjM3IDAuNTgxYzAuMzc3IDAuMzU0IDAuODc0IDAuODMyIDEuMzQ5IDEuMzMzbDEuMzIzIDEuMzU3IDAuNTg5IDAuNjMgMi4wNjggLTIuMDY4IC0wLjYzIC0wLjU4OSAtMS4zNTYgLTEuMzI1YTMzLjggMzMuOCAwIDAgMSAtMS4zMzQgLTEuMzQ5Yy0wLjM2MyAtMC4zNjggLTAuNTgxIC0wLjYzNyAtMC41ODEgLTAuNjM3bC0yLjczIC0xLjMwM0E2Ljc5OSA2Ljc5OSAwIDAgMCAxNC4zIDcuNDc1IDYuODM0IDYuODM0IDAgMCAwIDcuNDc1IDAuNjUgNi44MzQgNi44MzQgMCAwIDAgMC42NSA3LjQ3NSA2LjgzNCA2LjgzNCAwIDAgMCA3LjQ3NSAxNC4zIgogICAgLz48L3N2Zz4=)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const SearchFilledIcon = (props: IconProps) =>
  CreateIcon({
    paths: SearchFilledPath,
    viewBox: '0 0 20 20',
    ...props,
  });
