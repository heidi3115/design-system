import fs from 'fs';
import path from 'path';

function jsxToBase64(svgChildren: string, viewBox: string = '0 0 24 24', isStrokeIcon: boolean = false): string {
  const strokeAttributes = isStrokeIcon ? 'fill="none" stroke="white" stroke-width="2"' : 'fill="#fff"';
  const svgWrapped = `<svg xmlns="http://www.w3.org/2000/svg" ${strokeAttributes} width="24" height="24" viewBox="${viewBox}">${svgChildren}</svg>`;
  return Buffer.from(svgWrapped).toString('base64');
}

async function processIconsDir(dirPath: string) {
  const files = await fs.promises.readdir(dirPath);

  for (const fileName of files) {
    if (!fileName.endsWith('.tsx') && !fileName.endsWith('.ts')) continue;

    const filePath = path.join(dirPath, fileName);
    const content = await fs.promises.readFile(filePath, 'utf8');

    // JSX fragment 안의 내용만 추출: <>...</>
    const pathsRegex = /const\s+\w+Path\s*=\s*\(\s*<>\s*([\s\S]*?)\s*<\/>\s*\);?/m;
    const pathsMatch = content.match(pathsRegex);
    if (!pathsMatch || !pathsMatch[1]) {
      console.log(`[SKIP] JSX fragment not found in ${fileName}`);
      continue;
    }

    // viewBox 추출
    const viewBoxRegex = /viewBox:\s*['"`]([^'"`]+)['"`]/;
    const viewBoxMatch = content.match(viewBoxRegex);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

    // stroke 아이콘인지 확인 (path에 stroke 속성이 없고 CreateIcon에 stroke 속성이 있는 경우)
    const hasStrokeInCreateIcon = content.includes('stroke:') && content.includes('fill:');
    const isStrokeIcon = hasStrokeInCreateIcon;

    const svgChildren = pathsMatch[1].trim();
    const base64Svg = jsxToBase64(svgChildren, viewBox, isStrokeIcon);

    const rawName = path.basename(fileName).replace(/\.(tsx|ts)$/, '');
    const iconName = rawName.endsWith('Icon') ? rawName : `${rawName}Icon`;

    const commentBlock = `/**
 * @component @name ${iconName}
 * @description Custom SVG icon component rendering.
 *
 * @preview ![img](data:image/svg+xml;base64,${base64Svg})
 *
 * @param {IconProps} props - Icon props and valid SVG attributes.
 * @returns {JSX.Element} SVG icon component.
 */
`;

    const exportRegex = new RegExp(`^\\s*export\\s+const\\s+${iconName}\\s*=`, 'm');
    const exportMatch = content.match(exportRegex);
    if (!exportMatch) {
      console.log(`[SKIP] export const ${iconName} not found in ${fileName}`);
      continue;
    }

    // 주석이 이미 존재하는 경우 스킵
    if (content.includes(`@component @name ${iconName}`)) {
      console.log(`[SKIP] ${fileName} already has comment`);
      continue;
    }

    // 주석 추가
    const newContent = content.replace(exportRegex, `${commentBlock}$&`);
    await fs.promises.writeFile(filePath, newContent, 'utf8');
    console.log(`[DONE] ${fileName} updated with preview comment`);
  }
}

const iconsDir = path.resolve(__dirname, '../packages/ui/src/icons/Icon');
processIconsDir(iconsDir).catch(console.error);
