import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const ExpansionPanelsPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 15.0l3.333-3.333-1.188-1.188-2.145 2.146-2.146-2.146-1.188 1.188L10 15ZM7.854 9.542l2.146-2.146 2.146 2.146 1.188-1.188-3.334-3.334-3.334 3.334 1.188 1.188ZM4.167 17.5q-0.688 0-1.177-0.489Q2.5 16.522 2.5 15.833V4.167q0-0.688 0.49-1.177Q3.478 2.5 4.167 2.5h11.666q0.688 0 1.177 0.49 0.49 0.489 0.49 1.177v11.666q0 0.689-0.49 1.178-0.489 0.489-1.177 0.489H4.167Zm0-1.667h11.666V4.167H4.167v11.666Zm0-11.666v11.666-11.666Z"
    />
  </>
);
/**
 * @component @name ExpansionPanelsIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik0xMCAxNS4wbDMuMzMzLTMuMzMzLTEuMTg4LTEuMTg4LTIuMTQ1IDIuMTQ2LTIuMTQ2LTIuMTQ2LTEuMTg4IDEuMTg4TDEwIDE1Wk03Ljg1NCA5LjU0MmwyLjE0Ni0yLjE0NiAyLjE0NiAyLjE0NiAxLjE4OC0xLjE4OC0zLjMzNC0zLjMzNC0zLjMzNCAzLjMzNCAxLjE4OCAxLjE4OFpNNC4xNjcgMTcuNXEtMC42ODggMC0xLjE3Ny0wLjQ4OVEyLjUgMTYuNTIyIDIuNSAxNS44MzNWNC4xNjdxMC0wLjY4OCAwLjQ5LTEuMTc3UTMuNDc4IDIuNSA0LjE2NyAyLjVoMTEuNjY2cTAuNjg4IDAgMS4xNzcgMC40OSAwLjQ5IDAuNDg5IDAuNDkgMS4xNzd2MTEuNjY2cTAgMC42ODktMC40OSAxLjE3OC0wLjQ4OSAwLjQ4OS0xLjE3NyAwLjQ4OUg0LjE2N1ptMC0xLjY2N2gxMS42NjZWNC4xNjdINC4xNjd2MTEuNjY2Wm0wLTExLjY2NnYxMS42NjYtMTEuNjY2WiIKICAgIC8+PC9zdmc+)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const ExpansionPanelsIcon = (props: IconProps) =>
  CreateIcon({
    paths: ExpansionPanelsPath,
    viewBox: '0 0 20 20',
    ...props,
  });
