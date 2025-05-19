import { type IconProps } from '../types';
import CreateIcon from '../CreaateIcon';

import MessageSquare from '../svg/MessageSquare.svg';

export const MessageSquareIcon = (props: IconProps) => (
  <CreateIcon Icon={MessageSquare} viewBox="0 0 20 20" {...props} />
);
