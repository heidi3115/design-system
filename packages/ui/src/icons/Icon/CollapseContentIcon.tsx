import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const CollapseContentPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.1667 9.1667v5H7.5v-3.3333H4.1667v-1.6667h5zm3.3333-6.6667v3.3333h3.3333v1.6667h-5v-5h1.6667z"
    />
  </>
);
/**
 * @component @name CollapseContentIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik05LjE2NjcgOS4xNjY3djVINy41di0zLjMzMzNINC4xNjY3di0xLjY2NjdoNXptMy4zMzMzLTYuNjY2N3YzLjMzMzNoMy4zMzMzdjEuNjY2N2gtNXYtNWgxLjY2Njd6IgogICAgLz48L3N2Zz4=)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const CollapseContentIcon = (props: IconProps) =>
  CreateIcon({
    paths: CollapseContentPath,
    viewBox: '0 0 20 20',
    ...props,
  });
