import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const CirclePath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.833313 10C0.833313 4.93738 4.93737 0.833328 9.99998 0.833328C15.0626 0.833328 19.1666 4.93738 19.1666 10C19.1666 15.0626 15.0626 19.1667 9.99998 19.1667C4.93737 19.1667 0.833313 15.0626 0.833313 10ZM9.99998 2.49999C5.85784 2.49999 2.49998 5.85786 2.49998 10C2.49998 14.1421 5.85784 17.5 9.99998 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.49999 9.99998 2.49999Z"
      fill="white"
    />
  </>
);
/**
 * @component @name CircleIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik0wLjgzMzMxMyAxMEMwLjgzMzMxMyA0LjkzNzM4IDQuOTM3MzcgMC44MzMzMjggOS45OTk5OCAwLjgzMzMyOEMxNS4wNjI2IDAuODMzMzI4IDE5LjE2NjYgNC45MzczOCAxOS4xNjY2IDEwQzE5LjE2NjYgMTUuMDYyNiAxNS4wNjI2IDE5LjE2NjcgOS45OTk5OCAxOS4xNjY3QzQuOTM3MzcgMTkuMTY2NyAwLjgzMzMxMyAxNS4wNjI2IDAuODMzMzEzIDEwWk05Ljk5OTk4IDIuNDk5OTlDNS44NTc4NCAyLjQ5OTk5IDIuNDk5OTggNS44NTc4NiAyLjQ5OTk4IDEwQzIuNDk5OTggMTQuMTQyMSA1Ljg1Nzg0IDE3LjUgOS45OTk5OCAxNy41QzE0LjE0MjEgMTcuNSAxNy41IDE0LjE0MjEgMTcuNSAxMEMxNy41IDUuODU3ODYgMTQuMTQyMSAyLjQ5OTk5IDkuOTk5OTggMi40OTk5OVoiCiAgICAgIGZpbGw9IndoaXRlIgogICAgLz48L3N2Zz4=)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const CircleIcon = (props: IconProps) =>
  CreateIcon({
    paths: CirclePath,
    viewBox: '0 0 20 20',
    ...props,
  });
