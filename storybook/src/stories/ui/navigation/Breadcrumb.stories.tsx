import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb, type BreadcrumbProps, breadcrumbVariants, Separator } from '@common/ui';
import {
  ArrowRightIcon,
  BookmarkIcon,
  CalendarIcon,
  ChevronRightIcon,
  ClockIcon,
  ExpansionPanelsIcon,
  HomeIcon,
  InfoIcon,
  MailIcon,
  MoreHorizontalFilledIcon,
  MoreVerticalFilledIcon,
  PlayIcon,
  StarIcon,
} from '@common/ui/icons';
import { cn } from '@common/ui/lib/utils.ts';
import type { ReactElement } from 'react';

const itemArr = [
  {
    value: 'home',
    label: 'Home',
    href: '/',
    icon: <HomeIcon />,
    iconPosition: 'left',
    target: '_parent',
  },
  {
    value: 'dashboard',
    label: 'Dashboard',
    href: './',
    icon: <InfoIcon size={'small'} />,
    iconPosition: 'right',
    className: 'text-green-600 font-bold',
    children: [
      { value: 'pj-a', label: 'Project A', href: '/dashboard/a' },
      { value: 'pj-b', label: 'Project B', href: '/dashboard/b' },
    ],
    disabled: false,
  },
  { value: 'projects', label: 'Projects', href: '/', target: '_blank' },
  { value: '2025', label: '2025', href: './', disabled: true },
  {
    value: 'q1',
    label: 'Q1',
    href: './',
    icon: <ExpansionPanelsIcon />,
    iconPosition: 'left',
  },
  { value: 'marketing', label: 'Marketing', href: './', className: 'font-bold' },
  {
    value: 'campaigns',
    label: 'Campaigns',
    href: './',
    icon: <ClockIcon />,
    iconPosition: 'right',
  },
  {
    value: 'social',
    label: 'Social Media',
    href: './',
    target: '_parent',
    disabled: true,
  },
  {
    value: 'facebook',
    label: 'Facebook',
    href: './',
    isPage: true,
    icon: <CalendarIcon />,
    iconPosition: 'left',
  },
  {
    value: 'ads',
    label: 'Ads',
    href: './',
    className: 'text-pink-500',
    children: [
      { value: 'child-current-1', label: 'child-current-page-1', href: '', icon: <StarIcon /> },
      { value: 'child-current-2', label: 'child-current-page-2', href: '', icon: <StarIcon /> },
      { value: 'child-current-3', label: 'child-current-page-3', href: '', icon: <StarIcon /> },
      { value: 'child-current-4', label: 'child-current-page-4', href: '', icon: <StarIcon /> },
    ],
  },
  {
    value: 'current',
    label: 'Current Page',
    href: './',
    icon: <MailIcon />,
    iconPosition: 'right',
  },
];

const itemArrLastIsPage = [
  {
    value: 'dashboard-home',
    label: 'right icon with Children',
    href: './',
    icon: <BookmarkIcon size={'small'} />,
    iconPosition: 'left',
    className: 'text-lime-600',
    children: [
      { value: 'pj-a', label: 'Project A', href: './a' },
      { value: 'pj-b', label: 'Project B', href: './b' },
    ],
    disabled: false,
  },
  {
    value: 'marketing1',
    label: 'font-bold,hover시 juiText-purple 적용',
    href: './',
    className: 'font-bold hover:text-juiText-purple',
  },
  { value: 'projects', label: 'disabled:true', href: '/', target: '_blank', disabled: true },
  {
    value: '2025-mm',
    label: 'children이 있고 옵션 클릭 시, target이 각기 다른 경우',
    href: './',
    children: [
      { value: 'pj-a-2025', label: '_blank', href: './', target: '_blank' },
      { value: 'pj-b-2025', label: '_self', href: './', target: '_self' },
      {
        value: 'pj-c-2025',
        label: '_parent',
        href: './',
        target: '_parent',
      },
      { value: 'pj-d-2025', label: '_top', href: './', target: '_top' },
    ],
  },
  { value: 'marketing2', label: 'target:=_blank 적용', href: './', target: '_blank', className: 'font-bold' },
  {
    value: 'social',
    label: 'disable 과 isPage가 true',
    href: './',
    target: '_parent',
    disabled: true,
    isPage: true,
  },
  {
    value: 'facebook',
    label: 'left icon & isPage:true',
    href: './',
    isPage: true,
    icon: <CalendarIcon />,
    iconPosition: 'left',
  },
  {
    value: 'ads',
    label: 'text-pink-500 적용',
    href: './',
    className: 'text-pink-500',
  },
  {
    value: 'last',
    label: 'current 로써, isPage:true 추가, children 있음',
    href: './',
    icon: <MailIcon />,
    iconPosition: 'right',
    children: [
      { value: 'child-current-1', label: 'child-current-page-1', href: './' },
      { value: 'child-current-2', label: 'child-current-page-2', href: './' },
      { value: 'child-current-3', label: 'child-current-page-3', href: './' },
      { value: 'child-current-4', label: 'child-current-page-4', href: './' },
    ],
    isPage: true,
  },
];

const ellipsisIconMap: Record<string, ReactElement> = {
  horizontal: <MoreHorizontalFilledIcon />,
  vertical: <MoreVerticalFilledIcon />,
} as const;
type EllipsisIconKey = keyof typeof ellipsisIconMap;
const ellipsisIconOptions = Object.keys(ellipsisIconMap);

const separatorIconMap: Record<string, ReactElement> = {
  chevronRight: <ChevronRightIcon />,
  play: <PlayIcon />,
  arrowRight: <ArrowRightIcon />,
} as const;
type SeparatorIconKey = keyof typeof separatorIconMap;
const separatorIconOptions = Object.keys(separatorIconMap);

const variantOptions = Object.keys(
  breadcrumbVariants.variants.variant,
) as (keyof typeof breadcrumbVariants.variants.variant)[];
const sizeOptions = Object.keys(breadcrumbVariants.variants.size) as (keyof typeof breadcrumbVariants.variants.size)[];
const ellipsisPositionTypeOptions = ['start', 'center', 'end'] as const;

const DEFAULT_MAX_ITEM_NUM = 3;

const itemExp1 = {
  value: 'test',
  label: 'Test',
  href: './',
  target: '_blank',
  icon: <BookmarkIcon />,
  iconPosition: 'left',
  isPage: true,
};

const meta: Meta<typeof Breadcrumb> = {
  title: 'UI/Navigation/Breadcrumb',
  component: Breadcrumb,
  args: {
    variant: 'primary',
    size: 'medium',
    items: itemArr,
    maxItems: DEFAULT_MAX_ITEM_NUM,
    ellipsisPosition: 'center',
    disabled: false,
    enableDropdown: true,
    ellipsisIcon: ellipsisIconMap['horizontal'],
    separatorIcon: separatorIconMap['chevronRight'],
    className: '',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variantOptions,
      table: {
        type: { summary: `${variantOptions.join(' | ')}` },
        defaultValue: { summary: variantOptions[0] },
      },
      description: [
        `select를 통해 Breadcrumb 의 색상 스타일을 지정합니다.`,
        `(${variantOptions.join(', ')} 등) 다양한 옵션을 제공하며, 각 옵션은 Tailwind CSS 변수(--breadcrumb-color)로 컬러가 결정됩니다.`,
        'variant="custom"일 경우, 직접 색상을 지정해야 하며, 브랜드 컬러 등 커스텀 스타일 반영이 className [--slider-color:hsl(266.26_42%_69%/0.7286)] 이런 형식으로 처리 가능합니다.',
      ].join('<br/>'),
    },
    size: {
      control: 'select',
      options: sizeOptions,
      table: {
        type: { summary: `${sizeOptions.join(' | ')}` },
        defaultValue: { summary: sizeOptions[0] },
      },
      description: [
        'Breadcrumb의 크기와 내부 요소(글씨, 아이콘, gap 등)의 크기를 지정합니다.',
        `select를 통해 버튼의 size 스타일 타입(${sizeOptions.join(', ')} 등) 옵션이 있으며,`,
        '사실상 size는 Breadcrumb 요소 내부의 gap 및 글씨, 아이콘 등의 크기를 지정하거나 간격을 조정하는 역할입니다.',
      ].join('<br/>'),
    },
    items: {
      control: false,
      description: [
        'Breadcrumb에 표시할 경로 정보 배열입니다.',
        `각 아이템은 등의 다양한 {${Object.keys(itemExp1).join(', ')}} 와 같은 속성을 가질 수 있습니다.`,
        '예시: 홈 > 대시보드 > 프로젝트 > ... 등 계층적 네비게이션 경로를 표현하는 목록들인 셈이며 하나의 item 이 각 경로입니다.',
        'Storybook 에서는 직접 제어하지 않으므로 control을 비활성화합니다.',
      ].join('<br/>'),
    },
    maxItems: {
      control: 'number',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: `${DEFAULT_MAX_ITEM_NUM}` },
      },
      description: [
        '화면에 표시할 최대 Breadcrumb 아이템 수를 지정합니다.',
        '아이템 개수가 maxItems를 초과하면, Ellipsis(…)로 중간 경로를 축약하여 표시합니다.',
        '예시: maxItems=3이면 "Home / … / Current" 형태로 표시됩니다.',
        '만약에 전체 경로를 표기하고 싶다면 maxItems에 null 을 처리하면 가능합니다.',
        '복잡한 경로에서도 UI를 간결하게 유지할 수 있습니다.',
      ].join('<br/>'),
    },
    ellipsisPosition: {
      control: 'select',
      options: ellipsisPositionTypeOptions,
      table: {
        type: { summary: `${ellipsisPositionTypeOptions.join(' | ')}` },
        defaultValue: { summary: ellipsisPositionTypeOptions[1] },
      },
      description: [
        'Ellipsis(…)의 위치를 지정합니다.',
        'start, center, end 중 선택 가능하며, 각각 시작/중앙/끝에 Ellipsis가 배치됩니다.',
        'maxItems가 3 이상일 때만 Ellipsis가 표기되며, 위치에 대한 부분은 4개부터 유효합니다.',
        '예를 들어, maxItem이 4 일 때, start: 1 + 마지막 3개 => Home / … / Products / Category / Current, end: 앞 3개 + 마지막 1개 => Home / Products / Category / … / Current 가 되고 center는 중앙 입니다.',
      ].join('<br/>'),
    },
    disabled: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description: [
        'disabled는 전체 Breadcrumb을 비활성화할 지 여부를 나타냅니다.',
        'true로 설정 시 모든 아이템이 클릭 불가 상태가 되며, 스타일도 흐리게 처리됩니다.',
        '주로 읽기 전용 화면이나 접근 제한 상황에 사용됩니다.',
      ].join('<br/>'),
    },
    enableDropdown: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
      description: [
        'Ellipsis(…) 와 같은 목록으로 축약된 아이템을 클릭했을 때, 숨겨진 경로를 드롭다운 형태로 노출할지 여부를 결정합니다.',
        'true면 숨겨진 아이템 목록이 DropdownMenu로 표시되고, false면 단순 텍스트로만 노출됩니다.',
      ].join('<br/>'),
    },
    ellipsisIcon: {
      control: 'select',
      options: ellipsisIconOptions,
      table: { type: { summary: 'ReactElement' } },
      description: [
        'Ellipsis(…)에 사용할 아이콘을 지정합니다.',
        '기본적으로 `<MoreHorizontalFilledIcon />` 이 사용되며, 커스텀 아이콘도 적용 가능합니다.',
        'DropdownMenu 트리거로 활용될 때 시각적 피드백을 강화할 수 있습니다.',
        'Storybook 에서는 임의로 아이콘 목록을 제공합니다.',
      ].join('<br/>'),
    },
    separatorIcon: {
      control: 'select',
      options: separatorIconOptions,
      table: { type: { summary: 'ReactElement' } },
      description: [
        'Breadcrumb 아이템 사이의 구분자 아이콘을 지정합니다.',
        '기본값은 `<ChevronRightIcon />`이며, 브랜드 스타일에 맞는 커스텀 아이콘으로 변경할 수 있습니다.',
        '구분자 스타일을 통해 네비게이션의 시각적 일관성을 높일 수 있습니다.',
        'Storybook 에서는 임의로 아이콘 목록을 제공합니다.',
      ].join('<br/>'),
    },
    dropdownProps: {
      control: false,
      table: {
        type: { summary: 'DropdownMenu 의 Props 인 className, size, align, alignOffset, side, sideOffset 속성들' },
      },
      description: [
        'Breadcrumb 아이템에서 Ellipsis(...) 혹은 children이 있는 Link의 경우 활성화 된 DropdownMenu의 속성을 커스텀 할 수 있는 props 입니다.',
      ].join('<br/>'),
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Breadcrumb 컴포넌트는 사이트 또는 애플리케이션 내에서 현재 페이지의 계층적 위치를 시각적으로 표시하고, 사용자가 상위 경로로 쉽게 이동할 수 있도록 돕는 네비게이션 UI 요소입니다.',
          '계층적 경로를 배열 형태로 받아, 각 단계별로 링크 또는 텍스트로 표시합니다.',
          '기본적으로 가장 마지막 요소는 현재 페이지로서 page 처리됩니다.',
          '아이템 개수가 많을 때는 Ellipsis(…)로 중간 경로를 축약하여 표시하며, 드롭다운(Trigger) 기능을 통해 숨겨진 경로도 접근할 수 있습니다.',
          '혹은 link 에 children이 있어서, 드롭다운(Trigger) 기능을 통해 자식 경로도 접근할 수 있습니다.',
          '아이템의 갯수 설정이나 Ellipsis와 관련된 option을 조정하실 수 있습니다.',
          '접근성(Accessibility)을 고려하여, `<nav>`, `<ol>`, `<li>` 등 시맨틱 태그와 aria 속성을 활용합니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

const fullSize = 'relative size-full';
const flexCol = 'flex flex-col text-juiText-primary';
const flexRow = 'flex flex-row text-juiText-primary';
const alignCenters = 'items-center justify-center';
const blueTxt = 'text-juiText-blue';

const getIcon = (
  arg: SeparatorIconKey | EllipsisIconKey | ReactElement | undefined,
  argType: 'separatorIcon' | 'ellipsisIcon',
): ReactElement => {
  if (typeof arg === 'string') {
    if (argType === 'separatorIcon') {
      return separatorIconMap[arg as SeparatorIconKey] ?? <ChevronRightIcon />;
    }

    return ellipsisIconMap[arg as EllipsisIconKey] ?? <MoreHorizontalFilledIcon />;
  }

  return arg ?? <span />; // fallback
};

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  argTypes: {
    items: { control: false, table: { disable: true } },
    dropdownProps: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: '기본 Breadcrumb 컴포넌트의 예시입니다.',
      },
    },
  },
  render: (args) => (
    <div className={cn(flexCol, alignCenters, fullSize, 'gap-6')}>
      <Breadcrumb
        {...args}
        ellipsisIcon={getIcon(args.ellipsisIcon, 'ellipsisIcon')}
        separatorIcon={getIcon(args.separatorIcon, 'separatorIcon')}
      />
    </div>
  ),
};

export const Variants: Story = {
  argTypes: {
    items: { control: false, table: { disable: true } },
    dropdownProps: { control: false, table: { disable: true } },
    variant: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb 의 다양한 Variant 별 예시를 확인하실 수 있습니다.',
      },
    },
  },
  render: (args: BreadcrumbProps) => (
    <div className={cn(flexCol, alignCenters, 'gap-6', fullSize)}>
      <div className={cn(flexCol, 'gap-6', fullSize)}>
        {variantOptions.map((variant) => (
          <div className={cn(flexCol, 'gap-4')} key={variant}>
            <span className={cn(blueTxt, 'text-xs')}>{variant}</span>
            <Breadcrumb
              {...args}
              variant={variant}
              ellipsisIcon={getIcon(args.ellipsisIcon, 'ellipsisIcon')}
              separatorIcon={getIcon(args.separatorIcon, 'separatorIcon')}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  argTypes: {
    items: { control: false, table: { disable: true } },
    dropdownProps: { control: false, table: { disable: true } },
    size: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb 의 다양한 Size 별 예시를 확인하실 수 있습니다.',
      },
    },
  },
  render: (args: BreadcrumbProps) => (
    <div className={cn(flexCol, alignCenters, 'gap-6', fullSize)}>
      <div className={cn(flexCol, 'gap-6', fullSize)}>
        {sizeOptions.map((size) => (
          <div className={cn(flexCol, 'gap-4')} key={size}>
            <span className={cn(blueTxt, 'text-xs')}>{size}</span>
            <Breadcrumb
              {...args}
              size={size}
              ellipsisIcon={getIcon(args.ellipsisIcon, 'ellipsisIcon')}
              separatorIcon={getIcon(args.separatorIcon, 'separatorIcon')}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Icons: Story = {
  args: {
    maxItems: 7,
  },
  argTypes: {
    items: { control: false, table: { disable: true } },
    dropdownProps: { control: false, table: { disable: true } },
    separatorIcon: { control: false, table: { disable: true } },
    ellipsisIcon: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb 의 다양하게 커스텀한 Icon 별 예시를 확인하실 수 있습니다.',
      },
    },
  },
  render: (args: BreadcrumbProps) => (
    <div className={cn(flexRow, alignCenters, fullSize)}>
      <div className={cn(flexCol, 'gap-20', fullSize)}>
        <h4 className={cn('font-bold')}></h4>
        {ellipsisIconOptions.map((ellipsis) => (
          <div className={cn(flexCol, 'gap-4')} key={ellipsis}>
            {separatorIconOptions.map((separator) => (
              <div className={cn(flexCol, 'gap-4')} key={separator}>
                <h4 className={cn(flexRow, 'gap-2')}>
                  <span className={cn(blueTxt, 'text-xs')}>ellipsisIcon : {ellipsis}</span>
                  <span className={cn('text-juiText-primary font-bold')}> | </span>
                  <span className={cn(blueTxt, 'text-xs')}>separatorIcon : {separator}</span>
                </h4>
                <Breadcrumb
                  {...args}
                  ellipsisIcon={getIcon(ellipsis, 'ellipsisIcon')}
                  separatorIcon={getIcon(separator, 'separatorIcon')}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
};

export const MaxItemsEllipsisPosition: Story = {
  args: {
    maxItems: DEFAULT_MAX_ITEM_NUM + 2,
  },
  argTypes: {
    items: { control: false, table: { disable: true } },
    dropdownProps: { control: false, table: { disable: true } },
    ellipsisPosition: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Breadcrumb 의 maxItems와 ellipsisPosition과 관련된 다양한 예시를 확인할 수 있는 스토리입니다.',
          'Breadcrumb 의 maxItems와 ellipsisPosition 조합에 따른 축약 위치 변화의 예시들을 확인하실 수 있습니다.',
          '또한, maxItems=null의 예시와 item 별 className의 적용과 dropdownProps의 적용 결과에 대한 예시도 확인하실 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args: BreadcrumbProps) => (
    <div className={cn(flexCol, alignCenters, 'gap-10', fullSize)}>
      <div className={cn(flexCol, 'gap-15', 'w-full h-max')}>
        {ellipsisPositionTypeOptions.map((position) => (
          <div className={cn(flexCol, 'gap-4')} key={position}>
            <p className={cn(flexRow, 'gap-2')}>
              <span className={cn(blueTxt, 'text-xs')}>
                ellipsisPosition : <b className={'text-juiText-primary font-bold'}>{position}</b>
              </span>
              <span className={cn('font-bold')}>|</span>
              <span className={cn(blueTxt, 'text-xs')}>
                maxItems : <b className={'text-juiText-primary font-bold'}>{args.maxItems}</b>
              </span>
            </p>
            <Breadcrumb
              {...args}
              ellipsisPosition={position}
              ellipsisIcon={getIcon(args.ellipsisIcon, 'ellipsisIcon')}
              separatorIcon={getIcon(args.separatorIcon, 'separatorIcon')}
            />
          </div>
        ))}
      </div>
      <Separator />
      <div className={cn(flexCol, 'gap-15', 'w-full h-max')}>
        <div className={cn(flexCol, 'gap-4')}>
          <p className={cn(flexRow)}>
            <span className={cn(blueTxt)}>maxItems=</span>
            <strong className={'font-bold'}>null</strong>
          </p>
          <Breadcrumb
            {...args}
            maxItems={null}
            ellipsisIcon={getIcon(args.ellipsisIcon, 'ellipsisIcon')}
            separatorIcon={getIcon(args.separatorIcon, 'separatorIcon')}
          />
        </div>
      </div>
      <Separator />
      <div className={cn(flexCol, 'gap-15', 'w-full h-max')}>
        <div className={cn(flexCol, 'gap-4')}>
          <p className={cn(flexCol, 'gap-2')}>
            <span className={cn('font-bold')}>
              <p>
                모든 item을 확인할 수 있도록 maxItem=null을 적용하여, 각각의 Item에 적용된 className을 확인하실 수
                있습니다. 공통적으로 dropdownProps이 적용 되도록 props를 주었습니다.
              </p>
            </span>
            <span>
              DropdownOptions : <span className={cn(blueTxt)}>{JSON.stringify({ side: 'top', sideOffset: 10 })}</span>
            </span>
          </p>
          <Breadcrumb
            {...args}
            items={itemArrLastIsPage}
            maxItems={null}
            dropdownProps={{ side: 'top', sideOffset: 10 }}
            ellipsisIcon={getIcon(args.ellipsisIcon, 'ellipsisIcon')}
            separatorIcon={getIcon(args.separatorIcon, 'separatorIcon')}
          />
        </div>
      </div>
    </div>
  ),
};
