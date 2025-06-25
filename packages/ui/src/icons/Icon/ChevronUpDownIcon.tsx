import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const ChevronUpDownPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 13.833L10 18.833L5 13.833L6.188 12.646L10.083 16.541L13.958 12.667L15 13.833ZM15 7.167L13.812 8.354L9.917 4.459L6.042 8.333L5 7.167L10 2.167L15 7.167Z"
    />
  </>
);
/**
 * @component @name ChevronUpDownIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik0xNSAxMy44MzNMMTAgMTguODMzTDUgMTMuODMzTDYuMTg4IDEyLjY0NkwxMC4wODMgMTYuNTQxTDEzLjk1OCAxMi42NjdMMTUgMTMuODMzWk0xNSA3LjE2N0wxMy44MTIgOC4zNTRMOS45MTcgNC40NTlMNi4wNDIgOC4zMzNMNSA3LjE2N0wxMCAyLjE2N0wxNSA3LjE2N1oiCiAgICAvPjwvc3ZnPg==)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const ChevronUpDownIcon = (props: IconProps) =>
  CreateIcon({
    paths: ChevronUpDownPath,
    viewBox: '0 0 20 20',
    ...props,
  });
