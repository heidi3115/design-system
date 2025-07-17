'use client';

import { DataTable } from '@common/ui/components/DataTable/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@common/ui';

export type Scenario = {
  scnrIdx: string;
  scnrDttIdx: string;
  scnrCd: string;
  scnrNm: string;
  scnrCls: string;
  dttTrgTyp: string;
  dngrGrd: string;
  dttTyp: string;
  respMode: string;
  oprStt: string;
  msrCycl: string;
  explnUseYn: string;
  modUser: string;
  modUserNm: string;
  modDt: string;
  regUser: string;
  regUserNm: string;
  regDt: string;
  alrmYn: string;
};

export default function Page() {
  const data: Scenario[] = [
    {
      scnrIdx: 'gLxtmTtq1nzgQXiM8TT5jw==',
      scnrDttIdx: 'AYb4MDUINNoV4IrJh4UxIg==',
      scnrCd: '212',
      scnrNm: '[QA-3560] 테스트 시나리오',
      scnrCls: 'QA',
      dttTrgTyp: '011001',
      dngrGrd: '012001',
      dttTyp: '016001',
      respMode: '013001',
      oprStt: '014001',
      msrCycl: '41 16 * * * ',
      explnUseYn: 'N',
      modUser: 'admin',
      modUserNm: '관리자',
      modDt: '2025-07-14 16:57:23',
      regUser: 'hycho',
      regUserNm: '조홍연',
      regDt: '2025-03-26 15:48:46',
      alrmYn: 'N',
    },
    {
      scnrIdx: 'i5DeKy0RP3wcBpK/CPAudg==',
      scnrDttIdx: 'HGvQI8mqXT36LndysbGm8Q==',
      scnrCd: '177',
      scnrNm: '[1112] AI 다중 임계치 테스트 - 커스텀커맨드',
      scnrCls: 'QA|E-Mail|Works',
      dttTrgTyp: '011001',
      dngrGrd: '012003',
      dttTyp: '016009',
      respMode: '013001',
      oprStt: '014001',
      msrCycl: '27 12 * * *',
      explnUseYn: 'N',
      modUser: 'admin',
      modUserNm: '관리자',
      modDt: '2025-07-08 15:41:19',
      regUser: 'admin',
      regUserNm: '관리자',
      regDt: '2024-11-28 10:38:05',
      alrmYn: 'N',
    },
  ];

  const columns: ColumnDef<Scenario, string>[] = [
    {
      accessorKey: 'scnrNm',
      header: 'scnrNm',
    },
    {
      accessorKey: 'regUser',
      header: 'regUser',
      cell: ({ row }) => <div className="capitalize">{row.getValue('regUser')}</div>,
    },
    {
      accessorKey: 'regUserNm',
      header: 'regUserNm',
    },
    {
      accessorKey: 'regDt',
      header: 'regDt',
    },
  ];

  const testData: Scenario[] = [];

  return (
    <section className="flex gap-30 items-center justify-center w-full min-h-svh">
      <DataTable data={data} columns={columns} />
      <DataTable data={testData} columns={columns} />
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
