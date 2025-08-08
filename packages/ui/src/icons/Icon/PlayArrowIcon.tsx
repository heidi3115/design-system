import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const PlayArrowPath = (
  <>
    <path fillRule="evenodd" clipRule="evenodd" d="M6.25 18.2l8-8-8-8v8z" />
  </>
);
/**
 * @component @name PlayArrowIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBmaWxsUnVsZT0iZXZlbm9kZCIgY2xpcFJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjI1IDE4LjJsOC04LTgtOHY4eiIgLz48L3N2Zz4=)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const PlayArrowIcon = (props: IconProps) =>
  CreateIcon({
    paths: PlayArrowPath,
    viewBox: '0 0 20 20',
    ...props,
  });
