import type { Meta, StoryObj } from '@storybook/react';
import {
  Input,
  Switch,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  Table,
  TableRow,
} from '@common/ui';

type TableStoryArgs = {
  orientation: 'horizontal' | 'vertical';
  showCaption?: boolean;
  showFooter?: boolean;
};

const meta: Meta<TableStoryArgs> = {
  title: 'ui/Table',
  argTypes: {
    orientation: {
      control: { disable: true },
      description:
        'table의 방향에 따른 스타일을 적용할 수 있다. vertical과 horizontal로 구분하며, border 및 padding이 차이가 난다. 기본값은 horizontal이다.',
    },
    showCaption: {
      control: 'boolean',
      description:
        '표의 설명(캡션)을 추가할 수 있다. showCaption은 스토리북에서 사용하기 위해 추가하였으며, 실제로는 &lt;TableCaption&gt;태그를 추가하거나 생략하여 사용한다.',
    },
    showFooter: {
      control: 'boolean',
      description:
        '표의 하단(footer)을 추가할 수 있다. showFooter는 스토리북에서 사용하기 위해 추가하였으며, 실제로는 &lt;TableFooter&gt;태그를 추가하거나 생략하여 사용한다.',
    },
  },
  args: {
    orientation: 'horizontal',
    showFooter: true,
    showCaption: true,
  },
};

export default meta;
type Story = StoryObj<TableStoryArgs>;

const Template = (args: TableStoryArgs) => {
  return (
    <Table orientation={args.orientation}>
      {args.showCaption && <TableCaption>Example Caption</TableCaption>}
      <TableHeader>
        <TableRow>
          <TableHead>결제상태</TableHead>
          <TableHead>결제수단</TableHead>
          <TableHead>결제금액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell>$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell>$150.00</TableCell>
        </TableRow>
      </TableBody>
      {args.showFooter && <TableFooter>Example Footer</TableFooter>}
    </Table>
  );
};

export const Default: Story = {
  render: Template,
};

export const Orientation: Story = {
  ...Default,
  parameters: {
    docs: {
      description: {
        story:
          'Horizontal Table과 Vertical Table의 style이 상이하여 horizontal과 vertical로 구분한다. Table에 orientation 값을 추가하여 사용할 수 있다. 추가하지 않을 경우에는 horizontal 스타일이 적용된다.',
      },
    },
  },
  render: (args) => {
    return (
      <div className={'flex flex-col gap-2'}>
        <div className="text-lg">Horizontal Table</div>
        <Table orientation={args.orientation}>
          <TableCaption>Example Caption</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>결제상태</TableHead>
              <TableHead>결제수단</TableHead>
              <TableHead>결제금액</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pending</TableCell>
              <TableCell>PayPal</TableCell>
              <TableCell>$150.00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>Example Footer</TableFooter>
        </Table>
        <div className="text-lg">Vertical Table</div>
        <Table orientation="vertical">
          <TableBody>
            <TableRow>
              <TableHead scope="row">보고서명</TableHead>
              <TableCell>
                <Input value={'일간 보고서_QA서버_Splunk'} placeholder="내용을 입력해주세요" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead scope="row">전송여부</TableHead>
              <TableCell>
                <Switch />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead scope="row">전송일시</TableHead>
              <TableCell>2025-06-26 14:45</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  },
};
