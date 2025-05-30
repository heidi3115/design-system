'use client';

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from './SelectParts';

type OptionItem = {
  type?: 'item'; // 생략 시 기본값 처리
  label: string;
  value: string;
};

type OptionSeparator = {
  type: 'separator';
};

type OptionGroup = {
  type: 'group';
  label: string;
  items: (OptionItem | OptionSeparator)[];
};

type OptionType = OptionGroup | OptionItem | OptionSeparator;
type SelectOptions = OptionType[];

type Props = {
  options: SelectOptions;
  placeholder?: string;
};

function Select({ options, placeholder = 'Select a value' }: Props) {
  return (
    <SelectRoot>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt, idx) => {
          // 그룹일 경우
          if ('type' in opt && opt.type === 'group') {
            return (
              <SelectGroup key={`group-${idx}`}>
                <SelectLabel>{opt.label}</SelectLabel>
                {opt.items.map((item, i) => {
                  if ('type' in item && item.type === 'separator') {
                    return <SelectSeparator key={`separator-${i}`} />;
                  }

                  return (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            );
          }

          // separator (group 밖에서 쓰이는 경우)
          if ('type' in opt && opt.type === 'separator') {
            return <SelectSeparator key={`separator-${idx}`} />;
          }

          // item (type이 없거나 item인 경우)
          const item = opt as OptionItem;

          return (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </SelectRoot>
  );
}

export default Select;
