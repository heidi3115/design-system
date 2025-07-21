import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const MoreVerticalFilledPath = (
  <>
    <path fillRule="evenodd" clipRule="evenodd" d="M12.5 10a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M12.5 16.6666a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M12.5 3.33337a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0z" />
  </>
);
/**
 * @component @name MoreVerticalFilledIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBmaWxsUnVsZT0iZXZlbm9kZCIgY2xpcFJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMi41IDEwYTIuNSAyLjUgMCAxIDAtNSAwIDIuNSAyLjUgMCAwIDAgNSAweiIgLz4KICAgIDxwYXRoIGZpbGxSdWxlPSJldmVub2RkIiBjbGlwUnVsZT0iZXZlbm9kZCIgZD0iTTEyLjUgMTYuNjY2NmEyLjUgMi41IDAgMSAwLTUgMCAyLjUgMi41IDAgMCAwIDUgMHoiIC8+CiAgICA8cGF0aCBmaWxsUnVsZT0iZXZlbm9kZCIgY2xpcFJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMi41IDMuMzMzMzdhMi41IDIuNSAwIDEgMC01IDAgMi41IDIuNSAwIDAgMCA1IDB6IiAvPjwvc3ZnPg==)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const MoreVerticalFilledIcon = (props: IconProps) =>
  CreateIcon({
    paths: MoreVerticalFilledPath,
    viewBox: '0 0 20 20',
    ...props,
  });
