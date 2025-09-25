import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const OCloseFolderFilledPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.333 3.333H3.333c-0.9167 0-1.658 0.75-1.658 1.6667L1.6667 15c0 0.9167 0.75 1.6667 1.6667 1.6667h13.333c0.9167 0 1.6667-0.75 1.6667-1.6667V6.6667c0-0.9167-0.75-1.6667-1.6667-1.6667h-6.6667z"
    />
  </>
);
/**
 * @component @name CloseFolderFilledIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik04LjMzMyAzLjMzM0gzLjMzM2MtMC45MTY3IDAtMS42NTggMC43NS0xLjY1OCAxLjY2NjdMMS42NjY3IDE1YzAgMC45MTY3IDAuNzUgMS42NjY3IDEuNjY2NyAxLjY2NjdoMTMuMzMzYzAuOTE2NyAwIDEuNjY2Ny0wLjc1IDEuNjY2Ny0xLjY2NjdWNi42NjY3YzAtMC45MTY3LTAuNzUtMS42NjY3LTEuNjY2Ny0xLjY2NjdoLTYuNjY2N3oiCiAgICAvPjwvc3ZnPg==)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const CloseFolderFilledIcon = (props: IconProps) =>
  CreateIcon({
    paths: OCloseFolderFilledPath,
    viewBox: '0 0 20 20',
    ...props,
  });
