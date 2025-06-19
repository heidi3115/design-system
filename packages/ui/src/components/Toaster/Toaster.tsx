'use client';

import { CheckCircleIcon } from '@common/ui/icons';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        style: {
          background: ' var(--juiBackground-default)',
          color: 'var(--juiText-primary)',
          border: 'var(--juiBorder-primary)',
        },
      }}
      icons={{
        success: <CheckCircleIcon />,
        // info?: React.ReactNode;
        // warning?: React.ReactNode;
        // error?: React.ReactNode;
        // loading?: React.ReactNode;
        // close?: React.ReactNode;
      }}
      {...props}
    />
  );
};

export default Toaster;
