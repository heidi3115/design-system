import { type ChangeEvent } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@common/ui/icons';

import { cn } from '../../lib/utils';

interface NumberStepperProps {
  inputValue: string | number | readonly string[] | undefined;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function NumberStepper({ inputValue, handleChange }: NumberStepperProps) {
  const getCurrentValue = (): number => {
    if (typeof inputValue === 'string') return parseFloat(inputValue);
    if (typeof inputValue === 'number') return inputValue;

    return 0;
  };

  const onStep = (delta: number) => {
    const currentValue = getCurrentValue();
    const newValue = String(currentValue + delta);

    const event = {
      target: { value: newValue },
    } as ChangeEvent<HTMLInputElement>;

    handleChange(event);
  };

  return (
    <div
      className={cn(
        'absolute right-2 top-1/2 -translate-y-1/2 flex flex-col',
        '-space-y-0.5',
        'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
      )}>
      <ChevronUpIcon className="text-xs size-3 cursor-pointer" onClick={() => onStep(1)} />
      <ChevronDownIcon className="text-xs size-3 cursor-pointer" onClick={() => onStep(-1)} />
    </div>
  );
}

export default NumberStepper;
