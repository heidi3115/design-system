import { type ChangeEvent } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@common/ui/icons';

import { cn } from '../../lib/utils';

interface NumberStepperProps {
  inputValue: string | number | readonly string[] | undefined;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
}

function NumberStepper({ step = 1, inputValue, handleChange, min, max, disabled }: NumberStepperProps) {
  const getCurrentValue = (): number => {
    if (typeof inputValue === 'string') return parseFloat(inputValue);
    if (typeof inputValue === 'number') return inputValue;

    return 0;
  };

  const currentValue = getCurrentValue();
  const decimalLength = String(step).split('.')[1]?.length ?? 0;

  const canIncrease = max === undefined || currentValue + step <= max;
  const canDecrease = min === undefined || currentValue - step >= min;

  const onStep = (delta: number) => {
    const newValue = (currentValue + delta).toFixed(decimalLength);
    const newStringValue = String(newValue);

    const eventClick = {
      target: { value: newStringValue },
    } as ChangeEvent<HTMLInputElement>;

    if (!disabled) {
      handleChange(eventClick);
    }
  };

  return (
    <div
      className={cn(
        'absolute right-2 top-1/2 -translate-y-1/2 flex flex-col',
        '-space-y-0.5',
        'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
        disabled && 'cursor-not-allowed pointer-events-none opacity-60',
      )}>
      <ChevronUpIcon
        className={`text-xs size-3 ${disabled ? 'cursor-not-allowed pointer-events-none opacity-60' : 'cursor-pointer hover:stroke-juiText-primary'}`}
        onClick={() => {
          if (!disabled && canIncrease) onStep(step);
        }}
      />
      <ChevronDownIcon
        className={`text-xs size-3 ${disabled ? 'cursor-not-allowed pointer-events-none opacity-60' : 'cursor-pointer hover:stroke-juiText-primary'}`}
        onClick={() => {
          if (!disabled && canDecrease) onStep(-step);
        }}
      />
    </div>
  );
}

export default NumberStepper;
