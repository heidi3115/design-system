import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const PlayPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.75004 1.79902C3.4644 1.95496 3.33337 2.5 3.33337 2.5V17.5C3.33337 17.8048 3.49982 18.0854 3.76738 18.2314C4.03495 18.3775 4.36091 18.3658 4.61734 18.201L16.284 10.701C16.5225 10.5476 16.6667 10.2836 16.6667 10C16.6667 9.71644 16.5225 9.45235 16.284 9.29902L4.61734 1.79901C4.61734 1.79901 4.03568 1.64307 3.75004 1.79902ZM14.2923 10L5.00004 4.02638V15.9736L14.2923 10Z"
    />
  </>
);
/**
 * @component @name PlayIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik0zLjc1MDA0IDEuNzk5MDJDMy40NjQ0IDEuOTU0OTYgMy4zMzMzNyAyLjUgMy4zMzMzNyAyLjVWMTcuNUMzLjMzMzM3IDE3LjgwNDggMy40OTk4MiAxOC4wODU0IDMuNzY3MzggMTguMjMxNEM0LjAzNDk1IDE4LjM3NzUgNC4zNjA5MSAxOC4zNjU4IDQuNjE3MzQgMTguMjAxTDE2LjI4NCAxMC43MDFDMTYuNTIyNSAxMC41NDc2IDE2LjY2NjcgMTAuMjgzNiAxNi42NjY3IDEwQzE2LjY2NjcgOS43MTY0NCAxNi41MjI1IDkuNDUyMzUgMTYuMjg0IDkuMjk5MDJMNC42MTczNCAxLjc5OTAxQzQuNjE3MzQgMS43OTkwMSA0LjAzNTY4IDEuNjQzMDcgMy43NTAwNCAxLjc5OTAyWk0xNC4yOTIzIDEwTDUuMDAwMDQgNC4wMjYzOFYxNS45NzM2TDE0LjI5MjMgMTBaIgogICAgLz48L3N2Zz4=)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const PlayIcon = (props: IconProps) =>
  CreateIcon({
    paths: PlayPath,
    viewBox: '0 0 20 20',
    ...props,
  });
