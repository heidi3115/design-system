import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const ChevronLeftPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.0893 4.41075C13.4147 4.73619 13.4147 5.26382 13.0893 5.58926L8.67851 10L13.0893 14.4108C13.4147 14.7362 13.4147 15.2638 13.0893 15.5893C12.7638 15.9147 12.2362 15.9147 11.9107 15.5893L6.91074 10.5893C6.5853 10.2638 6.5853 9.73619 6.91074 9.41075L11.9107 4.41075C12.2362 4.08531 12.7638 4.08531 13.0893 4.41075Z"
    />
  </>
);
/**
 * @component @name ChevronLeftIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik0xMy4wODkzIDQuNDEwNzVDMTMuNDE0NyA0LjczNjE5IDEzLjQxNDcgNS4yNjM4MiAxMy4wODkzIDUuNTg5MjZMOC42Nzg1MSAxMEwxMy4wODkzIDE0LjQxMDhDMTMuNDE0NyAxNC43MzYyIDEzLjQxNDcgMTUuMjYzOCAxMy4wODkzIDE1LjU4OTNDMTIuNzYzOCAxNS45MTQ3IDEyLjIzNjIgMTUuOTE0NyAxMS45MTA3IDE1LjU4OTNMNi45MTA3NCAxMC41ODkzQzYuNTg1MyAxMC4yNjM4IDYuNTg1MyA5LjczNjE5IDYuOTEwNzQgOS40MTA3NUwxMS45MTA3IDQuNDEwNzVDMTIuMjM2MiA0LjA4NTMxIDEyLjc2MzggNC4wODUzMSAxMy4wODkzIDQuNDEwNzVaIgogICAgLz48L3N2Zz4=)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const ChevronLeftIcon = (props: IconProps) =>
  CreateIcon({
    paths: ChevronLeftPath,
    viewBox: '0 0 20 20',
    ...props,
  });
