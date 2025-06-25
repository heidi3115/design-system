import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const ChevronLeftRightPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.667 15.0L1.667 10.0L6.667 5.0L7.854 6.188L3.959 10.083L7.833 13.958L6.667 15.0ZM13.333 15.0L12.146 13.812L16.041 9.917L12.167 6.042L13.333 5.0L18.333 10.0L13.333 15.0Z"
    />
  </>
);
/**
 * @component @name ChevronLeftRightIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik02LjY2NyAxNS4wTDEuNjY3IDEwLjBMNi42NjcgNS4wTDcuODU0IDYuMTg4TDMuOTU5IDEwLjA4M0w3LjgzMyAxMy45NThMNi42NjcgMTUuMFpNMTMuMzMzIDE1LjBMMTIuMTQ2IDEzLjgxMkwxNi4wNDEgOS45MTdMMTIuMTY3IDYuMDQyTDEzLjMzMyA1LjBMMTguMzMzIDEwLjBMMTMuMzMzIDE1LjBaIgogICAgLz48L3N2Zz4=)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const ChevronLeftRightIcon = (props: IconProps) =>
  CreateIcon({
    paths: ChevronLeftRightPath,
    viewBox: '0 0 20 20',
    ...props,
  });
