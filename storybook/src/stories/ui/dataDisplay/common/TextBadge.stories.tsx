import type { Meta, StoryObj } from '@storybook/react';
import { TextBadge } from '@common/ui/components/Badge';

const textMap = {
  short: ['짧은 텍스트', 'text'],
  long: [
    '긴 텍스트',
    '긴 텍스트 TextBadge는 텍스트 태그를 위함으로 텍스트만 있는 textOnly와 삭제 버튼 활용이 가능한 2가지를 고려한 내역입니다. 내용이 긴 텍스트의 크기 제한은 별도로 width 지정으로 가능합니다.',
  ],
};

const meta: Meta<typeof TextBadge> = {
  title: 'UI/DataDisplay/Common/Badge/TextBadge',
  component: TextBadge,
  args: {
    isBtn: false,
    textOnly: false,
    children: 'TextBadge',
    onClick: () => {
      alert('TextBadge click Event(공통)');
    },
  },
  argTypes: {
    isBtn: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description: [
        'isBtn 활성화 시 버튼처럼 hover, active, focus 이벤트 상태 시 변화가 추가되며,',
        'cursor 및 pointer events 관련 CSS가 추가됩니다.',
      ].join('<br/>'),
    },
    textOnly: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description: [
        '텍스트 태그만으로 사용을 원할 시 true로 전환하면 TextBadge 내부의 삭제 버튼이 비활성화되고 보이지 않게 됩니다.',
        'textOnly가 true가 되면 텍스트를 감싸는 부모가 inline-block이 되면서 overflow-hidden text-ellipsis whitespace-nowrap이 적용됩니다.',
        'width를 지정하게 되어 넘어가게 되면 자동 말줄임표가 가능해집니다.',
      ].join('<br/>'),
    },
    children: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'TextBadge' } },
      description: [
        'TextBadge 내부에 들어갈 내용을 지정하는 필수 props 입니다.',
        'string 타입만 받을 수 있습니다.',
      ].join('<br/>'),
    },
    className: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } },
      description: '추가적으로 적용할 Tailwind CSS 클래스명입니다.',
    },
    onClick: {
      control: false,
      action: 'clicked',
      table: {
        type: { summary: '(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void' },
        defaultValue: { summary: '현재는 클릭 시 공통으로 alert가 활성화 됩니다.' },
      },
      description: '삭제 버튼 클릭 시 호출되는 이벤트 핸들러입니다. (textOnly=false일 때만 활성화됩니다.)',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'TextBadge 컴포넌트의 문서입니다. TextBadge는 텍스트 태그를 기반으로 하는 Badge 로 형태가 고정되어 있습니다.',
          'TextBadge는 기본 Badge 에서 variant를 "text"로 고정한 컴포넌트로, children이 필수값이며 textOnly, onClick을 옵션값으로 받습니다.',
          'children은 string 으로만 받을 수 있으며 textOnly 활성화 시, onClick은 버튼이 없어지므로 비활성화됩니다.',
          'textOnly 옵션에 따라 children을 감싼 내부 부모의 스타일이 바뀌는 부분이 있으니 유의해야 합니다.',
          'asChild는 기본 Badge 컴포넌트에서만 가능합니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type TextStory = StoryObj<typeof TextBadge>;

export const Default: TextStory = {
  parameters: {
    docs: {
      description: {
        story: '기본 TextBadge 컴포넌트의 예시입니다.',
      },
    },
  },
  render: (args) => {
    return <TextBadge {...args} />;
  },
};

export const Basic: TextStory = {
  args: {
    isBtn: false,
    textOnly: false,
  },
  argTypes: {
    isBtn: {
      control: 'boolean',
      table: { disable: true },
    },
    children: {
      control: 'text',
      table: { disable: true },
    },
    textOnly: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'TextBadge 에서의 다양한 예시들을 확인할 수 있습니다. 삭제 버튼의 경우 storybook 한정으로 임의로 alert이 뜨도록 설정하였습니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">Text</span>
        <div className="flex flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-0.5'}>
            <span className="text-xs text-juiText-blue">{textMap.short[0]}</span>
            <TextBadge {...args}>{textMap.short[1]}</TextBadge>
          </div>
          <div className={'flex flex-col gap-0.5'}>
            <span className="text-xs text-juiText-blue">{textMap.long[0]}</span>
            <TextBadge {...args}>{textMap.long[1]}</TextBadge>
          </div>
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">textOnly(true)</span>
        <div className="flex flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-0.5'}>
            <span className="text-xs text-juiText-blue">{textMap.short[0]}</span>
            <TextBadge {...args} textOnly></TextBadge>
          </div>
          <div className={'flex flex-col gap-0.5'}>
            <span className="text-xs text-juiText-blue">{textMap.long[0]}</span>
            <TextBadge {...args} textOnly>
              {textMap.long[1]}
            </TextBadge>
          </div>
        </div>
      </div>
      <hr />
    </div>
  ),
};
export const TextOnly: TextStory = {
  args: {
    isBtn: false,
    textOnly: true,
  },
  argTypes: {
    isBtn: {
      control: 'boolean',
      table: { disable: true },
    },
    children: {
      control: 'text',
      table: { disable: true },
    },
    textOnly: {
      table: { disable: true, defaultValue: { summary: 'true' } },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'textOnly가 true일 경우에 대한 다양한 예시들을 확인할 수 있습니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          Default
          <span className={'block text-xs'}>
            {
              "textOnly 가 false 인 default의 경우 children을 감싼 내부 부모의 스타일은 기본적으로 'inline-flex gap-1.5 items-center justify-center' 입니다."
            }
            <br />
            {
              "또한 아이콘이 들어갈 것을 고려하여 '[&>svg]:basis-[1.4em]] [&>svg]:min-w-4' 스타일이 공통적으로 적용이 되어 있습니다."
            }
            <br />
            {
              "하지만 현재처럼 textOnly true인 경우, children을 감싼 내부 부모의 스타일은 기본적으로 'inline-flex gap-1.5 items-center justify-center' 입니다."
            }
          </span>
        </span>
        <div className="flex flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-0.5'}>
            <span className="text-xs text-juiText-blue">{textMap.short[0]}</span>
            <TextBadge {...args}>{textMap.short[1]}</TextBadge>
          </div>
          <div className={'flex flex-col gap-0.5'}>
            <span className="text-xs text-juiText-blue">{textMap.long[0]}</span>
            <TextBadge {...args}>{textMap.long[1]}</TextBadge>
          </div>
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          Specific width - 250px
          <span className={'block text-xs'}>
            {'textOnly 가 true 인 경우, 말줄임(text-ellipsis)의 사용이 고려된 채로 제작이 되었으므로,'}
            <br />
            {
              'TextBadge에 width를 className 을 이용해서 특정 값으로 지정하고 width 값을 넘어가면 말줄임으로 표기됩니다.'
            }
          </span>
        </span>
        <div className="flex flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-0.5'}>
            <span className="text-xs text-juiText-blue">{textMap.short[0]}</span>
            <TextBadge {...args} className={'w-[250px]'}>
              {textMap.short[1]}
            </TextBadge>
          </div>
          <div className={'flex flex-col gap-0.5'}>
            <span className="text-xs text-juiText-blue">{textMap.long[0]}</span>
            <TextBadge {...args} className={'w-[250px]'}>
              {textMap.long[1]}
            </TextBadge>
          </div>
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          isBtn: true인 경우
          <span className={'block text-xs'}>
            {
              'textOnly인 경우는 문자열만 들어가므로 크기에 따라서 말줄임이 필요할 수 있을 거라는 고려로 인해서 추가되었으며,'
            }
            <br />
            {
              ' textOnly 때는 아래처럼 아이콘이 추가되면 flex가 아니기 때문에 줄바꿈이 되는 것을 고려해야 하며 가능하면 문자열만 넣는 것이 좋습니다.'
            }
          </span>
        </span>
        <div className="flex flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-0.5'}>
            <span className="text-xs text-juiText-blue">{textMap.short[0]}</span>
            <TextBadge {...args} isBtn>
              {textMap.short[1]}
            </TextBadge>
          </div>
          <div className={'flex flex-col gap-0.5'}>
            <span className="text-xs text-juiText-blue">{textMap.long[0]}</span>
            <TextBadge {...args} isBtn>
              {textMap.long[1]}
            </TextBadge>
          </div>
        </div>
      </div>
      <hr />
    </div>
  ),
};

export const IsBtn: TextStory = {
  args: {
    isBtn: true,
    textOnly: false,
    children: 'asChild',
    className: 'w-[250px]',
  },
  argTypes: {
    isBtn: {
      control: 'boolean',
      table: { disable: false, defaultValue: { summary: 'true' } },
    },
    children: {
      control: 'text',
      table: { disable: false, defaultValue: { summary: 'asChild' } },
    },
    textOnly: {
      table: { disable: false, defaultValue: { summary: 'false' } },
    },
    className: {
      table: { disable: true, defaultValue: { summary: 'w-[250px]' } },
    },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'isBtn 는 boolean 으로 true 시 button 처럼 hover:, active:, focus:의 이벤트 적인 내역들에 대한 이펙트가 추가됩니다. 기본적으로는 false 입니다.',
          'TextBadge 의 경우 isBtn 활성화 시의 이펙트가 조금 다르게 처리됩니다. 또한 TextBadge 자체에 대한 이벤트 처리와 내부 버튼에 대한 내역이 다르니 유의해주세요.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <span className="text-sm font-bold">
        isBtn
        <span className={'block text-xs'}>
          isBtn 를 적용해도 해당의 컴포넌트 및 태그 자체는 Badge 에서 벗어나는 것은 아닙니다.
        </span>
      </span>
      <span className="text-sm font-bold">Default</span>
      <div className="flex flex-col flex-wrap gap-2 p-5 items-center">
        <span className="text-xs text-juiText-blue">{`isBtn: ${args.isBtn} | textOnly: ${args.textOnly}`}</span>
        <TextBadge
          {...args}
          className={(args?.className || '')
            .replace(/(^|\s)w-(\[[^\]]+\]|[\w-]+)(?=\s|$)/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()}>
          {args.children}
        </TextBadge>
      </div>
      <hr />
      <span className="text-sm font-bold">Examples</span>
      <div className="flex flex-col flex-wrap gap-4 p-5 items-center">
        <div className={'flex flex-col gap-1 text-center'}>
          <span className="text-xs text-juiText-blue">{`isBtn: ${args.isBtn} | textOnly: ${false}`}</span>
          <div className={'flex flex-row gap-2 items-center'}>
            <TextBadge {...args} textOnly={false} className={''}>
              {textMap.short[1]}
            </TextBadge>
            <TextBadge {...args} textOnly={false} className={''}>
              {textMap.short[1]}
            </TextBadge>
            <TextBadge {...args} textOnly={false} className={''}>
              {textMap.short[1]}
            </TextBadge>
          </div>
        </div>
        <div className={'flex flex-col gap-1 text-center items-center'}>
          <span className="text-xs text-juiText-blue">{`isBtn: ${args.isBtn} | textOnly: ${false}`}</span>
          <div className={'flex flex-row gap-2 items-center'}>
            <TextBadge {...args} textOnly={false} className={''}>
              {textMap.long[1]}
            </TextBadge>
            <TextBadge {...args} textOnly={false} className={''}>
              {textMap.long[1]}
            </TextBadge>
            <TextBadge {...args} textOnly={false} className={''}>
              {textMap.long[1]}
            </TextBadge>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-wrap gap-4 p-5 items-center">
        <div className={'flex flex-col gap-1 text-center items-center'}>
          <span className="text-xs text-juiText-blue">{`isBtn: ${args.isBtn} | textOnly: ${true}`}</span>
          <div className={'flex flex-row gap-2 items-center'}>
            <TextBadge {...args} textOnly className={''}>
              {textMap.short[1]}
            </TextBadge>
            <TextBadge {...args} textOnly className={''}>
              {textMap.short[1]}
            </TextBadge>
            <TextBadge {...args} textOnly className={''}>
              {textMap.short[1]}
            </TextBadge>
          </div>
        </div>
        <div className={'flex flex-col flex-wrap gap-1 text-center justify-center'}>
          <span className="text-xs text-juiText-blue">{`isBtn: ${args.isBtn}  | textOnly: ${true}`}</span>
          <div className={'flex flex-row flex-wrap gap-2 items-center'}>
            <TextBadge {...args} textOnly className={''}>
              {textMap.long[1]}
            </TextBadge>
            <TextBadge {...args} textOnly className={''}>
              {textMap.long[1]}
            </TextBadge>
            <TextBadge {...args} textOnly className={''}>
              {textMap.long[1]}
            </TextBadge>
          </div>
        </div>
      </div>
      <hr />
      <span className="text-sm font-bold">Specific width by className : w-[250px]</span>
      <div className="flex flex-row gap-4 p-5 justify-center">
        <div className={'flex flex-col gap-1 text-center'}>
          <span className="text-xs text-juiText-blue">{`isBtn: ${args.isBtn} | textOnly: ${false}`}</span>
          <TextBadge {...args} textOnly={false}>
            {textMap.short[1]}
          </TextBadge>
        </div>
        <div className={'flex flex-col gap-1 text-center'}>
          <span className="text-xs text-juiText-blue">{`isBtn: ${args.isBtn} | textOnly: ${false}`}</span>
          <TextBadge {...args} textOnly={false}>
            {textMap.long[1]}
          </TextBadge>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 p-5 justify-center">
        <div className={'flex flex-col gap-1 text-center items-center'}>
          <span className="text-xs text-juiText-blue">{`isBtn: ${args.isBtn} | textOnly: ${true}`}</span>
          <TextBadge {...args} textOnly>
            {textMap.short[1]}
          </TextBadge>
        </div>
        <div className={'flex flex-col gap-1 text-center justify-center'}>
          <span className="text-xs text-juiText-blue">{`isBtn: ${args.isBtn}  | textOnly: ${true}`}</span>
          <TextBadge {...args} textOnly>
            {textMap.long[1]}
          </TextBadge>
        </div>
      </div>
      <hr />
    </div>
  ),
};
