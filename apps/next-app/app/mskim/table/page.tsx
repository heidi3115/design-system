'use client';

import { DataTable } from '@common/ui/components/DataTable/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@common/ui';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
  test: string;
};

export default function Page() {
  const data: Payment[] = [
    { id: 'm5gr84i9', amount: 316, status: 'success', email: 'ken99@example.com', test: '테스트' },
    { id: '3u1reuv4', amount: 242, status: 'success', email: 'Abe45@example.com', test: '테스트' },
    { id: 'derv1ws0', amount: 837, status: 'processing', email: 'Monserrat44@example.com', test: '테스트' },
    { id: '5kma53ae', amount: 874, status: 'success', email: 'Silas22@example.com', test: '테스트12' },
    { id: 'bhqecj4p', amount: 721, status: 'failed', email: 'carmella@example.com', test: '이름' },
  ];
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <div className="capitalize">{row.getValue('status')}</div>,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('amount'));
        const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: 'test',
      header: 'Test',
    },
  ];

  return (
    <section className="flex gap-30 items-center justify-center w-full min-h-svh">
      <DataTable data={data} columns={columns} />
      <div>
        <span className="mt-10 text-2xl">브로콜리 입고정리표</span>
        <Table orientation="horizontal">
          <TableHeader>
            <TableRow>
              <TableHead>입고일</TableHead>
              <TableHead>생산지</TableHead>
              <TableHead>브로콜리 가격</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2025.07.11</TableCell>
              <TableCell>제주 서귀포시</TableCell>
              <TableCell>30,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2025.07.11</TableCell>
              <TableCell>전남 여수</TableCell>
              <TableCell>27,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2025.07.10</TableCell>
              <TableCell>제주 서귀포시</TableCell>
              <TableCell>29,000</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter className="m-auto">
            <tr>
              <th scope="row">합계</th>
              <td></td>
              <td className="p-4">86,000</td>
            </tr>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
}
