'use client';

import { Fragment, type ReactElement } from 'react';
import { BreadcrumbItem } from './BreadcrumbParts';
import { breadcrumbVariants } from './breadcrumbVariants';
import { type BreadcrumbItemType, type EllipsisBreadcrumbItemType } from './Breadcrumb';
//
// import {
//   type BreadcrumbItemType,
//   type DropdownBreadcrumbItemType,
//   type DropDownItemType,
//   EllipsisBreadcrumbItemType,
// } from './Breadcrumb';
// import { Fragment, type ReactElement, type ReactNode } from 'react';
// import { cn } from '@common/ui/lib/utils';
// import { BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbSeparator, breadcrumbVariants, DropdownMenu } from '@common/ui';
// import { type OptionItem } from '@common/ui/components/DropdownMenu/DropdownMenu';
//
type RenderProps = {
  item: BreadcrumbItemType | EllipsisBreadcrumbItemType;
  variant: keyof typeof breadcrumbVariants.variants.variant;
  size: keyof typeof breadcrumbVariants.variants.size;
  isLast: boolean;
  disabledClass: string;
  separatorIcon?: ReactElement;
};
//
// type Renderer = (props: RenderProps) => ReactNode;
// //
// // const renderers: Record<'string', Renderer> = {
// //   page: renderPage,
// //   link: renderLink,
// //   ellipsis: renderEllipsis,
// // };
// //
// // function renderPage({ item, variant, size, isLast, disabledClass, separatorIcon }: RenderProps) {
// //   if (!item.isPage) return;
// //   const { base, listItem, page, separator } = breadcrumbVariants({
// //     variant,
// //     size,
// //   });
// //
// //   return (
// //     <Fragment key={item.value}>
// //       <BreadcrumbItem className={cn(listItem())}>
// //         <BreadcrumbPage
// //           aria-current={item.isCurrent ? 'page' : undefined}
// //           className={cn(page(), item.className, disabledClass)}>
// //           {item?.iconPosition === 'left' ? (
// //             <>
// //               {item?.icon}
// //               {item?.label}
// //             </>
// //           ) : (
// //             <>
// //               {item?.label}
// //               {item?.icon}
// //             </>
// //           )}
// //         </BreadcrumbPage>
// //       </BreadcrumbItem>
// //       {!isLast && <BreadcrumbSeparator icon={separatorIcon} className={cn(separator())} />}
// //     </Fragment>
// //   );
// // }
// //
// // function renderLink({ item, variant, size, isLast, disabledClass, separatorIcon }: RenderProps) {
// //   if (item.isPage) return;
// //   const { base, listItem, link, separator } = breadcrumbVariants({
// //     variant,
// //     size,
// //   });
// //
// //   return (
// //     <Fragment key={item.value}>
// //       <BreadcrumbItem className={cn(listItem())}>
// //         <BreadcrumbLink
// //           href={item.href}
// //           target={item?.target || '_self'}
// //           // onClick={}
// //           className={cn(link(), item.className, disabledClass)}>
// //           {item?.icon}
// //           {item?.label}
// //         </BreadcrumbLink>
// //       </BreadcrumbItem>
// //       {!isLast && <BreadcrumbSeparator icon={separatorIcon} className={cn(separator())} />}
// //     </Fragment>
// //   );
// // }
// //
// // function renderEllipsis({ item, variant, size, isLast, disabledClass, separatorIcon }: RenderProps) {
// //   if (item.itemType !== 'ellipsis') return;
// //
// //   const { listItem, ellipsis, separator } = breadcrumbVariants({
// //     variant,
// //     size,
// //     isTrigger: item.isTrigger,
// //   });
// //
// //   console.log('item.isTrigger :', item.isTrigger);
// //
// //   // target={item?.target || '_self'}
// //   return item.isTrigger ? (
// //     <Fragment key={item.value}>
// //       <BreadcrumbItem className={cn(listItem())}>
// //         <DropdownMenu
// //           options={
// //             item?.hiddenItems
// //               ? item.hiddenItems.map(
// //                   (h: DropdownBreadcrumbItemType): DropDownItemType => ({
// //                     type: 'item',
// //                     value: h.value,
// //                     label: h.label,
// //                     disabled: h.disabled,
// //                   }),
// //                 )
// //               : []
// //           }
// //           trigger={
// //             <BreadcrumbEllipsis icon={item?.icon || null} className={cn(ellipsis(), item.className, disabledClass)} />
// //           }
// //           onItemSelect={(option: OptionItem) => {
// //             const target = (item?.hiddenItems || []).find((h) => h.value === option.value);
// //
// //             if (target && item?.onClick) {
// //               item.onClick([target], undefined);
// //             }
// //           }}
// //         />
// //       </BreadcrumbItem>
// //       {!isLast && <BreadcrumbSeparator icon={separatorIcon} className={cn(separator())} />}
// //     </Fragment>
// //   ) : (
// //     <Fragment key={item.value}>
// //       <BreadcrumbItem className={cn(listItem())}>
// //         <BreadcrumbEllipsis icon={item.icon} className={cn(ellipsis(), item.className, disabledClass)} />{' '}
// //       </BreadcrumbItem>
// //       {!isLast && <BreadcrumbSeparator icon={separatorIcon} className={cn(separator())} />}
// //     </Fragment>
// //   );
// // }
//

function RenderBreadcrumbItem({ item, isLast, variant, size, separatorIcon, disabledClass }: RenderProps) {
  if (!item) return null;

  console.warn('isLast :', isLast);
  console.warn('variant :', variant);
  console.warn('size :', size);
  console.warn('separatorIcon :', separatorIcon);
  console.warn('disabledClass :', disabledClass);

  //   // const renderer = renderers[item.itemType as keyof typeof renderers];
  //   // return renderer ? renderer({ item, isLast, variant, size, separatorIcon, disabledClass }) : null;
  //
  //   const { listItem, ellipsis, link, page, separator } = breadcrumbVariants({
  //     variant,
  //     size,
  //   });
  //   const TriggeerClass = '';
  //
  //   if (item?.isTrigger) {
  //     const { base } = breadcrumbVariants({ isTrigger: item.isTrigger });
  //
  //     triggerClass = base();
  //   }
  //
  //   if (item.itemType === 'ellipsis') {
  //     return item?.isTrigger ? (
  //       <Fragment key={item.value}>
  //         <BreadcrumbItem className={cn(listItem())}>
  //           <DropdownMenu
  //             options={
  //               item?.hiddenItems
  //                 ? item.hiddenItems.map(
  //                     (h: DropdownBreadcrumbItemType): DropDownItemType => ({
  //                       type: 'item',
  //                       value: h.value,
  //                       label: h.label,
  //                       disabled: h.disabled,
  //                     }),
  //                   )
  //                 : []
  //             }
  //             trigger={
  //               <BreadcrumbEllipsis
  //                 icon={item?.icon || null}
  //                 className={cn(ellipsis(), triggerClass, item.className, disabledClass)}
  //               />
  //             }
  //             onItemSelect={(option: OptionItem) => {
  //               const target = (item?.hiddenItems || []).find((h) => h.value === option.value);
  //
  //               if (target && item?.onClick) {
  //                 item.onClick([target], undefined); // TODO : BreadcrumbLink 처럼 이동할 수 있도록 추가 필요
  //               }
  //             }}
  //           />
  //         </BreadcrumbItem>
  //         {!isLast && <BreadcrumbSeparator icon={separatorIcon} className={cn(separator())} />}
  //       </Fragment>
  //     ) : (
  //       <Fragment key={item.value}>
  //         <BreadcrumbItem className={cn(listItem())}>
  //           <BreadcrumbEllipsis icon={item.icon} className={cn(ellipsis(), item.className, disabledClass)} />
  //         </BreadcrumbItem>
  //         {!isLast && <BreadcrumbSeparator icon={separatorIcon} className={cn(separator())} />}
  //       </Fragment>
  //     );
  //   } else if (item.itemType === 'link' || !isPage) {
  //     const { base } = breadcrumbVariants({ isTrigger: item.isTrigger });
  //
  //     return;
  //   }
  //
  return (
    <Fragment key={item.value}>
      <BreadcrumbItem
      // className={cn(listItem())}
      ></BreadcrumbItem>
    </Fragment>
  );
}

//
export default RenderBreadcrumbItem;
