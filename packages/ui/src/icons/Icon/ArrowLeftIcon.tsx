import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const ArrowLeftPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.5 9.99999C2.5 9.53975 2.8731 9.16666 3.33333 9.16666H16.6667C17.1269 9.16666 17.5 9.53975 17.5 9.99999C17.5 10.4602 17.1269 10.8333 16.6667 10.8333H3.33333C2.8731 10.8333 2.5 10.4602 2.5 9.99999Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.92259 4.41073C9.24803 4.73617 9.24803 5.26381 8.92259 5.58925L4.51184 9.99999L8.92259 14.4107C9.24803 14.7362 9.24803 15.2638 8.92259 15.5892C8.59715 15.9147 8.06951 15.9147 7.74408 15.5892L2.74408 10.5892C2.41864 10.2638 2.41864 9.73617 2.74408 9.41073L7.74408 4.41073C8.06951 4.0853 8.59715 4.0853 8.92259 4.41073Z"
    />
  </>
);

export const ArrowLeftIcon = (props: IconProps) =>
  CreateIcon({
    paths: ArrowLeftPath,
    viewBox: '0 0 20 20',
    ...props,
  });
