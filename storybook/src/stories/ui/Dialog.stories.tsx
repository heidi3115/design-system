import type { Meta, StoryObj } from '@storybook/react';
import { type FormEvent, type ReactElement, type ReactNode, useEffect, useRef, useState } from 'react';
import { Button, Input, RadioGroup } from '@common/ui';
import BaseDialog from '@common/ui/components/Dialog/BaseDialog.tsx';
import { EditIcon } from '@common/ui/icons';

type DialogStoryArgs = {
  title: string;
  titleIcon?: ReactElement;
  trigger: ReactNode;
  children?: ReactNode;
  className?: string;
  contentSize?: 'small' | 'medium' | 'large';
  footerLocate?: 'start' | 'center' | 'end';
  buttons: {
    langKey: string;
    icon?: 'save' | 'cancel' | 'delete' | 'check';
    color?: 'primary' | 'secondary' | 'error' | 'default';
    handleClick?: (close: () => void) => void;
    close?: boolean;
    form?: string;
  }[];
  portalContainer?: string;
  maxHeight?: number;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  showCloseButton?: boolean;
};

const meta: Meta<DialogStoryArgs> = {
  title: 'ui/Dialog/BaseDialog',
  component: BaseDialog,
  argTypes: {
    showCloseButton: {
      control: { type: 'boolean' },
      description: '우측 상단의 X버튼 노출 여부를 설정할 수 있다.',
    },
    title: {
      control: { type: 'text' },
      description: 'Dialog 제목',
    },
    trigger: {
      control: { disable: true },
      description: 'Dialog를 활성화하는 수단.',
    },
    titleIcon: {
      control: { disable: true },
      description: '타이틀 아이콘',
    },
    children: {
      control: { type: 'text' },
      description:
        'Dialog 안에 표시할 콘텐츠. 문자열, 컴포넌트, 테이블, 아이콘 등 ReactNode로 표현 가능한 모든 요소를 넣을 수 있다.',
    },
    maxHeight: {
      control: { type: 'number' },
      description: 'Dialog의 최대 높이를 지정할 수 있다. content의 길이가 maxHeight를 초과하면 스크롤이 생긴다.',
    },
    contentSize: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
      description:
        'Dialog 컨텐츠 크기. small, medium, large로 구분되며, 그 외 크기는 className으로 직접 적용할 수 있다.',
    },
    footerLocate: {
      control: { type: 'radio' },
      options: ['start', 'center', 'end'],
      description: '하단 버튼 위치. start, center, end로 조정할 수 있다.',
    },
    buttons: {
      control: { type: 'object' },
      description:
        'Dialog에 표시될 버튼 목록. icon은 save, cancel, delete, check 중에서 원하는 아이콘을 string으로 입력하면 된다. ',
    },
    portalContainer: {
      control: { type: 'radio' },
      options: ['body', 'area'],
      description: '포탈 위치 선택 (body=전역, area=특정 영역)',
    },
    onSubmit: {
      control: { disable: true },
      description: 'form 속성과 연결된 폼이 제출될 때 실행되며, 유효성 검사 후 데이터를 처리하거나 저장할때 사용된다. ',
    },
  },
  args: {
    title: 'Example Title',
    showCloseButton: true,
    titleIcon: <EditIcon />,
    children: 'Example Children',
    maxHeight: 100,
    contentSize: 'small',
    footerLocate: 'center',
    buttons: [
      {
        langKey: '저장',
        icon: 'save',
        color: 'primary',
        form: 'baseDialog',
        handleClick: async (closeDialog) => {
          alert('저장되었습니다');
          closeDialog();
        },
      },
      {
        langKey: '삭제',
        icon: 'delete',
        color: 'error',
        handleClick: async (closeDialog) => {
          alert('삭제되었습니다');
          closeDialog();
        },
      },
      { langKey: '닫기', icon: 'cancel', color: 'default', close: true },
    ],
    portalContainer: 'body',
  },
  parameters: {
    docs: {
      description: {
        component: '기본 Dialog 컴포넌트 문서',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DialogStoryArgs>;

const Template = (args: DialogStoryArgs) => {
  const shouldUseArea = args.portalContainer === 'area';
  const dialogAreaRef = useRef<HTMLDivElement | null>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (dialogAreaRef.current) {
      setPortalContainer(dialogAreaRef.current);
    }
  }, []);

  return (
    <div ref={dialogAreaRef}>
      <BaseDialog
        onSubmit={(e) => {
          e.preventDefault();
        }}
        showCloseButton={args.showCloseButton}
        trigger={<Button>Dialog 열기</Button>}
        title={args.title}
        className={args.className}
        titleIcon={args.titleIcon}
        contentSize={args.contentSize}
        footerLocate={args.footerLocate}
        buttons={args.buttons}
        maxHeight={args.maxHeight}
        portalContainer={shouldUseArea ? portalContainer : undefined}>
        {args.children}
      </BaseDialog>
    </div>
  );
};

export const Default: Story = {
  render: Template,
};

export const ContentSize: Story = {
  ...Default,
  parameters: {
    docs: {
      description: {
        story:
          'contentSize에 따라 Dialog 크기를 확인할 수 있다. height는 내부 children의 길이에 따라 변화하며, maxHeight로 최대 높이 조정이 가능하다.',
      },
    },
    controls: {
      exclude: ['className', 'trigger', 'contentSize', 'portalContainer', 'titleIcon', 'onSubmit'],
    },
  },
  argTypes: {
    contentSize: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
    },
  },
  render: (args) => {
    return (
      <div className="flex gap-10">
        <div className="flex flex-col gap-2">
          <div>Small</div>
          <BaseDialog
            onSubmit={(e) => {
              e.preventDefault();
            }}
            trigger={<Button>Dialog 열기</Button>}
            title={args.title}
            className={args.className}
            titleIcon={args.titleIcon}
            contentSize="small"
            showCloseButton={args.showCloseButton}
            footerLocate={args.footerLocate}
            buttons={args.buttons}
            maxHeight={args.maxHeight}>
            {args.children}
          </BaseDialog>
        </div>
        <div className="flex flex-col gap-2">
          <div>Medium</div>
          <BaseDialog
            onSubmit={(e) => {
              e.preventDefault();
            }}
            trigger={<Button>Dialog 열기</Button>}
            title={args.title}
            className={args.className}
            titleIcon={args.titleIcon}
            contentSize="medium"
            footerLocate={args.footerLocate}
            buttons={args.buttons}
            maxHeight={args.maxHeight}>
            {args.children}
          </BaseDialog>
        </div>
        <div className="flex flex-col gap-2">
          <div>Large</div>
          <BaseDialog
            onSubmit={(e) => {
              e.preventDefault();
            }}
            trigger={<Button>Dialog 열기</Button>}
            title={args.title}
            className={args.className}
            titleIcon={args.titleIcon}
            contentSize="large"
            footerLocate={args.footerLocate}
            buttons={args.buttons}
            maxHeight={args.maxHeight}>
            {args.children}
          </BaseDialog>
        </div>
      </div>
    );
  },
};

type ButtonType = {
  langKey: string;
  handleClick?: (close: () => void) => void;
  color?: 'primary' | 'secondary' | 'default' | 'error';
  icon?: 'save' | 'cancel' | 'delete' | 'check';
  close?: boolean;
};

const ButtonsExample = (args: DialogStoryArgs) => {
  const buttonExample2: ButtonType[] = [
    {
      langKey: '저장',
      icon: 'check',
      color: 'primary',
      handleClick: async (closeDialog) => {
        alert('저장되었습니다');
        closeDialog();
      },
    },
    {
      langKey: '닫기',
      icon: 'cancel',
      color: 'default',
      close: true,
    },
  ];
  const buttonExample3: ButtonType[] = [
    {
      langKey: '저장',
      icon: 'check',
      color: 'primary',
      handleClick: async (closeDialog) => {
        alert('저장되었습니다');
        closeDialog();
      },
    },
    {
      langKey: '삭제',
      icon: 'delete',
      color: 'error',
      handleClick: async (closeDialog) => {
        alert('삭제되었습니다');
        closeDialog();
      },
    },
    {
      langKey: '닫기',
      icon: 'cancel',
      color: 'default',
      close: true,
    },
  ];

  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-2">
        <div>Button 없음</div>
        <BaseDialog
          trigger={<Button>Dialog 열기</Button>}
          title={args.title}
          className={args.className}
          titleIcon={args.titleIcon}
          showCloseButton={args.showCloseButton}
          contentSize="small"
          footerLocate={args.footerLocate}
          buttons={[]}
          maxHeight={args.maxHeight}>
          <table className="m-auto text-xs">
            <tbody>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  소속
                </th>
                <td className="border border-juiGrey-50 p-2 w-70 text-juiGrey-400">
                  <RadioGroup
                    direction="horizontal"
                    options={[
                      { label: '정직원', value: '1' },
                      { label: '파트너', value: '2' },
                      { label: '관계사', value: '3' },
                    ]}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  ID
                </th>
                <td className="border border-juiGrey-50 p-2 w-70 text-juiGrey-400">
                  <Input name="id" placeholder="아이디를 입력해주세요" />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  비밀번호
                </th>
                <td className="border border-juiGrey-50 p-2 w-70">
                  <Input name="psword" placeholder="비밀번호를 입력해주세요" />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  비밀번호 확인
                </th>
                <td className="border border-juiGrey-50 p-2 w-70">
                  <Input name="pswordCheck" placeholder="비밀번호를 확인해주세요" />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  접근제어 IP
                </th>
                <td className="border border-juiGrey-50 p-2 w-70 text-juiGrey-400">
                  <Input name="ip" placeholder="접근제어 IP를 입력해주세요" />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  이름
                </th>
                <td className="border border-juiGrey-50 p-2 w-70 text-juiGrey-400">
                  <Input name="name" placeholder="이름을 입력해주세요" />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  연락처
                </th>
                <td className="border border-juiGrey-50 p-2 w-70 text-juiGrey-400">
                  <Input name="phone" placeholder="연락처를 입력해주세요" />
                </td>
              </tr>
            </tbody>
          </table>
        </BaseDialog>
      </div>
      <div className="flex flex-col gap-2">
        <div>Button 2개</div>
        <BaseDialog
          trigger={<Button>Dialog 열기</Button>}
          title={args.title}
          className={args.className}
          titleIcon={args.titleIcon}
          showCloseButton={args.showCloseButton}
          contentSize={args.contentSize}
          footerLocate={args.footerLocate}
          buttons={buttonExample2}
          maxHeight={args.maxHeight}>
          <table className="m-auto text-xs">
            <tbody>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  소속
                </th>
                <td className="border border-juiGrey-50 p-2 w-70 text-juiGrey-400">
                  <RadioGroup
                    direction="horizontal"
                    options={[
                      { label: '정직원', value: '1' },
                      { label: '파트너', value: '2' },
                      { label: '관계사', value: '3' },
                    ]}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  ID
                </th>
                <td className="border border-juiGrey-50 p-2 w-70 text-juiGrey-400">
                  <Input name="id" placeholder="아이디를 입력해주세요" />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  비밀번호
                </th>
                <td className="border border-juiGrey-50 p-2 w-70">
                  <Input name="psword" placeholder="비밀번호를 입력해주세요" />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  비밀번호 확인
                </th>
                <td className="border border-juiGrey-50 p-2 w-70">
                  <Input name="pswordCheck" placeholder="비밀번호를 확인해주세요" />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  접근제어 IP
                </th>
                <td className="border border-juiGrey-50 p-2 w-70 text-juiGrey-400">
                  <Input name="ip" placeholder="접근제어 IP를 입력해주세요" />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  이름
                </th>
                <td className="border border-juiGrey-50 p-2 w-70 text-juiGrey-400">
                  <Input name="name" placeholder="이름을 입력해주세요" />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  연락처
                </th>
                <td className="border border-juiGrey-50 p-2 w-70 text-juiGrey-400">
                  <Input name="phone" placeholder="연락처를 입력해주세요" />
                </td>
              </tr>
            </tbody>
          </table>
        </BaseDialog>
      </div>
      <div className="flex flex-col gap-2">
        <div>Button 3개 이상</div>
        <BaseDialog
          trigger={<Button>Dialog 열기</Button>}
          title={args.title}
          className={args.className}
          showCloseButton={args.showCloseButton}
          titleIcon={args.titleIcon}
          contentSize={args.contentSize}
          footerLocate={args.footerLocate}
          buttons={buttonExample3}
          maxHeight={args.maxHeight}>
          <table className="m-auto text-xs">
            <tbody>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  소속
                </th>
                <td className="border border-juiGrey-50 p-2 w-70 text-juiGrey-400">
                  <RadioGroup
                    direction="horizontal"
                    options={[
                      { label: '정직원', value: '1' },
                      { label: '파트너', value: '2' },
                      { label: '관계사', value: '3' },
                    ]}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  ID
                </th>
                <td className="border border-juiGrey-50 p-2 w-70 text-juiGrey-400">
                  <Input name="id" placeholder="아이디를 입력해주세요" />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  비밀번호
                </th>
                <td className="border border-juiGrey-50 p-2 w-70">
                  <Input name="psword" placeholder="비밀번호를 입력해주세요" />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  비밀번호 확인
                </th>
                <td className="border border-juiGrey-50 p-2 w-70">
                  <Input name="pswordCheck" placeholder="비밀번호를 확인해주세요" />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  접근제어 IP
                </th>
                <td className="border border-juiGrey-50 p-2 w-70 text-juiGrey-400">
                  <Input name="ip" placeholder="접근제어 IP를 입력해주세요" />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  이름
                </th>
                <td className="border border-juiGrey-50 p-2 w-70 text-juiGrey-400">
                  <Input name="name" placeholder="이름을 입력해주세요" />
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-juiGrey-a700 p-3 w-30 text-left">
                  연락처
                </th>
                <td className="border border-juiGrey-50 p-2 w-70 text-juiGrey-400">
                  <Input name="phone" placeholder="연락처를 입력해주세요" />
                </td>
              </tr>
            </tbody>
          </table>
        </BaseDialog>
      </div>
    </div>
  );
};

export const Buttons: Story = {
  ...Default,
  parameters: {
    docs: {
      description: {
        story: 'Button의 text, icon, color 등을 설정하고 추가할 수 있다.',
      },
    },
    controls: {
      exclude: ['buttons', 'contentSize', 'portalContainer', 'trigger', 'titleIcon'],
    },
  },
  argTypes: {},

  render: ButtonsExample,
};
