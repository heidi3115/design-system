import { DEFAULT_TARGET } from '../Breadcrumb';

export function toSafeTarget(target: string | undefined) {
  if (!target) return DEFAULT_TARGET;

  return ['_blank', '_self', '_parent', '_top'].includes(target) ? target : DEFAULT_TARGET;
}

export function toSafeIconPosition(position: string | undefined): 'left' | 'right' {
  return position === 'right' ? 'right' : 'left';
}
