import fs from 'fs';
import path from 'path';
import { palette } from '@common/tokens';

/** CSS 변수 생성 */
function generateCssVariables(palette: Record<string, string | Record<string | number, string>>): string {
  let rootVars = '';
  let themeVars = '';
  let themeInlineVars = '';

  for (const [color, valueOrShades] of Object.entries(palette)) {
    if (typeof valueOrShades === 'string') {
      // 1-depth 처리
      const varName = `--${color}`;
      const themeVarName = `--color-${color}`;

      rootVars += `  ${varName}: ${valueOrShades};\n`;
      themeVars += `  ${varName}: ${valueOrShades};\n`;
      themeInlineVars += `  ${themeVarName}: var(${varName});\n`;
    } else if (typeof valueOrShades === 'object') {
      // 2-depth 처리
      for (const [shade, value] of Object.entries(valueOrShades)) {
        const varName = `--${color}-${shade}`;
        const themeVarName = `--color-${color}-${shade}`;

        rootVars += `  ${varName}: ${value};\n`;
        themeVars += `  ${varName}: ${value};\n`;
        themeInlineVars += `  ${themeVarName}: var(${varName});\n`;
      }
    }
  }

  const rootSection = `:root {\n${rootVars}}\n\n`;
  const themeSection = `@theme {\n${themeVars}}\n\n`;
  const themeInlineSection = `@theme inline {\n${themeInlineVars}}\n`;

  return rootSection + themeSection + themeInlineSection;
}

/** 경로 및 파일 쓰기 */
const css = generateCssVariables(palette);
console.log(__dirname);
const outputPath = path.resolve(__dirname, '../packages/ui/src/styles/custom.css');

fs.mkdirSync(path.dirname(outputPath), { recursive: true }); // 경로 없으면 생성
fs.writeFileSync(outputPath, css); // 기존 파일 덮어쓰기

console.log(`✅ custom.css regenerated at ${outputPath}`);
