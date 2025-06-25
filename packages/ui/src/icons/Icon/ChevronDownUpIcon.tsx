import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const ChevronDownUpPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m6.1667 18.3333-1.1667-1.1667 5-5 5 5-1.1667 1.1667-3.8333-3.8333-3.8333 3.8333zm3.8333-10.5-5-5 1.1667-1.1667 3.8333 3.8333 3.8334-3.8333 1.1666 1.1666-5 5z"
    />
  </>
);
/**
 * @component @name ChevronDownUpIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Im02LjE2NjcgMTguMzMzMy0xLjE2NjctMS4xNjY3IDUtNSA1IDUtMS4xNjY3IDEuMTY2Ny0zLjgzMzMtMy44MzMzLTMuODMzMyAzLjgzMzN6bTMuODMzMy0xMC41LTUtNSAxLjE2NjctMS4xNjY3IDMuODMzMyAzLjgzMzMgMy44MzM0LTMuODMzMyAxLjE2NjYgMS4xNjY2LTUgNXoiCiAgICAvPjwvc3ZnPg==)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const ChevronDownUpIcon = (props: IconProps) =>
  CreateIcon({
    paths: ChevronDownUpPath,
    viewBox: '0 0 20 20',
    ...props,
  });
