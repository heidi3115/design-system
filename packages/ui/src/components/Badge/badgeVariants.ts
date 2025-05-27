import { tv } from 'tailwind-variants';

const badgeVariants = tv({
  base: [
    'inline-flex gap-1.5 items-center justify-center px-2.5 py-1.5 size-fit',
    'text-white text-xs font-bold',
    'rounded-full bg-transparent outline-none',
  ],
  variants: {
    variant: {
      state: '',
      scoring: '',
      grading: 'rounded-none',
      count: 'z-2', // z-index는 임의로 수정 가능하나 혹시나 해서 z-index 를 2 정도로
      text: ['text-juiText-primary bg-juiGrey-50 rounded-xs border border-juiGrey-100 ', 'light:border-juiGrey-900'],
    },
    status: {
      default: 'bg-juiGrey-a700',
      primary: 'bg-juiPrimary',
      secondary: 'bg-juiScore-extra',
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
      scoreAlert: 'bg-juiScore-alert',
    },
    grade: {
      info: 'text-juiStatus-info',
      boundary: 'text-juiStatus-boundary',
      alert: 'text-juiStatus-alert',
      critical: 'text-juiStatus-critical',
      urgency: 'text-juiStatus-urgency',
    },
  },
  defaultVariants: {
    variant: 'state',
  },
});

export default badgeVariants;
export type badgeStatusType = keyof typeof badgeVariants.variants.status;
export type badgeScoreType = keyof typeof badgeVariants.variants.score;
export type badgeGradeType = keyof typeof badgeVariants.variants.grade;
