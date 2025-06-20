//
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Collapsible } from '@common/ui';
import { ChevronLeftRightIcon, ChevronUpDownIcon, ExpansionContentIcon, InfoIcon } from '@common/ui/icons';

const triggerMap = {
  btnMore: (
    <Button size="small" variant={'gradient'}>
      더보기 버튼
    </Button>
  ),
  btnUpDownIcon: (
    <Button asChild>
      <ChevronUpDownIcon size={'medium'} />
    </Button>
  ),
  btnLeftRightIcon: (
    <Button asChild>
      <ChevronLeftRightIcon size={'medium'} />
    </Button>
  ),
  linkIcon1: (
    <a href={'./'}>
      Link로서 Info 처리하실 수 있고 아이콘도 가능합니다. <InfoIcon />
    </a>
  ),
  iconOnly1: (
    <ExpansionContentIcon
      size={'large'}
      className={'hover:fill-juiText-purple active:fill-juiText-purple focus:fill-juiText-purple'}
    />
  ),
  txtMore: '더보기 ...',
};

// const previewMap = {
//   txtMore: '더보기 ...',
// };

const meta: Meta<typeof Collapsible> = {
  title: 'UI/Collapsible',
  component: Collapsible,
  args: {
    disabled: false,
    showPreview: true,
    defaultOpen: false,
    open: undefined,
    onOpenChange: undefined,
    trigger: triggerMap['btnMore'],
    // preview: ,
    // children: ,
    className: '',
  },
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: [
          'Collapsible 컴포넌트의 문서입니다. Collapsible 란, 단일 콘텐츠 블록의 펼침/접힘 상태를 토글하는 UI 요소 입니다.',
          '주로 "더보기", 상세 설명, 옵션 숨기기/보이기 등 단일 영역의 노출/숨김에 사용됩니다.',
          '하나의 영역만 열고 닫는 단일 상태만 관리하며, 단순한 토글이나 간단한 정보 숨기기/보이기에 적합합니다.',
          '트리거(trigger) 요소를 자유롭게 커스터마이즈할 수 있으며, 프리뷰(preview) 영역을 통해 콘텐츠의 요약이나 미리보기를 제공할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '기본 Collapsible 컴포넌트를 렌더링한 예시입니다.',
      },
    },
  },
};
