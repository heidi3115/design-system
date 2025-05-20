import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const ChevronUpPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.41075 6.91074C9.73619 6.5853 10.2638 6.5853 10.5893 6.91074L15.5893 11.9107C15.9147 12.2362 15.9147 12.7638 15.5893 13.0893C15.2638 13.4147 14.7362 13.4147 14.4108 13.0893L10 8.67851L5.58926 13.0893C5.26382 13.4147 4.73619 13.4147 4.41075 13.0893C4.08531 12.7638 4.08531 12.2362 4.41075 11.9107L9.41075 6.91074Z"
    />
  </>
);
/**
 * @component @name ChevronUpIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik05LjQxMDc1IDYuOTEwNzRDOS43MzYxOSA2LjU4NTMgMTAuMjYzOCA2LjU4NTMgMTAuNTg5MyA2LjkxMDc0TDE1LjU4OTMgMTEuOTEwN0MxNS45MTQ3IDEyLjIzNjIgMTUuOTE0NyAxMi43NjM4IDE1LjU4OTMgMTMuMDg5M0MxNS4yNjM4IDEzLjQxNDcgMTQuNzM2MiAxMy40MTQ3IDE0LjQxMDggMTMuMDg5M0wxMCA4LjY3ODUxTDUuNTg5MjYgMTMuMDg5M0M1LjI2MzgyIDEzLjQxNDcgNC43MzYxOSAxMy40MTQ3IDQuNDEwNzUgMTMuMDg5M0M0LjA4NTMxIDEyLjc2MzggNC4wODUzMSAxMi4yMzYyIDQuNDEwNzUgMTEuOTEwN0w5LjQxMDc1IDYuOTEwNzRaIgogICAgLz48L3N2Zz4=)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const ChevronUpIcon = (props: IconProps) =>
  CreateIcon({
    paths: ChevronUpPath,
    viewBox: '0 0 20 20',
    ...props,
  });
