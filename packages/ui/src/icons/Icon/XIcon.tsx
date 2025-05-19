import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const XPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.5892 4.41076C15.9147 4.7362 15.9147 5.26384 15.5892 5.58928L5.58922 15.5893C5.26378 15.9147 4.73614 15.9147 4.4107 15.5893C4.08527 15.2638 4.08527 14.7362 4.4107 14.4108L14.4107 4.41076C14.7361 4.08533 15.2638 4.08533 15.5892 4.41076Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.4107 4.41076C4.73614 4.08533 5.26378 4.08533 5.58922 4.41076L15.5892 14.4108C15.9147 14.7362 15.9147 15.2638 15.5892 15.5893C15.2638 15.9147 14.7361 15.9147 14.4107 15.5893L4.4107 5.58928C4.08527 5.26384 4.08527 4.7362 4.4107 4.41076Z"
    />
  </>
);

export const XIcon = (props: IconProps) =>
  CreateIcon({
    paths: XPath,
    viewBox: '0 0 20 20',
    ...props,
  });
