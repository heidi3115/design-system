import type { Meta, StoryObj } from '@storybook/react';
import { BookmarkIcon, CheckIcon } from '@common/ui/icons';
import { Button, TextBadge } from '@common/ui';
import { FolderFilledIcon } from '@common/ui/icons/Icon/FolderFilledIcon.tsx';

const textMap = {
  short: ['짧은 텍스트', 'text'],
  long: [
    '긴 텍스트',
    '긴 텍스트 TextBadge는 텍스트 태그를 위함으로서 텍스트만 있는 textOnly와 삭제 버튼 활용이 가능한 2가지를 고려한 내역입니다.',
  ],
};

const meta: Meta<typeof TextBadge> = {
  title: 'UI/Badge/TextBadge',
  component: TextBadge,
  args: {
    children: 'TextBadge',
    textOnly: false,
    asChild: false,
    onClick: () => {
      alert('TextBadge click Event(공통)');
    },
  },
  argTypes: {
    asChild: {
      control: 'boolean',
      description: 'Slot을 통해 Badge 스타일을 다른 태그에 이식하여 badge 스타일을 적용할 때 사용',
      table: { defaultValue: { summary: 'false' } },
    },
    textOnly: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
      description:
        '옵션값. 텍스트 태그만으로서 사용을 원할 시 true로 전환하면 TextBadge 내부의 삭제 버튼이 비활성화 & 보이지 않게 됩니다. 또한, textOnly가 true가 되면 텍스트를 감싸는 부모가 inline-block이 되면서 overflow-hidden text-ellipsis whitespace-nowrap 이 적용됩니다. 하여 width를 지정하게 되어 넘어가게 되면 자동 말줄임표가 가능해지기도 합니다.',
    },
    children: {
      control: 'text',
      table: { defaultValue: { summary: 'TextBadge' } },
      description: 'TextBadge 내부에 들어갈 내용을 표기합니다.',
    },
    className: {
      control: 'text',
      table: { defaultValue: { summary: '' } },
      description: '추가적으로 적용할 Tailwind CSS 클래스',
    },
    onClick: {
      control: false,
      action: 'clicked',
      table: {
        type: { summary: '(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void' },
        defaultValue: { summary: '현재로서는 클릭 시 공통으로 alert가 활성화 됩니다.' },
      },
      description: '삭제 버튼 클릭 시 호출되는 이벤트 핸들러입니다. (textOnly=false일 때만 활성화됩니다)',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'TextBadge 컴포넌트의 문서입니다. TextBadge 의 경우 기본 Badge 에서 variant는 "text" 를 고정한 컴포넌트로서, TextBadge 는 textOnly, onClick 을 옵션값으로 받습니다.<br/>asChild로 전환을 하더라도 해당 TextBadge 의 스타일을 우선적으로 받도록 되어있으니 해당 부분에 유의하셔야 합니다.<br/>기본적인 스타일은 Badge를 따르되 내부에서는 커스텀한 스타일이 있습니다.<br/>또한 TextBadge의 경우 textOnly 옵션에 따라 children을 감싼 내부 부모의 스타일이 바뀌는 부분이 있으니 유의해야 합니다.',
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

// variant : text 일 때의 Badge 렌더링 스토리
export const Basic: TextStory = {
  args: {
    asChild: false,
    textOnly: false,
  },
  argTypes: {
    asChild: {
      control: 'boolean',
      table: { disable: true },
    },
    children: {
      control: 'text',
      table: { disable: true, defaultValue: { summary: 'TextBadge' } },
    },
    textOnly: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'variant 가 `text` 일 때의 Badge 렌더링 스토리입니다. ',
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
        <span className="text-sm font-bold">With Icon</span>
        <div className="flex flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-0.5'}>
            <span className="text-xs text-juiText-blue">{textMap.short[0]}</span>
            <TextBadge {...args}>
              <BookmarkIcon size={'small'} /> {textMap.short[1]}
            </TextBadge>
          </div>
          <div className={'flex flex-col gap-0.5'}>
            <span className="text-xs text-juiText-blue">{textMap.long[0]}</span>
            <TextBadge {...args}>
              <BookmarkIcon size={'small'} />
              {textMap.long[1]}
            </TextBadge>
          </div>
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          Only Icon
          <span className={'block text-xs'}>
            children안에 Icon만 있다 하더라도 TextBadge 스타일 자체는 유지되니 유의해주세요.
          </span>
        </span>
        <div className="flex flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-0.5'}>
            <span className="text-xs text-juiText-blue">{args.children}</span>
            <TextBadge {...args}>
              <FolderFilledIcon size={'small'} />
            </TextBadge>
          </div>
        </div>
      </div>
    </div>
  ),
};
export const TextOnly: TextStory = {
  args: {
    asChild: false,
    textOnly: true,
  },
  argTypes: {
    asChild: {
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
        story: 'variant 가 `text` 일 때의 Badge 렌더링 스토리입니다. ',
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
              "또한 아이콘이 들어갈 것을 고려하여 '[&>svg]:basis-[1.4em]] [&>svg]:min-w-4' 스타일이 공통적으로 적용이 되어있습니다."
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
          With Icon
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
            <TextBadge {...args}>
              <CheckIcon size={'small'} />
              {textMap.short[1]}
            </TextBadge>
          </div>
          <div className={'flex flex-col gap-0.5'}>
            <span className="text-xs text-juiText-blue">{textMap.long[0]}</span>
            <TextBadge {...args}>
              <CheckIcon size={'small'} />
              {textMap.long[1]}
            </TextBadge>
          </div>
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          Only Icon
          <span className={'block text-xs'}>
            children 안에 Icon만 있다 하더라도 기본 TextBadge 스타일 자체는 유지되니 유의해주세요.
          </span>
        </span>
        <div className="flex flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-0.5'}>
            <span className="text-xs text-juiText-blue">{'BookmarkIcon'}</span>
            <TextBadge {...args}>
              <BookmarkIcon size={'small'} />
            </TextBadge>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AsChild: TextStory = {
  args: {
    asChild: true,
    textOnly: false,
    children: 'asChild',
  },
  argTypes: {
    asChild: {
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
  },
  parameters: {
    docs: {
      description: {
        story:
          'asChild 는 boolean 으로서 true 시 Slot을 이용하여 자식의 컴포넌트 혹은 태그로 치환되고 스타일은 부모의 것을 유지할 수 있게 됩니다. 현재로서는 대표적인 예시를 Button, a, div 로 잡았습니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          asChild - Button
          <span className={'block text-xs'}>asChild를 적용 시 children 언제나 단일 요소여야 합니다.</span>
        </span>
        <div className="flex flex-row flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">{`textOnly: ${args.textOnly}`}</span>
            <TextBadge {...args}>
              <Button>{args.children}</Button>
            </TextBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">{`textOnly: ${args.textOnly}`}</span>
            <TextBadge {...args}>
              <Button>
                <BookmarkIcon size={'small'} />
                {args.children}
              </Button>
            </TextBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">{`textOnly: ${args.textOnly}`}</span>
            <TextBadge {...args}>
              <Button>{textMap.long[1]}</Button>
            </TextBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">{`textOnly: ${args.textOnly}`}</span>
            <TextBadge {...args}>
              <Button>
                <BookmarkIcon size={'small'} />
                {textMap.long[1]}
              </Button>
            </TextBadge>
          </div>
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          asChild - a 태그
          <span className={'block text-xs'}>
            a 태그의 경우, normalize.css 에서 data-slot이 button이 아닌 경우 배경이 transparent 으로 고정되는 부분
            유의해주세요.
          </span>
        </span>
        <div className="flex flex-row flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">{`textOnly: ${args.textOnly}`}</span>
            <TextBadge {...args}>
              <a href={'/'} target={'_blank'}>
                {args.children}
              </a>
            </TextBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">{`textOnly: ${args.textOnly}`}</span>
            <TextBadge {...args}>
              <a href={'/'} target={'_blank'}>
                <BookmarkIcon size={'small'} />
                {args.children}
              </a>
            </TextBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">{`textOnly: ${args.textOnly}`}</span>
            <TextBadge {...args}>
              <a href={'/'} target={'_blank'}>
                {textMap.long[1]}
              </a>
            </TextBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">{`textOnly: ${args.textOnly}`}</span>
            <TextBadge {...args}>
              <a href={'/'} target={'_blank'}>
                <BookmarkIcon size={'small'} />
                {textMap.long[1]}
              </a>
            </TextBadge>
          </div>
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">asChild - div 태그</span>
        <div className="flex flex-row flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">{`textOnly: ${args.textOnly}`}</span>
            <TextBadge {...args}>
              <div>{args.children}</div>
            </TextBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">{`textOnly: ${args.textOnly}`}</span>
            <TextBadge {...args}>
              <div>
                <BookmarkIcon size={'small'} />
                {args.children}
              </div>
            </TextBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">{`textOnly: ${args.textOnly}`}</span>
            <TextBadge {...args}>
              <div>{textMap.long[1]}</div>
            </TextBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">{`textOnly: ${args.textOnly}`}</span>
            <TextBadge {...args}>
              <div>
                <BookmarkIcon size={'small'} />
                {textMap.long[1]}
              </div>
            </TextBadge>
          </div>
        </div>
      </div>
    </div>
  ),
};
