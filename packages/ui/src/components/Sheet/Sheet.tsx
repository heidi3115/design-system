import { isValidElement, type ReactNode, useState } from 'react';
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetRoot,
  SheetTitle,
  SheetTrigger,
} from '@common/ui';

type SheetProps = {
  side?: 'top' | 'right' | 'bottom' | 'left';
  title: string;
  children?: ReactNode;
  description?: string;
  closeName?: string;
  trigger: ReactNode;
  portalContainer?: HTMLElement | null;
};

const Sheet = ({ side, title, children, description, closeName, trigger, portalContainer }: SheetProps) => {
  const [open, setOpen] = useState(false);

  if (!isValidElement(trigger)) {
    console.warn('Sheet: trigger는 유효한 React element여야 합니다.');

    return null;
  }

  return (
    <SheetRoot open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild onClick={() => setOpen(true)}>
        {trigger}
      </SheetTrigger>
      <SheetContent side={side} portalContainer={portalContainer}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="p-4 text-sm overflow-auto">{children}</div>
        <SheetFooter>
          <SheetClose>{closeName}</SheetClose>
        </SheetFooter>
      </SheetContent>
    </SheetRoot>
  );
};

export default Sheet;
