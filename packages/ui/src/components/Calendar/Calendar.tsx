'use client';

import * as React from 'react';
import {
  DayButton,
  DayPicker,
  getDefaultClassNames,
  type Modifiers,
  type ModifiersClassNames,
  type DateRange,
} from 'react-day-picker';
import { ko } from 'date-fns/locale';

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from '@common/ui/icons';
import { setLocalISODate } from '@common/utils';
import { Button, buttonVariants } from '../Button';
import { Select } from '../Select';
import { DialogDescription, DialogOverlay, DialogRoot, DialogTitle, DialogFooter } from '@common/ui/components/Dialog';
import { DialogPortal, DialogContent, DialogClose } from '@radix-ui/react-dialog';
import { dialogVariants } from '../Dialog/dialogVariants';
import { cn } from '../../lib/utils';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'transparent',
  navLayout = 'around',
  formatters,
  components,
  dialogOpen,
  onDialogConfirm,
  onDialogCancel,
  dialogContent,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
  dialogOpen?: boolean;
  onDialogConfirm?: () => void;
  onDialogCancel?: () => void;
  dialogContent?: React.ReactNode;
}) {
  const defaultClassNames = getDefaultClassNames();

  const currentYear = new Date().getFullYear();

  const dayButtonClassNames = props.modifiersClassNames;

  const navLayoutAdjust = navLayout === 'around' ? undefined : navLayout;

  return (
    <DayPicker
      mode="single"
      locale={ko}
      fromYear={currentYear - 100}
      toYear={currentYear + 100}
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-juiBackground-popover group/calendar p-3',
        '[--cell-size:--spacing(8)]',
        '[[data-slot=card-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString('ko', { month: 'short' }),
        ...formatters,
      }}
      navLayout={navLayoutAdjust}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('flex gap-4 flex-col md:flex-row relative', defaultClassNames.months),
        month: cn('inline-grid flex-col w-full gap-4', defaultClassNames.month),
        nav: cn(
          'flex items-center gap-1 absolute top-0 inset-x-0',
          navLayoutAdjust === undefined && 'w-full justify-between',
          navLayoutAdjust === 'after' && 'w-fit ml-auto',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex items-center h-(--cell-size) w-full min-w-72',
          navLayoutAdjust === undefined && 'justify-center px-(--cell-size)',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'w-full flex items-center text-sm font-medium h-(--cell-size) gap-1.5',
          navLayoutAdjust === undefined && 'justify-center',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn('absolute inset-0 opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'select-none font-medium',
          captionLayout === 'label'
            ? 'text-sm px-2'
            : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-juiText-secondary [&>svg]:size-3.5',
          defaultClassNames.caption_label,
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-juiText-primary font-medium rounded-md flex-1 text-[0.8rem] select-none',
          '[&:nth-child(1)]:text-juiError', // 일요일 (index 0 → 1번째 child)
          '[&:nth-child(7)]:text-juiText-blue', // 토요일 (index 6 → 7번째 child)
          defaultClassNames.weekday,
        ),
        week: cn('flex w-full mt-2 rounded-md overflow-hidden', defaultClassNames.week),
        week_number_header: cn('select-none w-(--cell-size)', defaultClassNames.week_number_header),
        week_number: cn('text-[0.8rem] select-none text-juiText-secondary', defaultClassNames.week_number),
        day: cn(
          'flex relative w-full h-full p-0 text-center group/day aspect-square select-none',
          'group-data-[mode=single]/calendar:rounded-full',
          'group-data-[mode=multiple]/calendar:rounded-full',
          defaultClassNames.day,
        ),
        range_start: cn('rounded-l-full bg-juiPrimary/40 light:bg-juiPrimary/60', defaultClassNames.range_start),
        range_middle: cn('rounded-none bg-juiPrimary/40 light:bg-juiPrimary/60', defaultClassNames.range_middle),
        range_end: cn('rounded-r-full bg-juiPrimary/40 light:bg-juiPrimary/60', defaultClassNames.range_end),
        today: cn(
          'data-[selected=true]:bg-juiPrimary/40 light:data-[selected=true]:bg-juiPrimary/60',
          defaultClassNames.today,
        ),
        outside: cn('text-juiText-primary/60 aria-selected:text-juiText-primary/60', defaultClassNames.outside),
        disabled: cn('flex text-juiText-secondary', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className: rootClassName, rootRef, ...restRoot }) => {
          const wrapperRef = React.useRef<HTMLDivElement>(null);
          const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null);

          React.useEffect(() => {
            if (wrapperRef.current) {
              setPortalContainer(wrapperRef.current);
            }
          }, []);

          return (
            <div ref={wrapperRef} className="relative h-fit w-fit">
              <div data-slot="calendar" ref={rootRef} className={cn(rootClassName)} {...restRoot} />
              <ConfirmationDialog
                open={dialogOpen ?? false}
                onOpenChange={(open) => !open && onDialogCancel?.()}
                container={portalContainer}
                onConfirm={onDialogConfirm}
                onCancel={onDialogCancel}
                dialogContent={dialogContent}
              />
            </div>
          );
        },
        Chevron: ({ className: chevronClassName, orientation, ...restChevron }) => {
          if (orientation === 'left') {
            return <ChevronLeftIcon className={cn('size-4', chevronClassName)} {...restChevron} />;
          }

          if (orientation === 'right') {
            return <ChevronRightIcon className={cn('size-4', chevronClassName)} {...restChevron} />;
          }

          return <ChevronDownIcon className={cn('size-4', chevronClassName)} {...restChevron} />;
        },
        DayButton: (buttonProps) => CalendarDayButton({ ...buttonProps, customClassNames: dayButtonClassNames }),
        WeekNumber: ({ children, ...restWeekNumber }) => {
          return (
            <td {...restWeekNumber}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">{children}</div>
            </td>
          );
        },
        Dropdown: ({ value, onChange, options }) => {
          const handleValueChange = (val: string) => {
            const syntheticEvent = {
              target: { value: val },
            } as React.ChangeEvent<HTMLSelectElement>;

            onChange?.(syntheticEvent);
          };

          return (
            <Select
              value={String(value)}
              width="fit"
              className="min-w-0"
              optionsClassName="min-w-0 justify-center"
              itemClassName="justify-center"
              isContentFitTriggerWidth
              onValueChange={handleValueChange}
              options={
                !options || options.length === 0
                  ? []
                  : options.map((opt) => ({
                      ...opt,
                      value: opt.value.toString(),
                    }))
              }
            />
          );
        },

        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  customClassNames,
  ...props
}: React.ComponentProps<typeof DayButton> & {
  customClassNames?: ModifiersClassNames;
}) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const getModifiersClassName = (modifierObj: Modifiers, modifiersClassNames?: ModifiersClassNames) => {
    return Object.entries(modifierObj)
      .filter(([key, isActive]) => isActive && modifiersClassNames?.[key])
      .map(([key]) => modifiersClassNames![key])
      .join(' ');
  };

  return (
    <Button
      ref={ref}
      variant="transparent"
      size="small"
      data-day={setLocalISODate(day.date)}
      data-selected-single={
        modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      data-today={modifiers.today}
      className={cn(
        // 버튼 색상 초기화
        'text-inherit font-normal',

        // ✅ 선택 상태
        'data-[selected-single=true]:bg-juiPrimary',
        'data-[selected-single=true]:rounded-full',
        'data-[selected-single=true]:hover:bg-juiPrimary/70',
        'data-[selected-single=true]:w-9/10',
        'data-[selected-single=true]:h-9/10',
        'light:data-[selected-single=true]:text-white',

        // ✅ range 상태
        'data-[range-middle=true]:hover:bg-current/40',
        'light:data-[range-middle=true]:text-white',
        'data-[range-middle=true]:hover:rounded-full',

        'data-[range-start=true]:bg-juiPrimary',
        'data-[range-start=true]:hover:bg-juiPrimary/70',
        'data-[range-start=true]:w-9/10',
        'data-[range-start=true]:h-9/10',
        'light:data-[range-start=true]:text-white',

        'data-[range-end=true]:bg-juiPrimary',
        'data-[range-end=true]:hover:bg-juiPrimary/70',
        'data-[range-end=true]:w-9/10',
        'data-[range-end=true]:h-9/10',
        'light:data-[range-end=true]:text-white',

        // ✅ 오늘 날짜
        'data-[today=true]:border',
        'data-[today=true]:data-[range-end=true]:bg-juiPrimary',
        'data-[today=true]:border-juiPrimary/80',
        'data-[today=true]:data-[range-middle=true]:hover:bg-current/40',

        // ✅ 포커스 상태
        'group-data-[focused=true]/day:relative',
        'group-data-[focused=true]/day:z-10',

        // ✅ 레이아웃 및 기본 스타일
        'flex',
        'flex-col',
        'border-0',
        'aspect-square',
        'size-auto',
        'w-4/5',
        'h-4/5',
        'm-auto',
        'gap-1',
        'leading-none',
        'hover:font-bold',
        'hover:bg-current/20',
        'hover:rounded-full',
        'hover:border-0 focus-visible:border-1',

        // ✅ 자식 span 스타일
        '[&>span]:text-xs',
        '[&>span]:opacity-70',

        // ✅ 외부 전달 props
        'rounded-full',
        defaultClassNames.day,
        customClassNames && getModifiersClassName(modifiers, customClassNames),
        className,
      )}
      {...props}
    />
  );
}

function ConfirmationDialog({
  open,
  onOpenChange,
  container,
  onConfirm,
  onCancel,
  dialogContent,
}: {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  container: HTMLElement | null;
  onConfirm?: () => void;
  onCancel?: () => void;
  dialogContent?: React.ReactNode;
}) {
  const { closeButton } = dialogVariants();

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogPortal container={container}>
        <DialogOverlay className="absolute" />
        <DialogContent className="absolute flex flex-col justify-center min-h-34 top-[50%] left-[50%] z-50 min-w-60 max-w-68 translate-x-[-50%] translate-y-[-50%] rounded-lg bg-juiBackground-popover p-4 shadow-lg">
          <DialogTitle className="sr-only">title</DialogTitle>
          <DialogDescription className="text-juiText-primary overflow-hidden break-all break-words text-center" asChild>
            <span>{dialogContent}</span>
          </DialogDescription>
          <DialogClose className={cn(closeButton(), 'top-2.5 right-2.5 focus:ring-0 focus:ring-offset-0')}>
            <XIcon />
            <span className="sr-only">close</span>
          </DialogClose>
          <DialogFooter className="p-0 flex justify-end space-x-2">
            <Button onClick={onCancel}>취소</Button>
            <Button variant="primary" onClick={onConfirm}>
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
}

export { Calendar, CalendarDayButton, type DateRange };
