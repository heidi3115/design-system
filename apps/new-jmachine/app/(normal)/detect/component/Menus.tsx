'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Button, Slider } from '@common/ui';
import { getMenusClientFetch } from '../../../../services/common/getMenusFetch';

export default function Menus() {
  const { data: session } = useSession();

  const [data, setData] = useState('');
  const [crash, setCrash] = useState(false);

  if (crash) {
    throw new Error('렌더링 중 에러');
  }

  async function fetchData() {
    const menuData = await getMenusClientFetch({ menuDvn: 'JM' });

    setData(JSON.stringify(menuData, null, 2));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <span>{session?.user?.userNm}</span>
      <Button onClick={async () => await fetchData()}>call</Button>
      <Button onClick={() => setCrash(true)}>Error</Button>
      <Slider />

      <h2 className="text-lg font-bold">클라이언트 패치 결과</h2>
      <pre className="text-sm p-2 mt-2">{data ? data : '불러오는 중...'}</pre>
    </div>
  );
}
