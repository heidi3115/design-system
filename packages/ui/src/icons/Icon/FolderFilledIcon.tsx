import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const FolderFilledPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.551 2.1h-0.05L6.748 0.699a0.784 0.784 0 0 0 -0.491 -0.174H3.5a3.15 3.15 0 0 0 -3.15 3.15v0.788h5.603z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.892 2.1 6.786 5.832a0.784 0.784 0 0 1 -0.529 0.204H0.35v7.088a3.15 3.15 0 0 0 3.15 3.15h12.6a3.15 3.15 0 0 0 3.15 -3.15V5.25A3.15 3.15 0 0 0 16.1 2.1z"
    />
  </>
);
/**
 * @component @name FolderFilledIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik04LjU1MSAyLjFoLTAuMDVMNi43NDggMC42OTlhMC43ODQgMC43ODQgMCAwIDAgLTAuNDkxIC0wLjE3NEgzLjVhMy4xNSAzLjE1IDAgMCAwIC0zLjE1IDMuMTV2MC43ODhoNS42MDN6IgogICAgLz4KICAgIDxwYXRoCiAgICAgIGZpbGxSdWxlPSJldmVub2RkIgogICAgICBjbGlwUnVsZT0iZXZlbm9kZCIKICAgICAgZD0iTTEwLjg5MiAyLjEgNi43ODYgNS44MzJhMC43ODQgMC43ODQgMCAwIDEgLTAuNTI5IDAuMjA0SDAuMzV2Ny4wODhhMy4xNSAzLjE1IDAgMCAwIDMuMTUgMy4xNWgxMi42YTMuMTUgMy4xNSAwIDAgMCAzLjE1IC0zLjE1VjUuMjVBMy4xNSAzLjE1IDAgMCAwIDE2LjEgMi4xeiIKICAgIC8+PC9zdmc+)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const FolderFilledIcon = (props: IconProps) =>
  CreateIcon({
    paths: FolderFilledPath,
    viewBox: '0 0 20 20',
    ...props,
  });
