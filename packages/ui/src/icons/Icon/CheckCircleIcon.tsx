import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const CheckCirclePath = (
  <>
    <path
      d="M9.99996 1.66667C5.39579 1.66667 1.66663 5.39584 1.66663 10C1.66663 14.6 5.39579 18.3333 9.99996 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.39584 14.6 1.66667 9.99996 1.66667ZM8.33329 14.1667L4.16663 10L5.34579 8.82084L8.33329 11.8083L14.6541 5.4875L15.8333 6.66667L8.33329 14.1667Z"
      fill="white"
    />
  </>
);
/**
 * @component @name CheckCircleIcon
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTk5OTYgMS42NjY2N0M1LjM5NTc5IDEuNjY2NjcgMS42NjY2MyA1LjM5NTg0IDEuNjY2NjMgMTBDMS42NjY2MyAxNC42IDUuMzk1NzkgMTguMzMzMyA5Ljk5OTk2IDE4LjMzMzNDMTQuNiAxOC4zMzMzIDE4LjMzMzMgMTQuNiAxOC4zMzMzIDEwQzE4LjMzMzMgNS4zOTU4NCAxNC42IDEuNjY2NjcgOS45OTk5NiAxLjY2NjY3Wk04LjMzMzI5IDE0LjE2NjdMNC4xNjY2MyAxMEw1LjM0NTc5IDguODIwODRMOC4zMzMyOSAxMS44MDgzTDE0LjY1NDEgNS40ODc1TDE1LjgzMzMgNi42NjY2N0w4LjMzMzI5IDE0LjE2NjdaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=)
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */

export const CheckCircleIcon = (props: IconProps) =>
  CreateIcon({
    paths: CheckCirclePath,
    viewBox: '0 0 20 20',
    ...props,
  });
