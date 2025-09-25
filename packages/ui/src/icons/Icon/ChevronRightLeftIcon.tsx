import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const ChevronRightLeftPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.3333 13.8333 l-1.1667 1.1667 -5-5 5-5 1.1667 1.1667 -3.8333 3.8333 3.8333 3.8333 z m-10.5-3.8333 l-5 5 -1.1667-1.1667 3.8333-3.8333 -3.8333-3.8334 1.1666-1.1666 5 5 z"
    />
  </>
);
/**
 * @component @name ChevronRightLeftIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik0xOC4zMzMzIDEzLjgzMzMgbC0xLjE2NjcgMS4xNjY3IC01LTUgNS01IDEuMTY2NyAxLjE2NjcgLTMuODMzMyAzLjgzMzMgMy44MzMzIDMuODMzMyB6IG0tMTAuNS0zLjgzMzMgbC01IDUgLTEuMTY2Ny0xLjE2NjcgMy44MzMzLTMuODMzMyAtMy44MzMzLTMuODMzNCAxLjE2NjYtMS4xNjY2IDUgNSB6IgogICAgLz48L3N2Zz4=)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const ChevronRightLeftIcon = (props: IconProps) =>
  CreateIcon({
    paths: ChevronRightLeftPath,
    viewBox: '0 0 20 20',
    ...props,
  });
