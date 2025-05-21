import { tv } from 'tailwind-variants';

const badgeVariants = tv({
  base: [
    'inline-flex gap-1.5 items-center justify-center px-3 py-1.5 w-fit',
    'text-juiText-primary text-xs font-bold whitespace-nowrap',
    'rounded-full bg-transparent',
  ],
  variants: {
    variant: {
      status: '',
      scoring: '',
      text: 'radius-none',
      icon: '',
      grade: '',
      count: '',
    },
    status: {
      default: 'bg-juiGrey-a700',
      primary: 'bg-juiPrimary',
      secondary: 'bg-juiScore-extra',
      error: 'bg-juiError',
      progress: 'bg-juiStatus-progress',
      complete: 'bg-juiStatus-complete',
      failed: 'bg-juiStatus-failed',
      info: 'bg-juiStatus-info',
      boundary: 'bg-juiStatus-boundary',
      alert: 'bg-juiStatus-alert',
      critical: 'bg-juiStatus-critical',
      urgency: 'bg-juiStatus-urgency',
    },
    score: {
      veryLow: 'bg-juiScore-veryLow',
      low: 'bg-juiScore-low',
      normal: 'bg-juiScore-normal',
      high: 'bg-juiScore-high',
      veryHigh: 'bg-juiScore-veryHigh',
      extra: 'bg-juiScore-extra',
      practice: 'bg-juiScore-practice',
      alert: 'bg-juiScore-alert',
    },
    // scoreVal: { true: 'gap-3', false: '' },
  },
  defaultVariants: {
    variant: 'status',
  },
});

export default badgeVariants;
