import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const ExpansionContentPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.1667 15.8333v-5h1.6667v3.3333h3.3333v1.6667H4.1667zm10-6.6666v-3.3334h-3.3333v-1.6666h5v5h-1.6667z"
    />
  </>
);
/**
 * @component @name ExpansionContentIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik00LjE2NjcgMTUuODMzM3YtNWgxLjY2Njd2My4zMzMzaDMuMzMzM3YxLjY2NjdINC4xNjY3em0xMC02LjY2NjZ2LTMuMzMzNGgtMy4zMzMzdi0xLjY2NjZoNXY1aC0xLjY2Njd6IgogICAgLz48L3N2Zz4=)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const ExpansionContentIcon = (props: IconProps) =>
  CreateIcon({
    paths: ExpansionContentPath,
    viewBox: '0 0 20 20',
    ...props,
  });
