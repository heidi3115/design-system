import { type ChangeEvent } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@common/ui/icons';

import { cn } from '../../lib/utils';

interface NumberStepperProps {
  inputValue: string | number | readonly string[] | undefined;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  step?: number;
  disabled?: boolean;
}

function NumberStepper({ step = 1, inputValue, handleChange, disabled }: NumberStepperProps) {
  const positiveStep = step;
  const negativeStep = -step;

  const getCurrentValue = (): number => {
    if (typeof inputValue === 'string') return parseFloat(inputValue);
    if (typeof inputValue === 'number') return inputValue;

    return 0;
  };

  const onStep = (delta: number) => {
    const currentValue = getCurrentValue();
    const decimalLength = String(step).split('.')[1]?.length ?? 0;
    const newValue = (currentValue + delta).toFixed(decimalLength);
    const newStringValue = String(newValue);

    const event = {
      target: { value: newStringValue },
    } as ChangeEvent<HTMLInputElement>;

    if (!disabled) {
      handleChange(event);
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
        className={`text-xs size-3 ${disabled ? 'cursor-not-allowed pointer-events-none opacity-60' : 'cursor-pointer'}`}
        onClick={() => onStep(positiveStep)}
      />
      <ChevronDownIcon
        className={`text-xs size-3 ${disabled ? 'cursor-not-allowed pointer-events-none opacity-60' : 'cursor-pointer'}`}
        onClick={() => onStep(negativeStep)}
      />
    </div>
  );
}

export default NumberStepper;
