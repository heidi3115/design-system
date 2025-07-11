import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@common/ui';

const Page = () => {
  return (
    <div>
      <Table orientation="horizontal">
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
    </div>
  );
};

export default Page;
