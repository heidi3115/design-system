import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const PlusPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 3.33334C10.4602 3.33334 10.8333 3.70644 10.8333 4.16668V15.8333C10.8333 16.2936 10.4602 16.6667 10 16.6667C9.53977 16.6667 9.16667 16.2936 9.16667 15.8333V4.16668C9.16667 3.70644 9.53977 3.33334 10 3.33334Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.33334 9.99999C3.33334 9.53975 3.70643 9.16666 4.16667 9.16666H15.8333C16.2936 9.16666 16.6667 9.53975 16.6667 9.99999C16.6667 10.4602 16.2936 10.8333 15.8333 10.8333H4.16667C3.70643 10.8333 3.33334 10.4602 3.33334 9.99999Z"
    />
  </>
);
/**
 * @component @name PlusIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik0xMCAzLjMzMzM0QzEwLjQ2MDIgMy4zMzMzNCAxMC44MzMzIDMuNzA2NDQgMTAuODMzMyA0LjE2NjY4VjE1LjgzMzNDMTAuODMzMyAxNi4yOTM2IDEwLjQ2MDIgMTYuNjY2NyAxMCAxNi42NjY3QzkuNTM5NzcgMTYuNjY2NyA5LjE2NjY3IDE2LjI5MzYgOS4xNjY2NyAxNS44MzMzVjQuMTY2NjhDOS4xNjY2NyAzLjcwNjQ0IDkuNTM5NzcgMy4zMzMzNCAxMCAzLjMzMzM0WiIKICAgIC8+CiAgICA8cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik0zLjMzMzM0IDkuOTk5OTlDMy4zMzMzNCA5LjUzOTc1IDMuNzA2NDMgOS4xNjY2NiA0LjE2NjY3IDkuMTY2NjZIMTUuODMzM0MxNi4yOTM2IDkuMTY2NjYgMTYuNjY2NyA5LjUzOTc1IDE2LjY2NjcgOS45OTk5OUMxNi42NjY3IDEwLjQ2MDIgMTYuMjkzNiAxMC44MzMzIDE1LjgzMzMgMTAuODMzM0g0LjE2NjY3QzMuNzA2NDMgMTAuODMzMyAzLjMzMzM0IDEwLjQ2MDIgMy4zMzMzNCA5Ljk5OTk5WiIKICAgIC8+PC9zdmc+)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const PlusIcon = (props: IconProps) =>
  CreateIcon({
    paths: PlusPath,
    viewBox: '0 0 20 20',
    ...props,
  });
