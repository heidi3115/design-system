// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateCssVariables = (data: Record<string, any>, prefix = ''): string => {
  return Object.entries(data)
    .map(([key, value]) => {
      const variableName = `--${prefix}${key}`; // 변수 이름 생성

      if (typeof value === 'string') {
        return `${variableName}: ${value};`;
      }

      if (typeof value === 'object') {
        return generateCssVariables(value, `${prefix}${key}-`);
      }

      return '';
    })
    .join('\n');
};

export const injectTokenToCSS = (tokenGroup: Record<string, Record<string, string | number>>) => {
  const cssVariables = generateCssVariables(tokenGroup);

  const styleElement = document.createElement('style');

  styleElement.classList.add('jmachine-design-tokens');

  document.head.appendChild(styleElement);

  styleElement.sheet?.insertRule(
    `:root {
      ${cssVariables}
    }`,
  );
};

export default injectTokenToCSS;
