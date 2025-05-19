import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const CheckPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.2559 5.24408C17.5814 5.56951 17.5814 6.09715 17.2559 6.42259L8.08926 15.5893C7.76382 15.9147 7.23618 15.9147 6.91074 15.5893L2.74408 11.4226C2.41864 11.0972 2.41864 10.5695 2.74408 10.2441C3.06951 9.91864 3.59715 9.91864 3.92259 10.2441L7.5 13.8215L16.0774 5.24408C16.4028 4.91864 16.9305 4.91864 17.2559 5.24408Z"
    />
  </>
);

export const CheckIcon = (props: IconProps) =>
  CreateIcon({
    paths: CheckPath,
    viewBox: '0 0 20 20',
    ...props,
  });
