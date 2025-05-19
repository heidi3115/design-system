import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const ChevronDownPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.41075 6.91074C4.73618 6.5853 5.26382 6.5853 5.58926 6.91074L10 11.3215L14.4107 6.91074C14.7362 6.5853 15.2638 6.5853 15.5893 6.91074C15.9147 7.23618 15.9147 7.76382 15.5893 8.08925L10.5893 13.0893C10.2638 13.4147 9.73618 13.4147 9.41075 13.0893L4.41075 8.08925C4.08531 7.76382 4.08531 7.23618 4.41075 6.91074Z"
    />
  </>
);
/**
 * @component @name ChevronDownIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik00LjQxMDc1IDYuOTEwNzRDNC43MzYxOCA2LjU4NTMgNS4yNjM4MiA2LjU4NTMgNS41ODkyNiA2LjkxMDc0TDEwIDExLjMyMTVMMTQuNDEwNyA2LjkxMDc0QzE0LjczNjIgNi41ODUzIDE1LjI2MzggNi41ODUzIDE1LjU4OTMgNi45MTA3NEMxNS45MTQ3IDcuMjM2MTggMTUuOTE0NyA3Ljc2MzgyIDE1LjU4OTMgOC4wODkyNUwxMC41ODkzIDEzLjA4OTNDMTAuMjYzOCAxMy40MTQ3IDkuNzM2MTggMTMuNDE0NyA5LjQxMDc1IDEzLjA4OTNMNC40MTA3NSA4LjA4OTI1QzQuMDg1MzEgNy43NjM4MiA0LjA4NTMxIDcuMjM2MTggNC40MTA3NSA2LjkxMDc0WiIKICAgIC8+PC9zdmc+)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const ChevronDownIcon = (props: IconProps) =>
  CreateIcon({
    paths: ChevronDownPath,
    viewBox: '0 0 20 20',
    ...props,
  });
