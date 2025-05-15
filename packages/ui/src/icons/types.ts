import { type VariantProps } from 'tailwind-variants';
import iconVariants from './iconVariants';

export type IconProps = React.SVGProps<SVGSVGElement> &
  Omit<VariantProps<typeof iconVariants>, 'size' | 'variant'> & {
    size?: Exclude<VariantProps<typeof iconVariants>['size'] | number, 'custom'>;
    variant?: Exclude<VariantProps<typeof iconVariants>['variant'], 'custom'>;
    color?: string;
  };
