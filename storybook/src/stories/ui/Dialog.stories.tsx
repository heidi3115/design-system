import type { Meta, StoryObj } from '@storybook/react';
import { type FormEvent, type MouseEvent, type ReactElement, type ReactNode, useEffect, useRef, useState } from 'react';
import { Button, Dialog, Input, RadioGroup } from '@common/ui';
import { EditIcon, SaveIcon, Trash2Icon } from '@common/ui/icons';
import type { VariantProps } from 'tailwind-variants';
import { DndContext } from '@dnd-kit/core';

type DefaultButtonType = 'save' | 'cancel' | 'check';

type ButtonProps = (VariantProps<typeof Button> & { children: ReactNode }) | DefaultButtonType;

type DialogStoryArgs = {
  title: string;
  titleIcon?: ReactElement;
  trigger: ReactNode;
  children?: ReactNode;
  className?: string;
  contentSize?: 'small' | 'medium' | 'large';
  footerLocate?: 'start' | 'center' | 'end';
  buttons: ButtonProps[];
  portalContainer?: string;
  maxHeight?: number;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onClick?: () => void;
  showCloseButton?: boolean;
  isDraggable?: boolean;
  isKeepOffset?: boolean;
};

const meta: Meta<DialogStoryArgs> = {
  title: 'ui/Dialog',
  component: Dialog,
  argTypes: {
    showCloseButton: {
      control: { type: 'boolean' },
      description: '우측 상단의 X버튼 노출 여부를 설정할 수 있다.',
    },
    isDraggable: {
      control: { type: 'boolean' },
      description: '드래그 가능 여부를 설정할 수 있다.',
    },
    isKeepOffset: {
      control: { type: 'boolean' },
      description:
        '최종 드래그 위치 유지여부. true로 지정 시, Dialog를 닫았다가 다시 열어도 직전 위치가 계속 유지된다.',
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
        'Dialog에 표시될 버튼 목록. icon은 save, cancel, check 중에서 원하는 아이콘을 string으로 입력하면 된다.',
    },
    portalContainer: {
      control: { type: 'radio' },
      options: ['body', 'area'],
      description: '포탈 위치 선택 (body=전역, area=특정 영역)',
    },
    onSubmit: {
      control: { disable: true },
      description: 'form 속성과 연결된 폼이 제출될 때 실행되며, 유효성 검사 후 데이터를 처리하거나 저장할때 사용된다.',
    },
    onClick: {
      control: { disable: true },
      description: '버튼 클릭 시 호출되는 함수로, 클릭 이벤트에 대응하여 특정 동작을 처리할 때 사용한다.',
    },
  },
  args: {
    title: 'Example Title',
    isKeepOffset: false,
    isDraggable: false,
    showCloseButton: true,
    titleIcon: <EditIcon />,
    children: 'Example Children',
    maxHeight: 100,
    contentSize: 'small',
    footerLocate: 'center',
    buttons: [
      'save',
      {
        children: (
          <>
            <SaveIcon /> 커스텀 버튼
          </>
        ),
        variant: 'primary',
        type: 'submit',
      },
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
      <DndContext>
        <Dialog
          onSubmit={(e, close) => {
            e.preventDefault();
            alert('저장되었습니다');
            close();
          }}
          isKeepOffset={args.isKeepOffset}
          isDraggable={args.isDraggable}
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
        </Dialog>
      </DndContext>
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
          <DndContext>
            <Dialog
              onSubmit={(e) => {
                e.preventDefault();
              }}
              isKeepOffset={args.isKeepOffset}
              trigger={<Button>Dialog 열기</Button>}
              title={args.title}
              isDraggable={args.isDraggable}
              className={args.className}
              titleIcon={args.titleIcon}
              contentSize="small"
              showCloseButton={args.showCloseButton}
              footerLocate={args.footerLocate}
              buttons={args.buttons}
              maxHeight={args.maxHeight}>
              {args.children}
            </Dialog>
          </DndContext>
        </div>
        <div className="flex flex-col gap-2">
          <div>Medium</div>
          <DndContext>
            <Dialog
              onSubmit={(e) => {
                e.preventDefault();
              }}
              isKeepOffset={args.isKeepOffset}
              trigger={<Button>Dialog 열기</Button>}
              title={args.title}
              isDraggable={args.isDraggable}
              className={args.className}
              titleIcon={args.titleIcon}
              contentSize="medium"
              footerLocate={args.footerLocate}
              buttons={args.buttons}
              maxHeight={args.maxHeight}>
              {args.children}
            </Dialog>
          </DndContext>
        </div>
        <div className="flex flex-col gap-2">
          <div>Large</div>
          <DndContext>
            <Dialog
              onSubmit={(e) => {
                e.preventDefault();
              }}
              isKeepOffset={args.isKeepOffset}
              trigger={<Button>Dialog 열기</Button>}
              title={args.title}
              isDraggable={args.isDraggable}
              className={args.className}
              titleIcon={args.titleIcon}
              contentSize="large"
              footerLocate={args.footerLocate}
              buttons={args.buttons}
              maxHeight={args.maxHeight}>
              {args.children}
            </Dialog>
          </DndContext>
        </div>
      </div>
    );
  },
};

const ButtonsExample = (args: DialogStoryArgs) => {
  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-2">
        <div>Button 없음</div>
        <DndContext>
          <Dialog
            onSubmit={(e) => {
              e.preventDefault();
            }}
            isKeepOffset={args.isKeepOffset}
            isDraggable={args.isDraggable}
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
          </Dialog>
        </DndContext>
      </div>
      <div className="flex flex-col gap-2">
        <div>등록된 Button</div>
        <DndContext>
          <Dialog
            onSubmit={(e, close) => {
              e.preventDefault();
              close();
            }}
            isKeepOffset={args.isKeepOffset}
            isDraggable={args.isDraggable}
            trigger={<Button>Dialog 열기</Button>}
            title={args.title}
            className={args.className}
            titleIcon={args.titleIcon}
            showCloseButton={args.showCloseButton}
            contentSize={args.contentSize}
            footerLocate={args.footerLocate}
            buttons={['save', 'check', 'cancel']}
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
          </Dialog>
        </DndContext>
      </div>
      <div className="flex flex-col gap-2">
        <div>Custom Button</div>
        <DndContext>
          <Dialog
            onSubmit={(e, close) => {
              e.preventDefault();
              alert('폼이 저장되었습니다');
              close();
            }}
            isKeepOffset={args.isKeepOffset}
            isDraggable={args.isDraggable}
            trigger={<Button>Dialog 열기</Button>}
            title={args.title}
            className={args.className}
            showCloseButton={args.showCloseButton}
            titleIcon={args.titleIcon}
            contentSize={args.contentSize}
            footerLocate={args.footerLocate}
            buttons={args.buttons}
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
          </Dialog>
        </DndContext>
      </div>
    </div>
  );
};

export const Buttons: Story = {
  ...Default,
  parameters: {
    docs: {
      description: {
        story:
          'Button의 text, icon, color 등을 설정하고 추가할 수 있다. 기본으로 제공되는 아이콘은 save, cancel, check 세가지가 있다. custom 버튼은 객체 타입으로 children안에 원하는 요소를 넣고 varaint, type 혹은 onClick 콜백 함수를 넣어 원하는 동작을 처리한다.',
      },
    },
    controls: {
      exclude: ['buttons', 'contentSize', 'portalContainer', 'trigger', 'titleIcon'],
    },
  },
  args: {
    title: 'Example Title',
    showCloseButton: true,
    titleIcon: <EditIcon />,
    children: 'Example Children',
    maxHeight: 500,
    contentSize: 'small',
    footerLocate: 'center',
    buttons: [
      {
        children: (
          <>
            <SaveIcon />
            버튼 1 (type: &#39;submit&#39;)
          </>
        ),
        variant: 'primary',
        type: 'submit',
      },
      {
        children: (
          <>
            <Trash2Icon />
            버튼 2 (onClick 함수)
          </>
        ),
        variant: 'error',
        onClick: (_e: MouseEvent<HTMLButtonElement>, close?: () => void) => {
          alert('삭제되었습니다');
          close?.();
        },
      },
    ],
  },
  argTypes: {},

  render: ButtonsExample,
};
