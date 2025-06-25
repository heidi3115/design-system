import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const CollapsePanelsPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.167 17.5q-0.688 0-1.177-0.489Q2.5 16.522 2.5 15.833V4.167q0-0.688 0.49-1.177Q3.478 2.5 4.167 2.5h11.666q0.688 0 1.177 0.49 0.49 0.489 0.49 1.177v11.666q0 0.689-0.49 1.178-0.489 0.489-1.177 0.489H4.167Zm0-1.667h11.666V4.167H4.167v11.666Zm0-11.666v11.666-11.666ZM7.854 5l2.146 2.146 2.146-2.146 1.188 1.188-3.334 3.334-3.334-3.334 1.188-1.188ZM10 10.5l3.333 3.333-1.188 1.188-2.145-2.146-2.146 2.146-1.188-1.188L10 10.5Z"
    />
  </>
);
/**
 * @component @name CollapsePanelsIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik00LjE2NyAxNy41cS0wLjY4OCAwLTEuMTc3LTAuNDg5UTIuNSAxNi41MjIgMi41IDE1LjgzM1Y0LjE2N3EwLTAuNjg4IDAuNDktMS4xNzdRMy40NzggMi41IDQuMTY3IDIuNWgxMS42NjZxMC42ODggMCAxLjE3NyAwLjQ5IDAuNDkgMC40ODkgMC40OSAxLjE3N3YxMS42NjZxMCAwLjY4OS0wLjQ5IDEuMTc4LTAuNDg5IDAuNDg5LTEuMTc3IDAuNDg5SDQuMTY3Wm0wLTEuNjY3aDExLjY2NlY0LjE2N0g0LjE2N3YxMS42NjZabTAtMTEuNjY2djExLjY2Ni0xMS42NjZaTTcuODU0IDVsMi4xNDYgMi4xNDYgMi4xNDYtMi4xNDYgMS4xODggMS4xODgtMy4zMzQgMy4zMzQtMy4zMzQtMy4zMzQgMS4xODgtMS4xODhaTTEwIDEwLjVsMy4zMzMgMy4zMzMtMS4xODggMS4xODgtMi4xNDUtMi4xNDYtMi4xNDYgMi4xNDYtMS4xODgtMS4xODhMMTAgMTAuNVoiCiAgICAvPjwvc3ZnPg==)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const CollapsePanelsIcon = (props: IconProps) =>
  CreateIcon({
    paths: CollapsePanelsPath,
    viewBox: '0 0 20 20',
    ...props,
  });
