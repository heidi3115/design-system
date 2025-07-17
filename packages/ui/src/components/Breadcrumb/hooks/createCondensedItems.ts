import type { BreadcrumbItemBaseType } from '@common/ui';
import type {
  BreadcrumbCondensedType,
  DropdownItemType,
  DropdownListType,
  DropdownPropsType,
  LinkBreadcrumbItemType,
  PageBreadcrumbItemType,
} from './types';
import { toSafeIconPosition, toSafeTarget } from './helpers';

export function extractDropdownMeta({
  children,
  enableDropdown,
  dropdownProps,
}: {
  children?: BreadcrumbItemBaseType[];
  enableDropdown: boolean;
  dropdownProps?: DropdownPropsType;
}): DropdownListType {
  const safeChildren = Array.isArray(children) ? children : [];
  const normalized = safeChildren.map((child) => ({
    ...child,
    iconPosition: toSafeIconPosition(child.iconPosition),
    target: toSafeTarget(child.target),
  }));

  const dropdownOptions: DropdownItemType[] = normalized.map((child) => ({
    type: 'item',
    value: child.value,
    label: child.label,
    disabled: child.disabled ?? false,
  }));

  const hiddenItems: BreadcrumbCondensedType[] = normalized.map((child) => ({
    ...child,
    itemType: child?.isPage ? 'page' : 'link',
    isTrigger: !enableDropdown ? false : Array.isArray(child?.children) && child?.children.length > 0,
  }));

  return dropdownOptions.length && enableDropdown
    ? {
        dropdownOptions,
        hiddenItems,
        dropdownProps: dropdownProps?.dropdownProps,
      }
    : {
        dropdownOptions: undefined,
        hiddenItems: undefined,
        dropdownProps: undefined,
      };
}

export function createCondensedItems({
  items,
  enableDropdown,
  dropdownProps,
}: {
  items: BreadcrumbItemBaseType[];
  enableDropdown: boolean;
  dropdownProps?: DropdownPropsType;
}): BreadcrumbCondensedType[] {
  return items.map((item) => {
    const type = item.isPage === true ? 'page' : 'link';

    const base = {
      ...item,
      iconPosition: toSafeIconPosition(item.iconPosition),
      target: toSafeTarget(item.target),
    };

    const dropdown = extractDropdownMeta({
      children: item.children,
      enableDropdown,
      dropdownProps,
    });

    return type === 'page'
      ? ({
          ...base,
          itemType: 'page',
          isTrigger: false,
        } as PageBreadcrumbItemType)
      : ({
          ...base,
          itemType: 'link',
          isTrigger: enableDropdown && !!dropdown.dropdownOptions?.length,
          ...dropdown,
        } as LinkBreadcrumbItemType);
  });
}
