import type { Meta, StoryObj } from '@storybook/react';
import {
  Input,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@common/ui';

type TableStoryArgs = {
  orientation: 'horizontal' | 'vertical';
  showCaption?: boolean;
  showFooter?: boolean;
};

const meta: Meta<TableStoryArgs> = {
  title: 'UI/DataDisplay/Compound/Table',
  args: {
    orientation: 'horizontal',
    showFooter: true,
    showCaption: true,
  },
  argTypes: {
    orientation: {
      control: { disable: true },
      table: { type: { summary: 'string' }, defaultValue: { summary: 'horizontal' } },
      description: [
        'Table의 방향에 따른 스타일을 적용할 수 있습니다.',
        'vertical과 horizontal로 구분하며, border 및 padding이 차이가 납니다.',
        '기본값은 horizontal 입니다.',
      ].join('<br/>'),
    },
    showCaption: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
      description: [
        '표의 설명(캡션)을 추가할 수 있습니다.',
        'showCaption은 storybook 에서 사용하기 위해 추가하였으며, 실제로는 &lt;TableCaption&gt;태그를 추가하거나 생략하여 사용합니다.',
      ].join('<br/>'),
    },
    showFooter: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
      description: [
        '표의 하단(footer)을 추가할 수 있습니다.',
        'showFooter는 storybook 에서 사용하기 위해 추가하였으며, 실제로는 &lt;TableFooter&gt;태그를 추가하거나 생략하여 사용합니다.',
      ].join('<br/>'),
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Table 컴포넌트의 문서입니다.',
          '표 형태의 데이터를 표시하는 데 사용되며, horizontal과 vertical 방향으로 구성할 수 있습니다.',
        ].join('<br/>'),
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: 'Table 컴포넌트의 기본 사용 예시입니다.',
      },
    },
  },
  render: Template,
};

export const Orientation: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Horizontal Table과 Vertical Table의 스타일이 상이하여 horizontal과 vertical로 구분합니다.',
          'Table에 orientation 값을 추가하여 사용할 수 있습니다.',
          '추가하지 않을 경우에는 horizontal 스타일이 적용됩니다.',
        ].join('<br/>'),
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
