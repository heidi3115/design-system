import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const PlusPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 3.33334C10.4602 3.33334 10.8333 3.70644 10.8333 4.16668V15.8333C10.8333 16.2936 10.4602 16.6667 10 16.6667C9.53977 16.6667 9.16667 16.2936 9.16667 15.8333V4.16668C9.16667 3.70644 9.53977 3.33334 10 3.33334Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.33334 9.99999C3.33334 9.53975 3.70643 9.16666 4.16667 9.16666H15.8333C16.2936 9.16666 16.6667 9.53975 16.6667 9.99999C16.6667 10.4602 16.2936 10.8333 15.8333 10.8333H4.16667C3.70643 10.8333 3.33334 10.4602 3.33334 9.99999Z"
    />
  </>
);

export const PlusIcon = (props: IconProps) =>
  CreateIcon({
    paths: PlusPath,
    viewBox: '0 0 20 20',
    ...props,
  });
