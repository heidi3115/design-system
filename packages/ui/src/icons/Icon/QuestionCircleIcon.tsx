import { type IconProps } from '../types';
import CreateIcon from '../CreaateIcon';

import QuestionCircle from '../svg/QuestionCircle.svg';

export const QuestionCircleIcon = (props: IconProps) => (
  <CreateIcon Icon={QuestionCircle} viewBox="0 0 20 20" {...props} />
);
