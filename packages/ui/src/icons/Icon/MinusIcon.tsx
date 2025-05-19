import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const MinusPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.33331 10C3.33331 9.53977 3.70641 9.16667 4.16665 9.16667H15.8333C16.2936 9.16667 16.6666 9.53977 16.6666 10C16.6666 10.4602 16.2936 10.8333 15.8333 10.8333H4.16665C3.70641 10.8333 3.33331 10.4602 3.33331 10Z"
    />
  </>
);

export const MinusIcon = (props: IconProps) =>
  CreateIcon({
    paths: MinusPath,
    viewBox: '0 0 20 20',
    ...props,
  });
