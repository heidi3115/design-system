import { type IconProps } from '../types';
import CreateIcon from '../CreaateIcon';

import Clock from '../svg/Clock.svg';

const ClockIcon = (props: IconProps) => <CreateIcon Icon={Clock} viewBox="0 0 20 20" {...props} />;
export default ClockIcon;
