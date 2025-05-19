import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const ArrowDownPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2.5C10.4603 2.5 10.8334 2.8731 10.8334 3.33333V16.6667C10.8334 17.1269 10.4603 17.5 10 17.5C9.53978 17.5 9.16669 17.1269 9.16669 16.6667V3.33333C9.16669 2.8731 9.53978 2.5 10 2.5Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.41076 11.0774C4.7362 10.752 5.26384 10.752 5.58928 11.0774L10 15.4882L14.4108 11.0774C14.7362 10.752 15.2638 10.752 15.5893 11.0774C15.9147 11.4029 15.9147 11.9305 15.5893 12.2559L10.5893 17.2559C10.2638 17.5814 9.7362 17.5814 9.41077 17.2559L4.41076 12.2559C4.08533 11.9305 4.08533 11.4029 4.41076 11.0774Z"
    />
  </>
);

export const ArrowDownIcon = (props: IconProps) =>
  CreateIcon({
    paths: ArrowDownPath,
    viewBox: '0 0 20 20',
    ...props,
  });
