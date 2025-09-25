import { tv } from 'tailwind-variants';

const badgeVariants = tv({
  base: [
    'inline-flex gap-1.5 items-center justify-center px-2.5 py-1.5 size-fit',
    'text-white text-xs font-bold',
    'rounded-full bg-transparent border border-transparent outline-none', // isBtn을 위해 border 추가 및 outline-none 처리
  ],
  variants: {
    variant: {
      state: '',
      scoring: '',
      grading: 'text-juiText-primary rounded-none ',
      count: 'z-2', // absolute 대비
      text: ['text-juiText-primary bg-juiGrey-50 rounded-xs border-juiBorder-primary'],
    },
    /**
     * status : variant 가 state 일 때. StateBadge 에는 status 별로 스타일을 처리하고 있습니다.
     */
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
    /**
     * score : variant 가 scoring 일 때. ScoringBadge 에는 score 에 대한 scoreVal이 있고 그에 대한 스타일로 score 별로 처리하고 있습니다.
     */
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
    /**
     * grade : variant 가 grading 일 때. GradeBadge 에는 grade 별 gradeIconMapper 가 있어서 아이콘이 지정되어 있으니 유념해주세요.
     */
    grade: {
      info: 'text-juiStatus-info',
      boundary: 'text-juiStatus-boundary',
      alert: 'text-juiStatus-alert',
      critical: 'text-juiStatus-critical',
      urgency: 'text-juiStatus-urgency',
    },
    /**
     * isBtn : 버튼처럼 클릭 이벤트 부분을 위함. 공통적으로 적용됩니다. dark/light 테마로 인해 juiText-primary로 처리하였음에 고려해주세요.
     */
    isBtn: {
      true: [
        'hover:bg-transparent hover:border-juiText-primary hover:text-juiText-primary hover:cursor-pointer hover:pointer-events-auto',
        'active:bg-transparent active:border-juiText-primary active:text-juiText-primary active:cursor-pointer active:pointer-events-auto',
        'focus:bg-transparent focus:border-juiText-primary focus:text-juiText-primary focus:cursor-pointer focus:pointer-events-auto',
      ],
    },
  },
  defaultVariants: {
    variant: 'state',
    isBtn: false,
  },
  compoundVariants: [
    {
      variant: 'grading',
      isBtn: true,
      class: [
        'hover:text-juiText-secondary hover:border-transparent hover:opacity-60',
        'active:text-juiText-secondary active:border-transparent active:opacity-60',
        'focus:text-juiText-secondary focus:border-transparent focus:opacity-60',
      ],
    },
    {
      variant: 'text',
      isBtn: true,
      class: ['hover:opacity-80', 'active:opacity-80', 'focus:opacity-80'],
    },
  ],
});

export default badgeVariants;
export type badgeStatusType = keyof typeof badgeVariants.variants.status;
export type badgeScoreType = keyof typeof badgeVariants.variants.score;
export type badgeGradeType = keyof typeof badgeVariants.variants.grade;
