import fs from 'fs';
import path from 'path';
import { palette } from '@common/tokens';

/** 타입 정의 */
type FlatColor = string;
type TupleColor = [dark: string, light: string];
type NamedColor = { main: string; light?: string };
type ColorValue = FlatColor | TupleColor | NamedColor;
type Palette = Record<string, ColorValue | Record<string | number, ColorValue>>;

/** CSS 변수 생성 */
function generateCssVariables(palette: Palette): string {
  let rootVars = '';
  let themeVars = '';
  let themeInlineVars = '';
  let lightThemeVars = '';

  for (const [color, valueOrShades] of Object.entries(palette)) {
    if (typeof valueOrShades === 'string') {
      const varName = `--${color}`;
      const themeVarName = `--color-${color}`;

      rootVars += `  ${varName}: ${valueOrShades};\n`;
      themeVars += `  ${varName}: ${valueOrShades};\n`;
      themeInlineVars += `  ${themeVarName}: var(${varName});\n`;
    } else if (Array.isArray(valueOrShades)) {
      const [dark, light] = valueOrShades;
      const varName = `--${color}`;
      const themeVarName = `--color-${color}`;

      rootVars += `  ${varName}: ${dark};\n`;
      themeVars += `  ${varName}: ${dark};\n`;
      themeInlineVars += `  ${themeVarName}: var(${varName});\n`;
      lightThemeVars += `  ${varName}: ${light};\n`;
    } else if (typeof valueOrShades === 'object' && valueOrShades !== null) {
      for (const [shade, shadeValue] of Object.entries(valueOrShades)) {
        const isMain = shade === 'main';
        const suffix = isMain ? '' : `-${shade}`;
        const varName = `--${color}${suffix}`;
        const themeVarName = `--color-${color}${suffix}`;

        if (typeof shadeValue === 'string') {
          rootVars += `  ${varName}: ${shadeValue};\n`;
          themeVars += `  ${varName}: ${shadeValue};\n`;
          themeInlineVars += `  ${themeVarName}: var(${varName});\n`;
        } else if (Array.isArray(shadeValue)) {
          const [dark, light] = shadeValue;
          rootVars += `  ${varName}: ${dark};\n`;
          themeVars += `  ${varName}: ${dark};\n`;
          themeInlineVars += `  ${themeVarName}: var(${varName});\n`;
          lightThemeVars += `  ${varName}: ${light};\n`;
        } else if (typeof shadeValue === 'object' && shadeValue !== null && 'main' in shadeValue) {
          const { main, light } = shadeValue;
          rootVars += `  ${varName}: ${main};\n`;
          themeVars += `  ${varName}: ${main};\n`;
          themeInlineVars += `  ${themeVarName}: var(${varName});\n`;
          if (light) {
            lightThemeVars += `  ${varName}: ${light};\n`;
          }
        }
      }
    }
  }

  const rootSection = `:root {\n${rootVars}}\n\n`;
  const themeSection = `@theme {\n${themeVars}}\n\n`;
  const themeInlineSection = `@theme inline {\n${themeInlineVars}}\n\n`;
  const lightSection = lightThemeVars ? `.light {\n${lightThemeVars}}\n\n` : '';

  return rootSection + themeSection + themeInlineSection + lightSection;
}

/** 경로 및 파일 쓰기 */
const css = generateCssVariables(palette);
const outputPath = path.resolve(__dirname, '../packages/ui/src/styles/custom.css');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, css);

console.log(`✅ custom.css regenerated at ${outputPath}`);
