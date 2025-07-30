import type { Meta, StoryObj } from '@storybook/react';
import { cn } from '@common/ui/lib/utils.ts';
import { Separator, type SeparatorProps, separatorVariants } from '@common/ui';

const colorArray = Object.keys(
  separatorVariants.variants.variant,
) as (keyof typeof separatorVariants.variants.variant)[];
const sizeArray = Object.keys(separatorVariants.variants.size) as (keyof typeof separatorVariants.variants.size)[];

type SeparatorStorybookType = SeparatorProps;

const DEFAULT_VARIANT_VALUE = 'default';
const meta: Meta<SeparatorStorybookType> = {
  title: 'UI/Divider/Separator',
  component: Separator,
  args: {
    position: 'static',
    orientation: 'vertical',
    variant: DEFAULT_VARIANT_VALUE,
    size: 'basic',
    decorative: true,
    className: '',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: colorArray,
      table: {
        type: { summary: typeof colorArray[0] },
        defaultValue: { summary: DEFAULT_VARIANT_VALUE },
      },
      description: [
        `Separator 의 색을 지정할 수 있는 variant 로 ${colorArray.join(', ')} 에서 선택할 수 있습니다.`,
        `기본값은 ${DEFAULT_VARIANT_VALUE} 입니다.`,
      ].join('<br/>'),
    },
    size: {
      control: 'select',
      options: sizeArray,
      table: {
        type: { summary: typeof sizeArray[1] },
        defaultValue: { summary: 'basic' },
      },
      description: [
        `Separator 의 굵기를 지정할 수 있습니다. ${sizeArray.join(', ')} 에서 선택할 수 있습니다. 기본값은 ${sizeArray[1]} 입니다.`,
      ].join('<br/>'),
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      table: { type: { summary: "'vertical' | 'horizontal'" }, defaultValue: { summary: 'vertical' } },
      description: 'Separator 의 방향(가로, 세로)선 입니다. 기본값 : vertical',
    },
    position: {
      table: { type: { summary: "'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'" } },
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
        component: [
          'Separator 컴포넌트의 문서입니다. Separator 컴포넌트는 기본적으로 data-slot="separator-root" 으로 분류됩니다.',
          'div 태그를 기본으로 하며 Separator의 경우 props 선택에 따라 방향, 굵기, 색깔이 바뀌게 되니 유의 바랍니다.',
          '공통적으로 적용되는 Separator의 스타일의 경우 기본적으로 방향에 따라 w/h-full을 기본으로 한다는 것을 고려해주시고, 상세 내역은 하단 혹은 각 Story 를 참조해주세요.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<SeparatorStorybookType>;

export const Default: Story = {
  argTypes: {
    position: {
      table: { disable: true },
    },
  },
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
    position: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Separator 의 variant 종류별 예시를 확인할 수 있습니다.',
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
    position: {
      table: { disable: true },
    },
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
        story: 'Separator 의 size 종류별 예시를 확인할 수 있습니다.',
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
    position: {
      table: { disable: true },
    },
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
        story: 'Separator 의 orientation 종류별 예시를 확인할 수 있습니다.',
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
          <hr className="mt-4 mb-4 text-juiText-primary w-4/5 h-0.5" />
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

const normalPositions = ['fixed', 'sticky', 'absolute', 'static', 'relative'] as const;
const bgMap = {
  static: 'bg-green-200',
  relative: 'bg-orange-300',
  absolute: 'bg-pink-200',
  fixed: 'bg-blue-200',
  sticky: 'bg-yellow-200',
};

// position 별 버튼 렌더링 스토리
export const Position: Story = {
  args: {
    variant: 'purple',
    size: 'medium',
  },
  argTypes: {
    orientation: { table: { disable: true } },
    decorative: {
      control: false,
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Separator 의 position 종류별 예시를 확인할 수 있습니다.',
          '부모의 예시와 함께 control 에서 orientation 의 변화에 따른 예시도 확인할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={'static size-full bg-juiBackground-paper'}>
      <div className={'flex flex-col items-center justify-center gap-2 size-full'}>
        <h1 className={'p-4 text-juiText-primary text-left font-bold text-3xl'}>
          Position 별 예시
          <p className={'text-sm font-normal pt-2'}>
            부모 컨테이너의 배경색 및 부모 컨테이너의 position 정보와 함께 확인할 수 있습니다. 부모 컨테이너의 크기는
            지정하지 않고 일부러 flex 등으로 처리하였습니다.
            <br />
            부모 컨테이너의 z-index는 지정하지 않았습니다.
          </p>
        </h1>
        <h2 className={'flex flex-col items-start gap-3 text-juiText-blue text-center text-2xl font-bold min-h-30'}>
          <p>현재 Separator 의 position : {args.position}</p>
          {(args.position === 'absolute' || args.position === 'fixed') && (
            <p
              className={
                'flex flex-col gap-0.5 items-start justify-center text-sm text-juiText-primary font-semibold py-2'
              }>
              <span>orientation 이 horizontal 인 경우 : bottom-0 left-0 m-0</span>
              <span>orientation 이 vertical 인 경우 : top-0 right-0 m-0</span>
              <span>으로 잡혀 있습니다.</span>
            </p>
          )}
        </h2>
        <div className={'static overflow-hidden w-full h-full float-none clear-both'}>
          {normalPositions.map((pos) => (
            <div className={'relative w-1/2 min-h-40 float-left px-10'} key={`parent-${pos}`}>
              <div className={cn('mt-10', pos, bgMap[pos])}>
                <h2 className={'text-black text-center font-bold text-lg'}>
                  부모 컨데이터: {pos}
                  <p className={'text-sm'}>부모의 배경색: {bgMap[pos]}</p>
                  <div className={'flex flex-col items-center justify-center gap-4'}>
                    <div className="flex flex-col items-center justify-center w-full mt-2 bg-juiGrey-300">
                      <span>세로 구분선(vertical)</span>
                      <div className="flex flex-row items-center justify-center w-full h-12 gap-4">
                        <span>Left</span>
                        <Separator {...args} position={args.position} orientation="vertical" />
                        <span>Center</span>
                        <Separator {...args} position={args.position} orientation="vertical" />
                        <span>Right</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full mt-2 bg-juiGrey-300">
                      <span>가로 구분선(horizontal)</span>
                      <span>Child 1</span>
                      <Separator {...args} position={args.position} orientation="horizontal" />
                      <span>Child 2</span>
                      <Separator {...args} position={args.position} orientation="horizontal" />
                      <span>Child 3</span>
                      <Separator {...args} position={args.position} orientation="horizontal" />
                    </div>
                  </div>
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
