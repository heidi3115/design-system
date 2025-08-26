'use client';

import { DataTable } from '@common/ui';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { Button, Input } from '@common/ui';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDebounce, useUpdateEffect } from '@common/utils';

type Scenario = {
  scnrIdx: string;
  scnrNm: string;
  regUser: string;
  regUserNm: string;
  regDt: string;
};

export type ColumnType = {
  hide: boolean;
  field: string;
  headerName: string;
};

export type GridType = {
  gridCd: string;
  cols: ColumnType[];
};

export default function Page() {
  const [serverData, setServerData] = useState({
    totalCount: 20,
    list: [
      {
        scnrIdx: 'oPcU8M0kSfYD8qV1dvKoFQ==',
        scnrNm: '[QA-3560] 테스트 시나리오',
        regUser: 'hycho',
        regUserNm: '테스트이름',
        regDt: '2025-03-26 15:48:46',
      },
      {
        scnrIdx: 'SxYduENFkYl1vXBNrsdL5Q==',
        scnrNm: '[1112] AI 다중 임계치 테스트 - 커스텀커맨드',
        regUser: 'admin',
        regUserNm: '관리자',
        regDt: '2024-11-28 10:38:05',
      },
    ],
  });

  const clientData = [
    {
      scnrIdx: 'oPcU8M0kSfYD8qV1dvKoFQ==',
      scnrNm: '[QA-3560] 테스트 시나리오',
      regUser: 'test5',
      regUserNm: '테스트이름',
      regDt: '2025-03-26 15:48:46',
    },
    {
      scnrIdx: 'SxYduENFkYl1vXBNrsdL5Q==',
      scnrNm: '[1112] AI 다중 임계치 테스트 - 커스텀커맨드',
      regUser: 'test6',
      regUserNm: '관리자',
      regDt: '2024-11-28 10:38:05',
    },
    {
      scnrIdx: '7fafnrLzKgisDhs98tVOew==',
      scnrNm: '[QA-3560] 테스트 시나리오',
      regUser: 'test7',
      regUserNm: '테스트이름',
      regDt: '2025-03-26 15:48:46',
    },
    {
      scnrIdx: 'DS9QzTVSQACrXP1lLKGf6w==',
      scnrNm: '[1112] AI 다중 임계치 테스트 - 커스텀커맨드',
      regUser: 'test8',
      regUserNm: '관리자',
      regDt: '2024-11-28 10:38:05',
    },
  ];

  const dummyData = {
    totalCount: 20,
    list: [
      {
        scnrIdx: 'KfgofzASdDT/CQd0q4e37Q==',
        scnrNm: '검색어로 필터링된 서버 데이터 예시',
        regUser: 'hycho',
        regUserNm: '새로운데이터',
        regDt: '2025-03-26 15:48:46',
      },
      {
        scnrIdx: 'orIAA5m67XK+n4PSTaeznA==',
        scnrNm: '검색어로 필터링된 서버 데이터 예시2',
        regUser: 'admin',
        regUserNm: '새로운데이터2',
        regDt: '2024-11-28 10:38:05',
      },
    ],
  };

  const [columnData, setColumnData] = useState<GridType>({
    gridCd: '20000',
    cols: JSON.parse(
      '[{"width":50,"minWidth":50,"maxWidth":null,"hide":false,"hideable":false,"sortable":false,"resizable":true,"filterable":false,"groupable":true,"pinnable":true,"aggregable":true,"editable":false,"type":"number","align":"right","headerAlign":"right","field":"id","hasBeenResized":true,"headerName":"No","computedWidth":50},{"width":100,"minWidth":50,"maxWidth":null,"hide":false,"hideable":true,"sortable":true,"resizable":true,"filterable":true,"groupable":true,"pinnable":true,"aggregable":true,"editable":false,"type":"string","align":"left","field":"scnrNm","hasBeenResized":true,"headerName":"시나리오명","cellClassName":"t200007","flex":1,"computedWidth":435},{"width":100,"minWidth":50,"maxWidth":null,"hide":false,"hideable":true,"sortable":true,"resizable":true,"filterable":true,"groupable":true,"pinnable":true,"aggregable":true,"editable":false,"type":"singleSelect","align":"center","field":"dngrGrd","hasBeenResized":true,"headerName":"시나리오 등급","headerAlign":"center","cellClassName":"t200379","computedWidth":100},{"width":100,"minWidth":50,"maxWidth":null,"hide":false,"hideable":true,"sortable":true,"resizable":true,"filterable":true,"groupable":true,"pinnable":true,"aggregable":true,"editable":false,"type":"string","align":"left","field":"scnrCls","hasBeenResized":true,"headerName":"분류","cellClassName":"t000006","computedWidth":100},{"width":100,"minWidth":50,"maxWidth":null,"hide":false,"hideable":true,"sortable":true,"resizable":true,"filterable":true,"groupable":true,"pinnable":true,"aggregable":true,"editable":false,"type":"singleSelect","align":"left","field":"dttTyp","hasBeenResized":true,"headerName":"탐지 형태","cellClassName":"t200032","computedWidth":100},{"width":100,"minWidth":50,"maxWidth":null,"hide":false,"hideable":true,"sortable":true,"resizable":true,"filterable":true,"groupable":true,"pinnable":true,"aggregable":true,"editable":false,"type":"singleSelect","align":"left","field":"alrmYn","hasBeenResized":true,"headerName":"알림 사용","cellClassName":"t200011","headerAlign":"center","computedWidth":100},{"width":100,"minWidth":50,"maxWidth":null,"hide":false,"hideable":true,"sortable":true,"resizable":true,"filterable":true,"groupable":true,"pinnable":true,"aggregable":true,"editable":false,"type":"singleSelect","align":"left","field":"explnUseYn","hasBeenResized":true,"headerName":"소명 요청","cellClassName":"t200313","headerAlign":"center","computedWidth":100},{"width":100,"minWidth":50,"maxWidth":null,"hide":false,"hideable":true,"sortable":true,"resizable":true,"filterable":true,"groupable":true,"pinnable":true,"aggregable":true,"editable":false,"type":"singleSelect","align":"left","field":"oprStt","hasBeenResized":true,"headerName":"운영 상태","cellClassName":"t200012","headerAlign":"center","computedWidth":100},{"width":100,"minWidth":50,"maxWidth":null,"hide":false,"hideable":true,"sortable":true,"resizable":true,"filterable":true,"groupable":true,"pinnable":true,"aggregable":true,"editable":false,"type":"string","align":"left","field":"regUserNm","hasBeenResized":true,"headerName":"등록자","cellClassName":"t000018","computedWidth":100},{"width":100,"minWidth":50,"maxWidth":null,"hide":false,"hideable":true,"sortable":true,"resizable":true,"filterable":true,"groupable":true,"pinnable":true,"aggregable":true,"editable":false,"type":"date","align":"left","field":"regDt","hasBeenResized":true,"headerName":"등록일","cellClassName":"t000019","computedWidth":100},{"width":100,"minWidth":50,"maxWidth":null,"hide":false,"hideable":true,"sortable":true,"resizable":true,"filterable":true,"groupable":true,"pinnable":true,"aggregable":true,"editable":false,"type":"string","align":"left","field":"modUserNm","hasBeenResized":true,"headerName":"최종 수정자","cellClassName":"t200319","computedWidth":100},{"width":150,"minWidth":50,"maxWidth":null,"hide":false,"hideable":true,"sortable":true,"resizable":true,"filterable":true,"groupable":true,"pinnable":true,"aggregable":true,"editable":false,"type":"dateTime","align":"left","field":"modDt","hasBeenResized":true,"headerName":"최종 수정일","cellClassName":"t200320","computedWidth":150}]',
    ),
  });

  // utils로 빼기
  function createColumnsFromRaw<T>(cols: ColumnType[]): ColumnDef<T, unknown>[] {
    return cols.map((col) => ({
      accessorKey: col.field,
      header: col.headerName || col.field,
      meta: { ...col, filterable: col.field !== 'No' },
      cell: (ctx: CellContext<T, unknown>) => {
        const { row } = ctx;

        if (col.field === 'id') {
          return <div>{row.index + 1}</div>;
        }

        return <div>{row.getValue(col.field)}</div>;
      },
    }));
  }

  const columns = createColumnsFromRaw<Scenario>(columnData.cols);

  const testData: Scenario[] = [];
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(serverData.totalCount);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  console.warn(selectedIds);

  const pageSize = 10; // pageSize 기능 구현 시 수정 예정

  const filterTable = useDebounce((val: string) => {
    setSearchValue(val);
  }, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => filterTable(event.target.value);

  const handleColumnStatusChange = (status: ColumnType[]) => {
    setColumnData((prev) => ({
      ...prev,
      cols: status,
    }));
  };

  useEffect(() => {
    if (value) {
      setCurrentPage(0);
      setServerData(dummyData);
    }
  }, [value]);

  useUpdateEffect(() => {
    setServerData(dummyData);
    setTotalCount(dummyData.totalCount);
  }, [currentPage]);

  const getRowId = useCallback((row: Scenario) => row.scnrIdx.toString(), []);

  return (
    <section className="flex flex-col gap-20 items-center justify-center w-full min-h-svh">
      <div className="w-200 flex flex-col gap-2">
        <span>서버사이드 필터링</span>
        <DataTable
          isUseQuickSearch
          rows={serverData.list}
          getRowId={getRowId}
          onSelectRows={setSelectedIds}
          columnFilterTrigger={<Button variant="transparent">커스텀필터목록</Button>}
          columns={columns}
          globalFilter={value}
          totalCount={totalCount}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
          onGlobalFilterChange={(e) => setValue(e)}
          manualFiltering
          manualPagination
          onColumnStatusChange={handleColumnStatusChange}
          emptyState={<div>검색 결과 없음</div>}
        />
      </div>
      <div className="w-200 flex flex-col gap-2">
        <span>클라이언트사이드 필터링(외부Input)</span>
        <Input placeholder="검색어를 입력하세요" underline="primary" onChange={handleChange} />
        <DataTable
          rows={clientData}
          getRowId={getRowId}
          onSelectRows={setSelectedIds}
          searchValue={searchValue}
          isUseQuickSearch={false}
          columns={columns}
          emptyState={<div>검색 결과 없음</div>}
        />
      </div>
      <div className="w-200 flex flex-col gap-2">
        <span>클라이언트사이드 필터링(내부Input)</span>
        <DataTable
          rows={clientData}
          getRowId={getRowId}
          isUseQuickSearch
          columns={columns}
          emptyState={<div>검색 결과 없음</div>}
          onSelectRows={setSelectedIds}
        />
      </div>
      <div className="w-200 flex flex-col gap-2">
        <span>결과 없음</span>
        <DataTable rows={testData} isUseQuickSearch columns={columns} enableRowSelection={false} />
      </div>
    </section>
  );
}
