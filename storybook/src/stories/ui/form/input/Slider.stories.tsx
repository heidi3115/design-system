import type { Meta, StoryObj } from '@storybook/react';
import { cn } from '@common/ui/lib/utils.ts';
import { Button, Input, Slider, type SliderMark, type SliderProps, sliderVariants, Tooltip } from '@common/ui';
import { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@common/ui/icons';

// 공통 상수
const variantOptions = Object.keys(sliderVariants.variants.variant) as (keyof typeof sliderVariants.variants.variant)[];
const sizeOptions = Object.keys(sliderVariants.variants.size) as (keyof typeof sliderVariants.variants.size)[];
const orientationOptions = Object.keys(
  sliderVariants.variants.orientation,
) as (keyof typeof sliderVariants.variants.orientation)[];
const showValueLabelOptions = ['always', 'auto', 'none'] as const;

// 레이아웃 클래스
const flexCol = 'flex flex-col text-jui text-juiText-primary';
const flexRow = 'flex flex-row';
const allCenter = 'items-center justify-center';
const blueTxt = 'text-juiText-blue';
const titTxt = 'font-bold text-base';
const subTitTxt = 'font-bold text-xs';

// 기본 값 상수
const MIN_INT_VALUE = 0;
const MAX_INT_VALUE = 100;
const MIN_DECIMAL_VALUE = 0.01;
const DEFAULT_STEP = 1;
const DECIMAL_STEP = 0.1;

const INT_DEFAULT_VALUE_ARR = [5, 15];
const INT_VALUE_ARR = [20, 50];
const DECIMAL_DEFAULT_VALUE_ARR = [0.25, 0.45];
const DECIMAL_VALUE_ARR = [0.55, 0.8];

const customMarks: SliderMark[] = [
  { value: 0, label: '0°C' },
  { value: 25 },
  { value: 30, label: '30°C', labelClass: 'text-blue-500 font-bold' },
  { value: 50 },
  { value: 75 },
  { value: 90, label: '90°C', labelClass: 'text-red-500 font-bold' },
  { value: 100, label: '100°C' },
];

const meta: Meta<typeof Slider> = {
  title: 'UI/Form/Input/Slider',
  component: Slider,
  args: {
    variant: 'primary',
    size: 'default',
    orientation: 'horizontal',
    showValueLabel: 'auto',
    unitLabel: '',
    marks: false,
    disabled: false,
    inverted: false,
    min: MIN_INT_VALUE,
    max: MAX_INT_VALUE,
    step: DEFAULT_STEP,
    minStepsBetweenThumbs: MIN_INT_VALUE,
    defaultValue: [INT_DEFAULT_VALUE_ARR[0]],
    value: undefined,
    onValueChange: undefined,
    onValueCommit: undefined,
    className: '',
    sliderRef: undefined,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variantOptions,
      table: {
        type: { summary: `${variantOptions.map((d) => `'${d}'`).join(' | ')}` },
        defaultValue: { summary: "'primary'" },
      },
      description: [
        "Slider의 색상 변형을 설정합니다. 'custom' 으로 설정 시, CSS 변수 `--slider-color`를 직접 지정해야 합니다.",
      ].join('<br/>'),
    },
    size: {
      control: 'select',
      options: sizeOptions,
      table: {
        type: { summary: `${sizeOptions.map((d) => `'${d}'`).join(' | ')}` },
        defaultValue: { summary: "'default'" },
      },
      description: ['Slider의 크기를 설정합니다.'].join('<br/>'),
    },
    orientation: {
      control: 'inline-radio',
      options: orientationOptions,
      table: {
        type: { summary: `${orientationOptions.map((d) => `'${d}'`).join(' | ')}` },
        defaultValue: { summary: "'horizontal'" },
      },
      description: ['Slider의 방향을 수평 또는 수직으로 설정합니다.'].join('<br/>'),
    },
    showValueLabel: {
      control: 'select',
      options: showValueLabelOptions,
      table: {
        type: { summary: `${showValueLabelOptions.map((d) => `'${d}'`).join(' | ')}` },
        defaultValue: { summary: "'auto'" },
      },
      description: ["값 레이블(툴팁)의 표시 여부를 설정합니다. 'auto'는 드래그 또는 호버 시에만 표시됩니다."].join(
        '<br/>',
      ),
    },
    unitLabel: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
      description: ["값 레이블에 표시될 단위를 설정합니다 (예: '%', 'px')."].join('<br/>'),
    },
    marks: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean | SliderMark[]' },
        defaultValue: { summary: 'false' },
      },
      description: [
        'Slider 트랙에 눈금을 표시할지 여부를 설정합니다. `true`일 경우 `step`에 따라 자동으로 눈금이 생성됩니다.',
      ].join('<br/>'),
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: ['Slider를 비활성화할지 여부를 설정합니다.'].join('<br/>'),
    },
    inverted: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: ['Slider의 값 방향을 반전시킵니다.'].join('<br/>'),
    },
    min: {
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: `${MIN_INT_VALUE}` },
      },
      description: ['Slider의 최솟값을 설정합니다.'].join('<br/>'),
    },
    max: {
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: `${MAX_INT_VALUE}` },
      },
      description: ['Slider의 최댓값을 설정합니다.'].join('<br/>'),
    },
    step: {
      control: { type: 'number', min: DEFAULT_STEP },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: `${DEFAULT_STEP}` },
      },
      description: ['Slider 값의 증가 단위를 설정합니다.'].join('<br/>'),
    },
    minStepsBetweenThumbs: {
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: `${MIN_INT_VALUE}` },
      },
      description: ['다중 Thumb 사용 시, Thumb 사이의 최소 간격(step 기준)을 설정합니다.'].join('<br/>'),
    },
    defaultValue: {
      control: false,
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: '[]' },
      },
      description: ['Slider의 비제어 상태일 때의 초기값을 설정합니다.'].join('<br/>'),
    },
    value: {
      control: false,
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: '[]' },
      },
      description: [
        'Slider의 제어 상태일 때의 값을 설정합니다. 이 값을 사용하면 컴포넌트 외부에서 상태를 관리해야 합니다.',
      ].join('<br/>'),
    },
    className: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
      description: ['컴포넌트의 최상위 요소에 추가할 tailwindCSS 클래스를 설정합니다.'].join('<br/>'),
    },
    onValueChange: {
      control: false,
      table: {
        type: { summary: '(value: number[]) => void' },
        defaultValue: { summary: 'undefined' },
      },
      description: ['Slider 값이 변경될 때마다 호출되는 콜백 함수입니다.', 'storybook 에서는 제어할 수 없습니다.'].join(
        '<br/>',
      ),
    },
    onValueCommit: {
      control: false,
      table: {
        type: { summary: '(value: number[]) => void' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '사용자가 값 변경을 마쳤을 때(예: 마우스 놓기) 호출되는 콜백 함수입니다.',
        'storybook 에서는 제어할 수 없습니다.',
      ].join('<br/>'),
    },
    sliderRef: {
      control: false,
      table: {
        type: { summary: `Ref<number[]>` },
        defaultValue: { summary: `${undefined}` },
      },
      description: [
        'ref.current를 통해 부모 컴포넌트에게 현재 열려 있는 아이템의 value 값을 외부에서 참조할 수 있도록 하는 Ref 객체입니다.',
        '비제어(Uncontrolled)/제어(Controlled) 모드 모두에서 동작합니다.',
        'value가 없는 경우 undefined가 될 수 있습니다.',
        'storybook 에서는 제어할 수 없습니다.',
      ].join('<br/>'),
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Slider 컴포넌트의 문서입니다.',
          '**Slider 컴포넌트**는 사용자가 지정된 범위 내에서 단일 값을 선택하거나 값의 범위를 지정할 수 있게 해주는 UI 컨트롤입니다.',
          '단일 및 범위 선택이 가능하여, `defaultValue` 또는 `value` prop에 숫자 배열을 전달하여 단일 핸들(thumb) Slider 또는 범위 Slider를 구현할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          '기본 Slider 컴포넌트의 예시입니다.',
          '사용자가 지정된 범위 내에서 값을 선택할 수 있는 UI 컨트롤입니다.',
          '단일 값 선택 또는 범위 선택이 가능하며, 드래그하여 값을 조정할 수 있습니다.',
          '`defaultValue`에 배열의 요소 개수에 따라 단일 Slider 또는 범위 Slider로 동작합니다.',
        ].join('<br/>'),
      },
    },
  },
};

export const Variants: Story = {
  argTypes: {
    variant: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    onValueCommit: { table: { disable: true } },
    sliderRef: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '다양한 `variant`(색상) 옵션을 보여주는 예시입니다.',
          '각 variant 별로 단일 값 슬라이더와 범위 슬라이더를 모두 확인할 수 있습니다.',
          '`custom` variant 사용 시에는 CSS 변수 `--slider-color`를 통해 원하는 색상을 지정할 수 있습니다.',
          '브랜드 색상에 맞게 슬라이더를 커스터마이징할 때 활용하세요.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={cn('gap-10 size-full', args.orientation === 'vertical' ? `${flexRow} h-100` : flexCol)}>
      {variantOptions.map((variant) => (
        <div key={variant} className={cn(flexCol, args.orientation === 'vertical' && allCenter, 'size-full gap-4')}>
          <h3 className={cn(subTitTxt)}>{variant}</h3>
          <div
            className={cn(args.orientation === 'vertical' ? `${flexRow} ${allCenter}` : flexCol, 'size-full gap-10')}>
            <Slider {...args} variant={variant} defaultValue={[INT_DEFAULT_VALUE_ARR[0]]} />
            <Slider {...args} variant={variant} defaultValue={INT_DEFAULT_VALUE_ARR} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  argTypes: {
    size: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    onValueCommit: { table: { disable: true } },
    sliderRef: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '다양한 `size` 옵션을 보여주는 예시입니다.',
          '슬라이더의 크기는 트랙의 두께와 핸들(thumb)의 크기에 영향을 미칩니다.',
          '각 size 별로 단일 값과 범위 슬라이더를 모두 확인할 수 있습니다.',
          '사용자 인터페이스의 밀도와 중요도에 따라 적절한 크기를 선택하세요.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={cn('gap-10 size-full', args.orientation === 'vertical' ? `${flexRow} h-100` : flexCol)}>
      {sizeOptions.map((size) => (
        <div key={size} className={cn(flexCol, args.orientation === 'vertical' && allCenter, 'size-full gap-4')}>
          <h3 className={cn(subTitTxt)}>{size}</h3>
          <div
            className={cn(args.orientation === 'vertical' ? `${flexRow} ${allCenter}` : flexCol, 'size-full gap-10')}>
            <Slider {...args} size={size} defaultValue={[INT_DEFAULT_VALUE_ARR[0]]} />
            <Slider {...args} size={size} defaultValue={INT_DEFAULT_VALUE_ARR} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Orientations: Story = {
  argTypes: {
    orientation: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    onValueCommit: { table: { disable: true } },
    sliderRef: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '`orientation` 옵션에 따른 가로 및 세로 모드 예시입니다.',
          '가로 모드(horizontal)는 일반적인 슬라이더 형태로, 좌우로 드래그하여 값을 조정합니다.',
          '세로 모드(vertical)는 상하로 드래그하여 값을 조정하며, 공간이 제한적일 때 유용합니다.',
          '각 방향별로 정수와 소수점 값을 모두 지원하며, 범위 선택도 가능합니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={cn(flexRow, 'gap-16 w-full h-100')}>
      <div className={cn(flexCol, 'flex-1 gap-4')}>
        <h3 className={cn(titTxt)}>Horizontal</h3>
        <div className={cn(flexCol, 'size-full gap-15')}>
          <p className={cn(subTitTxt)}>소수점</p>
          <Slider
            {...args}
            orientation="horizontal"
            min={MIN_INT_VALUE}
            max={DEFAULT_STEP}
            step={MIN_DECIMAL_VALUE}
            defaultValue={[DECIMAL_DEFAULT_VALUE_ARR[0]]}
          />
          <p className={cn(subTitTxt)}>정수</p>
          <Slider {...args} orientation="horizontal" defaultValue={INT_DEFAULT_VALUE_ARR} />
        </div>
      </div>
      <div className={cn(flexRow, 'gap-12 size-full flex-1 ')}>
        <div className={cn(flexCol, allCenter, 'gap-4 size-full')}>
          <h3 className={cn(titTxt)}>Vertical</h3>
          <div className={cn(flexRow, allCenter, 'size-full gap-20')}>
            <div className={cn(flexCol, allCenter, 'size-full gap-2')}>
              <p className={cn(subTitTxt)}>소수점</p>
              <Slider
                {...args}
                orientation="vertical"
                min={MIN_INT_VALUE}
                max={DEFAULT_STEP}
                step={MIN_DECIMAL_VALUE}
                defaultValue={[DECIMAL_DEFAULT_VALUE_ARR[0]]}
              />
            </div>
            <div className={cn(flexCol, allCenter, 'size-full gap-2')}>
              <p className={cn(subTitTxt)}>정수</p>
              <Slider {...args} orientation="vertical" defaultValue={INT_DEFAULT_VALUE_ARR} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Labels: Story = {
  args: {
    step: 10,
  },
  argTypes: {
    orientation: { table: { disable: true } },
    showValueLabel: { table: { disable: true } },
    unitLabel: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    onValueCommit: { table: { disable: true } },
    sliderRef: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '`showValueLabel`과 `unitLabel`을 활용한 레이블 표시의 다양한 예시입니다.',
          '`showValueLabel`은 값 표시 방식을 제어합니다: `always`(항상 표시), `auto`(호버/드래그 시), `none`(표시 안 함).',
          '`unitLabel`을 통해 퍼센트(%), 픽셀(px), 온도(°C) 등의 단위를 값과 함께 표시할 수 있습니다.',
          '사용자에게 현재 값과 단위를 명확히 알려주어 더 나은 사용자 경험을 제공합니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={cn(flexCol, 'w-full h-150')}>
      <div className={cn(flexRow, 'gap-20 size-full')}>
        <div className={cn(flexCol, 'gap-10 size-full')}>
          <h2 className={cn(blueTxt, titTxt)}>Horizontal</h2>
          <div className={cn(flexCol)}>
            <h3 className={cn(subTitTxt, 'mb-15')}>항상 보기</h3>
            <Slider
              {...args}
              orientation={'horizontal'}
              showValueLabel="always"
              defaultValue={[INT_DEFAULT_VALUE_ARR[0]]}
            />
          </div>
          <div className={cn(flexCol)}>
            <h3 className={cn(subTitTxt, 'mb-15')}>UnitLabel로 항상 보기</h3>
            <Slider
              {...args}
              orientation={'horizontal'}
              showValueLabel="always"
              unitLabel="%"
              defaultValue={INT_DEFAULT_VALUE_ARR}
            />
          </div>
          <div className={cn(flexCol)}>
            <h3 className={cn(subTitTxt, 'mb-15')}>Auto (Hover/Drag)</h3>
            <Slider
              {...args}
              orientation={'horizontal'}
              showValueLabel="auto"
              defaultValue={[INT_DEFAULT_VALUE_ARR[0]]}
            />
          </div>
          <div className={cn(flexCol)}>
            <h3 className={cn(subTitTxt, 'mb-15')}>None</h3>
            <Slider {...args} orientation={'horizontal'} showValueLabel="none" defaultValue={INT_DEFAULT_VALUE_ARR} />
          </div>
        </div>
        <div className={cn(flexCol, 'gap-10 size-full')}>
          <h2 className={cn(blueTxt, titTxt)}>Vertical</h2>
          <div className={cn(flexRow, allCenter, 'gap-5 size-full')}>
            <div className={cn(flexCol, allCenter, 'gap-5 size-full')}>
              <h3 className={cn(subTitTxt, 'h-12')}>항상 보기</h3>
              <Slider
                {...args}
                orientation={'vertical'}
                showValueLabel="always"
                defaultValue={[INT_DEFAULT_VALUE_ARR[0]]}
              />
            </div>
            <div className={cn(flexCol, allCenter, 'gap-5 size-full')}>
              <h3 className={cn(subTitTxt, 'h-12')}>UnitLabel로 항상 보기</h3>
              <Slider
                {...args}
                orientation={'vertical'}
                showValueLabel="always"
                unitLabel="%"
                defaultValue={INT_DEFAULT_VALUE_ARR}
              />
            </div>
            <div className={cn(flexCol, allCenter, 'gap-5 size-full')}>
              <h3 className={cn(subTitTxt, 'h-12')}>Auto (Hover/Drag)</h3>
              <Slider
                {...args}
                orientation={'vertical'}
                showValueLabel="auto"
                defaultValue={[INT_DEFAULT_VALUE_ARR[0]]}
              />
            </div>
            <div className={cn(flexCol, allCenter, 'gap-5 size-full')}>
              <h3 className={cn(subTitTxt, 'h-12')}>None</h3>
              <Slider {...args} orientation={'vertical'} showValueLabel="none" defaultValue={INT_DEFAULT_VALUE_ARR} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const StepsAndMarks: Story = {
  name: 'Steps and Marks',
  argTypes: {
    min: { table: { disable: true } },
    max: { table: { disable: true } },
    step: { table: { disable: true } },
    minStepsBetweenThumbs: { table: { disable: true } },
    marks: { table: { disable: true } },
    orientation: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    onValueCommit: { table: { disable: true } },
    sliderRef: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '`step`, `minStepsBetweenThumbs`, `marks` 관련 옵션 예시입니다.',
          '`marks`의 경우 true로 하시면 label 없이, step 간격으로 mark 가 생성이 되고, 별도로 mark 별로 `label`를 기입하거나 간격을 커스텀으로 표시할 수 있고, `label`에 클래스를 추가하는 `labelClass`도 추가 가능합니다.',
          '`minStepsBetweenThumbs` 의 경우 step 의 간격 만큼은 간격을 좁힐 수 없게 해주는 최소한의 간격 간의 거리를 지정하는 prop 입니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => {
    return (
      <div className={cn(flexCol, 'gap-12 w-full h-200')} key={JSON.stringify(args)}>
        <div className={cn(flexRow, 'gap-20 size-full')}>
          <div className={cn(flexCol, 'gap-10 size-full')}>
            <h2 className={cn(blueTxt, titTxt)}>Horizontal</h2>
            <div className={cn(flexCol, 'size-full gap-6')}>
              <div className={cn(flexCol, 'size-full')}>
                <h3 className={cn(subTitTxt, 'mb-5')}>Integer Step (step: 10)</h3>
                <Slider {...args} step={10} defaultValue={[20, 60]} />
              </div>
              <div className={cn(flexCol, 'size-full')}>
                <h3 className={cn(subTitTxt, 'mb-5')}>
                  Decimal Step (min: {MIN_INT_VALUE}, max: {DEFAULT_STEP}, step: {DECIMAL_STEP})
                </h3>
                <Slider
                  {...args}
                  min={MIN_INT_VALUE}
                  max={DEFAULT_STEP}
                  step={DECIMAL_STEP}
                  defaultValue={DECIMAL_VALUE_ARR}
                />
              </div>
              <div className={cn(flexCol, 'size-full')}>
                <h3 className={cn(subTitTxt, 'mb-5')}>
                  Min Steps Between Thumbs (step: {INT_DEFAULT_VALUE_ARR[0]}, minStepsBetweenThumbs: 3)
                </h3>
                <Slider
                  {...args}
                  step={INT_DEFAULT_VALUE_ARR[0]}
                  minStepsBetweenThumbs={3}
                  defaultValue={INT_VALUE_ARR}
                />
              </div>
              <div className={cn(flexCol, 'size-full')}>
                <h3 className={cn(subTitTxt, 'mb-5')}>
                  Automatic Marks (marks: true, min: {MIN_INT_VALUE}, max: {MAX_INT_VALUE} ,step: 25)
                </h3>
                <Slider
                  {...args}
                  min={MIN_INT_VALUE}
                  max={MAX_INT_VALUE}
                  step={25}
                  marks={Array.from({ length: MAX_INT_VALUE / 25 }, (_, idx) => ({
                    value: idx * 25,
                    label: `${idx * 25} %`,
                  }))}
                  defaultValue={[INT_VALUE_ARR[1]]}
                />
              </div>
              <div className={cn(flexCol, 'size-full')}>
                <h3 className={cn(subTitTxt, 'mb-5')}>Custom Marks (with labels and custom classes)</h3>
                <Slider {...args} marks={customMarks} defaultValue={INT_DEFAULT_VALUE_ARR} />
              </div>
            </div>
          </div>
          <div className={cn(flexCol, 'gap-10 size-full')}>
            <h2 className={cn(blueTxt, titTxt)}>Vertical</h2>
            <div className={cn(flexRow, 'size-full gap-10')}>
              <div className={cn(flexCol, 'flex-1 size-full items-center justify-between')}>
                <h3 className={cn(subTitTxt, 'break-all flex-1/6')}>Integer Step (step: 10)</h3>
                <Slider {...args} orientation={'vertical'} step={10} defaultValue={[20, 60]} className={'flex-2/3'} />
              </div>
              <div className={cn(flexCol, 'flex-1 size-full items-center justify-between')}>
                <h3 className={cn(subTitTxt, 'break-all flex-1/6')}>
                  Decimal Step (min: {MIN_INT_VALUE}, max: {DEFAULT_STEP}, step: {DECIMAL_STEP})
                </h3>
                <Slider
                  {...args}
                  orientation={'vertical'}
                  min={MIN_INT_VALUE}
                  max={DEFAULT_STEP}
                  step={DECIMAL_STEP}
                  defaultValue={DECIMAL_VALUE_ARR}
                  className={'flex-2/3'}
                />
              </div>
              <div className={cn(flexCol, 'flex-1 size-full items-center justify-between')}>
                <h3 className={cn(subTitTxt, 'break-all flex-1/6')}>
                  Min Steps Between Thumbs (step: {INT_DEFAULT_VALUE_ARR[0]}, minStepsBetweenThumbs: 3)
                </h3>
                <Slider
                  {...args}
                  orientation={'vertical'}
                  step={INT_DEFAULT_VALUE_ARR[0]}
                  minStepsBetweenThumbs={3}
                  defaultValue={INT_VALUE_ARR}
                  className={'flex-2/3'}
                />
              </div>
              <div className={cn(flexCol, 'flex-1 size-full items-center justify-between')}>
                <h3 className={cn(subTitTxt, 'break-all flex-1/6')}>
                  Automatic Marks (marks: true, min: {MIN_INT_VALUE}, max: {MAX_INT_VALUE} ,step: 25)
                </h3>
                <Slider
                  {...args}
                  orientation={'vertical'}
                  min={MIN_INT_VALUE}
                  max={MAX_INT_VALUE}
                  step={25}
                  marks={Array.from({ length: MAX_INT_VALUE / 25 }, (_, idx) => ({
                    value: idx * 25,
                    label: `${idx * 25} %`,
                  }))}
                  defaultValue={[INT_VALUE_ARR[1]]}
                  className={'flex-2/3'}
                />
              </div>
              <div className={cn(flexCol, 'flex-1 size-full items-center justify-between')}>
                <h3 className={cn(subTitTxt, 'break-all flex-1/6')}>Custom Marks (with labels and custom classes)</h3>
                <Slider
                  {...args}
                  orientation={'vertical'}
                  marks={customMarks}
                  defaultValue={INT_DEFAULT_VALUE_ARR}
                  className={'flex-2/3'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

function UncontrolledStory({ defaultValue = DECIMAL_DEFAULT_VALUE_ARR, ...args }: SliderProps) {
  const singleSliderRef = useRef<number[]>(null);
  const rangeSliderRef = useRef<number[]>(null);
  const [singleValue, setSingleValue] = useState<number[]>([defaultValue?.[0] || DECIMAL_DEFAULT_VALUE_ARR[0]]);
  const [rangeValue, setRangeValue] = useState<number[]>(defaultValue ?? []);

  return (
    <div className={cn(flexCol, 'gap-10 w-full h-100')} key={JSON.stringify(args)}>
      <div className={cn(args.orientation === 'horizontal' ? flexCol : flexRow, 'gap-8 size-full')}>
        <div className={cn(flexCol, 'size-full gap-4')}>
          <h3 className={cn(titTxt)}>Single Thumb</h3>
          <div className={cn(flexRow, 'gap-2 items-center mb-4', blueTxt)}>
            <p className={cn()}>{`defaultValue: ${singleValue}`}</p>
            <p className={cn(subTitTxt)}>|</p>
            <p className={cn()}>{`Current Value: ${singleSliderRef.current}`}</p>
          </div>
          <Slider
            {...args}
            defaultValue={singleValue}
            sliderRef={singleSliderRef}
            onValueChange={(val) => {
              setSingleValue(val);
              singleSliderRef.current = val;
            }}
          />
        </div>
        <div className={cn(flexCol, 'size-full gap-4')}>
          <h3 className={cn(titTxt)}>Range Thumb</h3>
          <div className={cn(flexRow, 'gap-2 items-center mb-4', blueTxt)}>
            <p className={cn()}>{`defaultValue: ${rangeValue}`}</p>
            <p className={cn(subTitTxt)}>|</p>
            <p className={cn()}>{`Current Value: ${rangeSliderRef.current}`}</p>
          </div>
          <Slider
            {...args}
            defaultValue={rangeValue}
            sliderRef={rangeSliderRef}
            onValueChange={(val) => {
              setRangeValue(val);
              rangeSliderRef.current = val;
            }}
          />
        </div>
      </div>
    </div>
  );
}

export const Uncontrolled: Story = {
  name: 'Uncontrolled',
  args: {
    defaultValue: DECIMAL_DEFAULT_VALUE_ARR,
    step: MIN_DECIMAL_VALUE,
    min: MIN_INT_VALUE,
    max: DEFAULT_STEP,
  },
  argTypes: {
    defaultValue: { table: { disable: true } },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    onValueCommit: { table: { disable: true } },
    sliderRef: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '`defaultValue`와 `sliderRef`를 이용한 비제어 컴포넌트 예시입니다.',
          '비제어 모드에서는 컴포넌트가 자체적으로 상태를 관리하며, 초기값만 지정하면 됩니다.',
          '`sliderRef`를 통해 외부에서 현재 값을 참조할 수 있으며, 값 변경 시 콜백을 받을 수 있습니다.',
          '간단한 사용 사례나 초기값만 설정하면 되는 경우에 적합합니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => <UncontrolledStory {...args} />,
};

function ControlledStory({ defaultValue = INT_DEFAULT_VALUE_ARR, value = INT_VALUE_ARR, ...args }: SliderProps) {
  const singleSliderRef = useRef<number[]>(null);
  const rangeSliderRef = useRef<number[]>(null);
  const [singleValue, setSingleValue] = useState<number[]>([value[0]]);
  const [rangeValue, setRangeValue] = useState<number[]>(value);

  return (
    <div className={cn(flexCol, 'gap-10 w-full h-100')} key={JSON.stringify(args)}>
      <div className={cn(args.orientation === 'horizontal' ? flexCol : flexRow, 'gap-8 size-full')}>
        <div className={cn(flexCol, 'size-full gap-4')}>
          <h3 className={cn(titTxt)}>Single Thumb</h3>
          <div className={cn(flexRow, 'gap-2 items-center mb-4', blueTxt)}>
            <p className={cn()}>{`defaultValue: ${defaultValue[0]}`}</p>
            <p className={cn(subTitTxt)}>|</p>
            <p className={cn()}>{`value: ${singleValue}`}</p>
            <p className={cn(subTitTxt)}>|</p>
            <p className={cn()}>{`Current Value: ${singleSliderRef.current}`}</p>
          </div>
          <Slider
            {...args}
            defaultValue={[defaultValue[0]]}
            value={singleValue}
            sliderRef={singleSliderRef}
            onValueChange={(val) => {
              setSingleValue(val);
              singleSliderRef.current = val;
            }}
          />
        </div>
        <div className={cn(flexCol, 'size-full gap-4')}>
          <h3 className={cn(titTxt)}>Range Thumb</h3>
          <div className={cn(flexRow, 'gap-2 items-center mb-4', blueTxt)}>
            <p className={cn()}>{`defaultValue: ${defaultValue}`}</p>
            <p className={cn(subTitTxt)}>|</p>
            <p className={cn()}>{`value: ${rangeValue}`}</p>
            <p className={cn(subTitTxt)}>|</p>
            <p className={cn()}>{`Current Value: ${rangeSliderRef.current}`}</p>
          </div>
          <Slider
            {...args}
            defaultValue={defaultValue}
            value={rangeValue}
            sliderRef={rangeSliderRef}
            onValueChange={(val) => {
              setRangeValue(val);
              rangeSliderRef.current = val;
            }}
          />
        </div>
      </div>
    </div>
  );
}

export const Controlled: Story = {
  name: 'Controlled',
  args: {
    defaultValue: INT_DEFAULT_VALUE_ARR,
    value: INT_VALUE_ARR,
  },
  argTypes: {
    defaultValue: { table: { disable: true } },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    onValueCommit: { table: { disable: true } },
    sliderRef: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '`value`와 `onValueChange`를 이용한 제어 컴포넌트 예시입니다.',
          '제어 모드에서는 외부 상태를 통해 슬라이더의 값을 완전히 제어할 수 있습니다.',
          '`value` prop 으로 현재 값을 설정하고, `onValueChange` 콜백으로 값 변경을 처리합니다.',
          '복잡한 상태 관리가 필요하거나 다른 컴포넌트와 동기화가 필요한 경우에 적합합니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => <ControlledStory {...args} />,
};

function VariantExamplesStory({
  defaultValue = INT_DEFAULT_VALUE_ARR,
  value = INT_VALUE_ARR,
  step = DEFAULT_STEP,
  min = MIN_INT_VALUE,
  max = MAX_INT_VALUE,
  orientation,
  ...args
}: SliderProps) {
  const singleSliderRef1 = useRef<number[]>(null);
  const rangeSliderRef1 = useRef<number[]>(null);
  const [singleValue1, setSingleValue1] = useState<number[]>([value[0]]);
  const [rangeValue1, setRangeValue1] = useState<number[]>(value);

  return (
    <div className={cn(flexCol, 'gap-10 w-full h-100')} key={JSON.stringify(args)}>
      <div className={cn(orientation === 'horizontal' ? flexCol : flexRow, 'gap-8 size-full')}>
        <div className={cn(flexCol, 'size-full gap-4')}>
          <h3 className={cn(titTxt)}>Input 으로 값 조정하기</h3>
          <div className={cn(flexRow, 'gap-2 items-center mb-4', blueTxt)}>
            <p className={cn()}>{`defaultValue: ${defaultValue[0]}`}</p>
            <p className={cn(subTitTxt)}>|</p>
            <p className={cn()}>{`value: ${singleValue1}`}</p>
            <p className={cn(subTitTxt)}>|</p>
            <p className={cn()}>{`Current Value: ${singleSliderRef1.current}`}</p>
          </div>
          <div className={cn(flexRow, allCenter, 'size-full gap-4')}>
            <Tooltip contents={'값 입력 시, Slider 의 값을 step 만큼 조정합니다.'}>
              <Input
                type={'number'}
                step={step}
                value={String(singleValue1[0])}
                onChange={(e) => {
                  const newVal = parseFloat(e.target.value);
                  const rangedVal = newVal > max ? max : newVal < min ? min : newVal;
                  const singleVal = [rangedVal];

                  setSingleValue1(singleVal);
                  singleSliderRef1.current = singleVal;
                }}
              />
            </Tooltip>
            <Slider
              {...args}
              orientation={orientation}
              step={step}
              min={min}
              max={max}
              defaultValue={[defaultValue[0]]}
              value={singleValue1}
              sliderRef={singleSliderRef1}
              onValueChange={(val) => {
                setSingleValue1(val);
                singleSliderRef1.current = val;
              }}
            />
          </div>
        </div>
        <div className={cn(flexCol, 'size-full gap-4')}>
          <h3 className={cn(titTxt)}>범위를 각각 화살표로 조정하기</h3>
          <div className={cn(flexRow, 'gap-2 items-center mb-4', blueTxt)}>
            <p className={cn()}>{`defaultValue: ${defaultValue}`}</p>
            <p className={cn(subTitTxt)}>|</p>
            <p className={cn()}>{`value: ${rangeValue1}`}</p>
            <p className={cn(subTitTxt)}>|</p>
            <p className={cn()}>{`Current Value: ${rangeSliderRef1.current}`}</p>
          </div>
          <div className={cn(flexRow, allCenter, 'size-full gap-4')}>
            <Tooltip contents={'클릭 시, Slider 범위의 min 값을 step 만큼 조정합니다.'}>
              <Button
                asChild
                variant={'transparentGrey'}
                onClick={() => {
                  const newVal1 = rangeValue1[0] - step;
                  const newValArr = [newVal1, rangeValue1[1]];

                  setRangeValue1(newValArr);
                  rangeSliderRef1.current = newValArr;
                }}>
                <ChevronLeftIcon size={'medium'} />
              </Button>
            </Tooltip>
            <Slider
              {...args}
              step={step}
              min={min}
              max={max}
              orientation={orientation}
              defaultValue={defaultValue}
              value={rangeValue1}
              sliderRef={rangeSliderRef1}
              onValueChange={(val) => {
                setRangeValue1(val);
                rangeSliderRef1.current = val;
              }}
            />
            <Tooltip contents={'클릭 시, Slider 범위의 max 값을 step 만큼 조정합니다.'}>
              <Button
                asChild
                variant={'transparentGrey'}
                onClick={() => {
                  const newVal2 = rangeValue1[1] + step;
                  const newValArr = [rangeValue1[0], newVal2];

                  setRangeValue1(newValArr);
                  rangeSliderRef1.current = newValArr;
                }}>
                <ChevronRightIcon size={'medium'} />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export const VariantExamples: Story = {
  name: 'Variant Examples',
  args: {
    defaultValue: INT_DEFAULT_VALUE_ARR,
    value: INT_VALUE_ARR,
    step: DEFAULT_STEP,
    min: MIN_INT_VALUE,
    max: MAX_INT_VALUE,
  },
  argTypes: {
    min: { table: { disable: true } },
    max: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    onValueCommit: { table: { disable: true } },
    sliderRef: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '다양한 예시를 이용한 Slider 모음입니다.',
          '실제 사용 시나리오를 가정한 복합적인 예시를 제공합니다.',
          'Input 컴포넌트와 연동하여 숫자 입력으로 슬라이더 값을 조정하는 방법을 보여줍니다.',
          '버튼을 통해 슬라이더 범위를 step 단위로 조정하는 인터랙션 예시도 포함되어 있습니다.',
          '이러한 패턴들은 실제 애플리케이션에서 유용하게 활용할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => <VariantExamplesStory {...args} />,
};
