type ToggleArrayParams = {
  array: string[];
  value: string;
  checked: boolean;
};

export function useToggleArray() {
  const toggle = ({ array, value, checked }: ToggleArrayParams): string[] => {
    return checked ? [...array, value] : array.filter((v) => v !== value);
  };

  return { toggle };
}
