'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../../lib/utils';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { UserFilledIcon } from '@common/ui/icons';
import { Skeleton } from '@common/ui/components/Skeleton';

const DEFAULT_DELAY_MS = 700;

// Avatar의 Wrapper(최상위) 스타일 variant
export const avatarWrapperVariants = tv({
  base: [
    'overflow-hidden relative flex shrink-0 items-center justify-center whitespace-nowrap',
    '[&_svg]:items-center [&_svg]:justify-center [&_svg]:fill-current [&_svg]:pointer-events-none',
    '[&:has([data-slot=avatar-fallback],[data-slot=avatar-image]):not(:has(svg,img))]:size-fit', // fallback 용
    '[&:has(data-slot=skeleton)]:size-auto',
  ],
  variants: {
    size: {
      small: 'size-5',
      basic: 'size-7.5',
      medium: 'size-10',
      large: 'size-15',
      fit: 'size-fit',
    },
    shape: {
      round: 'rounded-full',
      square: 'rounded-md',
    },
    disabled: {
      true: ['opacity-60 cursor-not-allowed pointer-events-none'],
    },
  },
  defaultVariants: {
    shape: 'round',
    disabled: false,
  },
});

// Avatar 내부 이미지 스타일 variant
export const avatarImageVariants = tv({
  base: [
    'flex flex-col gap-1.5 items-center justify-center m-0 bg-transparent',
    'has-[svg]:bg-juiGrey-a700 has-[svg,img]:size-full',
  ],
  variants: {
    size: {
      small: '[&_svg]:size-6/10',
      basic: '[&_svg]:size-6.5/10 ',
      medium: '[&_svg]:size-6/9',
      large: '[&_svg]:size-7/9',
      fit: '[&_svg]:min-w-[60px]',
    },
  },
  defaultVariants: {
    size: 'basic',
  },
});

export type AvatarWrapperVariantsType = VariantProps<typeof avatarWrapperVariants>;
export type AvatarImageVariantsType = VariantProps<typeof avatarImageVariants>;
// Avatar 이미지 로딩 상태 타입 참조는 https://www.radix-ui.com/primitives/docs/components/avatar#image 에서 했습니다.
export type AvatarLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

type AvatarRootProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & AvatarWrapperVariantsType;

function AvatarRoot({ className, asChild, size, disabled, ...props }: AvatarRootProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      asChild={asChild}
      className={cn(avatarWrapperVariants({ size, disabled, className }))}
      {...props}
    />
  );
}

type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & AvatarImageVariantsType;

function AvatarImage({ className, asChild = false, size, onLoadingStatusChange, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      asChild={asChild}
      className={cn(avatarImageVariants({ size, className }), 'p-0 aspect-square')}
      onLoadingStatusChange={onLoadingStatusChange}
      {...props}
    />
  );
}

type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> &
  AvatarImageVariantsType & {
    alt?: string;
    delayMs?: number;
    children?: React.ReactNode;
  };

function AvatarFallback({ className, asChild = false, size, alt, delayMs, ...props }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      aria-label={alt}
      asChild={asChild}
      className={cn(
        avatarImageVariants({
          size,
          className,
        }),
        // svg, img 있을 때만
        'has-[img,svg]:aspect-square [&_svg[data-slot=avatar-fallback-icon]]:fill-white',
        '[&:not(:has(img,svg))]:p-2',
      )}
      delayMs={delayMs}
      {...props}
    />
  );
}

type AvatarBaseProps = {
  /**
   * src : 아바타로 사용할 이미지의 경로 로써, img 태그가 받을 수 있는 내역은 그대로 받습니다.
   */
  src: string;
  /**
   * alt : 이미지/아이콘의 대체 텍스트
   */
  alt?: string;
  /**
   * fallback : 이미지가 없거나 로딩 실패 시 보여줄 대체 UI(텍스트, 아이콘 등)로서 fallback 미지정 시 기본 아이콘(UserFilledIcon)이 표시되고, fallback 지정 시 해당 텍스트가 표기됩니다.
   */
  fallback?: string;
  /**
   * delayMs : fallback이 나타나기까지 기다리는 시간(ms)으로서 fallback(대체 UI)이 너무 빨리 깜빡이며 나타나는 현상(플래시)을 방지하기 위해 UX 개선 목적으로 사용합니다. 참조 : https://www.radix-ui.com/primitives/docs/components/avatar#image
   */
  delayMs?: number;
  /**
   * onLoadingStatusChange : 이미지 로딩 상태 변화 시 호출되는 콜백으로서 상태에 따라 콜백 처리 가능합니다. 참조 : 참조 : https://www.radix-ui.com/primitives/docs/components/avatar#image
   */
  onLoadingStatusChange?: (status: AvatarLoadingStatus) => void;
};

export type AvatarContentsProps = AvatarBaseProps &
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> &
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> &
  AvatarImageVariantsType;

function AvatarContents(props: AvatarContentsProps) {
  const {
    size = 'basic',
    src = '',
    alt = undefined,
    onLoadingStatusChange,
    delayMs = DEFAULT_DELAY_MS,
    fallback = undefined,
    className,
    children = null,
    ...rest
  } = props;

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isSrcLoading, setIsSrcLoading] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsSrcLoading(false);

      return;
    }

    setIsSrcLoading(true);
  }, [src]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {isSrcLoading && (
        <Skeleton
          className={`${size === 'small' ? 'size-5' : size === 'basic' ? 'size-7.5' : size === 'medium' ? 'size-10' : size === 'large' ? 'size-15' : 'size-fit'}`}
        />
      )}
      <AvatarImage
        src={src}
        alt={alt}
        size={size}
        className={cn(className, isSrcLoading && 'invisible')}
        onLoadingStatusChange={(newStatus: AvatarLoadingStatus) => {
          const isLoading = newStatus === 'loading';

          if (isLoading) {
            setIsSrcLoading(isLoading);
          } else if (newStatus === 'error') {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
              setIsSrcLoading(false);
            }, delayMs);
          } else {
            setIsSrcLoading(isLoading);
          }

          onLoadingStatusChange?.(newStatus);
        }}
        {...rest}
      />
      <AvatarFallback
        alt={alt}
        size={size}
        delayMs={delayMs}
        className={cn(className, isSrcLoading && 'invisible')}
        {...rest}>
        {children || fallback || (
          <UserFilledIcon data-slot="avatar-fallback-icon" size={size === 'fit' ? 'basic' : size} />
        )}
      </AvatarFallback>
    </>
  );
}

export type AvatarProps = AvatarRootProps &
  AvatarBaseProps & {
    asChild?: boolean;
    children?: React.ReactNode;
  };

function Avatar(props: AvatarProps) {
  const {
    className,
    asChild = false,
    size = 'basic',
    shape = 'round',
    src = '',
    alt = undefined,
    fallback = undefined,
    delayMs = DEFAULT_DELAY_MS,
    onLoadingStatusChange,
    disabled = false,
    children = null,
    ...rest
  } = props;
  const avatarContentsProps = {
    src,
    alt,
    size,
    fallback,
    delayMs,
    onLoadingStatusChange,
    className,
    ...rest,
  };

  return asChild ? (
    <AvatarRoot
      asChild={asChild}
      className={cn(
        avatarWrapperVariants({ size, shape, disabled, className }),
        'm-0 p-0 break-words whitespace-wrap',
        // 하위에 data-slot=avatar-fallback나 data-slot=avatar-image 가 없을 때: size-fit
        '[&:not(:has([data-slot=avatar-fallback],[data-slot=avatar-image]))]:size-fit',
      )}
      {...rest}>
      {children ?? <AvatarContents {...avatarContentsProps} />}
    </AvatarRoot>
  ) : (
    <AvatarRoot asChild={asChild} className={cn(avatarWrapperVariants({ size, shape, disabled, className }))} {...rest}>
      <AvatarContents {...avatarContentsProps} />
    </AvatarRoot>
  );
}

export default Avatar;
export { AvatarRoot, AvatarImage, AvatarFallback, AvatarContents };
