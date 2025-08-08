import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const OpenFolderFilledPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.3333,17.4167c0.1667,0.25,0.5,0.4167,0.8333,0.4167h14.75c0.4167,0,0.75-0.25,0.9167-0.5833l2.9167-6.9167c0.0833-0.1667,0.0833-0.3333,0.0833-0.5s-0.0833-0.3333-0.1667-0.4167c-0.0833-0.1667-0.25-0.25-0.3333-0.3333c-0.1667-0.0833-0.3333-0.0833-0.5-0.0833h-1V6.0833c0-1.0833-0.9167-2-2-2h-6.5833l-2.5-2H2.0833c-1.0833,0-2,0.9167-2,2v12.8333h0C0.1667,17.0833,0.1667,17.25,0.3333,17.4167z M15.9167,6.0833v2.9167H4.0833c-0.4167,0-0.75,0.25-0.9167,0.5833l-1.0833,2.5V6.0833H15.9167z"
    />
  </>
);
/**
 * @component @name OpenFolderFilledIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aAogICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik0wLjMzMzMsMTcuNDE2N2MwLjE2NjcsMC4yNSwwLjUsMC40MTY3LDAuODMzMywwLjQxNjdoMTQuNzVjMC40MTY3LDAsMC43NS0wLjI1LDAuOTE2Ny0wLjU4MzNsMi45MTY3LTYuOTE2N2MwLjA4MzMtMC4xNjY3LDAuMDgzMy0wLjMzMzMsMC4wODMzLTAuNXMtMC4wODMzLTAuMzMzMy0wLjE2NjctMC40MTY3Yy0wLjA4MzMtMC4xNjY3LTAuMjUtMC4yNS0wLjMzMzMtMC4zMzMzYy0wLjE2NjctMC4wODMzLTAuMzMzMy0wLjA4MzMtMC41LTAuMDgzM2gtMVY2LjA4MzNjMC0xLjA4MzMtMC45MTY3LTItMi0yaC02LjU4MzNsLTIuNS0ySDIuMDgzM2MtMS4wODMzLDAtMiwwLjkxNjctMiwydjEyLjgzMzNoMEMwLjE2NjcsMTcuMDgzMywwLjE2NjcsMTcuMjUsMC4zMzMzLDE3LjQxNjd6IE0xNS45MTY3LDYuMDgzM3YyLjkxNjdINC4wODMzYy0wLjQxNjcsMC0wLjc1LDAuMjUtMC45MTY3LDAuNTgzM2wtMS4wODMzLDIuNVY2LjA4MzNIMTUuOTE2N3oiCiAgICAvPjwvc3ZnPg==)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const OpenFolderFilledIcon = (props: IconProps) =>
  CreateIcon({
    paths: OpenFolderFilledPath,
    viewBox: '0 0 20 20',
    ...props,
  });
