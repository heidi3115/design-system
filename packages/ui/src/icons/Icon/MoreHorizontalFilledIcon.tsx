import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const MoreHorizontalFilledPath = (
  <>
    <path fillRule="evenodd" clipRule="evenodd" d="M10 12.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M16.6666 12.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M3.33337 12.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5z" />
  </>
);
/**
 * @component @name MoreHorizontalFilledIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBmaWxsUnVsZT0iZXZlbm9kZCIgY2xpcFJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMCAxMi41YTIuNSAyLjUgMCAxIDAgMC01YTIuNSAyLjUgMCAwIDAgMCA1eiIgLz4KICAgIDxwYXRoIGZpbGxSdWxlPSJldmVub2RkIiBjbGlwUnVsZT0iZXZlbm9kZCIgZD0iTTE2LjY2NjYgMTIuNWEyLjUgMi41IDAgMSAwIDAtNWEyLjUgMi41IDAgMCAwIDAgNXoiIC8+CiAgICA8cGF0aCBmaWxsUnVsZT0iZXZlbm9kZCIgY2xpcFJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zLjMzMzM3IDEyLjVhMi41IDIuNSAwIDEgMCAwLTVhMi41IDIuNSAwIDAgMCAwIDV6IiAvPjwvc3ZnPg==)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const MoreHorizontalFilledIcon = (props: IconProps) =>
  CreateIcon({
    paths: MoreHorizontalFilledPath,
    viewBox: '0 0 20 20',
    ...props,
  });
