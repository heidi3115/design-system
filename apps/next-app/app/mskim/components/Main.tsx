'use client';

import React from 'react';
import { Button, ConfirmAlertDialog } from '@common/ui';
import useToggle from '../../../hooks/useToggle';
import { toast } from 'sonner';

const Main = () => {
  const [value, toggle] = useToggle(false);

  return (
    <div>
      <h2 className="text-2xl">
        <ConfirmAlertDialog
          open={value}
          onOpenChange={toggle}
          trigger={<Button>다이얼로그</Button>}
          description="02-1234-5678"
          onConfirm={() =>
            toast.success('저장 완료', {
              description: '저장이 완료되었습니다.',
            })
          }
        />
        <ConfirmAlertDialog trigger={<Button>다이얼로그2</Button>} description="02-1234-5678" />
      </h2>
    </div>
  );
};

export default Main;
