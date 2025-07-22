'use client';

import { DataTable } from '@common/ui/components/DataTable/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@common/ui';
import { useEffect, useState } from 'react';

export type Scenario = {
  scnrNm: string;
  regUser: string;
  regUserNm: string;
  regDt: string;
};

export default function Page() {
  const [serverData, setServerData] = useState([
    {
      scnrNm: '[QA-3560] 테스트 시나리오',
      regUser: 'hycho',
      regUserNm: '테스트이름',
      regDt: '2025-03-26 15:48:46',
    },
    {
      scnrNm: '[1112] AI 다중 임계치 테스트 - 커스텀커맨드',
      regUser: 'admin',
      regUserNm: '관리자',
      regDt: '2024-11-28 10:38:05',
    },
  ]);

  const clientData = [
    {
      scnrNm: '[QA-3560] 테스트 시나리오',
      regUser: 'hycho',
      regUserNm: '테스트이름',
      regDt: '2025-03-26 15:48:46',
    },
    {
      scnrNm: '[1112] AI 다중 임계치 테스트 - 커스텀커맨드',
      regUser: 'admin',
      regUserNm: '관리자',
      regDt: '2024-11-28 10:38:05',
    },
  ];

  const columns: ColumnDef<Scenario, string>[] = [
    {
      accessorKey: 'scnrNm',
      header: 'scnrNm',
      enableGlobalFilter: false,
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
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!value) return;

    const dummyData: Scenario[] = [
      {
        scnrNm: '검색어로 필터링된 서버 데이터 예시',
        regUser: 'hycho',
        regUserNm: '새로운데이터',
        regDt: '2025-03-26 15:48:46',
      },
      {
        scnrNm: '검색어로 필터링된 서버 데이터 예시2',
        regUser: 'admin',
        regUserNm: '새로운데이터2',
        regDt: '2024-11-28 10:38:05',
      },
    ];

    setServerData(dummyData);
  }, [value]);

  return (
    <section className="flex flex-col gap-20 items-center justify-center w-full min-h-svh">
      <div className="w-200 flex flex-col gap-2">
        <span>서버사이드 필터링</span>
        <DataTable
          isUseQuickSearch
          data={serverData}
          columns={columns}
          globalFilter={value}
          onGlobalFilterChange={(e) => setValue(e)}
          manualFiltering
          emptyState={<div>검색 결과 없음</div>}
        />
      </div>
      <div className="w-200 flex flex-col gap-2">
        <span>클라이언트사이드 필터링</span>
        <DataTable data={clientData} isUseQuickSearch columns={columns} emptyState={<div>검색 결과 없음</div>} />
      </div>
      <div className="w-200 flex flex-col gap-2">
        <span>결과 없음</span>
        <DataTable data={testData} isUseQuickSearch columns={columns} />
      </div>
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
