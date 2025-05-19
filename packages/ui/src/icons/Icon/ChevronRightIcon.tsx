import { type IconProps } from '../types';
import CreateIcon from '../CreateIcon';

const ChevronRightPath = (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.91075 4.41075C7.23619 4.08531 7.76382 4.08531 8.08926 4.41075L13.0893 9.41075C13.4147 9.73619 13.4147 10.2638 13.0893 10.5893L8.08926 15.5893C7.76382 15.9147 7.23619 15.9147 6.91075 15.5893C6.58531 15.2638 6.58531 14.7362 6.91075 14.4108L11.3215 10L6.91075 5.58926C6.58531 5.26382 6.58531 4.73619 6.91075 4.41075Z"
    />
  </>
);

export const ChevronRightIcon = (props: IconProps) =>
  CreateIcon({
    paths: ChevronRightPath,
    viewBox: '0 0 20 20',
    ...props,
  });
