'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import { AlertCircleIcon, AlertTriangleFilledIcon, CheckIcon, InfoIcon, RotateIcon } from '@common/ui/icons';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--juiBackground-default)',
          '--normal-text': 'var(--juiText-primary)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          default: '!gap-4',
          icon: 'my-auto !mr-0 !ml-0',
          description: '!text-juiText-secondary',
          actionButton: '!ml-auto',
        },
        className: 'flex items-center',
      }}
      icons={{
        success: <CheckIcon />,
        info: <InfoIcon />,
        warning: <AlertTriangleFilledIcon />,
        error: <AlertCircleIcon />,
        loading: <RotateIcon />,
      }}
      {...props}
    />
  );
};

export default Toaster;
