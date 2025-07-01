'use client';

type OptionItem = {
  type?: 'item';
  label: string;
  value: string;
  disabled?: boolean;
};

export function useOptionMatch(allOptions: OptionItem[], input: string) {
  const normalized = input.toLowerCase();

  const matchedByLabel = allOptions.find((opt) => opt.label.toLowerCase() === normalized);
  const matchedByValue = allOptions.find((opt) => opt.value.toLowerCase() === normalized);
  const isDuplicateValue = (values: string[]) => values.some((val) => val.toLowerCase() === normalized);

  return {
    matchedByLabel,
    matchedByValue,
    isDuplicateValue,
  };
}
