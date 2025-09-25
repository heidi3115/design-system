'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon, type IconProps, MinusIcon, PlusIcon } from '@common/ui/icons';
import { tv, type VariantProps } from 'tailwind-variants';

import {
  Button,
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  HoverCard,
  Input,
  Separator,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetRoot,
  SheetTitle,
  Skeleton,
  Tooltip,
} from '../../components';

import { useCollapsibleStore } from './store/collapsibleModeStore';
import { cn } from '../../lib/utils';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value;

      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return setOpen((isOpen) => !isOpen);
  }, [setOpen]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? 'expanded' : 'collapsed';

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      toggleSidebar,
    }),
    [state, open, setOpen, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            '--sidebar-width': SIDEBAR_WIDTH,
            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          'flex',
          'min-h-svh w-full',
          'group/sidebar-wrapper', // group 이름 (sidebar-wrapper)
          'has-data-[variant=inset]:bg-juiBackground-paper', // 부모에 data-variant="inset"일 때 배경색 적용
          className,
        )}
        {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function SidebarRoot({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none' | 'sheet';
}) {
  const { state, setOpen } = useSidebar();
  const { setMode } = useCollapsibleStore();

  React.useEffect(() => {
    setMode(collapsible);
  }, [collapsible, setMode]);

  if (collapsible === 'sheet') {
    return (
      <SheetRoot open={state === 'expanded'} onOpenChange={setOpen} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          className="bg-juiBackground-solidPaper w-[var(--sidebar-width)] p-0 [&>button]:hidden"
          style={{ '--sidebar-width': '16rem' } as React.CSSProperties}
          side={side}>
          <SheetHeader className="sr-only">
            <SheetTitle>sidebar</SheetTitle>
            <SheetDescription>Sidebar content</SheetDescription>
          </SheetHeader>
          <div className="group peer flex h-full w-full flex-col" data-collapsible="sheet">
            {children}
          </div>
        </SheetContent>
      </SheetRoot>
    );
  }

  if (collapsible === 'none') {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          'bg-juiBackground-paper',
          'flex flex-col',
          'h-full w-(--sidebar-width)', // 사용자 정의 CSS 변수 기반 너비
          className,
        )}
        {...props}>
        {children}
      </div>
    );
  }

  return (
    <div
      className="group peer text-juiText-primary block"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar">
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          'relative',
          'w-(--sidebar-width)',
          'bg-transparent',
          'transition-[width]',
          'duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+var(--spacing-4))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          // 기본 레이아웃 & 스타일
          'fixed inset-y-0 z-10 h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear flex',

          // 왼쪽/오른쪽 위치에 따른 스타일
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]' // offcanvas 시 왼쪽으로 숨김
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]', // offcanvas 시 오른쪽으로 숨김

          // variant 조건에 따른 패딩 및 너비 조절
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]' // 아이콘 상태일 때 너비 계산식 적용
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:shadow-md group-data-[side=right]:shadow-md', // 기본 너비 및 좌우 그림자

          className, // 외부에서 전달된 추가 클래스
        )}
        {...props}>
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className={cn(
            'bg-juiBackground-paper flex h-full w-full flex-col',
            'group-data-[variant=floating]:border-sidebar-border', // variant=floating일 때 보더 색상
            'group-data-[variant=floating]:rounded-lg', // variant=floating일 때 둥근 모서리
            'group-data-[variant=floating]:border', // variant=floating일 때 보더 표시
            'group-data-[variant=floating]:shadow-sm', // variant=floating일 때 그림자 효과
          )}>
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger({ className, onClick, asChild, children, ...props }: React.ComponentProps<typeof Button>) {
  const Comp = asChild ? 'button' : Button;
  const { toggleSidebar, open } = useSidebar();

  return (
    <Comp
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}>
      {asChild ? (
        children
      ) : (
        <>
          {open ? <ArrowLeftIcon size="small" /> : <ArrowRightIcon size="small" />}

          <span className="sr-only">Toggle Sidebar</span>
        </>
      )}
    </Comp>
  );
}

function SidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        // 기본 스타일 및 hover 시 after 요소 배경 변경
        'hover:after:bg-juiBorder-primary absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear',
        // 좌우 side에 따른 위치 조정
        'group-data-[side=left]:-right-4 group-data-[side=right]:left-0',
        // after 요소 스타일 (절대 위치, 세로 전체, 좌측 중앙, 2px 너비)
        'after:absolute after:inset-y-0 after:left-1/2 after:w-[2px]',
        // 화면 크기 sm 이상일 때 flex 적용
        'sm:flex',

        // in-data 조건부 커서 변경 (좌측은 w-resize, 우측은 e-resize)
        'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',

        // data-state가 collapsed인 경우 커서 반대 방향으로 변경 (복잡한 CSS 셀렉터)
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',

        // hover 시 collapsible이 offcanvas일 때 배경 및 위치 조절
        'hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',

        // offcanvas 상태일 때 좌우 위치 미세 조정 (복잡한 CSS 셀렉터)
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',

        // 외부에서 받은 추가 클래스
        className,
      )}
      {...props}
    />
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        'bg-juiBackground-default relative flex w-full min-w-0 flex-1 flex-col overflow-hidden',

        // md 이상일 때 variant=inset 조건에 따라 여백, 모서리, 그림자 적용
        'peer-data-[variant=inset]:m-2', // 바깥 여백
        'peer-data-[variant=inset]:ml-0', // 왼쪽 여백 제거
        'peer-data-[variant=inset]:rounded-xl', // 둥근 모서리
        'peer-data-[variant=inset]:shadow-sm', // 그림자 효과
        'peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2', // 사이드바가 접혔을 때 왼쪽 여백 다시 추가

        className,
      )}
      {...props}
    />
  );
}

function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return <Input data-slot="sidebar-input" data-sidebar="input" className={cn(className)} {...props} />;
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="sidebar-header" data-sidebar="header" className={cn('flex gap-2 p-2', className)} {...props} />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="sidebar-footer" data-sidebar="footer" className={cn('flex flex-col gap-2', className)} {...props} />
  );
}

function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn('bg-juiBorder-primary mx-2 w-auto! min-w-auto!', className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto',
        'group-data-[collapsible=icon]:overflow-hidden', // variant=icon일 때 스크롤 숨김
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...props}
    />
  );
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        'text-juiText-primary/70 ring-juiBorder-primary flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear',
        '[&>svg]:size-3 [&>svg]:shrink-0', // 자식 svg 크기 및 고정 비율

        // collapsible=icon일 때 숨김 처리 (위로 올리고 투명도 0)
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',

        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        'text-juiText-primary ring-juiBorder-primary hover:bg-current/10 hover:text-juiText-secondary',
        'absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform',
        '[&>svg]:size-4 [&>svg]:shrink-0', // 자식 svg 크기 및 비율 고정

        'after:absolute after:-inset-2 after:hidden', // 모바일에서 클릭 영역 확장 (after 가상요소), md 이상에서 숨김
        'group-data-[collapsible=icon]:hidden', // collapsible=icon 상태일 때 버튼 숨김

        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn('w-full text-sm z-1', className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn('group/menu-item relative my-auto', className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = tv({
  base: `
    peer/menu-button
    flex w-full items-center gap-2
    overflow-hidden rounded-md p-2
    text-left text-sm
    outline-hidden
    transition-[width,height,padding]
    focus-visible:ring-2
    disabled:pointer-events-none disabled:opacity-50
    aria-disabled:pointer-events-none aria-disabled:opacity-50
    data-[active=true]:bg-juiPrimary/15
    data-[active=true]:font-bold
    data-[state=open]:hover:bg-juiPrimary/15
    data-[state=open]:hover:text-juiText-secondary
    group-has-data-[sidebar=menu-action]/menu-item:pr-8
    group-data-[collapsible=icon]:size-8!
    group-data-[collapsible=icon]:p-2!
    [&>span:last-child]:truncate
    [&>svg]:size-4 [&>svg]:shrink-0
  `,
  variants: {
    variant: {
      default: `
        hover:bg-current/10
        active:bg-juiPrimary/15 active:font-bold
      `,
      outline: `
        bg-juiBackground-default
        shadow-[0_0_0_1px_var(--juiBorder-primary)]
        hover:bg-juiBackground-input
        hover:text-juiText-secondary
        hover:shadow-[0_0_0_1px_var(--juiText-disabled)]
      `,
      collapsible: `
        data-[active=true]:bg-transparent 
        active:bg-transparent
        hover:font-bold
        data-[state=open]:hover:bg-transparent 
        data-[state=open]:hover:text-juiText-primary
        group-data-[state=collapsed]:[&>svg]:size-5
        group-data-[state=collapsed]:p-1.5!
        group-data-[state=collapsed]:pointer-events-none
      `,
    },
    size: {
      default: 'h-8 text-sm',
      sm: 'h-7 text-xs',
      lg: `
        h-12 text-sm
        group-data-[collapsible=icon]:p-0!
      `,
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltipContents,
  hoverCardContents,
  hoverCardProps,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltipContents?: string;
  hoverCardContents?: React.ReactNode;
  hoverCardProps?: Partial<React.ComponentProps<typeof HoverCard>>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : 'button';

  const { state, toggleSidebar } = useSidebar();
  const { mode: collapsibleMode } = useCollapsibleStore();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      onClick={(event) => {
        props.onClick?.(event);

        if (collapsibleMode === 'sheet') {
          requestAnimationFrame(() => {
            toggleSidebar();
          });
        }
      }}
      {...props}
    />
  );

  if (!tooltipContents && !hoverCardContents) {
    return button;
  }

  if (hoverCardContents && state === 'collapsed') {
    return (
      <HoverCard
        trigger={
          <div
            className={cn(
              'group/card',
              'transition-all duration-300',
              'flex items-center justify-center',
              'data-[state=open]:bg-juiPrimary',
              'data-[state=open]:light:bg-juiGrey-a200',
            )}>
            {button}
          </div>
        }
        openDelay={0}
        side="right"
        align="start"
        sideOffset={8}
        contentClass="p-0"
        {...hoverCardProps}>
        {hoverCardContents}
      </HoverCard>
    );
  }

  return (
    <Tooltip trigger={button} side="right" align="center" contents={tooltipContents} disabled={state !== 'collapsed'} />
  );
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  showOnHover?: boolean;
}) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        // 기본 스타일
        'text-juiText-primary ring-juiBorder-primary hover:bg-current/10 hover:text-juiText-primary/80',
        'peer-hover/menu-button:text-juiText-primary',
        'absolute top-1.5 right-1.5 flex aspect-square w-5 items-center justify-center',
        'rounded-md p-0 outline-hidden transition-transform',
        'focus-visible:ring-2',
        '[&>svg]:size-4 [&>svg]:shrink-0',

        // 모바일 hit 영역 확대
        'after:absolute after:-inset-2 after:hidden',

        // size별 위치 조정
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',

        // collapsible 옵션일 때 아이콘 숨김
        'group-data-[collapsible=icon]:hidden',

        // showOnHover가 true일 때만 적용
        showOnHover && 'peer-data-[active=true]/menu-button:text-juiText-primary',
        showOnHover &&
          'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-50 group-hover/menu-sub-item:opacity-50',
        showOnHover && 'data-[state=open]:opacity-100 opacity-0',
        'hover:opacity-100',

        // 외부에서 넘겨받은 className
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuBadge({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        // 기본 스타일
        'text-juiText-primary', // 기본 텍스트 색상
        'pointer-events-none', // 마우스 이벤트 차단 (버튼 클릭 등 방지)
        'absolute right-1 e', // 오른쪽 상단 고정
        'flex h-5 min-w-5 items-center justify-center', // 동그란 배지 스타일
        'aspect-squar rounded-full p-1 text-xs font-medium tabular-nums', // 숫자 균등 간격 폰트
        'select-none', // 텍스트 선택 금지

        // 상태별 강조 색상
        'peer-hover/menu-button:font-bold',
        'peer-hover/menu-button:bg-juiBackground-default',
        'peer-data-[active=true]/menu-button:font-bold',

        // 사이즈에 따라 top 위치 조정
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',

        // collapsible 아이콘 모드일 때는 숨김
        'group-data-[collapsible=icon]:hidden',

        // 외부에서 className으로 전달받은 추가 클래스
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean;
}) {
  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
      {...props}>
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton className="h-4 max-w-full flex-1" data-sidebar="menu-skeleton-text" />
    </div>
  );
}

function SidebarMenuSub({
  className,
  isFloat = false,
  ...props
}: React.ComponentProps<'ul'> & {
  isFloat?: boolean;
}) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        'border-juiBorder-primary mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5',
        'group-data-[collapsible=icon]:hidden',
        isFloat && 'ml-0 border-l-0 translate-x-0 px-1.5',
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn('group/menu-sub-item relative my-auto', className)}
      {...props}
    />
  );
}

function SidebarMenuSubButton({
  asChild = false,
  size = 'md',
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
  size?: 'sm' | 'md';
  isActive?: boolean;
}) {
  const Comp = asChild ? Slot : 'a';

  const { toggleSidebar } = useSidebar();
  const { mode: collapsibleMode } = useCollapsibleStore();

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        'text-juiText-primary', // 기본 텍스트 색상
        'hover:bg-current/10', // hover 시 배경 흐림 효과
        'active:bg-juiPrimary/15 active:font-bold', // active 시 배경 강조 및 폰트 bold
        '[&>svg]:font-bold', // 자식 svg 아이콘 bold 처리
        'flex h-7 min-w-0 -translate-x-px items-center gap-2 px-2', // 버튼 레이아웃: 정렬, 간격, 높이 등
        'rounded-md overflow-hidden outline-hidden', // 둥근 테두리, 넘침 숨김, outline 제거
        'focus-visible:ring-2', // 키보드 focus 시 ring 표시
        'disabled:pointer-events-none disabled:opacity-50', // 비활성화 시 클릭 불가 및 반투명
        'aria-disabled:pointer-events-none aria-disabled:opacity-50', // 접근성 비활성화 대응
        '[&>svg]:size-4 [&>svg]:shrink-0', // svg 아이콘 크기 고정 및 축소 방지
        '[&>span:last-child]:truncate', // 마지막 span 내용 말줄임 처리
        'data-[active=true]:bg-juiPrimary/15 data-[active=true]:font-bold', // active 상태일 때 배경 강조 및 굵은 텍스트
        size === 'sm' && 'text-xs', // size가 sm일 경우 작은 글씨
        size === 'md' && 'text-sm', // size가 md일 경우 기본 크기
        'group-data-[collapsible=icon]:hidden', // 아이콘 전용 메뉴일 경우 숨김 처리
        className, // 외부에서 전달된 클래스 추가
      )}
      onClick={(event) => {
        props.onClick?.(event);

        if (collapsibleMode === 'sheet') {
          requestAnimationFrame(() => {
            toggleSidebar();
          });
        }
      }}
      {...props}
    />
  );
}

function SidebarCollapsibleGroup({
  collapsibleTitle,
  collapsibleIcon,
  groupTitle,
  customIcon,
  triggerClassName,
  children,
  tooltipContents,
  hoverCardContents,
  hoverCardProps,
  extendType = 'chev',
  collapsibleVisible = false,
  depth = 0,
  ...props
}: React.ComponentProps<typeof CollapsibleRoot> & {
  collapsibleTitle: string;
  collapsibleIcon?: React.ComponentType<IconProps>;
  groupTitle?: string;
  triggerClassName?: string;
  extendType?: 'chev' | 'plus';
  depth?: number;
  collapsibleVisible?: boolean;
  customIcon?: {
    open: React.ComponentType<IconProps>;
    close: React.ComponentType<IconProps>;
  };
} & Pick<React.ComponentProps<typeof SidebarMenuButton>, 'tooltipContents' | 'hoverCardContents' | 'hoverCardProps'>) {
  const { state } = useSidebar();

  const CollapsibleIcon = collapsibleIcon;
  const OpenCustomIcon = customIcon?.open;
  const CloseCustomIcon = customIcon?.close;

  return (
    <CollapsibleRoot className={`group/collapsible-${depth}`} {...props}>
      {groupTitle && <SidebarGroupLabel className="py-0">{groupTitle}</SidebarGroupLabel>}
      <SidebarMenu>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              variant="collapsible"
              className={cn(triggerClassName, 'm-auto', !collapsibleVisible && 'group-data-[state=collapsed]:hidden')}
              tooltipContents={tooltipContents}
              hoverCardContents={hoverCardContents}
              hoverCardProps={hoverCardProps}>
              {CollapsibleIcon && <CollapsibleIcon />}
              {!CollapsibleIcon && state === 'collapsed' && `${collapsibleTitle[0]}...`}
              <span>{collapsibleTitle}</span>

              {customIcon && OpenCustomIcon && CloseCustomIcon ? (
                <>
                  <OpenCustomIcon
                    className={cn('ml-auto', {
                      'group-data-[state=open]/collapsible-0:hidden': depth === 0,
                      'group-data-[state=open]/collapsible-1:hidden': depth === 1,
                      'group-data-[state=open]/collapsible-2:hidden': depth === 2,
                    })}
                  />
                  <CloseCustomIcon
                    className={cn('ml-auto', {
                      'group-data-[state=closed]/collapsible-0:hidden': depth === 0,
                      'group-data-[state=closed]/collapsible-1:hidden': depth === 1,
                      'group-data-[state=closed]/collapsible-2:hidden': depth === 2,
                    })}
                  />
                </>
              ) : (
                extendType === 'chev' && (
                  <ChevronDownIcon
                    className={cn('ml-auto transition-transform', {
                      'group-data-[state=open]/collapsible-0:rotate-180': depth === 0,
                      'group-data-[state=open]/collapsible-1:rotate-180': depth === 1,
                      'group-data-[state=open]/collapsible-2:rotate-180': depth === 2,
                    })}
                  />
                )
              )}

              {extendType === 'plus' && (
                <>
                  <PlusIcon
                    className={cn('ml-auto', {
                      'group-data-[state=open]/collapsible-0:hidden': depth === 0,
                      'group-data-[state=open]/collapsible-1:hidden': depth === 1,
                      'group-data-[state=open]/collapsible-2:hidden': depth === 2,
                    })}
                  />
                  <MinusIcon
                    className={cn('ml-auto', {
                      'group-data-[state=closed]/collapsible-0:hidden': depth === 0,
                      'group-data-[state=closed]/collapsible-1:hidden': depth === 1,
                      'group-data-[state=closed]/collapsible-2:hidden': depth === 2,
                    })}
                  />
                </>
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>
        </SidebarMenuItem>
      </SidebarMenu>
      <CollapsibleContent>{children}</CollapsibleContent>
    </CollapsibleRoot>
  );
}

export {
  SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  SidebarCollapsibleGroup,
  useSidebar,
};
