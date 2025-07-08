'use client';

import React from 'react';
import useToggle from '../customHook/useToggle';
import { Toggle } from '@common/ui';

const Page = () => {
  const [value, toggle] = useToggle(false);

  return (
    <div>
      <Toggle size="small" pressed={value} onPressedChange={toggle}>
        토글토글
      </Toggle>
    </div>
  );
};

export default Page;
