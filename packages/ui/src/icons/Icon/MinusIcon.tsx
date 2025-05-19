import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const MinusPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.33331 10C3.33331 9.53977 3.70641 9.16667 4.16665 9.16667H15.8333C16.2936 9.16667 16.6666 9.53977 16.6666 10C16.6666 10.4602 16.2936 10.8333 15.8333 10.8333H4.16665C3.70641 10.8333 3.33331 10.4602 3.33331 10Z"
    />
  </>
);
/**
 * @component @name MinusIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik0zLjMzMzMxIDEwQzMuMzMzMzEgOS41Mzk3NyAzLjcwNjQxIDkuMTY2NjcgNC4xNjY2NSA5LjE2NjY3SDE1LjgzMzNDMTYuMjkzNiA5LjE2NjY3IDE2LjY2NjYgOS41Mzk3NyAxNi42NjY2IDEwQzE2LjY2NjYgMTAuNDYwMiAxNi4yOTM2IDEwLjgzMzMgMTUuODMzMyAxMC44MzMzSDQuMTY2NjVDMy43MDY0MSAxMC44MzMzIDMuMzMzMzEgMTAuNDYwMiAzLjMzMzMxIDEwWiIKICAgIC8+PC9zdmc+)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const MinusIcon = (props: IconProps) =>
  CreateIcon({
    paths: MinusPath,
    viewBox: '0 0 20 20',
    ...props,
  });
