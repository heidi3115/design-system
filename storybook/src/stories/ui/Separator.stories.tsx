import type { Meta, StoryObj } from '@storybook/react';
import { Separator, separatorVariants } from '@common/ui/components/Separator';

const colorArray = Object.keys(
  separatorVariants.variants.variant,
) as (keyof typeof separatorVariants.variants.variant)[];

const sizeArray = Object.keys(separatorVariants.variants.size) as (keyof typeof separatorVariants.variants.size)[];

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  args: {
    variant: 'primary',
    size: 'basic',
    orientation: 'vertical',
    decorative: true,
    className: '',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: colorArray,
      table: {
        type: { summary: typeof colorArray[0] },
        defaultValue: { summary: 'primary' },
      },
      description:
        'Separator 의 색을 지정할 수 있는 variant 로서 primary, secondary, disabled, blue, purple 에서 선택할 수 있습니다. 기본값은 primary 입니다.',
    },
    size: {
      control: 'select',
      options: sizeArray,
      table: {
        type: { summary: typeof sizeArray[1] },
        defaultValue: { summary: 'basic' },
      },
      description:
        'Separator 의 굵기를 지정할 수 있습니다. small, basic, medium, large 에서 선택하실 수 있습니다. 기본값은 basic 입니다.',
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      table: { type: { summary: "'vertical' | 'horizontal'" }, defaultValue: { summary: 'vertical' } },
      description: 'Separator 의 방향(가로, 세로)선 입니다. 기본값 : vertical',
    },
    decorative: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
      description:
        'Separator가 “순수하게 시각적 장식용”인지, 아니면 “실제로 문서 구조의 구분(semantic separation)”을 위해 쓰이는지 명시하기 위한 속성입니다.\ndecorative={true} 인 경우, role="none" 처리가 되고 aria-hidden="true" 가 되고, decorative={false} 인 경우, aria-hidden="false" 가 되고 aria-orientation가 orientation 방향에 따라서 추가됩니다.',
    },
    className: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } },
      description: 'Separator 에 추가적으로 적용할 Tailwind CSS 클래스',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Separator 컴포넌트의 문서입니다. Separator 컴포넌트는 기본적으로 data-slot="separator-root" 으로 분류됩니다. div 태그를 기본으로 하며 <br/>Separator의 경우 props 선택에 따라 방향, 굵기, 색깔이 바뀌게 되니 유의 바랍니다.<br/>공통적으로 적용되는 Separator의 스타일의 경우 기본적으로 방향에 따라 w/h-full을 기본으로 한다는 것을 고려해주시고, 상세 내역은 하단 혹은 각 스토리를 참조해주세요.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 Separator 의 기본 예시 입니다.',
      },
    },
  },
  render: (args) => {
    return (
      <div className={'flex flex-col gap-4'}>
        <div className={'flex flex-col gap-2 items-center justify-center'}>
          <span className={'mb-4 text-xl font-bold'}>orientation : {args.orientation}</span>
          {args.orientation === 'vertical' ? (
            <div className={'flex flex-row justify-center h-4'}>
              <Separator {...args} />
              <h4 className={'text-juiText-blue'}>{args.orientation}</h4>
              <Separator {...args} />
              <h4 className={'text-juiText-blue'}>{args.orientation}</h4>
              <Separator {...args} />
              <h4 className={'text-juiText-blue'}>{args.orientation}</h4>
            </div>
          ) : (
            <div className={'flex flex-col'}>
              <h4 className={'text-juiText-blue'}>{args.orientation}</h4>
              <Separator {...args} />
              <h4 className={'text-juiText-blue'}>{args.orientation}</h4>
              <Separator {...args} />
              <h4 className={'text-juiText-blue'}>{args.orientation}</h4>
            </div>
          )}
        </div>
      </div>
    );
  },
};

// variant 별 버튼 렌더링 스토리
export const Variant: Story = {
  argTypes: {
    variant: {
      control: false,
      table: { disable: true },
    },
    decorative: {
      control: false,
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Separator 의 variant 종류별 예시를 확인하실 수 있습니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-4'}>
        <div className={'flex flex-col gap-2 items-center justify-center'}>
          <span className={'mb-4 text-xl font-bold'}>orientation : {args.orientation}</span>
          {args.orientation === 'vertical' ? (
            <div className={'flex h-full gap-2'}>
              {colorArray.map((variant) => (
                <div key={variant} className={'flex flex-row justify-center h-4 text-center'}>
                  <Separator {...args} variant={variant} />
                  <h4 className={`text-juiText-${variant}`}>{`variant: ${variant}`}</h4>
                </div>
              ))}
            </div>
          ) : (
            <div className={'flex flex-col'}>
              {colorArray.map((variant) => (
                <div key={variant} className={'text-center'}>
                  <h4 className={`text-juiText-${variant}`}>{`variant: ${variant}`}</h4>
                  <Separator {...args} variant={variant} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  ),
};

// size 별 버튼 렌더링 스토리
export const Size: Story = {
  argTypes: {
    size: {
      control: false,
      table: { disable: true },
    },
    decorative: {
      control: false,
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Separator 의 size 종류별 예시를 확인하실 수 있습니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-4'}>
        <div className={'flex flex-col gap-2 items-center justify-center text-base'}>
          <span className={'mb-4 text-xl font-bold'}>orientation : {args.orientation}</span>
          {args.orientation === 'vertical' ? (
            <div className={'flex flex-col h-full gap-2'}>
              {sizeArray.map((size) => (
                <div key={size} className={'flex flex-row items-center justify-center h-4 text-center'}>
                  <Separator {...args} size={size} />
                  <h4 className={`text-juiText-${args.variant}`}>{`size: ${size}`}</h4>
                  <Separator {...args} size={size} />
                  <h4 className={`text-juiText-${args.variant}`}>{`size: ${size}`}</h4>
                  <Separator {...args} size={size} />
                  <h4 className={`text-juiText-${args.variant}`}>{`size: ${size}`}</h4>
                  <Separator {...args} size={size} />
                </div>
              ))}
            </div>
          ) : (
            <div className={'flex flex-row gap-4'}>
              {sizeArray.map((size) => (
                <div key={size} className={'flex flex-col items-center justify-center text-center'}>
                  <Separator {...args} size={size} />
                  <h4 className={`text-juiText-${args.variant}`}>{`size: ${size}`}</h4>
                  <Separator {...args} size={size} />
                  <h4 className={`text-juiText-${args.variant}`}>{`size: ${size}`}</h4>
                  <Separator {...args} size={size} />
                  <h4 className={`text-juiText-${args.variant}`}>{`size: ${size}`}</h4>
                  <Separator {...args} size={size} />
                  <h4 className={`text-juiText-${args.variant}`}>{`size: ${size}`}</h4>
                  <Separator {...args} size={size} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  ),
};

// orientation 별 버튼 렌더링 스토리
export const Orientation: Story = {
  argTypes: {
    orientation: {
      control: false,
      table: { disable: true },
    },
    decorative: {
      control: false,
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Separator 의 orientation 종류별 예시를 확인하실 수 있습니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-4'}>
        <div className={'flex flex-col gap-4 items-center justify-center text-lg'}>
          <span className={'mb-4 text-xl font-bold'}>orientation : vertical</span>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex flex-col h-full gap-2'}>
              {sizeArray.map((size) => (
                <div key={size} className={'flex flex-row items-center justify-center h-4 text-center'}>
                  <Separator {...args} />
                  <h4 className={`text-juiText-${args.variant}`}>{`variant: ${args.variant}, size: ${args.size}`}</h4>
                  <Separator {...args} />
                  <h4 className={`text-juiText-${args.variant}`}>{`variant: ${args.variant}, size: ${args.size}`}</h4>
                  <Separator {...args} />
                  <h4 className={`text-juiText-${args.variant}`}>{`variant: ${args.variant}, size: ${args.size}`}</h4>
                  <Separator {...args} />
                </div>
              ))}
            </div>
          </div>
          <hr className={'mt-4 mb-4 text-juiText-primary'} style={{ width: '80%', height: '2px' }} />
          <div className={'flex flex-col gap-2 items-center justify-center text-lg'}>
            <span className={'mb-4 text-xl font-bold'}>orientation : horizontal</span>
            <div className={'flex flex-row gap-4'}>
              {sizeArray.map((size) => (
                <div key={size} className={'flex flex-col items-center justify-center text-center'}>
                  <Separator {...args} orientation={'horizontal'} />
                  <h4 className={`text-juiText-${args.variant}`}>{`variant: ${args.variant}, size: ${args.size}`}</h4>
                  <Separator {...args} orientation={'horizontal'} />
                  <h4 className={`text-juiText-${args.variant}`}>{`variant: ${args.variant}, size: ${args.size}`}</h4>
                  <Separator {...args} orientation={'horizontal'} />
                  <h4 className={`text-juiText-${args.variant}`}>{`variant: ${args.variant}, size: ${args.size}`}</h4>
                  <Separator {...args} orientation={'horizontal'} />
                  <h4 className={`text-juiText-${args.variant}`}>{`variant: ${args.variant}, size: ${args.size}`}</h4>
                  <Separator {...args} orientation={'horizontal'} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
