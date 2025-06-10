import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const UserFilledPath = (
  <>
    <path d="M10 9.8a4.665 4.665 0 1 0 -4.466 -4.666A4.669 4.669 0 0 0 10 9.8m0 2.334C6.892 12.134 0.666 13.691 0.666 16.8v2.334h18.868V16.8c0 -3.108 -6.224 -4.666 -9.134 -4.666" />
  </>
);
/**
 * @component @name UserFilledIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBkPSJNMTAgOS44YTQuNjY1IDQuNjY1IDAgMSAwIC00LjQ2NiAtNC42NjZBNC42NjkgNC42NjkgMCAwIDAgMTAgOS44bTAgMi4zMzRDNi44OTIgMTIuMTM0IDAuNjY2IDEzLjY5MSAwLjY2NiAxNi44djIuMzM0aDE4Ljg2OFYxNi44YzAgLTMuMTA4IC02LjIyNCAtNC42NjYgLTkuMTM0IC00LjY2NiIgLz48L3N2Zz4=)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const UserFilledIcon = (props: IconProps) =>
  CreateIcon({
    paths: UserFilledPath,
    viewBox: '0 0 20 20',
    ...props,
  });
