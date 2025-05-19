import { cn } from '../../lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-juiGrey-500 selection:bg-primary selection:text-primary-foreground',
        'dark:bg-input/30 bg-gray-950 text-xs shadow-xs outline-none',
        'h-7 w-full px-4',
        'border border-transparent',
        'focus-visible:border-juiText-primary',
        'transition-all duration-700 ease-in-out',
        className,
      )}
      {...props}
    />
  );
}

export default Input;
