import type { Meta, StoryObj } from '@storybook/react';
import {
  DEFAULT_ALIGN_OFFSET,
  DEFAULT_DELAY_DURATION,
  DEFAULT_SIDE_OFFSET,
  type TextAlignType,
  Tooltip,
  tooltipVariants,
} from '@common/ui';

const fadeOutOptions = [true, undefined];
const variantOptions = Object.keys(
  tooltipVariants.variants.variant,
) as (keyof typeof tooltipVariants.variants.variant)[];
const sizeOptions = Object.keys(tooltipVariants.variants.size) as (keyof typeof tooltipVariants.variants.size)[];
const sideOptions = Object.keys(tooltipVariants.variants.side) as (keyof typeof tooltipVariants.variants.side)[];
const alignOptions = Object.keys(tooltipVariants.variants.align) as (keyof typeof tooltipVariants.variants.align)[];
const textAlignOptions: TextAlignType[] = ['left', 'right', 'center'] as const;

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  args: {
    delayDuration: DEFAULT_DELAY_DURATION,
    open: false,
    defaultOpen: false,
    onOpenChange: undefined,
    openStatusRef: undefined,
    fadeOut: undefined,
    isShowArrow: true,
    variant: 'default',
    size: 'medium',
    side: 'top',
    sideOffset: DEFAULT_SIDE_OFFSET,
    align: 'center',
    alignOffset: DEFAULT_ALIGN_OFFSET,
    textAlign: 'left',
    contents: 'Tooltip Contents',
    children: undefined,
    className: '',
    disabled: false,
  },
  argTypes: {
    delayDuration: {
      control: 'number',
      table: { type: { summary: 'number' }, defaultValue: { summary: `${DEFAULT_DELAY_DURATION}` } },
    },
    open: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: `${false}` } },
    },
    defaultOpen: { control: 'boolean' },
    onOpenChange: {
      control: false,
      action: 'onOpenChange',
    },
    openStatusRef: {
      control: false,
    },
    fadeOut: {
      control: 'select',
      options: fadeOutOptions,
      table: {
        type: { summary: `${fadeOutOptions.join(', ')}` },
        defaultValue: { summary: `${fadeOutOptions[0]}` },
      },
    },
    isShowArrow: {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      options: variantOptions,
      table: {
        type: { summary: `${variantOptions.join(', ')}` },
        defaultValue: { summary: `${variantOptions[0]}` },
      },
    },
    size: {
      control: 'select',
      options: sizeOptions,
      table: {
        type: { summary: `${sizeOptions.join(', ')}` },
        defaultValue: { summary: `${sizeOptions[1]}` },
      },
    },
    side: {
      control: 'select',
      options: sideOptions,
      table: {
        type: { summary: `${sideOptions.join(', ')}` },
        defaultValue: { summary: `${sideOptions[0]}` },
      },
    },
    sideOffset: {
      control: 'number',
      table: {
        defaultValue: { summary: `${DEFAULT_SIDE_OFFSET}` },
      },
    },
    align: {
      control: 'select',
      options: alignOptions,
      table: {
        type: { summary: `${alignOptions.join(', ')}` },
        defaultValue: { summary: `${alignOptions[1]}` },
      },
    },
    alignOffset: {
      control: 'number',
      table: {
        defaultValue: { summary: `${DEFAULT_ALIGN_OFFSET}` },
      },
    },
    textAlign: {
      control: 'select',
      options: textAlignOptions,
      table: {
        type: { summary: `${textAlignOptions.join(', ')}` },
        defaultValue: { summary: `${textAlignOptions[0]}` },
      },
    },
    contents: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Tooltip Contents' },
      },
    },
    children: {
      control: false,
    },
    className: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    disabled: {
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component: ['Tooltip 컴포넌트의 문서입니다. Tooltip 이란, '].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 Tooltip 컴포넌트의 예시입니다.',
      },
    },
  },
  render: () => (
    // args
    <div className={'flex flex-col gap-4 items-center justify-center w-full'}>
      <h1>Tooltip</h1>
      <div className={'flex flex-col gap-4'}>
        <div>test</div>
        {/*{console.log('args :', args)}*/}
      </div>
    </div>
  ),
};
