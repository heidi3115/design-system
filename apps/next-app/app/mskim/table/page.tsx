import React from 'react';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@common/ui';

const Page = () => {
  return (
    <div className="w-96 m-auto flex flex-col gap-2">
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
  );
};

export default Page;
